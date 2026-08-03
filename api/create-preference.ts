type RequestLike = { method?: string; query?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

const products = {
  pro: { id: 'ai-builder-pack-pro', title: 'AI Builder Pack Pro', amount: 99 },
  complete: { id: 'ai-builder-pack-complete', title: 'AI Builder Pack Completo', amount: 150 },
} as const

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!token) return res.status(503).json({ error: 'Payment service is not configured' })
  const productKey = String(req.query?.product ?? 'pro') as keyof typeof products
  const product = products[productKey]
  if (!product) return res.status(400).json({ error: 'Invalid product' })

  const baseUrl = process.env.APP_BASE_URL ?? 'http://localhost:5173'
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: product.id, title: product.title, quantity: 1, currency_id: 'PEN', unit_price: product.amount }],
      external_reference: product.id,
      notification_url: `${baseUrl}/api/mercadopago-webhook`,
      back_urls: { success: `${baseUrl}/?payment=success`, pending: `${baseUrl}/?payment=pending`, failure: `${baseUrl}/?payment=failure` },
      auto_return: 'approved',
    }),
  })
  const data = await response.json() as Record<string, unknown>
  return res.status(response.status).json({ checkoutUrl: data.init_point, preferenceId: data.id })
}
