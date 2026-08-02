# AI Builder Pack Landing

Landing page comercial del AI Builder Pack.

## Stack

- React
- TypeScript
- Vite
- Lucide React
- CSS propio con tokens de diseño

## Desarrollo

```bash
npm install
npm run dev
```

La landing es estática y no necesita backend, base de datos ni autenticación. Para conectar el checkout, crea un `.env` local basado en `outputs/AI-Builder-Pack-Landing-config.example` o define las variables en el proveedor de hosting.

```env
VITE_CHECKOUT_URL=https://tu-checkout.example/ai-builder-pack
VITE_SUPPORT_EMAIL=hola@tudominio.com
```

## Verificación

```bash
npm run lint
npm run build
```

## Oferta comunicada

Starter kit beta para desarrolladores, freelancers y agencias técnicas. Precio de entrada: S/99 pago único. Implementación, despliegue, integraciones y personalización se cotizan aparte.

## Pendientes antes de publicar

- Reemplazar el CTA de email por un checkout real.
- Añadir capturas reales del pack cuando estén disponibles.
- Añadir política de privacidad y términos de compra.
- Confirmar licencia comercial definitiva.
- Verificar el flujo de entrega digital.

## Desacoplamiento

- El contenido visual se sirve como frontend independiente.
- El checkout se conecta mediante una URL configurable.
- El email de respaldo también es configurable.
- No hay llamadas al backend del pack ni dependencias de sus repositorios.
- Puede desplegarse en Vercel, Netlify, Cloudflare Pages o cualquier hosting estático.
