import { createHmac, timingSafeEqual } from 'node:crypto'
import { getProduct } from './catalog.js'
import { createDownloadToken } from './delivery.js'
import { getOrder, markDelivered, upsertPaidOrder } from './order-store.js'

type RequestLike = { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

function header(req: RequestLike, name: string) { const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()]; return Array.isArray(value) ? value[0] : value }

async function requestRailwayDelivery(product: string, paymentId: string) {
  const url = process.env.RAILWAY_DELIVERY_URL?.trim(); const token = process.env.RAILWAY_DELIVERY_TOKEN?.trim()
  if (!url || !token) return undefined
  const response = await fetch(`${url.replace(/\\/$/, '')}/delivery/link`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'X-Delivery-Token': token, 'Content-Type': 'application/json' }, body: JSON.stringify({ product, paymentId }) })
  if (!response.ok) return undefined
  const data = await response.json() as { url?: string }
  return data.url
}
function validSignature(req: RequestLike, paymentId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) return false
  const signature = header(req, 'x-signature'); const requestId = header(req, 'x-request-id')
  const ts = signature?.match(/ts=([^,]+)/)?.[1]; const v1 = signature?.match(/v1=([^,]+)/)?.[1]
  if (!ts || !v1 || !requestId) return false
  const expected = createHmac('sha256', secret).update(`id:${paymentId};request-id:${requestId};ts:${ts};`).digest('hex')
  return expected.length === v1.length && timingSafeEqual(Buffer.from(expected), Buffer.from(v1))
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) return res.status(503).json({ error: 'Webhook is not configured' })
  const body = (req.body ?? {}) as Record<string, unknown>; const data = (body.data ?? {}) as Record<string, unknown>
  const paymentId = String(data.id ?? body.id ?? '')
  if (!paymentId) return res.status(400).json({ error: 'Missing payment id' })
  if (req.method === 'POST' && !validSignature(req, paymentId)) return res.status(401).json({ error: 'Invalid signature' })
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Bearer ${accessToken}` } })
  const payment = await response.json() as Record<string, unknown>
  if (!response.ok) return res.status(response.status).json({ error: 'Could not verify payment' })
  const product = getProduct(payment.external_reference)
  const approved = Boolean(product) && payment.status === 'approved' && Number(payment.transaction_amount) === product.amount && payment.currency_id === product.currency
  if (!approved) return res.status(200).json({ received: true, paymentId, approved: false, status: payment.status })
  const existing = await getOrder(paymentId)
  if (existing?.status === 'delivered') return res.status(200).json({ received: true, paymentId, approved: true, alreadyDelivered: true })
  const email = String((payment.payer as Record<string, unknown> | undefined)?.email ?? '') || undefined
  const secret = process.env.DOWNLOAD_SIGNING_SECRET
  if (!secret) return res.status(503).json({ error: 'Delivery is not configured' })
  const link = existing?.downloadToken ? { token: existing.downloadToken, expiresAt: existing.downloadExpiresAt! } : createDownloadToken(paymentId, product.id, secret)
  const stored = await upsertPaidOrder({ paymentId, productId: product.id, amount: product.amount, currency: product.currency, email, status: 'paid', downloadToken: link.token, downloadExpiresAt: link.expiresAt })
  const deliveryUrl = stored.deliveryUrl ?? await requestRailwayDelivery(product.key, paymentId)
  if (deliveryUrl && !stored.deliveryUrl) await markDelivered(paymentId, { downloadToken: link.token, downloadExpiresAt: link.expiresAt, deliveryUrl })
  return res.status(200).json({ received: true, paymentId, approved: true, downloadReady: Boolean(deliveryUrl) })
}
