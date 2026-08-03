import { promises as fs } from 'node:fs'
import path from 'node:path'

type Order = {
  paymentId: string
  productId: string
  amount: number
  currency: string
  email?: string
  status: 'paid' | 'delivery_pending' | 'delivered'
  deliveryUrl?: string
  downloadToken?: string
  downloadExpiresAt?: string
  createdAt: string
  deliveredAt?: string
}

const storePath = process.env.ORDER_STORE_PATH || '/tmp/ai-builder-pack-orders.json'

async function readOrders(): Promise<Record<string, Order>> {
  try { return JSON.parse(await fs.readFile(storePath, 'utf8')) as Record<string, Order> } catch { return {} }
}

async function writeOrders(orders: Record<string, Order>) {
  await fs.mkdir(path.dirname(storePath), { recursive: true })
  const tempPath = `${storePath}.tmp`
  await fs.writeFile(tempPath, JSON.stringify(orders, null, 2), 'utf8')
  await fs.rename(tempPath, storePath)
}

export async function getOrder(paymentId: string) { return (await readOrders())[paymentId] }

export async function upsertPaidOrder(order: Omit<Order, 'createdAt'>) {
  const orders = await readOrders()
  const existing = orders[order.paymentId]
  if (existing) return existing
  const next = { ...order, createdAt: new Date().toISOString() }
  orders[order.paymentId] = next
  await writeOrders(orders)
  return next
}

export async function markDelivered(paymentId: string, details: Pick<Order, 'downloadToken' | 'downloadExpiresAt' | 'deliveryUrl'>) {
  const orders = await readOrders()
  const existing = orders[paymentId]
  if (!existing) return undefined
  const next = { ...existing, ...details, status: 'delivered' as const, deliveredAt: new Date().toISOString() }
  orders[paymentId] = next
  await writeOrders(orders)
  return next
}
