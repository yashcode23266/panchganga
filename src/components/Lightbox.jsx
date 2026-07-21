import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Lightbox({ gallery, onClose }) {
  const { pick, t } = useLanguage();
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const thumbsRef = useRef(null);

  const images = gallery?.images ?? [];
  const activeImage = images[index];
  const hasMultipleImages = images.length > 1;

  const prev = () => {
    if (!hasMultipleImages) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    if (!hasMultipleImages) return;
    setIndex((i) => (i + 1) % images.length);
  };

  // Reset index + lock scroll + keyboard nav whenever gallery changes
  useEffect(() => {
    if (!gallery) return undefined;
    setIndex(0);
    const onKeyDown = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'ArrowLeft')   prev();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery]);

  // Auto-scroll the active thumbnail into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const active = thumbsRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [index]);

  if (!gallery || !activeImage) return null;

  // Swipe handlers
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const delta = endX - startX.current;
    if (delta >  40) prev();
    if (delta < -40) next();
    startX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[99999] grid place-items-center bg-mandal-ink/75 p-4 animate-lightbox"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop click to close */}
      <button className="absolute inset-0 cursor-default" type="button" aria-label={t('common.close')} onClick={onClose} />

      {/* ── Modal card ── */}
      <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[1.25rem] bg-mandal-ivory shadow-soft"
           style={{ maxHeight: '92vh' }}>

        {/* ── Top bar ── */}
        <div className="flex shrink-0 items-center gap-3 border-b border-mandal-green/10 px-6 py-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-mandal-green/20 bg-white px-4 py-2 text-sm font-semibold text-mandal-green shadow-soft transition hover:border-mandal-gold hover:bg-mandal-mint"
          >
            <ArrowLeft size={15} />
            {t('common.back') ?? 'Back'}
          </button>

          {/* Year + title */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-mandal-green/60">
              {t('gallery.eyebrow')}
            </p>
            <h3 className="font-display text-xl font-bold leading-tight text-mandal-green">
              {gallery.year}
            </h3>
          </div>

          {/* Counter */}
          <span className="rounded-full bg-mandal-mint px-3 py-1 text-sm font-bold text-mandal-green">
            {index + 1} / {images.length}
          </span>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mandal-red text-white shadow-soft transition hover:opacity-80"
            aria-label={t('common.close')}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Main image (swipeable) ── */}
        <div
          className="relative shrink-0 bg-white"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          <img
            key={index}
            className="mx-auto block max-h-[52vh] w-full object-contain px-4 py-4"
            src={activeImage.src}
            alt={pick(activeImage.alt)}
            loading="lazy"
            decoding="async"
          />

          {/* Prev / Next arrows — always visible (not md:grid) */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-mandal-green shadow-soft transition hover:bg-mandal-mint hover:text-mandal-green"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-mandal-green shadow-soft transition hover:bg-mandal-mint hover:text-mandal-green"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* ── Caption ── */}
        {activeImage.caption && (
          <p className="shrink-0 border-t border-mandal-green/10 bg-mandal-ivory px-6 py-3 text-center font-display text-lg font-bold text-mandal-green">
            {pick(activeImage.caption)}
          </p>
        )}

        {/* ── Scrollable thumbnail strip ── */}
        {hasMultipleImages && (
          <div className="shrink-0 border-t border-mandal-green/10 bg-white px-5 py-4">

            {/* Scroll hint */}
            <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-widest text-mandal-green/40">
              ← Scroll to see all {images.length} photos →
            </p>

            {/* Horizontal scroll row */}
            <div
              ref={thumbsRef}
              className="flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:thin]"
              style={{ scrollbarColor: '#1B5E3B33 transparent' }}
            >
              {images.map((image, i) => (
                <button
                  key={`${image.src}-${i}`}
                  type="button"
                  data-active={i === index ? 'true' : 'false'}
                  onClick={() => setIndex(i)}
                  className="shrink-0 overflow-hidden rounded-xl transition-all duration-200"
                  style={{
                    width: 88,
                    height: 66,
                    outline: i === index
                      ? '2.5px solid #1B5E3B'
                      : '2px solid transparent',
                    outlineOffset: 2,
                    opacity: i === index ? 1 : 0.55,
                    transform: i === index ? 'scale(1.07)' : 'scale(1)',
                  }}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={image.src}
                    alt={pick(image.alt)}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            {/* Dot / pill indicator */}
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    height: 6,
                    width: i === index ? 22 : 6,
                    background: i === index ? '#1B5E3B' : '#1B5E3B33',
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}