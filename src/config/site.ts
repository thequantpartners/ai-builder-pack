const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL?.trim()
const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'hola@quantpartners.pro'
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || '51924464410'
const whatsappMessage = encodeURIComponent('Hola, quiero recibir información del AI Builder Pack de S/99')

export const siteConfig = {
  brand: 'AI BUILDER / PACK',
  price: '99',
  currency: 'S/',
  purchaseLabel: 'Obtener el pack',
  purchaseUrl: checkoutUrl || `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
  supportEmail,
  whatsappNumber,
} as const
