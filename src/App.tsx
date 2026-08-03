import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  FileCode2,
  FolderOpen,
  MessageCircle,
  Network,
  PackageOpen,
  RotateCcw,
  Wrench,
} from 'lucide-react'
import { siteConfig } from './config/site'

type StoryItem = { icon: React.ReactNode; title: string; situation: string; action: string; outcome: string }
type Chapter = { number: string; title: string; text: string; output: string; limit: string }
type Module = { name: string; detail: string; status: string; tone: 'included' | 'beta' | 'extra' }

const useCases: StoryItem[] = [
  { icon: <RotateCcw size={19} />, title: 'Retomas un proyecto después de días', situation: 'Vuelves a un proyecto y ya no recuerdas qué se decidió.', action: 'Guardas ideas, instrucciones y decisiones en una base reutilizable.', outcome: 'Retomas desde el contexto real, no desde una conversación perdida.' },
  { icon: <FolderOpen size={19} />, title: 'Un cliente pregunta por el avance', situation: 'La información está repartida entre chats, notas y archivos.', action: 'Consultas lo importante desde un solo lugar.', outcome: 'Explicas dónde está el proyecto y qué falta sin reconstruirlo todo.' },
  { icon: <Network size={19} />, title: 'Necesitas explicar una solución', situation: 'La idea se entiende en tu cabeza, pero no en una llamada.', action: 'Creas un mapa visual de sus partes y conexiones.', outcome: 'La conversación parte de un esquema común. Este módulo se entrega en beta.' },
  { icon: <Wrench size={19} />, title: 'Quieres reutilizar la base', situation: 'Cada proyecto nuevo vuelve a empezar con la misma estructura.', action: 'Sigues las guías y adaptas el material a tu forma de trabajar.', outcome: 'Conviertes el pack en un punto de partida propio.' },
]

const chapters: Chapter[] = [
  { number: '01', title: 'Conservar', text: 'Capturas el contexto que normalmente se pierde: decisiones, ideas, instrucciones y próximos pasos.', output: 'Un registro reutilizable del proyecto.', limit: 'No decide qué debe conservarse por ti.' },
  { number: '02', title: 'Consultar', text: 'Encuentras la información de un proyecto sin depender de mensajes sueltos o memoria.', output: 'Una vista para volver al hilo del trabajo.', limit: 'La información depende de lo que hayas registrado.' },
  { number: '03', title: 'Representar', text: 'Usas el módulo de mapas visuales —en beta— para ordenar una solución y hablar de ella.', output: 'Un esquema para explicar partes y conexiones.', limit: 'El módulo está en beta y debe validarse en tu caso.' },
  { number: '04', title: 'Adaptar', text: 'Lees las guías, revisas los ejemplos y ajustas la base a tus proyectos o clientes.', output: 'Un punto de partida con tu propia lógica.', limit: 'La instalación y los cambios a medida son adicionales.' },
]

const modules: Module[] = [
  { name: 'Herramienta principal', detail: 'Conservar decisiones, ideas, instrucciones y avance.', status: 'Incluido', tone: 'included' },
  { name: 'Pantalla de consulta', detail: 'Revisar el contexto de tus proyectos desde un lugar único.', status: 'Incluido', tone: 'included' },
  { name: 'Mapas visuales', detail: 'Representar sistemas, partes y conexiones para probar.', status: 'Beta', tone: 'beta' },
  { name: 'Implementación', detail: 'Instalación, despliegue, integraciones o personalización.', status: 'Se cotiza aparte', tone: 'extra' },
]

function StoryHeader({ kicker, title, accent, children }: { kicker: string; title: string; accent: string; children?: React.ReactNode }) {
  return <div className="section-copy"><span className="kicker">{kicker}</span><h2>{title}<br /><i>{accent}</i></h2>{children}</div>
}

function TimelineEntry({ chapter }: { chapter: Chapter }) {
  return <article className="chapter"><strong>{chapter.number}</strong><div><h3>{chapter.title}</h3><p>{chapter.text}</p><div className="chapter-meta"><span><b>Qué queda</b>{chapter.output}</span><span><b>Límite</b>{chapter.limit}</span></div></div></article>
}

function PullQuote({ children, tone = 'yellow' }: { children: React.ReactNode; tone?: 'yellow' | 'pink' }) {
  return <p className={`pull-quote ${tone}`}>{children}</p>
}

function VersionLog() {
  return <div className="version-log"><div className="version-log-head"><span>REGISTRO / V0.1</span><strong>REVISIÓN ACTUAL</strong></div><div className="version-log-entry"><span className="log-date">HOY</span><div><h3>Base inicial para prototipar y adaptar</h3><p>Incluye las herramientas de contexto, la pantalla de consulta, mapas visuales en beta y documentación de inicio.</p></div></div><div className="version-log-entry muted"><span className="log-date">SIGUIENTE</span><div><h3>Lo que puede cambiar</h3><p>Los módulos pueden evolucionar según validación y mantenimiento. Esta página no promete actualizaciones gratuitas indefinidas.</p></div></div></div>
}

function InspectionBlock() {
  return <div className="inspection-block"><div className="inspection-top"><span>ANTES DE DECIDIR</span><strong>ALCANCE INSPECCIONABLE</strong></div><div className="zip-tree"><span>AI-BUILDER-PACK.zip</span><span>├─ herramienta-contexto/</span><span>├─ consulta-proyecto/</span><span>├─ mapas-visuales-beta/</span><span>└─ guias-y-ejemplos/</span></div><div className="inspection-note"><strong>No me creas: revisa el alcance.</strong> Recibes una base descargable. No recibes hosting, credenciales, despliegue ni una aplicación terminada.</div></div>
}

function UseCaseCard({ item, index }: { item: StoryItem; index: number }) {
  return <article className="case-card"><div className="case-card-top"><span>CASO 0{index + 1}</span><span className="content-icon">{item.icon}</span></div><h3>{item.title}</h3><p className="case-situation"><b>Situación</b>{item.situation}</p><p><b>Qué haces</b>{item.action}</p><p className="case-outcome"><b>Qué cambia</b>{item.outcome}</p></article>
}

function ProofBlock() {
  return <div className="version-panel"><div className="version-head"><span>AI BUILDER PACK / V0.1</span><strong>LISTA PARA ADAPTAR</strong></div><div className="version-lines"><div><FileCode2 size={18} /><span><b>Herramienta principal</b> para conservar el avance</span><em>incluida</em></div><div><BookOpen size={18} /><span><b>Guías y ejemplos</b> para instalar y adaptar</span><em>incluidos</em></div><div><Network size={18} /><span><b>Mapas visuales</b> para probar y extender</span><em>beta</em></div></div><div className="version-note"><strong>Qué no estás comprando:</strong> hosting, cuentas de IA, despliegue, integraciones, personalización ni soporte ilimitado. La implementación se cotiza aparte.</div></div>
}

function App() {
  return (
    <main id="top">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Builder Pack inicio"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></a>
        <div className="nav-links"><a href="#historia">La historia</a><a href="#metodo">El método</a><a href="#inspeccionar">Qué inspeccionas</a><a href="#preguntas">Preguntas</a></div>
        <a className="nav-cta" href="#comprar">Ver opciones <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="sticker">BASE DESCARGABLE · V0.1 <span>✦</span></div>
          <p className="category-line">PARA PROTOTIPAR Y ADAPTAR · NO ES UN SAAS TERMINADO</p><h1>Que tu proyecto<br /><i>no empiece de cero.</i></h1>
          <p className="hero-lede">Retomas un proyecto después de semanas. Abres tus chats, tus notas y tus archivos. <strong className="story-highlight">La idea estaba ahí, pero el contexto se fue.</strong> AI Builder Pack es una base descargable para conservarlo, consultarlo y explicar lo que estás construyendo.</p>
          <div className="hero-actions"><a className="button button-primary" href="#comprar">Ver la base por S/99 <ArrowUpRight size={17} /></a><a className="text-link" href="#historia">Entender el método <ChevronRight size={16} /></a></div>
          <div className="hero-proof"><span><Check size={14} /> Pago único</span><span><Check size={14} /> Entrega digital</span><span><Check size={14} /> Base para adaptar</span></div>
        </div>
        <div className="hero-visual" aria-label="Vista conceptual del contenido del AI Builder Pack">
          <div className="sunburst" /><div className="context-stack"><div className="stack-label">PROYECTO / CONTEXTO <strong>BASE 01</strong></div><div className="stack-file file-back"><span>03 / PRÓXIMOS PASOS</span><b>qué sigue</b></div><div className="stack-file file-middle"><span>02 / DECISIONES</span><b>por qué lo hicimos</b></div><div className="stack-file file-front"><span>01 / IDEA CENTRAL</span><strong>lo que ya sabes</strong><p>Un lugar para volver<br />sin reconstruir.</p><em>guardado · ordenado · visible</em></div></div>
          <div className="burst-label label-one">ABRE · CONSULTA · AVANZA</div><div className="burst-label label-two">NO ES HUMO. ES UNA BASE.</div>
        </div>
      </section>

      <div className="marquee"><div className="marquee-inner"><span>UNA BASE DESCARGABLE</span><b>✦</b><span>PARA TUS PROYECTOS</span><b>✦</b><span>S/99 PAGO ÚNICO</span><b>✦</b><span>ENTREGA DIGITAL</span><b>✦</b></div></div>

      <section className="problem-section shell" id="historia"><div className="problem-intro"><span className="kicker">ENTRADA 01 / EL PROBLEMA</span><h2>El contexto<br /><i>se dispersa.</i></h2><p>Al principio recuerdas todo. Luego llegan más conversaciones, cambios, archivos y decisiones. Cuando vuelves al proyecto, no te falta capacidad: te falta un lugar donde el proyecto pueda continuar.</p></div><div className="problem-list"><div><span>01</span><p>La decisión importante quedó enterrada en un chat.</p></div><div><span>02</span><p>Para retomar, vuelves a explicar lo mismo.</p></div><div><span>03</span><p>Cada proyecto nuevo hereda la misma fricción.</p></div></div></section>

      <section className="turning-point shell"><div className="turning-mark"><MessageCircle size={28} /></div><div><span className="kicker">ENTRADA 02 / EL CAMBIO</span><h2>La solución no es<br /><i>otro chat.</i></h2><p>Es separar el contexto del lugar donde ocurrió la conversación. Una base reutilizable no decide por ti ni automatiza mágicamente tu trabajo: <strong className="story-highlight">te ayuda a conservar lo que ya construiste</strong> para volver a ello, revisarlo y adaptarlo.</p><a className="text-link" href="#metodo">Ver cómo se usa <ChevronRight size={16} /></a></div></section>

      <section className="section shell split" id="metodo"><StoryHeader kicker="ENTRADA 03 / EL MÉTODO" title="Una base para" accent="seguir avanzando."><p>El pack ordena el recorrido en cuatro movimientos. <strong className="story-highlight">No compras una promesa: recibes una base</strong>, archivos, herramientas y guías para construir tu propia forma de trabajo.</p></StoryHeader><div className="chapter-list">{chapters.map((chapter) => <TimelineEntry chapter={chapter} key={chapter.number} />)}</div></section>

      <section className="use-case-section"><div className="shell"><div className="case-heading"><span className="kicker">ENTRADA 04 / EN LA PRÁCTICA</span><h2>El problema cambia<br /><i>según tu proyecto.</i></h2><p>La base es la misma. El uso depende de cómo trabajas.</p></div><PullQuote tone="pink">No necesitas otra bandeja de entrada. Necesitas volver a encontrar el hilo.</PullQuote><div className="case-grid">{useCases.map((item, index) => <UseCaseCard item={item} index={index} key={item.title} />)}</div></div></section>

      <section className="version-section shell"><StoryHeader kicker="ENTRADA 05 / REGISTRO DE LA BASE" title="Esto es lo que" accent="existe hoy."><p>La transparencia también forma parte del producto. Puedes distinguir lo incluido de lo que requiere trabajo adicional.</p></StoryHeader><VersionLog /></section>

      <section className="inspection-section shell" id="inspeccionar"><StoryHeader kicker="ENTRADA 06 / ANTES DE COMPRAR" title="Mira lo que hay" accent="dentro."><p>No hay testimonios inventados ni capturas presentadas como producto real. Hay un alcance claro para inspeccionar.</p></StoryHeader><InspectionBlock /><div className="module-list">{modules.map((module) => <div className="module-row" key={module.name}><span className={`proof-badge ${module.tone}`}>{module.status}</span><div><h3>{module.name}</h3><p>{module.detail}</p></div><ChevronRight size={18} /></div>)}</div></section>

      <section className="truth shell"><StoryHeader kicker="ENTRADA 07 / MITOS Y LÍMITES" title="Una base real." accent="No una app terminada."><p>La diferencia importa porque define qué puedes esperar al pagar.</p></StoryHeader><div className="truth-grid"><div className="truth-box yes"><span>✓</span><h3>Sí es</h3><p>Un ZIP descargable con herramientas, documentación y ejemplos para conservar el avance, ordenar proyectos y explicar visualmente tus ideas.</p></div><div className="truth-box no"><span>×</span><h3>No es</h3><p>Un SaaS listo para abrir, una cuenta de IA, un servicio de hosting ni una garantía de que tu proyecto funcionará sin configuración.</p></div></div></section>

      <section className="buy-section shell" id="comprar"><div className="buy-panel"><div className="buy-copy"><span className="kicker">ENTRADA 08 / HOJA DE PEDIDO</span><h2>Elige tu punto<br /><i>de partida.</i></h2><p>Si quieres una base para adaptar, puedes iniciar la conversación por WhatsApp. Si necesitas que alguien la instale o la conecte, también podemos revisar ese alcance aparte.</p><div className="decision-list"><span><Check size={15} /> Quiero la base para adaptarla</span><span><Wrench size={15} /> Necesito implementación a medida</span></div></div><div className="offer-grid"><article className="price-card"><div className="price-top"><span>PACK PRO</span><span>BASE</span></div><div className="price"><small>S/</small>99</div><p>AI Builder Pack Pro · pago único</p><ul className="offer-points"><li>Herramienta para conservar contexto</li><li>Pantalla de consulta + mapas beta</li><li>Manuales y documentación</li><li>Base para prototipar y adaptar</li></ul><a className="button button-primary full" href={siteConfig.purchaseUrl}>{siteConfig.purchaseLabel} <ArrowUpRight size={17} /></a><small className="secure-note">Confirmas el alcance antes de pagar</small></article><article className="price-card complete-card"><div className="price-top"><span>PACK COMPLETO</span><span>AMPLIADO</span></div><div className="price"><small>S/</small>150</div><p>Pack Pro + Lead Conversion Stack</p><ul className="offer-points"><li>Todo el AI Builder Pack Pro</li><li>Widget de leads + setter virtual</li><li>Para explorar implementaciones comerciales</li><li>Alcance operativo confirmado por WhatsApp</li></ul><a className="button button-secondary full" href={siteConfig.completeUrl}>{siteConfig.completeLabel} <ArrowUpRight size={17} /></a><small className="secure-note">Pago único · entrega digital</small></article><p className="buy-disclaimer"><strong>Importante:</strong> ambos son bases para prototipar y adaptar. Hosting, credenciales, despliegue, integraciones, soporte ilimitado y resultados garantizados no están incluidos.</p></div></div></section>

      <section className="closing-note shell"><PullQuote>Comprar no significa comprar una promesa. Significa dejar de reconstruir la base desde cero.</PullQuote><a className="text-link" href="#comprar">Ver las opciones <ChevronRight size={16} /></a></section>

      <section className="faq-section shell" id="preguntas"><StoryHeader kicker="ENTRADA 09 / PREGUNTAS QUE APARECEN ANTES DE PAGAR" title="Aclara el" accent="siguiente paso."><p>Si tu duda no está aquí, <a className="faq-support-link" href={siteConfig.purchaseUrl}>escríbenos al +{siteConfig.whatsappNumber.slice(0, 2)} {siteConfig.whatsappNumber.slice(2, 5)} {siteConfig.whatsappNumber.slice(5, 8)} {siteConfig.whatsappNumber.slice(8)}</a> antes de comprar.</p></StoryHeader><div className="faq-list"><details open><summary>¿Qué recibo exactamente por S/99?</summary><p>Un ZIP con una herramienta para guardar el avance de tus proyectos, otra para consultar y ordenar esa información, un módulo para crear mapas visuales —en beta— y guías para empezar.</p></details><details><summary>¿Me lo entregan terminado?</summary><p>No. Recibes una base para adaptar. La instalación, los cambios a tu medida, las conexiones con otras herramientas y la puesta en línea se cotizan aparte.</p></details><details><summary>¿La herramienta de mapas visuales está terminada?</summary><p>Se entrega como módulo avanzado en beta. Es para probar y adaptar; recomendamos validarla en tu caso antes de usarla en producción.</p></details><details><summary>¿Necesito una cuenta de IA?</summary><p>Solo si quieres activar funciones conectadas con un servicio de IA. Esa cuenta y sus pagos son tuyos; no están incluidos.</p></details><details><summary>¿Cómo recibo el archivo?</summary><p>Después de la confirmación del pago, el asistente virtual coordina la entrega digital por WhatsApp.</p></details><details><summary>Ya pagué y no recibí nada</summary><p>Escríbenos a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> para revisar el pago y la entrega.</p></details></div></section>

      <section className="legal-section shell" id="legal"><StoryHeader kicker="INFORMACIÓN IMPORTANTE" title="Compra con" accent="claridad."><p>Estas condiciones explican qué recibes, cómo usamos los datos y cuáles son los límites del pack.</p></StoryHeader><div className="legal-list"><details id="privacidad"><summary>Política de privacidad</summary><p>Usamos los datos que nos compartas para confirmar la compra, entregar el ZIP y atender consultas. No almacenamos los datos completos de tu tarjeta; el pago se procesa mediante Mercado Pago. Puedes solicitar acceso, rectificación, cancelación u oposición escribiendo a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p></details><details id="terminos"><summary>Términos de compra</summary><p>El precio mostrado es S/99 por un pago único. El producto es un ZIP descargable con herramientas, documentación y ejemplos para adaptar. No es una aplicación terminada ni incluye hosting, cuentas de IA, personalización, despliegue o soporte ilimitado.</p></details><details id="entrega"><summary>Entrega, incidencias y reembolsos</summary><p>Después de la confirmación del pago, el asistente virtual coordina la entrega por WhatsApp. Si no lo recibes, escribe a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Las solicitudes se revisan caso por caso conforme a la normativa aplicable.</p></details><details id="disclaimer"><summary>Disclaimer / aviso importante</summary><p>El pack es una base de código y documentación para adaptar. No garantizamos que funcione sin configuración en todos los equipos, proyectos o servicios externos. Todo resultado generado con IA debe ser revisado por una persona.</p></details></div></section>
      <section className="site-disclaimer shell"><h2>Aviso importante</h2><p>Este sitio es operado y mantenido por Quant Partners. El AI Builder Pack se ofrece con fines educativos, referenciales e informativos. No vendemos oportunidades de negocio ni prometemos ingresos, ventas o resultados financieros.</p><p>El precio de S/99 corresponde a una base descargable para prototipar y adaptar. Hosting, integraciones, implementación, soporte y personalización no están incluidos y pueden cotizarse por separado.</p></section>
      <footer className="footer shell"><div className="brand"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></div><span>Hecho para construir desde Perú · 2026</span><div className="footer-links"><a href="#privacidad">Privacidad</a><a href="#terminos">Términos</a><a href="#entrega">Entrega</a><a href="#disclaimer">Disclaimer</a><a href="#top">Volver arriba <ArrowUpRight size={15} /></a></div></footer>
    </main>
  )
}

export default App
