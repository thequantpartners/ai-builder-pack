import { Pool } from 'pg'

type Order = {
  paymentId: string
  productId: string
  amount: number
  currency: string
  email?: string
  phone?: string
  status: 'paid' | 'delivery_pending' | 'delivered'
  deliveryUrl?: string
  downloadToken?: string
  downloadExpiresAt?: string
  createdAt?: string
  deliveredAt?: string
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
let initialized: Promise<void> | undefined

async function init() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
  await pool.query(`CREATE TABLE IF NOT EXISTS orders (payment_id TEXT PRIMARY KEY, product_id TEXT NOT NULL, amount NUMERIC(10,2) NOT NULL, currency TEXT NOT NULL, email TEXT, phone TEXT, status TEXT NOT NULL, delivery_url TEXT, download_token TEXT, download_expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), delivered_at TIMESTAMPTZ)`)
}
function ready() { return initialized ??= init() }
function rowToOrder(row: Record<string, unknown>): Order { return { paymentId: String(row.payment_id), productId: String(row.product_id), amount: Number(row.amount), currency: String(row.currency), email: row.email ? String(row.email) : undefined, phone: row.phone ? String(row.phone) : undefined, status: row.status as Order['status'], deliveryUrl: row.delivery_url ? String(row.delivery_url) : undefined, downloadToken: row.download_token ? String(row.download_token) : undefined, downloadExpiresAt: row.download_expires_at ? new Date(String(row.download_expires_at)).toISOString() : undefined, createdAt: row.created_at ? new Date(String(row.created_at)).toISOString() : undefined, deliveredAt: row.delivered_at ? new Date(String(row.delivered_at)).toISOString() : undefined } }
export async function getOrder(paymentId: string) { await ready(); const result = await pool.query('SELECT * FROM orders WHERE payment_id = $1', [paymentId]); return result.rows[0] ? rowToOrder(result.rows[0]) : undefined }
export async function upsertPaidOrder(order: Omit<Order, 'createdAt'>) { await ready(); const result = await pool.query(`INSERT INTO orders (payment_id, product_id, amount, currency, email, phone, status, delivery_url, download_token, download_expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (payment_id) DO UPDATE SET email=COALESCE(orders.email, EXCLUDED.email), phone=COALESCE(orders.phone, EXCLUDED.phone), delivery_url=COALESCE(orders.delivery_url, EXCLUDED.delivery_url), download_token=COALESCE(orders.download_token, EXCLUDED.download_token), download_expires_at=COALESCE(orders.download_expires_at, EXCLUDED.download_expires_at) RETURNING *`, [order.paymentId, order.productId, order.amount, order.currency, order.email ?? null, order.phone ?? null, order.status, order.deliveryUrl ?? null, order.downloadToken ?? null, order.downloadExpiresAt ?? null]); return rowToOrder(result.rows[0]) }
export async function markDelivered(paymentId: string, details: Pick<Order, 'downloadToken' | 'downloadExpiresAt'> & { deliveryUrl?: string }) { await ready(); const result = await pool.query('UPDATE orders SET status=$2, delivery_url=COALESCE($3, delivery_url), download_token=COALESCE($4, download_token), download_expires_at=COALESCE($5, download_expires_at), delivered_at=NOW() WHERE payment_id=$1 RETURNING *', [paymentId, 'delivered', details.deliveryUrl ?? null, details.downloadToken ?? null, details.downloadExpiresAt ?? null]); return result.rows[0] ? rowToOrder(result.rows[0]) : undefined }
