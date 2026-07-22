import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Lightbox({ gallery, onClose }) {
  const { pick, t } = useLanguage();
  const [focused, setFocused] = useState(null); // null = grid, number = single photo
  const startX = useRef(null);
  const thumbRowRef = useRef(null);

  const images = gallery?.images ?? [];

  // Reset + lock body scroll
  useEffect(() => {
    if (gallery) { setFocused(null); document.body.style.overflow = 'hidden'; }
    return () => { document.body.style.overflow = ''; };
  }, [gallery]);

  // Arrow navigation (single-photo mode)
  const prev = useCallback(() => setFocused(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setFocused(i => (i + 1) % images.length), [images.length]);

  // Keyboard
  useEffect(() => {
    if (!gallery) return;
    const onKey = (e) => {
      if (e.key === 'Escape')      { focused !== null ? setFocused(null) : onClose(); }
      if (e.key === 'ArrowRight' && focused !== null) next();
      if (e.key === 'ArrowLeft'  && focused !== null) prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gallery, focused, next, prev, onClose]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!thumbRowRef.current || focused === null) return;
    const el = thumbRowRef.current.querySelector('[data-active="true"]');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [focused]);

  // Swipe (single-photo mode)
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx >  40) prev();
    if (dx < -40) next();
    startX.current = null;
  };

  if (!gallery) return null;

  const cover = images[0];
  const focusedImg = focused !== null ? images[focused] : null;

  return (
    /* Full-screen ivory modal — matches screenshot background */
    <div
      className="fixed inset-0 z-[99999] flex flex-col"
      style={{ background: '#FAF5EE' }}
      role="dialog"
      aria-modal="true"
    >

      {/* ── HEADER ──────────────────────────────────────────────
          Logo square │ eyebrow + big title │ [back] │ red ✕
          Exactly as shown in the screenshot
      ──────────────────────────────────────────────────────── */}
      <header
        className="flex shrink-0 items-center gap-4 px-5 py-4 sm:px-8"
        style={{ borderBottom: '1.5px solid rgba(0,0,0,0.07)' }}
      >
        {/* Logo / icon tile */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow"
          style={{ background: 'linear-gradient(135deg,#FF6B00,#FFD700)' }}
        >
          {gallery.logo
            ? <img src={gallery.logo} alt="" className="h-full w-full object-cover" />
            : <span className="text-2xl select-none">🙏</span>
          }
        </div>

        {/* Text block */}
        <div className="min-w-0 flex-1">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: '#1B5E3B99' }}
          >
            {focused !== null
              ? `← ${t('gallery.eyebrow') ?? 'Gallery'} · ${gallery.year}`
              : (t('gallery.eyebrow') ?? 'Gallery')}
          </p>
          <h2
            className="truncate font-display text-2xl font-bold leading-tight"
            style={{ color: '#1B5E3B', fontFamily: '"Georgia", serif' }}
          >
            {focused !== null
              ? (pick(focusedImg?.caption) || `Photo ${focused + 1} of ${images.length}`)
              : (pick(cover?.caption) || String(gallery.year))
            }
          </h2>
        </div>

        {/* "All photos" back button — only in single-photo mode */}
        {focused !== null && (
          <button
            type="button"
            onClick={() => setFocused(null)}
            className="hidden sm:flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-mandal-mint"
            style={{ borderColor: '#1B5E3B33', color: '#1B5E3B', background: 'white' }}
          >
            <ChevronLeft size={14} />
            All photos
          </button>
        )}

        {/* Red ✕ — matches screenshot exactly */}
        <button
          type="button"
          onClick={focused !== null ? () => setFocused(null) : onClose}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white shadow-md transition hover:opacity-80"
          style={{ background: '#C0392B' }}
          aria-label={t('common.close') ?? 'Close'}
        >
          <X size={20} />
        </button>
      </header>

      {/* ── GRID VIEW ──────────────────────────────────────────
          3-column masonry grid, each photo in a rounded card.
          Clicking any photo enters single-photo view.
      ──────────────────────────────────────────────────────── */}
      {focused === null && (
        <div
          className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1B5E3B33 transparent' }}
        >
          {/* CSS columns = natural masonry — no JS lib needed */}
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
            {images.map((image, i) => (
              <button
                key={`${image.src}-${i}`}
                type="button"
                onClick={() => setFocused(i)}
                className="group block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={pick(image.alt)}
                    loading="lazy"
                    decoding="async"
                    className="block w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Caption hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-2 text-sm font-semibold text-white">
                      {pick(image.caption) || pick(image.alt) || `Photo ${i + 1}`}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="h-10" />
        </div>
      )}

      {/* ── SINGLE PHOTO VIEW ─────────────────────────────────
          Full photo centred, left/right arrows, thumbnail strip
      ──────────────────────────────────────────────────────── */}
      {focused !== null && focusedImg && (
        <div
          className="relative flex flex-1 flex-col overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Main photo */}
          <div className="flex flex-1 items-center justify-center px-16 py-6">
            <img
              key={focused}
              src={focusedImg.src}
              alt={pick(focusedImg.alt)}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full rounded-2xl object-contain shadow-lg"
              style={{ maxHeight: '62vh' }}
            />
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white text-mandal-green shadow-md transition hover:bg-mandal-mint"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white text-mandal-green shadow-md transition hover:bg-mandal-mint"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* ── Thumbnail strip ── */}
          <div
            className="shrink-0 px-5 pb-4 pt-3"
            style={{ borderTop: '1.5px solid rgba(0,0,0,0.07)', background: '#FAF5EE' }}
          >
            {/* Counter */}
            <p
              className="mb-2.5 text-center text-xs font-bold uppercase tracking-widest"
              style={{ color: '#1B5E3B77' }}
            >
              {focused + 1} / {images.length}
            </p>

            {/* Scrollable thumbnail row */}
            <div
              ref={thumbRowRef}
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((thumb, i) => (
                <button
                  key={i}
                  type="button"
                  data-active={i === focused ? 'true' : 'false'}
                  onClick={() => setFocused(i)}
                  className="shrink-0 overflow-hidden rounded-xl transition-all duration-200"
                  style={{
                    width: 80,
                    height: 60,
                    outline: i === focused ? '3px solid #1B5E3B' : '2px solid transparent',
                    outlineOffset: 2,
                    opacity: i === focused ? 1 : 0.45,
                    transform: i === focused ? 'scale(1.1)' : 'scale(1)',
                  }}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img
                    src={thumb.src}
                    alt={pick(thumb.alt)}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Pill dots (max 20 so it doesn't overflow) */}
            {images.length <= 20 && (
              <div className="mt-3 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFocused(i)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      height: 5,
                      width: i === focused ? 22 : 5,
                      background: i === focused ? '#1B5E3B' : '#1B5E3B44',
                    }}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}