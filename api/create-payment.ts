import { getProduct } from './catalog.js'
import { getOrder, upsertPaidOrder } from './order-store.js'

type RequestLike = { method?: string; body?: unknown }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) return res.status(503).json({ error: 'Payment service is not configured' })
  const body = (req.body ?? {}) as Record<string, unknown>
  const product = getProduct(body.productId)
  const paymentData = (body.paymentData ?? {}) as Record<string, unknown>
  if (!product || Number(body.transactionAmount) !== product.amount) return res.status(400).json({ error: 'Invalid product or amount' })

  const idempotencyKey = String(body.idempotencyKey ?? crypto.randomUUID())
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Idempotency-Key': idempotencyKey },
    body: JSON.stringify({ ...paymentData, transaction_amount: product.amount, description: product.title, external_reference: product.id, notification_url: `${process.env.APP_BASE_URL ?? ''}/api/mercadopago-webhook` }),
  })
  const data = await response.json() as Record<string, unknown>
  if (!response.ok) return res.status(response.status).json({ error: data.message ?? 'Payment request failed' })
  const paymentId = String(data.id ?? '')
  if (data.status === 'approved' && paymentId) {
    const email = String((paymentData.payer as Record<string, unknown> | undefined)?.email ?? '') || undefined
    const existing = await getOrder(paymentId)
    if (!existing) await upsertPaidOrder({ paymentId, productId: product.id, amount: product.amount, currency: product.currency, email, status: 'paid' })
  }
  return res.status(response.status).json({ id: data.id, status: data.status, statusDetail: data.status_detail })
}
