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
  { icon: <Command size={19} />, title: 'Guarda el avance de tus proyectos', text: 'Conserva las decisiones, ideas e instrucciones importantes para no volver a explicar todo desde cero.' },
  { icon: <Monitor size={19} />, title: 'Consulta todo desde un solo lugar', text: 'Revisa y ordena la información de tus proyectos desde una pantalla fácil de consultar.' },
  { icon: <Network size={19} />, title: 'Dibuja cómo funcionará tu solución', text: 'Representa visualmente las partes de un sistema y cómo se conectan. Esta herramienta se entrega en beta.' },
  { icon: <BookOpen size={19} />, title: 'Aprende a adaptarlo a tu idea', text: 'Incluye pasos y ejemplos para instalar, configurar y adaptar lo que recibes.' },
]

function App() {
  return (
    <main id="top">
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Builder Pack inicio">
          <span className="brand-mark"><CircleDot size={16} /></span>
          <span>AI BUILDER <em>/</em> PACK</span>
        </a>
        <div className="nav-links"><a href="#incluye">¿Qué trae?</a><a href="#como-funciona">¿Cómo funciona?</a><a href="#preguntas">Preguntas</a></div>
        <a className="nav-cta" href="#comprar">Lo quiero <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="sticker">PARA GENTE QUE HACE COSAS <span>✦</span></div>
          <h1>Construye con IA<br /><i>sin empezar de cero.</i></h1>
          <p className="hero-lede">Una base descargable para <strong>guardar el contexto de tus proyectos, ordenar tu trabajo y explicar tus ideas</strong>. Recíbela por <strong>S/99, pago único</strong>, con guías para adaptarla.</p>
          <div className="hero-actions"><a className="button button-primary" href="#comprar">Recibir el pack por WhatsApp <ArrowUpRight size={17} /></a><a className="text-link" href="#incluye">Ver qué incluye <ChevronRight size={16} /></a></div>
          <div className="hero-proof"><span><Check size={14} /> Entrega digital</span><span><Check size={14} /> Sin mensualidad</span><span><Check size={14} /> Implementación aparte</span></div>
        </div>
        <div className="hero-visual" aria-label="Vista del contenido del AI Builder Pack">
          <div className="sunburst" />
          <div className="receipt-card">
            <div className="receipt-head"><span>QUANT PARTNERS</span><strong>PACK #001</strong></div>
            <div className="receipt-title"><PackageOpen size={29} /><div><small>TE LLEVAS</small><h2>AI Builder Pack</h2></div></div>
            <div className="receipt-line"><span>guardar y ordenar</span><b>incluido</b></div><div className="receipt-line"><span>mapas visuales en beta</span><b>incluido</b></div><div className="receipt-line"><span>guías y plantillas</span><b>incluido</b></div>
            <div className="receipt-total"><span>pago único</span><strong>S/ 99</strong></div>
            <div className="barcode"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><span>NO ES HUMO. ES UNA BASE.</span></div>
          </div>
          <div className="burst-label label-one">ABRE · CAMBIA · VENDE</div><div className="burst-label label-two">HECHO PARA ADAPTAR</div>
        </div>
      </section>

      <div className="marquee"><div className="marquee-inner"><span>UNA BASE DESCARGABLE</span><b>✦</b><span>PARA TUS PROYECTOS</span><b>✦</b><span>S/99 PAGO ÚNICO</span><b>✦</b><span>ENTREGA POR WHATSAPP</span><b>✦</b></div></div>

      <section className="problem-section shell" id="problema"><div className="problem-intro"><span className="kicker">ANTES DE CONSTRUIR</span><h2>Tu trabajo no debería<br /><i>perderse entre chats.</i></h2><p>Cuando el contexto queda repartido entre conversaciones, notas y archivos, retomar un proyecto cuesta más. El pack propone una base para reunir esa información y volver a ella.</p></div><div className="problem-list"><div><span>01</span><p>Decisiones e instrucciones repartidas en distintos lugares.</p></div><div><span>02</span><p>Tiempo perdido al retomar o explicar un proyecto.</p></div><div><span>03</span><p>Proyectos nuevos que vuelven a comenzar desde cero.</p></div></div></section>

      <section className="section shell split" id="incluye"><div className="section-copy"><span className="kicker">01 / LO QUE OBTIENES</span><h2>Esto es lo que<br /><i>compras.</i></h2><p>Por S/99 recibes un ZIP con una base reutilizable, herramientas de apoyo y guías para empezar a adaptarla.</p><div className="scope-note"><strong>Estado real:</strong> incluye una herramienta principal para conservar el avance, una pantalla de apoyo para consultar la información, un módulo de mapas visuales en beta y material para empezar. La instalación y los cambios a tu medida se cotizan aparte.</div></div><div className="contents-list">{contents.map((item, index) => <article className="content-row" key={item.title}><span className="row-number">0{index + 1}</span><span className="content-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ChevronRight size={18} /></article>)}</div></section>

      <section className="dark-section"><div className="shell split process"><div className="section-copy"><span className="kicker">02 / LO QUE PODRÁS HACER</span><h2>Abres el ZIP<br /><i>y sabes por dónde empezar.</i></h2><p>El pack está pensado para que tengas una base ordenada y puedas avanzar sin armar todo desde cero.</p><div className="chat-note"><FileCode2 size={19} /><span>Archivos, guías y ejemplos<br /><b>para adaptar a tu proyecto.</b></span></div></div><div className="steps"><div className="step"><strong>01</strong><div><h3>Guardar tu avance</h3><p>Conservas las ideas, decisiones e instrucciones de un proyecto para retomarlo cuando quieras.</p></div></div><div className="step"><strong>02</strong><div><h3>Consultar tu información</h3><p>Encuentras lo importante de cada proyecto en un solo lugar, sin depender de mensajes sueltos o notas dispersas.</p></div></div><div className="step"><strong>03</strong><div><h3>Explicar tu idea</h3><p>Creas un mapa visual para entender tu solución o enseñársela a un cliente.</p></div></div></div></div></section>

      <section className="truth shell"><div><span className="kicker">03 / PARA QUIÉN ES</span><h2>Si haces proyectos,<br /><i>te puede servir.</i></h2><p>Está pensado para personas que construyen soluciones con IA y quieren trabajar sobre una base reutilizable.</p></div><div className="truth-grid"><div className="truth-box yes"><span>✓</span><h3>Te sirve si…</h3><p>Eres freelancer, desarrollador, agencia o emprendedor y quieres reutilizar una base en tus propios proyectos o en proyectos de clientes.</p></div><div className="truth-box no"><span>×</span><h3>No es para ti si…</h3><p>Buscas una aplicación terminada que solo tengas que abrir y usar sin instalar, configurar o adaptar nada.</p></div></div></section>

      <section className="truth shell"><div><span className="kicker">04 / CLARO Y DIRECTO</span><h2>Lo que sí es.<br /><i>Lo que no es.</i></h2></div><div className="truth-grid"><div className="truth-box yes"><span>✓</span><h3>Sí es</h3><p>Un ZIP descargable con herramientas, guías y ejemplos para conservar el avance, ordenar proyectos y explicar visualmente tus ideas.</p></div><div className="truth-box no"><span>×</span><h3>No es</h3><p>Un SaaS terminado ni incluye hosting, cuentas de IA, personalización, despliegue o soporte ilimitado.</p></div></div></section>

      <section className="buy-section shell" id="comprar"><div className="buy-panel"><div className="buy-copy"><span className="kicker">05 / ELIGE TU PUNTO DE PARTIDA</span><h2>Construye la base.<br /><i>Escala cuando estés listo.</i></h2><p>Inicias la conversación por WhatsApp, el asistente te orienta, pagas con Mercado Pago y recibes el ZIP correspondiente después de la confirmación.</p><div className="buy-list"><span><Check size={15} /> Pago único y entrega digital</span><span><Check size={15} /> Precio y contenido explicados antes de pagar</span><span><Check size={15} /> Implementación y personalización: cotización aparte</span></div></div><div className="offer-grid"><article className="price-card"><div className="price-top"><span>PACK PRO</span><span>AI BUILDER</span></div><div className="price"><small>S/</small>99</div><p>AI Builder Pack Pro · pago único</p><ul className="offer-points"><li>PCA CLI + InfraDraw</li><li>Manuales y documentación aprobados</li><li>Base para prototipar y adaptar</li></ul><a className="button button-primary full" href={siteConfig.purchaseUrl}>{siteConfig.purchaseLabel} <ArrowUpRight size={17} /></a><small className="secure-note">El pago se procesa con Mercado Pago</small></article><article className="price-card complete-card"><div className="price-top"><span>PACK COMPLETO</span><span>OPCIÓN AMPLIADA</span></div><div className="price"><small>S/</small>150</div><p>Pack Pro + Lead Conversion Stack</p><ul className="offer-points"><li>Todo el AI Builder Pack Pro</li><li>Widget de leads + setter virtual</li><li>Para explorar implementaciones comerciales</li></ul><a className="button button-secondary full" href={siteConfig.completeUrl}>{siteConfig.completeLabel} <ArrowUpRight size={17} /></a><small className="secure-note">El alcance operativo se confirma por WhatsApp</small></article><p className="buy-disclaimer"><strong>Importante:</strong> ambos son bases para prototipar y adaptar. No incluyen hosting, credenciales, despliegue, integraciones, soporte ilimitado ni garantía de resultados. La implementación se cotiza aparte.</p></div></div></section>

      <section className="faq-section shell" id="preguntas"><div className="section-copy"><span className="kicker">04 / PREGUNTAS</span><h2>Antes de pagar,<br /><i>aclara tus dudas.</i></h2></div><div className="faq-list"><details open><summary>¿Qué recibo exactamente por S/99?</summary><p>Un ZIP con una herramienta para guardar el avance de tus proyectos, otra para consultar y ordenar esa información, una tercera para crear mapas visuales de sistemas —en beta— y guías para empezar.</p></details><details><summary>¿La herramienta de mapas visuales está terminada?</summary><p>Se entrega como módulo avanzado en beta. Es para probar y adaptar; recomendamos validarla en tu caso antes de usarla en producción.</p></details><details><summary>¿Me lo entregan terminado?</summary><p>No. Recibes una base para adaptar. La instalación, los cambios a tu medida, las conexiones con otras herramientas y la puesta en línea se cotizan aparte.</p></details><details><summary>¿Necesito una cuenta de IA?</summary><p>Solo si quieres activar funciones que se conectan con un servicio de IA. Esa cuenta y sus pagos son tuyos; no están incluidos en los S/99.</p></details><details><summary>¿Puedo usarlo para un cliente?</summary><p>Sí, como punto de partida para un proyecto. Si necesitas adaptar la base, instalarla o dejarla funcionando, podemos cotizarlo aparte.</p></details><details><summary>¿Cómo recibo el archivo?</summary><p>Después de que Mercado Pago confirme el pago, el asistente virtual te envía el ZIP directamente por WhatsApp.</p></details><details><summary>Ya pagué y no recibí nada</summary><p>Escríbenos a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> y te ayudamos a revisar tu pago y la entrega del archivo.</p></details></div></section>

      <section className="legal-section shell" id="legal"><div className="section-copy"><span className="kicker">INFORMACIÓN IMPORTANTE</span><h2>Compra con<br /><i>claridad.</i></h2><p>Estas condiciones explican qué recibes, cómo usamos los datos de compra y qué límites tiene el pack.</p></div><div className="legal-list"><details id="privacidad"><summary>Política de privacidad</summary><p>Usamos los datos que nos compartas —por ejemplo, nombre, correo, teléfono y datos de referencia del pago— para confirmar la compra, entregar el ZIP y atender consultas. No almacenamos los datos completos de tu tarjeta; el pago se procesa mediante Mercado Pago. Si nos escribes por WhatsApp, también aplican las políticas de esa plataforma.</p><p>Puedes solicitar acceso, rectificación, cancelación u oposición respecto de tus datos escribiendo a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Conservaremos la información solo durante el tiempo necesario para atender la compra, soporte y obligaciones aplicables.</p></details><details id="terminos"><summary>Términos de compra</summary><p>El precio mostrado es S/99 por un pago único. El producto es un ZIP descargable con herramientas, documentación y ejemplos para adaptar en proyectos. No es una aplicación terminada ni incluye hosting, cuentas de IA, personalización, despliegue o soporte ilimitado.</p><p>El contenido puede actualizarse y algunos módulos pueden estar en beta. La compra te permite usar el material como base en tus propios proyectos o en proyectos de clientes. No está permitido revender o redistribuir el ZIP tal como se entrega.</p></details><details id="entrega"><summary>Entrega, incidencias y reembolsos</summary><p>Después de que Mercado Pago confirme el pago, el asistente virtual envía el ZIP por WhatsApp. Si no lo recibes, escribe a <a className="faq-support-link" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> indicando el correo o teléfono usado en la compra y cualquier referencia del pago. Revisaremos la operación y la entrega.</p><p>Las solicitudes relacionadas con pagos, entregas o reembolsos se revisan caso por caso conforme a la normativa aplicable. La falta de entrega por un error nuestro se atiende mediante reenvío o una solución acordada.</p></details><details id="disclaimer"><summary>Disclaimer / aviso importante</summary><p>El pack es una base de código y documentación para adaptar. No garantizamos que funcione sin configuración en todos los equipos, proyectos o servicios externos. El resultado depende de la adaptación, las cuentas, los proveedores y las decisiones técnicas de cada usuario.</p><p>Las funciones relacionadas con inteligencia artificial pueden requerir cuentas y pagos propios. Todo resultado generado con IA debe ser revisado por una persona antes de utilizarse en un proyecto real.</p></details></div></section>

      <section className="site-disclaimer shell" aria-labelledby="site-disclaimer-title"><h2 id="site-disclaimer-title">Aviso importante</h2><p>Este sitio es operado y mantenido por Quant Partners. El contenido del AI Builder Pack se ofrece con fines educativos, referenciales e informativos. No vendemos oportunidades de negocio ni prometemos ingresos, ventas o resultados financieros.</p><p>Los ejemplos y demostraciones son ilustrativos. Los resultados dependen de la adaptación, el contexto, las habilidades, las decisiones y las circunstancias de cada usuario. No garantizamos resultados específicos ni que el material funcione sin configuración en todos los equipos, proyectos o servicios externos.</p><p>El precio de S/99 corresponde a una base descargable para prototipar y adaptar. Hosting, integraciones, implementación, soporte y personalización no están incluidos y pueden cotizarse por separado. Revisa la <a href="#privacidad">Política de privacidad</a> y los <a href="#terminos">Términos de compra</a> antes de pagar.</p></section>

      <footer className="footer shell"><div className="brand"><span className="brand-mark"><CircleDot size={16} /></span><span>AI BUILDER <em>/</em> PACK</span></div><span>Hecho para construir desde Perú · 2026</span><div className="footer-links"><a href="#privacidad">Privacidad</a><a href="#terminos">Términos</a><a href="#entrega">Entrega</a><a href="#disclaimer">Disclaimer</a><a href="#top">Volver arriba <ArrowUpRight size={15} /></a></div></footer>
    </main>
  )
}

export default App
