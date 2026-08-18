import React, { useState, useEffect } from 'react';
import {
  Award,
  GraduationCap,
  Briefcase,
  Gem,
  Users,
  Clock,
  Calendar,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Target,
  Compass,
  MessageSquare,
  Mail,
  Globe,
  ArrowRight,
  Mic,
  Menu,
  X
} from 'lucide-react';

// --- Datos ---

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Quiénes somos', href: '#conocenos' },
  { label: 'Formación', href: '#formacion' },
  { label: 'In Company', href: '#incompany' },
  { label: 'Asesoría', href: '#asesoria' },
  { label: 'Contacto', href: '#contacto' },
];

const WHATSAPP_URL = 'https://wa.me/525561039849?text=Hola%2C%20solicito%20informaci%C3%B3n%20sobre%20los%20programas%20del%20Instituto%20Europeo%20del%20Lujo';

const STATS = [
  { value: '+2,500', label: 'Alumnos formados en Lujo' },
  { value: '22', label: 'Generaciones de diplomados desde 2017' },
  { value: '+50', label: 'Cursos in company impartidos' },
  { value: '+40', label: 'Empresas líderes del sector' },
  { value: '9.46/10', label: 'Valoración media en cuestionario anónimo' },
];

interface Programa {
  badge: string;
  nuevo?: boolean;
  title: string;
  tagline: string;
  fechas: string;
  datos: string[];
  cert: string;
  url: string;
}

const PROGRAMAS: Programa[] = [
  {
    badge: '10ª Generación',
    title: 'Diplomado Luxury Sales',
    tagline: 'La conquista del mercado',
    fechas: '5 Sep — 14 Nov 2026',
    datos: ['80 horas · sábados', 'Online en vivo + clases híbridas'],
    cert: 'Doble certificación U. Anáhuac + IELujo',
    url: 'https://luxury-sales.ielujo.com',
  },
  {
    badge: '11ª Generación',
    title: 'Diplomado Luxury Management',
    tagline: 'La base estratégica',
    fechas: '6 Mar — 22 May 2027',
    datos: ['80 horas · sábados', 'Online en vivo + clases híbridas'],
    cert: 'Doble certificación U. Anáhuac + IELujo',
    url: 'https://luxury-management.ielujo.com',
  },
  {
    badge: '¡Nuevo!',
    nuevo: true,
    title: 'Diplomado Luxury Experience & Service',
    tagline: 'La excelencia que fideliza',
    fechas: '5 Jun — 14 Ago 2027',
    datos: ['80 horas · sábados', 'Online en vivo + 2 clases híbridas experienciales'],
    cert: 'Doble certificación U. Anáhuac + IELujo',
    url: 'https://luxury-experience.ielujo.com',
  },
  {
    badge: 'Online a tu ritmo',
    title: 'Programa Ejecutivo en Luxurización y Creación de Marcas de Lujo',
    tagline: 'Crea o transforma tu marca',
    fechas: 'Empiezas cuando tú decides',
    datos: ['50 horas de clases en video', '2 mentorías individuales · acceso 12 meses'],
    cert: 'Certificación del Instituto Europeo del Lujo',
    url: 'https://creacion-y-luxurizacion.ielujo.com',
  },
];

const CURSOS_INCOMPANY = [
  'Introducción al Lujo',
  'Marketing y Comunicación para el Lujo',
  'Venta de Productos y Servicios de Lujo',
  'Luxurización de Marcas',
  'Atención al Cliente de Lujo',
  'Experiencias de Lujo',
];

const CLIENTES = [
  'El Palacio de Hierro', 'Mercedes-Benz', 'Cartier', 'Dior Perfumes', 'Lancôme',
  'Kérastase', "L'Oréal", 'Porsche', 'Lexus', 'Alfa Romeo', 'Rosewood Mayakoba',
  'One&Only Palmilla', 'Armani', 'Loewe', 'Richemont', 'Swatch', 'Avolta',
  'Grupo Ultra', 'MIDO',
];

const TESTIMONIALS = [
  {
    quote: 'Haber tomado este diplomado me ha permitido observar marcadas diferencias y muy claras respecto de lo que es este segmento de lujo, la forma de llevarlo, la forma de planearlo y cómo medirlo.',
    name: 'Sueyin Ahelby',
  },
  {
    quote: 'Lo hice todo en línea y la verdad es que está muy dinámico y muy versátil porque lo puedes ver a la hora que tú puedas. Me sentí muy cómodo y aprendí bastante.',
    name: 'David Bissu',
  },
  {
    quote: 'Es un contenido que definitivamente no puedes encontrar en ningún otro lado, no existe realmente dentro de la oferta educativa en México; es una excelente inversión de tiempo y de esfuerzo.',
    name: 'Cesia Rojas',
  },
  {
    quote: 'Algo clave para mí fueron los ponentes, ya que no solo te hablan sobre las marcas, también te hablan sobre el éxito que hay detrás de ellas y cómo lo han logrado.',
    name: 'Rebeca Vázquez',
  },
];

// --- Componentes ---

const SectionTitle: React.FC<{ subtitle: string; title: string; light?: boolean }> = ({ subtitle, title, light }) => (
  <div className="mb-14">
    <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block" style={{ color: '#d4af37' }}>{subtitle}</span>
    <h2 className={`text-3xl md:text-5xl font-display ${light ? 'text-white' : 'text-black'}`}>{title}</h2>
    <div className="w-20 h-1 bg-gold mt-6"></div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Escudo IEL oficial (gris sobre transparente): invertido a blanco para el navbar negro */}
          <img src="/logo-ielujo.png" alt="IELujo" className="h-9 md:h-11 w-auto brightness-0 invert" />
          <div className="flex flex-col">
            <span className="text-md md:text-lg font-display font-bold tracking-widest leading-tight" style={{ color: '#d4af37' }}>IELujo</span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.25em] text-white font-medium leading-tight">Instituto Europeo del Lujo</span>
          </div>
        </div>

        <div className="hidden lg:flex gap-7 items-center">
          {NAV_ITEMS.map((it) => (
            <a key={it.label} href={it.href} onClick={(e) => go(e, it.href)} className="text-[11px] uppercase tracking-widest text-gray-300 hover:text-white transition-colors cursor-pointer">
              {it.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-2 border text-[11px] uppercase tracking-widest transition-all hover:text-black" style={{ borderColor: '#d4af37', color: '#d4af37' }} onMouseEnter={e => (e.currentTarget.style.background = '#d4af37')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            Info
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in-up">
          {NAV_ITEMS.map((it) => (
            <a key={it.label} href={it.href} onClick={(e) => go(e, it.href)} className="text-sm uppercase tracking-widest text-gray-300 cursor-pointer">
              {it.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- App ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />

      {/* Hero */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden scroll-mt-0">
        <div className="absolute inset-0 z-0 bg-[#050505]">
          <img src="/hero.jpg" alt="Recepción de lujo en penumbra cálida" className="w-full h-full object-cover brightness-110" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.25) 45%, rgba(5,5,5,0.35) 100%)' }}></div>
          {/* Sombra ceñida al titular: la foto respira por los lados y el dorado conserva el negro que necesita */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 62% 30% at 50% 44%, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.75) 55%, rgba(5,5,5,0.35) 82%, rgba(5,5,5,0) 100%)' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-display mb-6 tracking-tight">
            Instituto Europeo <br />
            <span className="gold-gradient">del Lujo</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            La escuela de negocios del Lujo líder en Iberoamérica. Desde 2013 formamos a los
            profesionales y transformamos las marcas que definen el lujo en Latinoamérica.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#formacion" className="bg-gold text-black px-10 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm hover:scale-105 transition-transform">
              Formación académica
            </a>
            <a href="#incompany" className="border border-white/25 text-white px-10 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm hover:bg-white/10 transition-colors">
              Cursos in company
            </a>
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-14 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={i}>
              <p className="font-display text-3xl md:text-4xl gold-gradient mb-2">{s.value}</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quiénes somos */}
      <section id="conocenos" className="py-24 bg-white text-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="Quiénes somos" title="La escuela de negocios especializada en Lujo" />
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                El Instituto Europeo del Lujo forma desde 2013 a los profesionales que trabajan o quieren
                desarrollarse en el sector del lujo y premium, y acompaña a las empresas que buscan posicionar
                sus marcas en el segmento de lujo.
              </p>
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                Somos socios estratégicos de la <strong>Universidad Anáhuac de México</strong>: nuestros diplomados
                cuentan con su reconocimiento y aval oficial dentro de su oferta de Educación Continua Universitaria,
                con doble certificación de alto valor curricular.
              </p>
              <div className="flex items-center gap-8">
                <img src="/logo-ielujo.png" alt="IELujo" className="h-16 w-auto" />
                <div className="h-12 w-px bg-gray-200"></div>
                <img src="/logo-anahuac.png" alt="Universidad Anáhuac México" className="h-12 w-auto" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { img: '/frank-sanchez.jpg', name: 'Frank Sánchez', role: 'CEO' },
                { img: '/amparo-delaconcepcion.jpg', name: 'Amparo de la Concepción', role: 'Directora Académica' },
              ].map((p, i) => (
                <div key={i} className="bg-[#f7f5f0] p-6 border border-black/5">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <p className="text-xs uppercase tracking-wider mt-1" style={{ color: '#b08d2a' }}>{p.role}</p>
                </div>
              ))}
              <div className="col-span-2 bg-[#f7f5f0] p-6 border border-black/5">
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Junto a un claustro de profesionales expertos y reconocidos del sector del Lujo, escogidos en
                  virtud de los temas a cubrir en cada uno de nuestros programas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formación académica */}
      <section id="formacion" className="py-24 bg-[#050505] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Formación académica" title="Diplomados, Máster y Programa Ejecutivo" light />
          <p className="text-gray-400 font-light leading-relaxed max-w-3xl -mt-6 mb-12">
            Tres diplomados universitarios con doble certificación Anáhuac + IELujo, un programa ejecutivo
            online y el título que los corona: el Máster en Global Luxury Business.
          </p>

          {/* Banner Máster */}
          <a href="https://master-lujo.ielujo.com" target="_blank" rel="noopener noreferrer" className="block bg-[#111] border p-8 md:p-10 mb-10 transition-all duration-500 hover:border-opacity-100 group" style={{ borderColor: 'rgba(212,175,55,0.35)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#d4af37' }}>El título que lo corona</span>
                <h3 className="font-display text-3xl md:text-4xl text-white mt-2">Máster en <span className="gold-gradient">Global Luxury Business</span></h3>
                <p className="text-gray-400 font-light mt-3 max-w-2xl">
                  Completa los diplomados Luxury Sales, Luxury Management y Luxury Experience & Service — cada uno
                  con su doble certificación — y obtén además el título de Máster (U. Anáhuac + IELujo).
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest whitespace-nowrap group-hover:translate-x-1 transition-transform" style={{ color: '#d4af37' }}>
                Ver el Máster <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>

          {/* Programas */}
          <div className="grid md:grid-cols-2 gap-8">
            {PROGRAMAS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/5 p-8 flex flex-col hover:border-white/20 transition-all duration-500">
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 border ${p.nuevo ? '' : 'text-gray-400 border-white/15'}`} style={p.nuevo ? { color: '#d4af37', borderColor: '#d4af37' } : {}}>
                    {p.badge}
                  </span>
                  <GraduationCap className="w-6 h-6" style={{ color: 'rgba(212,175,55,0.6)' }} />
                </div>
                <h3 className="font-display text-2xl text-white mb-1">{p.title}</h3>
                <p className="text-xs uppercase tracking-widest mb-5" style={{ color: '#d4af37' }}>{p.tagline}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-3 text-gray-400 text-sm font-light"><Calendar className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.6)' }} />{p.fechas}</li>
                  {p.datos.map((d, k) => (
                    <li key={k} className="flex items-center gap-3 text-gray-400 text-sm font-light"><Clock className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.6)' }} />{d}</li>
                  ))}
                  <li className="flex items-center gap-3 text-gray-400 text-sm font-light"><ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(212,175,55,0.6)' }} />{p.cert}</li>
                </ul>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-3 transition-all" style={{ color: '#d4af37' }}>
                  Ver programa <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Company */}
      <section id="incompany" className="py-24 bg-white text-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="In Company" title="Formación a medida para tu empresa" />
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Diseñamos e impartimos cursos personalizados para empresas del lujo y premium: adaptados a la
                función de los asistentes, a la marca y a su nivel de lujo. De 5 a 14 horas, en 1 a 5 sesiones,
                en formato presencial, online en vivo o híbrido, con certificación del Instituto Europeo del Lujo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {CURSOS_INCOMPANY.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#f7f5f0] border border-black/5 px-4 py-3">
                    <Briefcase className="w-4 h-4 flex-shrink-0" style={{ color: '#b08d2a' }} />
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#f7f5f0] border border-black/5 p-6 flex items-start gap-4">
                <Mic className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#b08d2a' }} />
                <div>
                  <h4 className="font-bold mb-1">Conferencias</h4>
                  <p className="text-sm text-gray-600 font-light">Sesiones de 1 a 2 horas para eventos y equipos, en formato presencial o streaming.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-6">Confían en nosotros</h3>
              <p className="text-gray-500 font-light text-sm mb-6">
                Más de 50 cursos impartidos a más de 40 empresas líderes. El 100% de nuestros clientes
                corporativos ha llegado por recomendación.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {CLIENTES.map((c, i) => (
                  <span key={i} className="font-display text-lg md:text-xl text-gray-400 hover:text-black transition-colors cursor-default">{c}</span>
                ))}
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block bg-black text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold hover:text-black transition-all">
                Diseñamos tu curso a medida
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Asesoría de Luxurización */}
      <section id="asesoria" className="py-24 bg-[#0a0a0a] border-y border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Asesoría de Luxurización" title="Transformamos tu marca en una marca de Lujo" light />
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-8 h-8" />, t: 'Diagnóstico y auditoría', d: 'Auditoría de experiencias y análisis de tu marca frente a los atributos del lujo: dónde estás y qué te separa del segmento.' },
              { icon: <Compass className="w-8 h-8" />, t: 'Metodología SADE®', d: 'Nuestro método cuantitativo probado para crear marcas de lujo y transformar marcas premium en marcas de lujo. Más de 20 proyectos exitosos avalan esta ruta.' },
              { icon: <Gem className="w-8 h-8" />, t: 'Acompañamiento directivo', d: 'Consultoría y mentoría uno a uno con nuestros expertos para construir, validar y poner en marcha tu plan de luxurización.' },
            ].map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/5 p-10 hover:border-white/20 transition-all duration-500">
                <div className="mb-6" style={{ color: '#d4af37' }}>{b.icon}</div>
                <h3 className="font-display text-2xl text-white mb-3">{b.t}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-gold text-black px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:scale-105 transition-transform">
              Habla con un asesor
            </a>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Testimonios" title="Lo que dicen nuestros alumnos" light />
          <p className="text-gray-400 font-light leading-relaxed max-w-3xl -mt-6 mb-12 italic">
            "Valoración media de 9.46/10 otorgada en cuestionario anónimo por los alumnos de las 22 ediciones de nuestros diplomados."
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 p-8 flex flex-col">
                {/* opacidad fundida en rgba: `gold` es clase CSS manual y no admite /opacity de Tailwind */}
                <span className="font-display text-5xl leading-none select-none" style={{ color: 'rgba(212,175,55,0.4)' }}>"</span>
                <p className="text-gray-300 font-light leading-relaxed italic mt-2 mb-6">{t.quote}</p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="text-white font-semibold">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 bg-white text-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="Contacto" title="Hablemos de Lujo" />
              <p className="text-gray-600 font-light leading-relaxed mb-10 max-w-xl">
                ¿Dudas sobre qué programa encaja contigo, tu equipo o tu marca? Escríbenos y te orientamos.
              </p>
              <div className="space-y-6">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <MessageSquare className="w-8 h-8" style={{ color: '#25D366' }} />
                  <span className="text-xl font-display group-hover:underline">+52 55 6103 9849</span>
                </a>
                <a href="mailto:contacto@ielujo.com" className="flex items-center gap-5 group">
                  <Mail className="w-8 h-8" style={{ color: '#b08d2a' }} />
                  <span className="text-xl font-display group-hover:underline">contacto@ielujo.com</span>
                </a>
                <a href="https://www.ielujo.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <Globe className="w-8 h-8" style={{ color: '#b08d2a' }} />
                  <span className="text-xl font-display group-hover:underline">www.ielujo.com</span>
                </a>
              </div>
            </div>
            <div className="bg-[#f7f5f0] border border-black/5 p-10">
              <h3 className="font-display text-2xl mb-4">Nuestros programas online</h3>
              <ul className="space-y-3">
                {[
                  ['Máster en Global Luxury Business', 'https://master-lujo.ielujo.com'],
                  ['Diplomado Luxury Sales', 'https://luxury-sales.ielujo.com'],
                  ['Diplomado Luxury Management', 'https://luxury-management.ielujo.com'],
                  ['Diplomado Luxury Experience & Service', 'https://luxury-experience.ielujo.com'],
                  ['Programa Ejecutivo en Luxurización', 'https://creacion-y-luxurizacion.ielujo.com'],
                ].map(([n, u], i) => (
                  <li key={i}>
                    <a href={u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#b08d2a' }} />
                      <span className="text-sm font-medium">{n}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-black text-center border-t border-white/5">
        <img src="/logo-ielujo.png" alt="IELujo" className="h-12 w-auto mx-auto mb-4 brightness-0 invert opacity-80" />
        <p className="text-gray-500 text-sm font-light uppercase tracking-widest mb-2">Instituto Europeo del Lujo</p>
        <p className="text-gray-600 text-xs font-light">© 2026 Instituto Europeo del Lujo — IELujo. Socios estratégicos de la Universidad Anáhuac de México.</p>
      </footer>
    </div>
  );
};

export default App;
