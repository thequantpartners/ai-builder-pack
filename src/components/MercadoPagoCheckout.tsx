import { useEffect, useState } from 'react'
import { Payment, initMercadoPago } from '@mercadopago/sdk-react'
import { siteConfig } from '../config/site'

type Product = 'pro' | 'complete'
type CheckoutState = 'loading' | 'ready' | 'processing' | 'success' | 'pending' | 'error'

type PreferenceResponse = { preferenceId?: string; error?: string }
type PaymentResponse = { status?: string; statusDetail?: string; error?: string }

export function MercadoPagoCheckout({ product = 'pro' }: { product?: Product }) {
  const [state, setState] = useState<CheckoutState>('loading')
  const [message, setMessage] = useState('Preparando el checkout seguro…')
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
  if (state === 'success' || state === 'pending') return <div className={`checkout-result ${state}`} role="status"><strong>{state === 'success' ? 'Pago recibido.' : 'Pago pendiente.'}</strong><p>{message}</p></div>
  if (state === 'error') return <p className="checkout-status error" role="alert">{message} <a href={siteConfig.purchaseUrl}>Contactar por WhatsApp</a></p>

  return <div className="mercadopago-checkout" aria-live="polite"><p className="checkout-brick-label">{label} · pago seguro dentro de la página</p><Payment initialization={{ amount }} customization={{ paymentMethods: { creditCard: 'all', debitCard: 'all' } }} locale="es-PE" onError={() => { setState('error'); setMessage('El checkout no pudo cargarse. Puedes continuar por WhatsApp.') }} onSubmit={async ({ formData }) => {
    setState('processing')
    setMessage('Confirmando los datos del pago…')
    try {
      const response = await fetch('/api/create-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product === 'complete' ? 'ai-builder-pack-complete' : 'ai-builder-pack-pro', transactionAmount: amount, paymentData: formData }) })
      const result = await response.json() as PaymentResponse
      if (!response.ok) throw new Error(result.error ?? 'Payment request failed')
      if (result.status === 'approved') { setState('success'); setMessage('La entrega digital se coordinará después de la confirmación del pago.') }
      else if (result.status === 'pending' || result.status === 'in_process') { setState('pending'); setMessage('Mercado Pago aún está procesando la operación.') }
      else { setState('error'); setMessage(result.statusDetail ?? 'El pago no fue aprobado. Revisa los datos e inténtalo nuevamente.') }
    } catch { setState('error'); setMessage('No pudimos procesar el pago. Inténtalo nuevamente o contacta por WhatsApp.') }
  }} />{state === 'processing' && <p className="checkout-status">{message}</p>}</div>
}
