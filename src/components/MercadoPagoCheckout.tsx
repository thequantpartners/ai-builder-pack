import { useState } from 'react'
import { siteConfig } from '../config/site'

export function MercadoPagoCheckout({ product = 'pro' }: { product?: 'pro' | 'complete' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const amount = product === 'complete' ? 150 : 99
  const label = product === 'complete' ? 'Lo quiero todo por S/150' : 'Lo quiero por S/99'

  const openCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/create-preference?product=${product}`)
      const data = await response.json() as { checkoutUrl?: string; error?: string }
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error ?? 'No se pudo preparar el checkout')
      window.location.href = data.checkoutUrl
    } catch {
      setError('No pudimos abrir Mercado Pago. Verifica que el checkout esté desplegado y configurado.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="checkout-action"><button className="button button-primary full checkout-open-button" type="button" onClick={openCheckout} disabled={loading} aria-busy={loading}>
    {loading ? 'Preparando checkout…' : label}
  </button>{error && <p className="checkout-status error" role="alert">{error} <a href={siteConfig.purchaseUrl}>Contactar por WhatsApp</a></p>}</div>
}
