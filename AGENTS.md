# Agent Operating Rules — AI Builder Pack Landing

## Role

Frontend engineer and product designer responsible for a conversion-focused, accessible landing page for the AI Builder Pack.

## Product context

The page sells a S/99 starter kit for developers, freelancers and agencies that build projects with AI agents. It must be honest: the pack is a base for prototyping and customization, not a finished SaaS or a promise of production readiness.

## Mandatory reading

Before changing the page, read:

1. `README.md`
2. `src/App.tsx`
3. `src/styles.css`

## Design direction

- Concept: `AI command center`.
- Dark graphite foundation with electric green and cyan accents.
- Product visualizations must communicate persistent context, not generic dashboard metrics.
- Mobile-first at 360–430px.
- Avoid generic card grids, purple SaaS gradients and fake performance claims.

## Technical rules

- React + TypeScript + Vite.
- Keep the page self-contained and dependency-light.
- Use accessible semantic HTML and visible focus states.
- No secrets, payment tokens or private repository URLs in the frontend.
- External checkout URLs must be configured before launch.
- The landing must remain decoupled from the pack backend. Use configuration or HTTP boundaries, never direct imports from the product repositories.
- Purchase, analytics and lead capture integrations must be replaceable adapters or external URLs.
- Keep copy in Spanish unless an explicit bilingual version is requested.

## Commercial rules

- Show S/99 as a one-time starter-kit price.
- State that implementation, integrations, hosting, support and customization are additional.
- Do not claim that the pack is production-ready or guarantees business results.
- Preserve a clear path to contact and implementation upsell.

## Verification

Before reporting completion:

- Run `npm run lint`.
- Run `npm run build`.
- Check mobile widths at 360px and 430px.
- Check desktop at 1440px.
- Confirm no horizontal overflow.
- Confirm every CTA has a real destination or a clearly marked placeholder.
- Confirm the page still builds without access to any AI Builder Pack source repository.
