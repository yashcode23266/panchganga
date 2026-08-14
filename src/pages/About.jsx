import { motion } from 'framer-motion';
import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { aboutImages } from '../data/images.js';

// ── Data ─────────────────────────────────────────────────────

const PILLARS = [
  {
    num: '01',
    title: { en: 'Established with Purpose', mr: 'उद्देशाने स्थापना' },
    text: {
      en: 'Founded in 1990, Panchganga Sarvajanik Utsav Mandal has grown into one of Mumbai\'s most respected public Ganesh mandals. For over 35 years, devotion, discipline, and community spirit have guided every celebration.',
      mr: '१९९० मध्ये स्थापन झालेले पंचगंगा सार्वजनिक उत्सव मंडळ मुंबईतील अत्यंत आदराच्या गणेश मंडळांपैकी एक बनले आहे. ३५+ वर्षांहून अधिक काळ भक्ती, शिस्त आणि समाजभावना यांनी प्रत्येक उत्सवाला मार्गदर्शन केले आहे.',
    },
  },
  {
    num: '02',
    title: { en: 'Eco-Friendly Milestones', mr: 'पर्यावरणपूरक टप्पे' },
    text: {
      en: 'Recognised in the Limca Book of Records for the unique display of 108 eco-friendly Lord Ganesha idols, each carrying a powerful social message. Multiple BMC awards further honour the mandal\'s commitment to environmental responsibility.',
      mr: '१०८ पर्यावरणपूरक गणेश मूर्तींच्या अनोख्या प्रदर्शनासाठी लिम्का बुक ऑफ रेकॉर्ड्समध्ये नोंद, ज्यातील प्रत्येक मूर्ती सामाजिक संदेश देते. महापालिकेचे विविध पर्यावरणपूरक पुरस्कार मंडळाचा गौरव करतात.',
    },
  },
  {
    num: '03',
    title: { en: 'Social Awareness Through Faith', mr: 'श्रद्धेतून सामाजिक जाणीव' },
    text: {
      en: 'Each year\'s theme shines a light on a different section of society — visually impaired individuals, differently-abled persons, acid attack survivors, cancer patients, transgender communities, senior citizens — reminding all that Ganeshotsav is a celebration with a purpose.',
      mr: 'दरवर्षी मंडळाचा देखावा समाजातील विविध घटकांवर - दृष्टिहीन, दिव्यांग, ॲसिड हल्लाग्रस्त, कर्करोग रुग्ण, तृतीयपंथी, वयोवृद्ध - प्रकाश टाकतो, ज्यामुळे गणेशोत्सव हा उद्देशपूर्ण उत्सव ठरतो.',
    },
  },
];

const AWARDS = [
  {
    label: { en: 'Limca Book of Records', mr: 'लिम्का बुक ऑफ रेकॉर्ड्स' },
    desc: { en: 'Display of 108 eco-friendly Ganesha idols, each with a distinct social message.', mr: '१०८ पर्यावरणपूरक गणेशमूर्तींचे प्रदर्शन, प्रत्येक मूर्तीवर सामाजिक संदेश.' },
  },
  {
    label: { en: 'BMC Eco-Friendly Award', mr: 'महापालिका पर्यावरणपूरक पुरस्कार' },
    desc: { en: 'Multiple years of recognition for sustainable Ganeshotsav practices.', mr: 'शाश्वत गणेशोत्सव पद्धतींसाठी अनेक वर्षांचा महापालिका गौरव.' },
  },
  {
    label: { en: 'Creative Decoration Award', mr: 'सजावट कला पुरस्कार' },
    desc: { en: 'Honoured for innovative, theme-based artistic installations.', mr: 'नाविन्यपूर्ण आणि संकल्पना-आधारित कलात्मक सजावटीसाठी सन्मानित.' },
  },
  {
    label: { en: 'Public Awareness Award', mr: 'सामाजिक जागृती पुरस्कार' },
    desc: { en: 'Acknowledged for outstanding contribution to social consciousness.', mr: 'सामाजिक जागृतीमधील उत्कृष्ट योगदानाबद्दल गौरव.' },
  },
];

const SOCIAL_CAUSES = [
  { en: 'Visually Impaired Individuals', mr: 'दृष्टीहीन व्यक्ती' },
  { en: 'Differently-Abled Persons', mr: 'दिव्यांग व्यक्ती' },
  { en: 'Acid Attack Survivors', mr: 'ॲसिड हल्लाग्रस्त' },
  { en: 'Cancer Patients', mr: 'कर्करोग रुग्ण' },
  { en: 'Transgender Communities', mr: 'तृतीयपंथी समुदाय' },
  { en: 'Senior Citizens', mr: 'ज्येष्ठ नागरिक' },
  { en: 'Farmers & Rural Communities', mr: 'शेतकरी व ग्रामीण समुदाय' },
  { en: 'Women Empowerment', mr: 'महिला सक्षमीकरण' },
];

const TIMELINE = [
  {
    year: '1990',
    title: { en: 'Mandal Founded', mr: 'मंडळाची स्थापना' },
    text: { en: 'Panchganga Sarvajanik Utsav Mandal is established in Mumbai with a vision rooted in devotion and community service.', mr: 'भक्ती आणि समाजसेवेच्या भावनेतून मुंबईत पंचगंगा सार्वजनिक उत्सव मंडळाची स्थापना.' },
  },
  {
    year: '2000',
    title: { en: 'Social Awareness Themes Begin', mr: 'सामाजिक जनजागृती विषयांची सुरुवात' },
    text: { en: 'The mandal begins crafting annual themes that highlight marginalised sections of society, making Ganeshotsav a platform for meaningful change.', mr: 'समाजातील दुर्लक्षित घटकांवर प्रकाश टाकणारे वार्षिक देखावे करण्यास सुरुवात.' },
  },
  {
    year: '2010',
    title: { en: 'Eco-Friendly Pledge', mr: 'पर्यावरणपूरक संकल्प' },
    text: { en: 'A full transition to eco-friendly idols and decorations, setting a benchmark for sustainable celebrations across Mumbai.', mr: 'पर्यावरणपूरक मूर्ती आणि सजावटीचा पूर्ण स्वीकार, मुंबईभर शाश्वत उत्सवाचा आदर्श.' },
  },
  {
    year: '2017',
    title: { en: 'Limca Book of Records', mr: 'लिम्का बुक ऑफ रेकॉर्ड्स' },
    text: { en: 'Nationally recognised for the unique display of 108 eco-friendly Lord Ganesha idols — each carrying a distinct and powerful social message.', mr: '१०८ पर्यावरणपूरक गणेशमूर्तींच्या प्रदर्शनासाठी राष्ट्रीय स्तरावर लिम्का बुक ऑफ रेकॉर्ड्समध्ये नोंद.' },
  },
  {
    year: '2020',
    title: { en: '30 Years of Ganeshotsav', mr: 'गणेशोत्सवाची ३० वर्षे' },
    text: { en: 'Three decades of unbroken celebration. The mandal reaffirms its commitment: every festival for society, every initiative for transformation.', mr: 'तीन दशकांची अखंड परंपरा. प्रत्येक उत्सव समाजासाठी, प्रत्येक उपक्रम बदलासाठी.' },
  },
  {
    year: '2024',
    title: { en: 'Continuing the Legacy', mr: 'परंपरेचे सातत्य' },
    text: { en: 'With fresh themes, deeper community roots, and youth leadership, the mandal continues inspiring the next generation to celebrate responsibly.', mr: 'नवीन विषय, युवा नेतृत्व आणि सामाजिक बांधिलकीसह परंपरेची वाटचाल.' },
  },
];

// ── Small reusable decorative dot-pattern layer ─────────────────
function DotPattern({ opacity = 0.05, color = '#0F4D2F', size = 24 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

// ── Rotating ring group (Framer Motion handles the animation loop) ──
function RotatingRings({ radii, direction, duration }) {
  return (
    <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]">
      <motion.svg
        className="h-full w-full"
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: '450px 450px' }}
        animate={{ rotate: direction === 'cw' ? 360 : -360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration }}
      >
        {radii.map((r) => (
          <circle key={r} cx="450" cy="450" r={r} stroke="#D4AF37" strokeWidth="1" />
        ))}
      </motion.svg>
    </div>
  );
}

// ── Twinkling & floating glowing gold particle ──────────────
function TwinkleParticle({ x, y, r, delay, dx, dy, duration }) {
  return (
    <motion.circle
      cx={`${x}%`}
      cy={`${y}%`}
      r={r}
      fill="#FFD700"
      initial={{ opacity: 0.4, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: [0.4, 1, 0.6, 1, 0.4],
        scale: [1, 1.4, 0.95, 1.35, 1],
        x: [0, dx, -dx * 0.6, dx * 0.4, 0],
        y: [0, -dy, dy * 0.5, -dy * 0.6, 0],
      }}
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
      style={{
        transformOrigin: `${x}% ${y}%`,
        filter: 'drop-shadow(0px 0px 5px rgba(255, 215, 0, 0.9)) drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.6))',
      }}
    />
  );
}

const PARTICLES = [
  [10, 8], [92, 6], [6, 45], [96, 40], [16, 78],
  [88, 82], [50, 4], [50, 96], [28, 20], [72, 20],
  [22, 88], [80, 60], [4, 65], [97, 65],
].map(([x, y], i) => ({
  x,
  y,
  r: i % 3 === 0 ? 3 : 2,
  delay: (i % 7) * 0.45,
  dx: ((i % 4) + 1) * 2.5 * (i % 2 === 0 ? 1 : -1),
  dy: ((i % 3) + 2) * 3,
  duration: 5.5 + (i % 4) * 1.1,
}));

// ── Falling leaf particle ────────────────────────────────────
function FallingLeaf({ left, delay, duration, size, rotateStart }) {
  return (
    <motion.svg
      className="pointer-events-none absolute top-0"
      style={{ left: `${left}%`, width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
      initial={{ y: '-10%', x: 0, rotate: rotateStart, opacity: 0 }}
      animate={{
        y: ['-10%', '50vh', '115vh'],
        x: [0, 18, -14],
        rotate: [rotateStart, rotateStart + 180, rotateStart + 360],
        opacity: [0, 0.8, 0.7, 0],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: 'linear',
        times: [0, 0.5, 1],
      }}
    >
      <path
        d="M12 2C7 6 4 11 4 15c0 4.4 3.6 7 8 7s8-2.6 8-7c0-4-3-9-8-13Z"
        fill="#D4AF37"
        fillOpacity="0.55"
      />
      <path d="M12 4v18" stroke="#0F4D2F" strokeWidth="0.6" strokeOpacity="0.3" />
    </motion.svg>
  );
}

const LEAVES = [
  { left: 6, delay: 0, duration: 11, size: 18, rotateStart: 10 },
  { left: 16, delay: 3.2, duration: 13, size: 14, rotateStart: -20 },
  { left: 28, delay: 1.4, duration: 10, size: 20, rotateStart: 30 },
  { left: 40, delay: 5, duration: 12, size: 16, rotateStart: -10 },
  { left: 55, delay: 2.1, duration: 14, size: 18, rotateStart: 15 },
  { left: 68, delay: 6.5, duration: 11, size: 15, rotateStart: -25 },
  { left: 80, delay: 0.8, duration: 13, size: 19, rotateStart: 20 },
  { left: 90, delay: 4, duration: 10, size: 14, rotateStart: -15 },
];

// ── Component ─────────────────────────────────────────────────

export default function About() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.aboutTitle" descriptionKey="seo.aboutDescription" />

      {/* ══════════════════════════════════════════════
    HERO — dark glow + rotating rings + twinkling particles + falling leaves
════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#A3C73A] section-pad">

        {/* Decorative background layer */}
        <div className="pointer-events-none absolute inset-0">

          {/* Radial glow, centered behind logo/title */}
          <div
            className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.35) 15%, rgba(15,77,47,0.55) 55%, rgba(11,46,29,0.95) 75%, #0B2E1D 100%)',
            }}
          />

          {/* Concentric rings — alternating slow rotation for a subtle mandala-spin */}
          <RotatingRings radii={[90, 210, 330, 450]} direction="cw" duration={90} />
          <RotatingRings radii={[150, 270, 390]} direction="ccw" duration={120} />

          {/* Scattered gold particles — glowing, gentle twinkle/pulse, staggered */}
          <svg className="absolute inset-0 h-full w-full opacity-95 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            {PARTICLES.map((p, i) => (
              <TwinkleParticle key={i} {...p} />
            ))}
          </svg>

          {/* Falling leaves */}
          {LEAVES.map((leaf, i) => (
            <FallingLeaf key={i} {...leaf} />
          ))}
        </div>

        <div className="container-pad relative z-10 text-center">
          {/* Logo mark */}
          <div className="mx-auto mb-8 h-40 w-40">
            <img
              src="images/panlogo.png"
              alt={t('brand.name')}
              className="h-full w-full object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-mandal-green">
            {t('brand.established')}
          </p>

          <h1 className="font-display text-5xl font-bold leading-tight text-mandal-green sm:text-6xl lg:text-7xl">
            {t('brand.name')}
          </h1>

          <p className="mt-5 text-lg text-white/80 sm:text-xl">
            {pick({
              en: 'Culture • Environment • Awareness • Transformation',
              mr: 'संस्कृती • पर्यावरण • जनजागृती • परिवर्तन',
            })}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          </div>
        </div>
      </section>

      {/* ── INTRO + PHOTO ────────────────────────────────────── */}
      <section className="section-pad bg-white relative overflow-hidden">
        <DotPattern opacity={0.035} />
        <div className="container-pad relative grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Text */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
              {t('nav.about')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
              {pick({
                en: '35 Years of Faith & Service',
                mr: 'भक्ती आणि सेवेची ३५ वर्षे',
              })}
            </h2>
            <div className="mt-4 h-px w-12 bg-mandal-gold" />
            <p className="mt-6 leading-8 text-mandal-ink/70">
              {pick({
                en: 'Established in 1990, Panchganga Sarvajanik Utsav Mandal is one of Mumbai\'s respected public Ganesh mandals, committed to celebrating Ganeshotsav with devotion, social responsibility, environmental sustainability, and cultural values.',
                mr: '१९९० मध्ये स्थापन झालेले पंचगंगा सार्वजनिक उत्सव मंडळ हे मुंबईतील भक्ती, सामाजिक जबाबदारी, पर्यावरण शाश्वतता आणि सांस्कृतिक मूल्यांसह गणेशोत्सव साजरा करणारे आदरणीय मंडळ आहे.',
              })}
            </p>
            <p className="mt-4 leading-8 text-mandal-ink/70">
              {pick({
                en: 'For over 35 years, the mandal has been creating meaningful social awareness through innovative themes highlighting the lives of visually impaired individuals, differently-abled persons, acid attack survivors, cancer patients, transgender communities, senior citizens, and many other sections of society.',
                mr: '३५ वर्षांहून अधिक काळ मंडळाने दृष्टीहीन, दिव्यांग, ॲसिड हल्लाग्रस्त, कर्करोग रुग्ण, तृतीयपंथी, ज्येष्ठ नागरिक आणि समाजातील अनेक घटकांवर प्रकाश टाकणारे नाविन्यपूर्ण देखावे साकारून जनजागृती केली आहे.',
              })}
            </p>
            <p className="mt-4 leading-8 text-mandal-ink/70">
              {pick({
                en: 'Driven by the belief that Ganeshotsav is a celebration with a purpose, the mandal continues to inspire society by combining faith, tradition, innovation, and community service — while encouraging future generations to celebrate responsibly.',
                mr: 'गणेशोत्सव हा उद्देशपूर्ण उत्सव आहे या विश्वासाने प्रेरित होऊन मंडळ भक्ती, परंपरा आणि समाजसेवेचा संगम साधत भावी पिढीला जबाबदारीने उत्सव साजरा करण्यास प्रवृत्त करते.',
              })}
            </p>
          </div>

          {/* Photo with offset gold frame */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-mandal-gold/15" />
            {aboutImages?.[0] ? (
              <img
                src={aboutImages[0].src}
                alt={pick(aboutImages[0].alt)}
                loading="lazy"
                className="w-full rounded-[1.5rem] border border-mandal-green/10 bg-mandal-mint/20 object-cover shadow-soft"
                style={{ aspectRatio: '4/3' }}
              />
            ) : (
              <div
                className="w-full rounded-[1.5rem] border border-mandal-green/10 bg-mandal-mint/30"
                style={{ aspectRatio: '4/3' }}
              />
            )}
            {/* Floating stat */}
            <div className="absolute -bottom-5 left-6 rounded-xl bg-mandal-green px-6 py-4 shadow-soft">
              <p className="font-display text-3xl font-bold text-mandal-gold">35+</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-white/80">
                {pick({
                  en: 'Years of Ganeshotsav',
                  mr: 'गणेशोत्सवाची वर्षे',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────── */}
      <section className="section-pad green-wash relative overflow-hidden">
        <DotPattern opacity={0.05} />
        <div className="container-pad relative">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
            {pick({
              en: 'Our Foundation',
              mr: 'आमचा पाया',
            })}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            {pick({
              en: 'What We Stand For',
              mr: 'आमची उद्दिष्टे',
            })}
          </h2>
          <div className="mt-4 h-px w-12 bg-mandal-gold" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.num}
                className="group relative bg-white px-7 py-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ borderTop: '3px solid #D4AF37' }}
              >
                {/* soft gold halo behind the number */}
                <div className="pointer-events-none absolute right-6 top-4 h-16 w-16 rounded-full bg-mandal-gold/10 blur-xl transition-opacity duration-300 group-hover:opacity-80" />
                <p className="relative font-display text-4xl font-bold text-mandal-green/15">{p.num}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-mandal-green">{pick(p.title)}</h3>
                <div className="mt-3 h-px w-8 bg-mandal-gold transition-all duration-300 group-hover:w-14" />
                <p className="mt-4 text-sm leading-7 text-mandal-ink/65">{pick(p.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL CAUSES + SECOND PHOTO ─────────────────────── */}
      <section className="section-pad bg-white relative overflow-hidden">
        <DotPattern opacity={0.035} />
        <div className="container-pad relative grid gap-14 lg:grid-cols-2 lg:items-start">

          {/* Causes list */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
              {pick({
                en: 'Social Awareness',
                mr: 'सामाजिक जनजागृती',
              })}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
              {pick({
                en: 'Themes That Touch Society',
                mr: 'समाजाला स्पर्श करणारे देखावे',
              })}
            </h2>
            <div className="mt-4 h-px w-12 bg-mandal-gold" />
            <p className="mt-6 leading-8 text-mandal-ink/65">
              {pick({
                en: 'Each year, our Ganeshotsav theme sheds light on a different section of society — turning celebration into consciousness.',
                mr: 'दरवर्षी आमचा देखावा समाजातील एका दुर्लक्षित घटकावर प्रकाश टाकतो - उत्सवाचे रूपांतर सामाजिक जाणिवेत करतो.',
              })}
            </p>

            <ul className="mt-8 grid gap-0">
              {SOCIAL_CAUSES.map((cause, i) => (
                <li
                  key={pick(cause)}
                  className="group flex items-center gap-4 border-b border-mandal-green/10 py-3.5 transition-colors last:border-0 hover:bg-mandal-mint/10"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mandal-gold/10 font-display text-xs font-bold text-mandal-gold transition-colors group-hover:bg-mandal-gold group-hover:text-white"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-mandal-ink/80">{pick(cause)}</span>
                </li>
              ))}
              <li className="py-3.5 text-xs text-mandal-ink/40 italic">
                {pick({
                  en: 'and many more communities over 35 years',
                  mr: 'आणि गेल्या ३५ वर्षांत अनेक समाज घटक',
                })}
              </li>
            </ul>
          </div>

          {/* Photo with offset frame */}
          <div className="relative lg:sticky lg:top-24">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-mandal-green/10" />
            {aboutImages?.[1] ? (
              <img
                src={aboutImages[1].src}
                alt={pick(aboutImages[1].alt)}
                loading="lazy"
                className="w-full rounded-[1.5rem] border border-mandal-green/10 object-cover shadow-soft"
                style={{ aspectRatio: '3/4' }}
              />
            ) : (
              <div
                className="w-full rounded-[1.5rem] border border-mandal-green/10 bg-mandal-mint/30"
                style={{ aspectRatio: '3/4' }}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── AWARDS ───────────────────────────────────────────── */}
      <section className="section-pad green-wash relative overflow-hidden">
        <DotPattern opacity={0.05} />
        <div className="container-pad relative">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
            {pick({
              en: 'Recognition',
              mr: 'सन्मान व गौरव',
            })}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            {t('awardsPage.title')}
          </h2>
          <div className="mt-4 h-px w-12 bg-mandal-gold" />

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-mandal-green/10 bg-mandal-green/10 shadow-soft sm:grid-cols-2">
            {AWARDS.map((a) => (
              <div
                key={pick(a.label)}
                className="group bg-white px-7 py-8 transition-colors duration-300 hover:bg-mandal-mint/10"
              >
                <div className="mb-3 h-1 w-8 bg-mandal-gold transition-all duration-300 group-hover:w-14" />
                <h4 className="font-display text-lg font-bold text-mandal-green">{pick(a.label)}</h4>
                <p className="mt-2 text-sm leading-6 text-mandal-ink/60">{pick(a.desc)}</p>
              </div>
            ))}
          </div>

          {/* Limca highlight bar */}
          <div className="relative mt-10 overflow-hidden border-l-4 border-mandal-gold bg-white px-8 py-7 shadow-soft">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)' }}
            />
            <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
                  {pick({
                    en: 'National Recognition',
                    mr: 'राष्ट्रीय सन्मान',
                  })}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-mandal-green">
                  {pick({
                    en: 'Limca Book of Records',
                    mr: 'लिम्का बुक ऑफ रेकॉर्ड्स',
                  })}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mandal-ink/65">
                  {pick({
                    en: 'Nationally recognised for the unique display of 108 eco-friendly Lord Ganesha idols, each carrying a powerful and distinct social message — a milestone in the history of public Ganeshotsav celebrations in India.',
                    mr: '१०८ पर्यावरणपूरक गणेशमूर्तींच्या अनोख्या प्रदर्शनासाठी राष्ट्रीय स्तरावर लिम्का बुक ऑफ रेकॉर्ड्समध्ये नोंद, ज्यातील प्रत्येक मूर्तीवर सामाजिक संदेश होता - भारतातील गणेशोत्सवाच्या इतिहासातील एक मैलाचा दगड.',
                  })}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-5xl font-bold text-mandal-green/15">108</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="section-pad bg-white relative overflow-hidden">
        <DotPattern opacity={0.035} />
        <div className="container-pad relative">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
            {t('about.timelineHeader')}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            {pick({
              en: '35 Years in Brief',
              mr: '३५ वर्षांची वाटचाल',
            })}
          </h2>
          <div className="mt-4 h-px w-12 bg-mandal-gold" />

          <div className="mx-auto mt-12 max-w-3xl">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className="relative grid grid-cols-[6rem_1fr] gap-6 border-l border-mandal-green/15 pb-10 last:pb-0 sm:grid-cols-[8rem_1fr]"
              >
                {/* node dot on the line */}
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-mandal-gold ring-4 ring-white" />

                <div className="-ml-px border-l-4 border-mandal-gold pl-5 font-display text-2xl font-bold text-mandal-green">
                  {item.year}
                </div>
                <div className={index === TIMELINE.length - 1 ? 'pb-0' : 'border-b border-mandal-green/10 pb-8'}>
                  <h3 className="font-display text-xl font-bold text-mandal-green">{pick(item.title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-mandal-ink/65">{pick(item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}