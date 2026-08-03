import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import type { Product } from './catalog'

export function createDownloadToken(paymentId: string, productId: string, secret: string) {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000
  const nonce = randomBytes(18).toString('hex')
  const payload = `${paymentId}.${productId}.${expiresAt}.${nonce}`
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  return { token: `${Buffer.from(payload).toString('base64url')}.${signature}`, expiresAt: new Date(expiresAt).toISOString() }
}

export function verifyDownloadToken(token: string, product: Product, secret: string) {
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return undefined
  const payload = Buffer.from(encoded, 'base64url').toString('utf8')
  const expected = createHmac('sha256', secret).update(payload).digest('base64url')
  if (expected.length !== signature.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return undefined
  const [paymentId, productId, expiresAt] = payload.split('.')
  if (productId !== product.id || Number(expiresAt) < Date.now()) return undefined
  return { paymentId, expiresAt: new Date(Number(expiresAt)).toISOString() }
}

export async function getPackStream(product: Product) {
  const details = await stat(product.railwayPath)
  return { stream: createReadStream(product.railwayPath), size: details.size }
}
