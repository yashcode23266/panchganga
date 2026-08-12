import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { aboutImages } from '../data/images.js';

// ── Data ─────────────────────────────────────────────────────

const PILLARS = [
  {
    num: '01',
    title: 'Established with Purpose',
    text: 'Founded in 1990, Panchganga Sarvajanik Utsav Mandal has grown into one of Mumbai\'s most respected public Ganesh mandals. For over 35 years, devotion, discipline, and community spirit have guided every celebration.',
  },
  {
    num: '02',
    title: 'Eco-Friendly Milestones',
    text: 'Recognised in the Limca Book of Records for the unique display of 108 eco-friendly Lord Ganesha idols, each carrying a powerful social message. Multiple BMC awards further honour the mandal\'s commitment to environmental responsibility.',
  },
  {
    num: '03',
    title: 'Social Awareness Through Faith',
    text: 'Each year\'s theme shines a light on a different section of society — visually impaired individuals, differently-abled persons, acid attack survivors, cancer patients, transgender communities, senior citizens — reminding all that Ganeshotsav is a celebration with a purpose.',
  },
];

const AWARDS = [
  { label: 'Limca Book of Records', desc: 'Display of 108 eco-friendly Ganesha idols, each with a distinct social message.' },
  { label: 'BMC Eco-Friendly Award', desc: 'Multiple years of recognition for sustainable Ganeshotsav practices.' },
  { label: 'Creative Decoration Award', desc: 'Honoured for innovative, theme-based artistic installations.' },
  { label: 'Public Awareness Award', desc: 'Acknowledged for outstanding contribution to social consciousness.' },
];

const SOCIAL_CAUSES = [
  'Visually Impaired Individuals',
  'Differently-Abled Persons',
  'Acid Attack Survivors',
  'Cancer Patients',
  'Transgender Communities',
  'Senior Citizens',
  'Farmers & Rural Communities',
  'Women Empowerment',
];

const TIMELINE = [
  { year: '1990', title: 'Mandal Founded', text: 'Panchganga Sarvajanik Utsav Mandal is established in Mumbai with a vision rooted in devotion and community service.' },
  { year: '2000', title: 'Social Awareness Themes Begin', text: 'The mandal begins crafting annual themes that highlight marginalised sections of society, making Ganeshotsav a platform for meaningful change.' },
  { year: '2010', title: 'Eco-Friendly Pledge', text: 'A full transition to eco-friendly idols and decorations, setting a benchmark for sustainable celebrations across Mumbai.' },
  { year: '2015', title: 'Limca Book of Records', text: 'Nationally recognised for the unique display of 108 eco-friendly Lord Ganesha idols — each carrying a distinct and powerful social message.' },
  { year: '2020', title: '30 Years of Ganeshotsav', text: 'Three decades of unbroken celebration. The mandal reaffirms its commitment: every festival for society, every initiative for transformation.' },
  { year: '2024', title: 'Continuing the Legacy', text: 'With fresh themes, deeper community roots, and youth leadership, the mandal continues inspiring the next generation to celebrate responsibly.' },
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

// ── Component ─────────────────────────────────────────────────

export default function About() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.aboutTitle" descriptionKey="seo.aboutDescription" />

  {/* ══════════════════════════════════════════════
    HERO — dark glow + rings + particles, mandal theme
════════════════════════════════════════════════ */}
<section className="relative overflow-hidden bg-[#A3C73A] section-pad">

  {/* Decorative background layer */}
  <div className="pointer-events-none absolute inset-0">

    {/* Radial glow, centered behind logo/title */}
    <div
      className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
      style={{
        background:
          'radial-gradient(circle, rgba(212,175,55,0.35) 15%, rgba(15,77,47,0.55) 55%, rgba(11,46,29,0.95) 65%, #0B2E1D 100%)',
      }}
    />

    {/* Concentric rings */}
    <svg
      className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
      viewBox="0 0 900 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[90, 150, 210, 270, 330, 390, 450].map((r) => (
        <circle key={r} cx="450" cy="450" r={r} stroke="#D4AF37" strokeWidth="1" />
      ))}
    </svg>

    {/* Scattered gold particles */}
    <svg className="absolute inset-0 h-full w-full opacity-70" xmlns="http://www.w3.org/2000/svg">
      {[
        [10, 8], [92, 6], [6, 45], [96, 40], [16, 78],
        [88, 82], [50, 4], [50, 96], [28, 20], [72, 20],
        [22, 88], [80, 60], [4, 65], [97, 65],
      ].map(([x, y], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 3 === 0 ? 3 : 2} fill="#D4AF37" />
      ))}
    </svg>
  </div>



  <div className="container-pad relative z-10 text-center">
   {/* Logo mark */}
<div className="mx-auto mb-8 h-40 w-40">
  <img
    src="images/panlogo.png"
    alt="Panchganga Sarvajanik Utsav Mandal Logo"
    className="h-full w-full object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
  />
</div>

    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-mandal-green">
      Established 1990
    </p>

    <h1 className="font-display text-5xl font-bold leading-tight text-mandal-green sm:text-6xl lg:text-7xl">
      Panchganga Sarvajanik Utsav Mandal
    </h1>

    <p className="mt-5 text-lg text-white/80 sm:text-xl">
      Culture • Environment • Awareness • Transformation
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
              About Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
              35 Years of Faith &amp; Service
            </h2>
            <div className="mt-4 h-px w-12 bg-mandal-gold" />
            <p className="mt-6 leading-8 text-mandal-ink/70">
              Established in <strong className="font-semibold text-mandal-green">1990</strong>,
              Panchganga Sarvajanik Utsav Mandal is one of Mumbai's respected public Ganesh mandals,
              committed to celebrating Ganeshotsav with devotion, social responsibility,
              environmental sustainability, and cultural values.
            </p>
            <p className="mt-4 leading-8 text-mandal-ink/70">
              For over 35 years, the mandal has been creating meaningful social awareness through
              innovative themes highlighting the lives of visually impaired individuals,
              differently-abled persons, acid attack survivors, cancer patients, transgender
              communities, senior citizens, and many other sections of society.
            </p>
            <p className="mt-4 leading-8 text-mandal-ink/70">
              Driven by the belief that Ganeshotsav is a celebration with a purpose, the mandal
              continues to inspire society by combining faith, tradition, innovation, and community
              service — while encouraging future generations to celebrate responsibly.
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
                Years of Ganeshotsav
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
            Our Foundation
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            What We Stand For
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
                <h3 className="mt-3 font-display text-xl font-bold text-mandal-green">{p.title}</h3>
                <div className="mt-3 h-px w-8 bg-mandal-gold transition-all duration-300 group-hover:w-14" />
                <p className="mt-4 text-sm leading-7 text-mandal-ink/65">{p.text}</p>
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
              Social Awareness
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
              Themes That Touch Society
            </h2>
            <div className="mt-4 h-px w-12 bg-mandal-gold" />
            <p className="mt-6 leading-8 text-mandal-ink/65">
              Each year, our Ganeshotsav theme sheds light on a different section of society —
              turning celebration into consciousness.
            </p>

            <ul className="mt-8 grid gap-0">
              {SOCIAL_CAUSES.map((cause, i) => (
                <li
                  key={cause}
                  className="group flex items-center gap-4 border-b border-mandal-green/10 py-3.5 transition-colors last:border-0 hover:bg-mandal-mint/10"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mandal-gold/10 font-display text-xs font-bold text-mandal-gold transition-colors group-hover:bg-mandal-gold group-hover:text-white"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-mandal-ink/80">{cause}</span>
                </li>
              ))}
              <li className="py-3.5 text-xs text-mandal-ink/40 italic">
                and many more communities over 35 years
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
            Recognition
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            Awards &amp; Milestones
          </h2>
          <div className="mt-4 h-px w-12 bg-mandal-gold" />

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-mandal-green/10 bg-mandal-green/10 shadow-soft sm:grid-cols-2">
            {AWARDS.map((a) => (
              <div
                key={a.label}
                className="group bg-white px-7 py-8 transition-colors duration-300 hover:bg-mandal-mint/10"
              >
                <div className="mb-3 h-1 w-8 bg-mandal-gold transition-all duration-300 group-hover:w-14" />
                <h4 className="font-display text-lg font-bold text-mandal-green">{a.label}</h4>
                <p className="mt-2 text-sm leading-6 text-mandal-ink/60">{a.desc}</p>
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
                  National Recognition
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-mandal-green">
                  Limca Book of Records
                </h3>
                <p className="mt-3 text-sm leading-7 text-mandal-ink/65">
                  Nationally recognised for the unique display of{' '}
                  <strong className="font-semibold text-mandal-green">108 eco-friendly Lord Ganesha idols</strong>,
                  each carrying a powerful and distinct social message — a milestone in the history of
                  public Ganeshotsav celebrations in India.
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
            Our Journey
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            35 Years in Brief
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
                  <h3 className="font-display text-xl font-bold text-mandal-green">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-mandal-ink/65">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}