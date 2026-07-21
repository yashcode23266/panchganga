import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Lightbox({ gallery, onClose }) {
  const { pick, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const images = gallery?.images ?? [];
  const activeImage = images[index];
  const hasMultipleImages = images.length > 1;

  const prev = () => {
    if (!hasMultipleImages) return;
    setIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    if (!hasMultipleImages) return;
    setIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!gallery) return undefined;
    setIndex(0);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery]);

  if (!gallery || !activeImage) return null;

  function onPointerDown(e) {
    startX.current = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
  }

  function onPointerUp(e) {
    if (startX.current === null) return;
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) || 0;
    const delta = endX - startX.current;
    const threshold = 40; // px
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    startX.current = null;
  }

  return (
    <div className="fixed inset-0 z-[99999] grid place-items-center bg-mandal-ink/75 p-4 animate-lightbox" role="dialog" aria-modal="true">
      <button className="absolute inset-0 cursor-default" type="button" aria-label={t('common.close')} onClick={onClose} />
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[1.25rem] bg-mandal-ivory shadow-soft">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-mandal-red text-white shadow-soft"
          aria-label={t('common.close')}
        >
          <X size={20} />
        </button>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={prev}
              className="hidden md:grid absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-mandal-green shadow-soft"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={next}
              className="hidden md:grid absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-mandal-green shadow-soft"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow text-sm font-medium text-mandal-green/80">{t('gallery.eyebrow')}</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-mandal-green">{gallery.year}</h3>
            </div>
            <p className="mr-14 rounded-full bg-mandal-mint px-3 py-1 text-sm font-bold text-mandal-green">{index + 1} / {images.length}</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-4 w-full rounded-lg bg-white p-3" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onTouchStart={onPointerDown} onTouchEnd={onPointerUp}>
            <img className="mx-auto max-h-[60vh] w-full rounded object-contain" src={activeImage.src} alt={pick(activeImage.alt)} loading="lazy" decoding="async" />
          </div>

          <p className="mb-4 text-center font-display text-xl font-bold text-mandal-green">{pick(activeImage.caption)}</p>

          {hasMultipleImages && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, i) => (
                <button
                  key={`${image.src}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`overflow-hidden rounded-xl bg-white p-1 transition-shadow ${i === index ? 'ring-2 ring-mandal-green/50' : 'hover:shadow-sm'}`}
                >
                  <img className="h-32 w-full object-cover" src={image.src} alt={pick(image.alt)} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
