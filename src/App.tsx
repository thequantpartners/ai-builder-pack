import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Command,
  FileCode2,
  GitBranch,
  Layers3,
  LockKeyhole,
  MousePointer2,
  Network,
  Workflow,
} from 'lucide-react'
import { siteConfig } from './config/site'

const packItems = [
  { icon: <Command size={18} />, title: 'Una base para tus proyectos', text: 'Empieza con una estructura funcional en lugar de construir todo desde cero.' },
  { icon: <Network size={18} />, title: 'Una base para tus despliegues', text: 'Organiza la infraestructura de tus aplicaciones y adapta la configuración a cada cliente.' },
  { icon: <Layers3 size={18} />, title: 'Herramientas reutilizables', text: 'Recibe piezas que puedes adaptar, combinar y convertir en tus propias soluciones.' },
]

const steps = [
  { index: '01', title: 'Descarga', text: 'Recibes el código y las guías para poner la base en tu computadora.' },
  { index: '02', title: 'Adapta', text: 'Cambias textos, flujos y funciones para convertirla en tu propia solución.' },
  { index: '03', title: 'Lanza o vende', text: 'Úsala en tus proyectos, preséntala a tus clientes o contrata nuestra implementación.' },
]

function App() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Builder Pack inicio"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></a>
        <div className="nav-links"><a href="#stack">Qué recibes</a><a href="#workflow">Cómo lo usas</a><a href="#faq">Preguntas</a></div>
        <a className="nav-cta" href="#buy">{siteConfig.purchaseLabel} <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Una base real para tus próximos proyectos <span className="eyebrow-line" /></div>
          <h1>Tu próximo proyecto<br /><span>empieza aquí.</span></h1>
          <p className="hero-lede">Por S/99 recibes código, herramientas y guías para crear soluciones con IA sin tener que empezar desde una pantalla en blanco.</p>
          <div className="hero-actions"><a className="button button-primary" href="#buy">Quiero recibirlo <ArrowUpRight size={17} /></a><a className="text-link" href="#stack">Ver qué incluye <ChevronRight size={16} /></a></div>
          <div className="hero-meta"><span><Check size={14} /> Código para usar y adaptar</span><span><Check size={14} /> Guías paso a paso</span><span><Check size={14} /> Pago único de S/99</span></div>
        </div>
        <div className="hero-visual" aria-label="Vista previa de lo que incluye el pack">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="signal signal-one" /><div className="signal signal-two" />
          <div className="context-card">
            <div className="context-top"><span><span className="status-dot" /> sistema listo</span><span className="mono">PACK / 01</span></div>
            <div className="context-main"><div className="context-icon"><Command size={28} /></div><div><span className="label">TU PRÓXIMO PROYECTO</span><strong>ai-builder-pack</strong></div></div>
            <div className="context-tree"><div className="tree-row active"><GitBranch size={14} /><span>estructura base</span><b>lista</b></div><div className="tree-row"><FileCode2 size={14} /><span>guías incluidas</span><i>01</i></div><div className="tree-row"><Workflow size={14} /><span>módulos reutilizables</span><i>03</i></div></div>
            <div className="context-footer"><span>lo que recibes</span><span className="mono">hoy</span></div>
          </div>
          <div className="floating-tag tag-top"><span className="tag-icon"><Braces size={14} /></span> ahorra semanas de trabajo</div>
          <div className="floating-tag tag-bottom"><span className="tag-icon green"><LockKeyhole size={14} /></span> adapta y hazlo tuyo</div>
          <div className="visual-caption"><span className="mono">01</span><span>Una base funcional<br />para empezar hoy</span></div>
        </div>
      </section>

      <section className="signal-strip"><div className="shell strip-inner"><span>CÓDIGO PARA ADAPTAR</span><i /><span>GUÍAS CLARAS</span><i /><span>PAGO ÚNICO</span><i /><span>IMPLEMENTACIÓN OPCIONAL</span></div></section>

      <section className="section shell" id="stack">
        <div className="section-intro"><span className="section-number">01 / QUÉ RECIBES</span><h2>Compra una vez.<br /><span>Empieza con ventaja.</span></h2><p>Recibes una base funcional que puedes entender, adaptar y reutilizar en tus propios proyectos o en trabajos para tus clientes.</p></div>
        <div className="stack-grid">{packItems.map((item) => <article className="stack-item" key={item.title}><div className="stack-icon">{item.icon}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight className="item-arrow" size={18} /></article>)}</div>
      </section>

      <section className="workflow-section" id="workflow"><div className="shell workflow-grid"><div className="workflow-heading"><span className="section-number">02 / CÓMO LO APROVECHAS</span><h2>De una idea pendiente<br /><span>a algo que ya puedes mostrar.</span></h2><p>El pack te da un punto de partida concreto. Tú decides si lo adaptas, lo vendes o nos encargas la implementación.</p><div className="terminal-mini"><div className="terminal-bar"><span /><span /><span /><b>tu proyecto</b></div><div className="terminal-body"><span className="terminal-prompt">$</span><span>iniciar mi siguiente proyecto</span><strong>✓ base lista para adaptar</strong></div></div></div><div className="steps">{steps.map((step, index) => <div className="step" key={step.index}><span className="step-index">{step.index}</span><div className="step-line">{index < steps.length - 1 && <span />}</div><div className="step-copy"><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div></div></section>

      <section className="proof-section shell"><div className="proof-quote"><span className="quote-mark">“</span><p>No pagas por otra promesa. Recibes una base que puedes abrir, revisar y convertir en tu siguiente solución.</p><span className="quote-caption">— Qué cambia después de comprar</span></div><div className="proof-stats"><div><strong>01</strong><span>pago único<br />sin suscripción</span></div><div><strong>03</strong><span>módulos<br />reutilizables</span></div><div><strong>∞</strong><span>formas de<br />personalizarlo</span></div></div></section>

      <section className="buy-section shell" id="buy"><div className="buy-panel"><div className="buy-copy"><span className="section-number">03 / TU COMPRA</span><h2>Empieza a construir<br /><span>sin empezar de cero.</span></h2><p>Recibes el código y las guías para usar esta base en tus propios proyectos. Si quieres que la adaptemos por ti, también podemos hacerlo.</p><div className="buy-list"><span><Check size={15} /> Código fuente para adaptar</span><span><Check size={15} /> Guías de instalación y uso</span><span><Check size={15} /> Licencia para un proyecto</span></div></div><div className="price-card"><div className="price-label">{siteConfig.brand} <span>acceso</span></div><div className="price"><small>{siteConfig.currency}</small>{siteConfig.price}</div><div className="price-note">pago único · entrega digital</div><a className="button button-primary full" href={siteConfig.purchaseUrl}>{siteConfig.purchaseLabel} <ArrowUpRight size={17} /></a><p className="secure-note"><MousePointer2 size={13} /> Código + guías + soporte inicial</p></div></div></section>

      <section className="faq-section shell" id="faq"><div className="section-intro"><span className="section-number">04 / PREGUNTAS</span><h2>Lo que necesitas<br /><span>saber antes de comprar.</span></h2></div><div className="faq-list"><details open><summary>¿Qué recibo exactamente por S/99?</summary><p>Un paquete descargable con código fuente curado, módulos reutilizables, documentación de instalación y una licencia para un proyecto.</p></details><details><summary>¿Es un producto terminado?</summary><p>No. Es una base funcional para adaptar. No incluye un desarrollo personalizado ni una garantía de que funcione sin ajustes en tu caso particular.</p></details><details><summary>¿Pueden instalarlo o adaptarlo por mí?</summary><p>Sí. La implementación, las integraciones, el despliegue y los cambios específicos se cotizan aparte.</p></details><details><summary>¿Necesito conocimientos técnicos?</summary><p>Sí, para instalarlo y modificarlo. Si no quieres hacerlo tú, puedes contratar el servicio de implementación.</p></details></div></section>

      <footer className="footer shell"><div className="brand"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></div><span>Construye tu próxima solución · 2026</span><a href="#top">Volver arriba <ArrowDownRight size={15} /></a></footer>
    </main>
  )
}

export default App
