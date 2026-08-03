import { getProduct } from './catalog.ts'
import { getOrder } from './order-store.ts'

type RequestLike = { method?: string; query?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void }

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const paymentId = String(req.query?.paymentId ?? '')
  if (!paymentId || paymentId.length > 80) return res.status(400).json({ error: 'Missing payment id' })
  const order = await getOrder(paymentId)
  if (!order) return res.status(202).json({ status: 'pending' })
  const product = getProduct(order.productId)
  if (!product || (order.status !== 'paid' && order.status !== 'delivered') || !order.downloadToken || !order.downloadExpiresAt) {
    return res.status(202).json({ status: order.status })
  }
  const baseUrl = process.env.APP_BASE_URL ?? ''
  const downloadUrl = order.deliveryUrl || `${baseUrl}/api/download?product=${encodeURIComponent(product.key)}&token=${encodeURIComponent(order.downloadToken)}`
  return res.status(200).json({ status: 'approved', downloadUrl, expiresAt: order.downloadExpiresAt })
}
