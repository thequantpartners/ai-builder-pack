import { getProduct } from './catalog.ts'
import { verifyDownloadToken, getPackStream } from './delivery.ts'
import { getOrder } from './order-store.ts'

type RequestLike = { method?: string; query?: Record<string, string | string[] | undefined> }
type ResponseLike = { status: (code: number) => ResponseLike; setHeader: (name: string, value: string) => void; send: (body: unknown) => void; end: () => void }

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed')
  const token = String(req.query?.token ?? ''); const secret = process.env.DOWNLOAD_SIGNING_SECRET
  if (!token || !secret) return res.status(404).send('Download unavailable')
  const product = getProduct(req.query?.product); if (!product) return res.status(404).send('Download unavailable')
  const verified = verifyDownloadToken(token, product, secret); if (!verified) return res.status(403).send('Link expired or invalid')
  const order = await getOrder(verified.paymentId)
  if (!order || order.status === 'delivery_pending') return res.status(403).send('Payment not confirmed')
  try {
    const { stream, size } = await getPackStream(product)
    res.setHeader('Content-Type', 'application/zip'); res.setHeader('Content-Length', String(size)); res.setHeader('Content-Disposition', `attachment; filename="${product.fileName}"`)
    stream.on('error', () => res.end()); stream.pipe(res as never)
  } catch { return res.status(404).send('File unavailable') }
}
