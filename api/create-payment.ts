type RequestLike = { method?: string; body?: unknown }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

const PRODUCT = { id: 'ai-builder-pack-pro', title: 'AI Builder Pack Pro', amount: 99, currency: 'PEN' } as const

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) return res.status(503).json({ error: 'Payment service is not configured' })

  const body = (req.body ?? {}) as Record<string, unknown>
  const paymentData = (body.paymentData ?? {}) as Record<string, unknown>
  if (body.productId !== PRODUCT.id || Number(body.transactionAmount) !== PRODUCT.amount) {
    return res.status(400).json({ error: 'Invalid product or amount' })
  }

  const idempotencyKey = String(body.idempotencyKey ?? crypto.randomUUID())
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Idempotency-Key': idempotencyKey },
    body: JSON.stringify({
      ...paymentData,
      transaction_amount: PRODUCT.amount,
      description: PRODUCT.title,
      external_reference: PRODUCT.id,
      notification_url: `${process.env.APP_BASE_URL ?? ''}/api/mercadopago-webhook`,
    }),
  })
  const data = await response.json() as Record<string, unknown>
  return res.status(response.status).json({ id: data.id, status: data.status, statusDetail: data.status_detail })
}
