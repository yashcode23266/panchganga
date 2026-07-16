import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { aboutImages, timeline } from '../data/images.js';

export default function About() {
  const { t, pick } = useLanguage();
  const sections = [
    ['about.beginningTitle', 'about.beginningText'],
    ['about.traditionTitle', 'about.traditionText'],
    ['about.communityTitle', 'about.communityText'],
  ];

  return (
    <>
      <Seo titleKey="seo.aboutTitle" descriptionKey="seo.aboutDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('about.eyebrow')} title={t('about.title')} text={t('about.intro')} centered />
          <p className="mt-5 text-center text-sm font-bold uppercase tracking-[0.24em] text-mandal-gold">
            {t('brand.established')}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-5">
            {aboutImages.map((image) => (
              <img
                key={image.src}
                className="rounded-[2rem] border border-mandal-green/10 bg-white object-contain shadow-soft"
                src={image.src}
                alt={pick(image.alt)}
                loading="lazy"
              />
            ))}
          </div>
          <div className="grid gap-6">
            {sections.map(([titleKey, textKey], index) => (
              <article key={titleKey} className="border-l-4 border-mandal-gold bg-white/55 px-6 py-5">
                <p className="text-sm font-bold text-mandal-leaf">0{index + 1}</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-mandal-green">{t(titleKey)}</h2>
                <p className="mt-3 leading-8 text-mandal-ink/70">{t(textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad green-wash">
        <div className="container-pad">
          <h2 className="text-center font-display text-4xl font-bold text-mandal-green">{t('about.timelineTitle')}</h2>
          <div className="mx-auto mt-12 max-w-4xl">
            {timeline.map((item, index) => (
              <div key={item.year} className="grid grid-cols-[5.5rem_1fr] gap-5 border-l border-mandal-green/15 pb-10 last:pb-0 sm:grid-cols-[8rem_1fr]">
                <div className="-ml-px border-l-4 border-mandal-gold pl-4 font-display text-3xl font-bold text-mandal-green">
                  {item.year}
                </div>
                <div className={index === timeline.length - 1 ? '' : 'border-b border-mandal-green/10 pb-8'}>
                  <h3 className="font-display text-2xl font-bold text-mandal-green">{pick(item.title)}</h3>
                  <p className="mt-2 leading-7 text-mandal-ink/70">{pick(item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
