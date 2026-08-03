const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'partners@thequantpartners.com'
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || '51924464410'
const messages = {
  base: 'Hola, me interesa el AI Builder Pack Pro por S/99. Quiero conocer si encaja con mi proyecto.',
  complete: 'Hola, me interesa el Pack completo por S/150: AI Builder Pack Pro + Lead Conversion Stack. Quiero conocer si encaja con mi proyecto.',
}
const supportMessage = encodeURIComponent('Hola, ya pagué el AI Builder Pack y todavía no recibí el archivo. ¿Me pueden ayudar?')
const mercadoPagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY?.trim() || ''
const whatsappUrl = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const siteConfig = {
  brand: 'AI BUILDER / PACK',
  price: '99',
  currency: 'S/',
  purchaseLabel: 'Hablar con el asistente por WhatsApp',
  purchaseUrl: whatsappUrl(messages.base),
  completePrice: '150',
  completeLabel: 'Explorar pack completo por WhatsApp',
  completeUrl: whatsappUrl(messages.complete),
  supportUrl: `https://wa.me/${whatsappNumber}?text=${supportMessage}`,
  supportEmail,
  whatsappNumber,
  mercadoPagoPublicKey,
} as const
