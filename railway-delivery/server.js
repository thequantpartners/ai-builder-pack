import crypto from 'node:crypto'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import express from 'express'

const app = express()
const port = Number(process.env.PORT || 3010)
const tokenSecret = process.env.DELIVERY_TOKEN_SECRET
const apiToken = process.env.DELIVERY_API_TOKEN
const base = process.env.RAILWAY_VOLUME_MOUNT_PATH || '/app/persistent'
const publicUrl = process.env.APP_PUBLIC_URL
if (!tokenSecret || !apiToken || !publicUrl) throw new Error('DELIVERY_TOKEN_SECRET, DELIVERY_API_TOKEN and APP_PUBLIC_URL are required')
const products = {
  pro: { filename: 'AI-Builder-Pack-Pro-v1.zip', file: path.join(base, 'packs/ai-builder-pack-pro/AI-Builder-Pack-Pro-v1.zip') },
  complete: { filename: 'AI-Builder-Pack-Complete-v1.zip', file: path.join(base, 'packs/ai-builder-pack-complete/AI-Builder-Pack-Complete-v1.zip') },
}
function sign(value) { return crypto.createHmac('sha256', tokenSecret).update(value).digest('base64url') }
function makeToken(product, paymentId) { const exp = Date.now() + 86400000; const body = `${product}.${paymentId}.${exp}`; return `${Buffer.from(body).toString('base64url')}.${sign(body)}` }
function verifyToken(token, product) { const [encoded, signature] = String(token).split('.'); if (!encoded || !signature) return false; const body = Buffer.from(encoded, 'base64url').toString('utf8'); const expected = sign(body); if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false; const [key, , exp] = body.split('.'); return key === product && Number(exp) > Date.now() }
function authorized(req) { return req.get('x-delivery-token') === apiToken || req.get('authorization') === `Bearer ${apiToken}` }
app.get('/health', (_req, res) => res.json({ ok: true, service: 'ai-builder-pack-delivery' }))
app.post('/delivery/link', express.json(), async (req, res) => { if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' }); const product = products[req.body?.product]; const paymentId = String(req.body?.paymentId || ''); if (!product || !paymentId) return res.status(400).json({ error: 'Invalid delivery request' }); try { await stat(product.file) } catch { return res.status(503).json({ error: 'Pack unavailable' }) }; const token = makeToken(req.body.product, paymentId); return res.json({ url: `${publicUrl}/download/${req.body.product}?token=${encodeURIComponent(token)}`, expiresAt: new Date(Date.now() + 86400000).toISOString() }) })
app.get('/download/:product', async (req, res) => { const product = products[req.params.product]; if (!product || !verifyToken(req.query.token, req.params.product)) return res.status(403).send('Link expired or invalid'); try { const details = await stat(product.file); res.set({ 'Content-Type': 'application/zip', 'Content-Length': String(details.size), 'Content-Disposition': `attachment; filename="${product.filename}"` }); createReadStream(product.file).on('error', () => res.end()).pipe(res) } catch { res.status(404).send('File unavailable') } })
app.listen(port, '0.0.0.0', () => console.log(`Delivery server on ${port}`))
