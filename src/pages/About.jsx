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

// ── Component ─────────────────────────────────────────────────

export default function About() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.aboutTitle" descriptionKey="seo.aboutDescription" />

      {/* ══════════════════════════════════════════════
          HERO — devotional gradient, name, tagline
      ══════════════════════════════════════════════ */}
      <section className="section-pad devotional-gradient">
        <div className="container-pad text-center">
          

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-mandal-gold">
            Est. 1990 · Mumbai
          </p>

          <h1 className="font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl lg:text-6xl">
            Panchganga Sarvajanik<br className="hidden sm:block" /> Utsav Mandal
          </h1>

          {/* Marathi tagline */}
          <p className="mt-5 font-display text-lg italic text-mandal-green/70 sm:text-xl">
            संस्कृती • पर्यावरण • प्रबोधन • परिवर्तन
          </p>
          <p className="mt-1 text-sm font-semibold tracking-wide text-mandal-ink/60">
            Culture • Environment • Awareness • Transformation
          </p>

        </div>
      </section>


      {/* ── INTRO + PHOTO ────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-pad grid gap-14 lg:grid-cols-2 lg:items-center">

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

          {/* Photo */}
          <div className="relative">
            {aboutImages?.[0] ? (
              <img
                src={aboutImages[0].src}
                alt={pick(aboutImages[0].alt)}
                loading="lazy"
                className="w-full rounded-[1.5rem] border border-mandal-green/10 bg-mandal-mint/20 object-cover shadow-soft"
                style={{ aspectRatio: '4/3' }}
              />
            ) : (
              /* Placeholder if no aboutImages configured yet */
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
      <section className="section-pad green-wash">
        <div className="container-pad">
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
                className="bg-white px-7 py-8 shadow-soft"
                style={{ borderTop: '3px solid #D4AF37' }}
              >
                <p className="font-display text-4xl font-bold text-mandal-green/10">{p.num}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-mandal-green">{p.title}</h3>
                <div className="mt-3 h-px w-8 bg-mandal-gold" />
                <p className="mt-4 text-sm leading-7 text-mandal-ink/65">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL CAUSES + SECOND PHOTO ─────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-pad grid gap-14 lg:grid-cols-2 lg:items-start">

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
                  className="flex items-center gap-4 border-b border-mandal-green/10 py-3.5 last:border-0"
                >
                  <span
                    className="shrink-0 font-display text-xs font-bold text-mandal-gold"
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

          {/* Photo */}
          <div className="lg:sticky lg:top-24">
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
      <section className="section-pad green-wash">
        <div className="container-pad">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-mandal-gold">
            Recognition
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-mandal-green sm:text-4xl">
            Awards &amp; Milestones
          </h2>
          <div className="mt-4 h-px w-12 bg-mandal-gold" />

          <div className="mt-10 grid gap-px border border-mandal-green/10 bg-mandal-green/10 sm:grid-cols-2">
            {AWARDS.map((a) => (
              <div key={a.label} className="bg-white px-7 py-8">
                <h4 className="font-display text-lg font-bold text-mandal-green">{a.label}</h4>
                <p className="mt-2 text-sm leading-6 text-mandal-ink/60">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Limca highlight bar */}
          <div className="mt-10 grid gap-6 border-l-4 border-mandal-gold bg-white px-8 py-7 shadow-soft sm:grid-cols-[1fr_auto] sm:items-center">
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
              <p className="font-display text-5xl font-bold text-mandal-green/10">108</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-pad">
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
                className="grid grid-cols-[6rem_1fr] gap-6 border-l border-mandal-green/15 pb-10 last:pb-0 sm:grid-cols-[8rem_1fr]"
              >
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