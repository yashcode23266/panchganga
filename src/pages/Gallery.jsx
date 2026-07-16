import { useMemo, useState } from 'react';
import Lightbox from '../components/Lightbox.jsx';
import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { galleryImages } from '../data/images.js';

export default function Gallery() {
  const [year, setYear] = useState('all');
  const [active, setActive] = useState(null);
  const { t, pick } = useLanguage();
  const years = useMemo(() => ['all', ...new Set(galleryImages.map((item) => item.year))], []);
  const filtered = year === 'all' ? galleryImages : galleryImages.filter((item) => item.year === year);

  return (
    <>
      <Seo titleKey="seo.galleryTitle" descriptionKey="seo.galleryDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} text={t('gallery.intro')} centered />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {years.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setYear(item)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  year === item ? 'bg-mandal-green text-white' : 'bg-white text-mandal-green hover:bg-mandal-mint'
                }`}
              >
                {item === 'all' ? t('gallery.allYears') : item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((image) => (
            <button
              type="button"
              key={`${image.year}-${pick(image.caption)}`}
              onClick={() => setActive(image)}
              className="group overflow-hidden rounded-[1.5rem] bg-white text-left shadow-soft transition hover:-translate-y-1"
            >
              <img className="h-72 w-full bg-mandal-mint/35 object-contain" src={image.src} alt={pick(image.alt)} loading="lazy" />
              <div className="border-t border-mandal-green/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mandal-leaf">{image.year}</p>
                <p className="mt-2 font-display text-2xl font-bold text-mandal-green">{pick(image.caption)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
