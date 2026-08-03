export const PRODUCTS = {
  pro: {
    key: 'pro',
    id: 'ai-builder-pack-pro',
    title: 'AI Builder Pack Pro',
    amount: 99,
    currency: 'PEN',
    fileName: 'AI-Builder-Pack-Pro-v1.zip',
    railwayPath: '/app/persistent/packs/ai-builder-pack-pro/AI-Builder-Pack-Pro-v1.zip',
  },
  complete: {
    key: 'complete',
    id: 'ai-builder-pack-complete',
    title: 'AI Builder Pack Completo',
    amount: 150,
    currency: 'PEN',
    fileName: 'AI-Builder-Pack-Complete-v1.zip',
    railwayPath: '/app/persistent/packs/ai-builder-pack-complete/AI-Builder-Pack-Complete-v1.zip',
  },
} as const

export type ProductKey = keyof typeof PRODUCTS
export type Product = (typeof PRODUCTS)[ProductKey]

export function getProduct(value: unknown): Product | undefined {
  return PRODUCTS[String(value) as ProductKey]
}
