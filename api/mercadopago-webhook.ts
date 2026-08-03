import { createHmac, timingSafeEqual } from 'node:crypto'

type RequestLike = { method?: string; body?: unknown; headers?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

const PRODUCT = { id: 'ai-builder-pack-pro', amount: 99, currency: 'PEN' } as const

function header(req: RequestLike, name: string) {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()]
  return Array.isArray(value) ? value[0] : value
}

function validSignature(req: RequestLike, paymentId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) return false
  const signature = header(req, 'x-signature')
  const requestId = header(req, 'x-request-id')
  if (!signature || !requestId) return false
  const ts = signature.match(/ts=([^,]+)/)?.[1]
  const v1 = signature.match(/v1=([^,]+)/)?.[1]
  if (!ts || !v1) return false
  const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`
  const expected = createHmac('sha256', secret).update(manifest).digest('hex')
  return expected.length === v1.length && timingSafeEqual(Buffer.from(expected), Buffer.from(v1))
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) return res.status(503).json({ error: 'Webhook is not configured' })
  const body = (req.body ?? {}) as Record<string, unknown>
  const data = (body.data ?? {}) as Record<string, unknown>
  const paymentId = String(data.id ?? body.id ?? '')
  if (!paymentId) return res.status(400).json({ error: 'Missing payment id' })
  if (req.method === 'POST' && !validSignature(req, paymentId)) return res.status(401).json({ error: 'Invalid signature' })

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Bearer ${accessToken}` } })
  const payment = await response.json() as Record<string, unknown>
  const approved = payment.status === 'approved' && payment.external_reference === PRODUCT.id && Number(payment.transaction_amount) === PRODUCT.amount && payment.currency_id === PRODUCT.currency

  // TODO: persistir de forma idempotente y activar la entrega privada cuando storage esté configurado.
  return res.status(response.ok ? 200 : response.status).json({ received: true, paymentId, approved, status: payment.status })
}
