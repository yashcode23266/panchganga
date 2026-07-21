import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import Lightbox from '../components/Lightbox.jsx';
import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { galleryImages } from '../data/images.js';

export default function Gallery() {
  const [active, setActive] = useState(null);
  const galleryRef = useRef(null);
  const { t, pick } = useLanguage();
  const yearlyGalleries = useMemo(() => {
    const galleriesByYear = new Map();
    galleryImages.forEach((item) => {
      if (!galleriesByYear.has(item.year)) galleriesByYear.set(item.year, []);
      galleriesByYear.get(item.year).push(item);
    });
    return Array.from(galleriesByYear, ([year, images]) => ({
      year,
      cover: images[0],
      images,
    }));
  }, []);

  const scrollGallery = (direction) => {
    galleryRef.current?.scrollBy({
      left: direction * Math.min(galleryRef.current.clientWidth * 0.82, 420),
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Seo titleKey="seo.galleryTitle" descriptionKey="seo.galleryDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} text={t('gallery.intro')} centered />
        </div>
      </section>

      <section className="section-pad pt-4 sm:pt-6">
        <div className="container-pad">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
            <p className="text-sm font-semibold text-mandal-ink/60">Swipe through our celebrations, one memorable year at a time.</p>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button type="button" onClick={() => scrollGallery(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-mandal-green/10 bg-white text-mandal-green shadow-soft transition hover:border-mandal-gold hover:bg-mandal-mint" aria-label="Previous year">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => scrollGallery(1)} className="grid h-11 w-11 place-items-center rounded-full border border-mandal-green/10 bg-white text-mandal-green shadow-soft transition hover:border-mandal-gold hover:bg-mandal-mint" aria-label="Next year">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div ref={galleryRef} className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8">
          {yearlyGalleries.map(({ year, cover, images }) => (
            <button
              type="button"
              key={year}
              onClick={() => setActive({ year, images })}
              className="group w-[82vw] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-white text-left shadow-soft transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(13,63,35,0.16)] sm:w-[22rem] lg:w-[24rem]"
            >
              <div className="relative overflow-hidden bg-mandal-mint/35">
                <img className="h-72 w-full object-contain transition duration-700 group-hover:scale-105" src={cover.src} alt={pick(cover.alt)} loading="lazy" />
                <span className="absolute left-5 top-5 rounded-full bg-mandal-green px-4 py-2 text-sm font-bold text-white shadow-soft">{year}</span>
              </div>
              <div className="border-t border-mandal-green/10 p-5">
                <p className="font-display text-2xl font-bold text-mandal-green">{pick(cover.caption)}</p>
                <p className="mt-1 text-sm font-semibold text-mandal-ink/55">{images.length} {images.length === 1 ? 'photo' : 'photos'}</p>
              </div>
            </button>
          ))}
          </div>
          <div className="mt-2 flex justify-center gap-2 sm:hidden">
            <button type="button" onClick={() => scrollGallery(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-mandal-green/10 bg-white text-mandal-green shadow-soft" aria-label="Previous year"><ChevronLeft size={19} /></button>
            <button type="button" onClick={() => scrollGallery(1)} className="grid h-10 w-10 place-items-center rounded-full border border-mandal-green/10 bg-white text-mandal-green shadow-soft" aria-label="Next year"><ChevronRight size={19} /></button>
          </div>
        </div>
      </section>
      <Lightbox gallery={active} onClose={() => setActive(null)} />
    </>
  );
}
