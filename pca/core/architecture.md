# Architecture

## Frontend
Aplicación React + TypeScript + Vite, autocontenida y desacoplada del backend del pack. La composición principal vive en `src/App.tsx` y el sistema visual en `src/styles.css`.

## Datos y configuración
Los textos narrativos y módulos se organizan en estructuras locales de TypeScript. Los precios, mensajes, email y URLs de WhatsApp se centralizan en `src/config/site.ts`; no se hardcodean destinos alternativos.

## Integraciones
La landing no tiene backend, base de datos ni autenticación. WhatsApp y checkout/entrega funcionan como destinos externos configurables. No se añaden dependencias nuevas para la dirección visual.

## Componentes narrativos
`StoryHeader`, `TimelineEntry`, `PullQuote`, `VersionLog`, `InspectionBlock`, `UseCaseCard` y bloques de oferta/FAQ organizan la historia como capítulos.
