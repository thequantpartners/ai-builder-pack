import { useEffect, useState } from 'react'
import { Payment, initMercadoPago } from '@mercadopago/sdk-react'
import { siteConfig } from '../config/site'

type Product = 'pro' | 'complete'
type CheckoutState = 'loading' | 'ready' | 'processing' | 'success' | 'pending' | 'error'

type PreferenceResponse = { preferenceId?: string; error?: string }
type PaymentResponse = { id?: string; status?: string; statusDetail?: string; error?: string }

type OrderStatusResponse = { status?: string; downloadUrl?: string; expiresAt?: string }

export function MercadoPagoCheckout({ product = 'pro' }: { product?: Product }) {
  const [state, setState] = useState<CheckoutState>('loading')
  const [message, setMessage] = useState('Preparando el checkout seguro…')
  const [downloadUrl, setDownloadUrl] = useState<string>()
  const [whatsapp, setWhatsapp] = useState('')
  const amount = product === 'complete' ? 150 : 99
  const label = product === 'complete' ? 'Lo quiero todo por S/150' : 'Lo quiero por S/99'
  const publicKey = siteConfig.mercadoPagoPublicKey

  useEffect(() => {
    if (!publicKey) {
      setState('error')
      setMessage('El pago integrado aún no está configurado.')
      return
    }
    initMercadoPago(publicKey, { locale: 'es-PE' })
    fetch(`/api/create-preference?product=${product}`)
      .then(async (response) => {
        const data = await response.json() as PreferenceResponse
        if (!response.ok || !data.preferenceId) throw new Error(data.error ?? 'No se pudo preparar el checkout')
        setState('ready')
        setMessage('')
        return data
      })
      .catch(() => {
        setState('error')
        setMessage('No pudimos cargar el pago integrado. Inténtalo nuevamente o escríbenos por WhatsApp.')
      })
  }, [product, publicKey])

  if (state === 'loading') return <p className="checkout-status">{message}</p>
  if (state === 'success') return <div className="checkout-result success" role="status"><strong>Pago aprobado.</strong><p>{message}</p>{downloadUrl && <a className="button button-primary full" href={downloadUrl}>Descargar mi pack</a>}</div>
  if (state === 'pending') return <div className="checkout-result pending" role="status"><strong>Pago pendiente.</strong><p>{message}</p></div>
  if (state === 'error') return <p className="checkout-status error" role="alert">{message} <a href={siteConfig.purchaseUrl}>Contactar por WhatsApp</a></p>

  return <div className="mercadopago-checkout" aria-live="polite"><p className="checkout-brick-label">{label} · pago seguro dentro de la página</p><label className="checkout-field">WhatsApp para recibir el ZIP<input type="tel" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} placeholder="519XXXXXXXX" required /></label><Payment initialization={{ amount }} customization={{ paymentMethods: { creditCard: 'all', debitCard: 'all' } }} locale="es-PE" onError={() => { setState('error'); setMessage('El checkout no pudo cargarse. Puedes continuar por WhatsApp.') }} onSubmit={async ({ formData }) => {
    setState('processing')
    setMessage('Confirmando los datos del pago…')
    try {
      const response = await fetch('/api/create-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product === 'complete' ? 'ai-builder-pack-complete' : 'ai-builder-pack-pro', transactionAmount: amount, paymentData: { ...formData, payer: { ...(formData.payer ?? {}), phone: { number: whatsapp.replace(/\D/g, '') } } } }) })
      const result = await response.json() as PaymentResponse
      if (!response.ok) throw new Error(result.error ?? 'Payment request failed')
      if (result.status === 'approved' && result.id) {
        setMessage('Pago aprobado. Generando tu enlace privado de descarga…')
        const poll = async (attempt = 0): Promise<void> => {
          const statusResponse = await fetch(`/api/order-status?paymentId=${encodeURIComponent(result.id!)}`)
          const order = await statusResponse.json() as OrderStatusResponse
          if (order.downloadUrl) { setDownloadUrl(order.downloadUrl); setState('success'); setMessage('Tu enlace privado está listo y también será enviado por los canales configurados.'); return }
          if (attempt < 8) { await new Promise((resolve) => setTimeout(resolve, 1500)); return poll(attempt + 1) }
          setState('success'); setMessage('El pago fue aprobado. El enlace privado se generará en unos segundos; revisa tu email y WhatsApp.')
        }
        await poll()
      }
      else if (result.status === 'pending' || result.status === 'in_process') { setState('pending'); setMessage('Mercado Pago aún está procesando la operación.') }
      else { setState('error'); setMessage(result.statusDetail ?? 'El pago no fue aprobado. Revisa los datos e inténtalo nuevamente.') }
    } catch { setState('error'); setMessage('No pudimos procesar el pago. Inténtalo nuevamente o contacta por WhatsApp.') }
  }} />{state === 'processing' && <p className="checkout-status">{message}</p>}</div>
}
