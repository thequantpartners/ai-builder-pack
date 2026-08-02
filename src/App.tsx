import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleDot,
  Command,
  FileCode2,
  FolderOpen,
  Monitor,
  MessageCircle,
  Network,
  PackageOpen,
  Wrench,
} from 'lucide-react'
import { siteConfig } from './config/site'

const contents = [
  { icon: <Command size={19} />, title: 'Tus proyectos, siempre en contexto', text: 'Guarda lo importante de cada proyecto para no volver a explicar todo desde cero.' },
  { icon: <Monitor size={19} />, title: 'Todo más ordenado', text: 'Consulta tus avances y la información de cada proyecto desde un solo lugar.' },
  { icon: <Network size={19} />, title: 'Mira cómo funcionará tu sistema', text: 'Representa tus ideas de forma visual antes de construirlas o enseñárselas a un cliente.' },
  { icon: <BookOpen size={19} />, title: 'Una guía para avanzar', text: 'Pasos y ejemplos para entender lo que recibes y adaptarlo a tu propia idea.' },
]

const steps = [
  ['01', 'Compra', 'Pagas una sola vez por WhatsApp o con Mercado Pago.'],
  ['02', 'Descarga', 'Con el pago aprobado recibes el ZIP directamente por WhatsApp.'],
  ['03', 'Hazlo tuyo', 'Lo adaptas a tu idea, tu negocio o el proyecto de tu cliente.'],
]

function App() {
  return (
    <main id="top">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Builder Pack inicio">
          <span className="brand-mark"><CircleDot size={16} /></span>
          <span>AI BUILDER <em>/</em> PACK</span>
        </a>
        <div className="nav-links"><a href="#incluye">¿Qué trae?</a><a href="#como">¿Cómo funciona?</a><a href="#preguntas">Preguntas</a></div>
        <a className="nav-cta" href="#comprar">Lo quiero <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="sticker">PARA GENTE QUE HACE COSAS <span>✦</span></div>
          <h1>Deja de empezar<br /><i>desde cero.</i></h1>
          <p className="hero-lede">Por <strong>S/99 y pago único</strong>, llévate herramientas y sistemas base para trabajar tus proyectos con IA, mantenerlos ordenados y avanzar más rápido.</p>
          <div className="hero-actions"><a className="button button-primary" href="#comprar">Quiero mi pack <ArrowUpRight size={17} /></a><a className="text-link" href="#incluye">Mira qué recibes <ChevronRight size={16} /></a></div>
          <div className="hero-proof"><span><Check size={14} /> Entrega digital</span><span><Check size={14} /> Sin mensualidad</span><span><Check size={14} /> Implementación aparte</span></div>
        </div>
        <div className="hero-visual" aria-label="Vista del contenido del AI Builder Pack">
          <div className="sunburst" />
          <div className="receipt-card">
            <div className="receipt-head"><span>QUANT PARTNERS</span><strong>PACK #001</strong></div>
            <div className="receipt-title"><PackageOpen size={29} /><div><small>TE LLEVAS</small><h2>AI Builder Pack</h2></div></div>
            <div className="receipt-line"><span>proyectos con contexto</span><b>incluido</b></div><div className="receipt-line"><span>trabajo más ordenado</span><b>incluido</b></div><div className="receipt-line"><span>guías para avanzar</span><b>incluido</b></div>
            <div className="receipt-total"><span>pago único</span><strong>S/ 99</strong></div>
            <div className="barcode"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><span>NO ES HUMO. ES UNA BASE.</span></div>
          </div>
          <div className="burst-label label-one">ABRE · CAMBIA · VENDE</div><div className="burst-label label-two">HECHO PARA ADAPTAR</div>
        </div>
      </section>

      <div className="marquee"><div className="marquee-inner"><span>UNA BASE REAL</span><b>✦</b><span>PARA TUS PROYECTOS</span><b>✦</b><span>S/99 PAGO ÚNICO</span><b>✦</b><span>ENTREGA POR WHATSAPP</span><b>✦</b></div></div>

      <section className="section shell split" id="incluye"><div className="section-copy"><span className="kicker">01 / LO QUE OBTIENES</span><h2>Sin floro.<br /><i>Esto podrás hacer.</i></h2><p>No compras una promesa ni un curso eterno. Recibes una base para trabajar mejor tus proyectos, conservar tus avances y convertir tus ideas en algo que puedas mostrar.</p><div className="scope-note"><strong>En simple:</strong> recibes archivos y guías para adaptar. La instalación y los cambios a tu medida se pueden contratar por separado.</div></div><div className="contents-list">{contents.map((item, index) => <article className="content-row" key={item.title}><span className="row-number">0{index + 1}</span><span className="content-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ChevronRight size={18} /></article>)}</div></section>

      <section className="dark-section" id="como"><div className="shell split process"><div className="section-copy"><span className="kicker">02 / ASÍ LO USAS</span><h2>De una idea<br /><i>a algo que puedes mostrar.</i></h2><p>Si sabes qué quieres construir, ya tienes por dónde empezar. Y si quieres que lo hagamos por ti, también ofrecemos la implementación.</p><div className="chat-note"><MessageCircle size={19} /><span>¿Quieres personalizarlo?<br /><b>La cotización va aparte.</b></span></div></div><div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

      <section className="truth shell"><div><span className="kicker">CLARO Y DIRECTO</span><h2>Lo que sí es.<br /><i>Lo que no es.</i></h2></div><div className="truth-grid"><div className="truth-box yes"><span>✓</span><h3>Sí es</h3><p>Un conjunto de herramientas y sistemas base para organizar tus proyectos, reutilizar trabajo y avanzar más rápido.</p></div><div className="truth-box no"><span>×</span><h3>No es</h3><p>Un producto terminado que funcione sin ajustes, ni incluye hosting, cuentas de IA, personalización o soporte ilimitado.</p></div></div></section>

      <section className="buy-section shell" id="comprar"><div className="buy-panel"><div className="buy-copy"><span className="kicker">03 / HAZLO TUYO</span><h2>Tu siguiente proyecto<br /><i>puede empezar hoy.</i></h2><p>Compra el pack, recibe el ZIP por WhatsApp cuando se apruebe tu pago y empieza a construir sobre una base más ordenada.</p><div className="buy-list"><span><Check size={15} /> Pago único de S/99</span><span><Check size={15} /> Entrega digital por WhatsApp</span><span><Check size={15} /> Personalización y despliegue: cotización aparte</span></div></div><div className="price-card"><div className="price-top"><span>AI BUILDER PACK</span><span>01 PACK</span></div><div className="price"><small>S/</small>99</div><p>pago único · sin suscripción</p><a className="button button-primary full" href={siteConfig.purchaseUrl}>{siteConfig.purchaseLabel} <ArrowUpRight size={17} /></a><small className="secure-note">Pago seguro con Mercado Pago</small></div></div></section>

      <section className="faq-section shell" id="preguntas"><div className="section-copy"><span className="kicker">04 / PREGUNTAS</span><h2>Antes de pagar,<br /><i>aclara tus dudas.</i></h2></div><div className="faq-list"><details open><summary>¿Qué recibo exactamente por S/99?</summary><p>Un ZIP con herramientas para conservar el avance de tus proyectos, trabajar de forma más ordenada, visualizar tus ideas y guías para empezar.</p></details><details><summary>¿Me lo entregan terminado?</summary><p>No. Recibes una base para adaptar. La instalación, los cambios a tu medida, las conexiones con otras herramientas y la puesta en línea se cotizan aparte.</p></details><details><summary>¿Necesito una cuenta de IA?</summary><p>Solo si quieres activar funciones que se conectan con un servicio de IA. Esa cuenta y sus pagos son tuyos; no están incluidos en los S/99.</p></details><details><summary>¿Puedo usarlo para un cliente?</summary><p>Sí, como punto de partida para un proyecto. Si necesitas adaptar la base, instalarla o dejarla funcionando, podemos cotizarlo aparte.</p></details><details><summary>¿Cómo recibo el archivo?</summary><p>Después de que Mercado Pago confirme el pago, el asistente virtual te envía el ZIP directamente por WhatsApp.</p></details><details><summary>Ya pagué y no recibí nada</summary><p>Escríbenos a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> y te ayudamos a revisar tu pago y la entrega del archivo.</p></details></div></section>

      <footer className="footer shell"><div className="brand"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></div><span>Hecho para construir desde Perú · 2026</span><a href="#top">Volver arriba <ArrowUpRight size={15} /></a></footer>
    </main>
  )
}

export default App
