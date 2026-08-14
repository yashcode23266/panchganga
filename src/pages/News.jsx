import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Calendar, Camera, ChevronLeft, ChevronRight, Play, Search, X, Newspaper } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Seo from '../components/Seo.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections, getOptimizedImageUrl } from '../utils/contentStore.js';

// ═════════════════════════════════════════════════════════════════════════════
// MEDIA LOGOS — auto-rotating + swipeable logo strip (Electronic & Print media)
// Add your own logo images in: client/public/images/logos/electronic/ and .../print/
// Then reference them as: '/images/logos/electronic/your-logo.png'
// ═════════════════════════════════════════════════════════════════════════════
const electronicMediaLogos = [
  { name: 'Zee 24 Taas', src: '/images/zee24 taas.png' },
  { name: 'ABP Majha', src: '/images/abp majha.png' },
  { name: 'tv9 Marathi', src: '/images/tv9 Marathi.png' },
  { name: 'News18 Lokmat', src: '/images/lokmat.png' },
  { name: 'Saam TV', src: '/images/samTV.png' },
];

const printMediaLogos = [
  { name: 'Maharashtra Times', src: '/images/maharashtra times.png' },
  { name: 'Lokmat', src: '/images/lokmat.png' },
  { name: 'Sakal', src: '/images/sakal.png' },
  { name: 'Mumbai Mirror', src: '/images/mumbai mirror.png' },
  { name: 'Loksatta', src: '/images/loksatta.png' },
];

function LogoMarquee({ logos, direction = 'left', speed = 45 }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.scrollWidth / 2);
    }
  }, [logos]);

  useAnimationFrame((_, delta) => {
    if (isPaused || !loopWidth) return;
    const dir = direction === 'left' ? -1 : 1;
    let next = x.get() + (dir * speed * delta) / 1000;
    if (direction === 'left' && next <= -loopWidth) next += loopWidth;
    if (direction === 'right' && next >= 0) next -= loopWidth;
    x.set(next);
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max gap-10 py-2"
        style={{ x, touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{ left: -loopWidth * 2, right: loopWidth * 2 }}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex shrink-0 select-none items-center justify-center rounded-xl border border-mandal-green/10 bg-white px-6"
            style={{ width: 170, height: 96 }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              draggable={false}
              // className="max-h-14 max-w-[130px] object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              className="max-h-14 max-w-[130px] object-contain transition duration-300 hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-center text-xs font-bold text-mandal-ink/40">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function LogoSection({ title, logos, direction }) {
  return (
    <div>
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.28em] text-mandal-gold">
        {title}
      </p>
      <LogoMarquee logos={logos} direction={direction} />
    </div>
  );
}

// Note: no "export default" here — News.jsx already has the default export below,
// and a file can only have one default export.
import { useLanguage } from '../context/LanguageContext.jsx';

function MediaLogos() {
  const { t } = useLanguage();
  return (
    <section className="section-pad bg-white">
      <div className="container-pad">
        <LogoSection title={t('newsPage.electronicMedia')} logos={electronicMediaLogos} direction="left" />
        <div className="mt-12 grid gap-12"></div>
        <LogoSection title={t('newsPage.printMedia')} logos={printMediaLogos} direction="right" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWSPAPER CLIPPINGS — Replace these with your actual newspaper cut-out photos.
// Put your images in: client/public/images/news/
// Then reference them as: '/images/news/your-clipping.jpg'
//
// Each entry:
//   title       — headline of the news coverage
//   media       — newspaper / channel name
//   year        — year of coverage (string)
//   description — short summary shown on the card
//   type        — 'newspaper' | 'yt' | 'online'
//   youtubeLink — (required for yt) YouTube URL — thumbnail is auto-fetched from this,
//                 and clicking the card opens this video
//   coverImage  — newspaper clipping photo (main card image) — NOT needed for yt items,
//                 the YouTube thumbnail is used automatically instead
//   gallery     — array of clipping photos (opens in lightbox, newspaper items only)
// ─────────────────────────────────────────────────────────────────────────────
const newsItems = [
  {
    media: 'Maharashtra Times',
    year: '2024',
    type: 'newspaper',
    coverImage: '/images/Maharashtra Times.jpg',
    gallery: [
      '/images/Maharashtra Times.jpg',
      '/images/times1.jpeg',
      '/images/times2.jpeg',
      '/images/news15.jpeg',
    ],
  },
  {
    media: 'Local Paper',
    year: '2015',
    type: 'newspaper',
    coverImage: '/images/news1.jpeg',
    gallery: [
      '/images/news1.jpeg',
      '/images/paper2.jpeg',
    ],
  },
  {
    media: 'Sakal',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/news3.jpeg',
    gallery: [
      '/images/news3.jpeg',
      '/images/news8.jpeg',
      '/images/news6.jpeg',
      '/images/news19.jpeg',
    ],
  },
  {
    media: 'Loksatta',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/loksatta1.jpg',
    gallery: [
      '/images/loksatta1.jpg',
      '/images/news18.jpeg',

    ],
  },
  {
    media: 'Pudhari',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/news14.jpeg',
    gallery: [
      '/images/news14.jpeg',
      '/images/news9.jpeg',

    ],
  },
  {
    media: 'Saamana',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/news12.jpeg',
    gallery: [
      '/images/news12.jpeg',
      '/images/news4.jpeg',

    ],
  },
  {
    media: 'Lokmat',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/lokmat.jpg',
    gallery: [
      '/images/lokmat.jpg',
      '/images/news11.jpeg',
      '/images/news7.jpeg',
      '/images/news20.jpeg',
    ],
  },
  {
    media: 'Maharashtra Dinman',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/times3.jpeg',
    gallery: [
      '/images/times3.jpeg',

    ],
  },
  {
    media: 'Mid Day',
    year: '2023',
    type: 'newspaper',
    coverImage: '/images/paper1.jpg',
    gallery: [
      '/images/paper1.jpg',

    ],
  },
  {
    media: 'Maha News',
    year: '2017',
    type: 'newspaper',
    coverImage: '/images/news16.jpeg',
    gallery: [
      '/images/news16.jpeg',

    ],
  },
  {
    media: 'Mi Marathi',
    year: '2015',
    type: 'newspaper',
    coverImage: '/images/news17.jpeg',
    gallery: [
      '/images/news17.jpeg',

    ],
  },
  {
    media: 'Tarun Bharat',
    year: '2024',
    type: 'newspaper',
    coverImage: '/images/news5.jpeg',
    gallery: [
      '/images/news5.jpeg',

    ],
  },
  {
    media: 'The Global Times',
    year: '2024',
    type: 'newspaper',
    coverImage: '/images/news21.jpeg',
    gallery: [
      '/images/news21.jpeg',

    ],
  },
  {
    media: 'Rane Prakashan',
    year: '2024',
    type: 'newspaper',
    coverImage: '/images/news22.jpeg',
    gallery: [
      '/images/news22.jpeg',

    ],
  },
  {
    media: 'Navrashtra',
    year: '2024',
    type: 'newspaper',
    coverImage: '/images/news13.jpeg',
    gallery: [
      '/images/news13.jpeg',

    ],
  },

  {
    media: 'Sanjeevani',

    type: 'yt',
    youtubeLink: 'https://youtu.be/yd9yf8v1sYc?si=b-_DM8wS2TmRVhrZ',
  },

  {
    media: 'vastra',

    type: 'yt',
    youtubeLink: 'https://youtu.be/ls_f2VOrefE?si=_lrET_7if7_LK-hg', // add the real YouTube URL here to enable this card
  },

  {
    media: 'Mumbai cha Raja',
    year: '2015',
    type: 'yt',
    youtubeLink: 'https://youtu.be/jez2CUTYrUQ?si=kwPOrX-U0wBxOZUZ', // add the real YouTube URL here to enable this card
  },
  {
    media: 'offical song',

    type: 'yt',
    youtubeLink: 'https://youtu.be/AqBPU1IclLo?si=4LRMke8GhABH9pFI', // add the real YouTube URL here to enable this card
  },
];

const TYPE_LABELS = {
  newspaper: 'Newspaper',
  yt: 'Youtube',
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// ─── Extract a real thumbnail image straight from a YouTube URL ──────────────
function getYouTubeThumbnail(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let id = null;

    if (parsed.hostname.includes('youtu.be')) {
      id = parsed.pathname.slice(1).split('/')[0];
    } else if (parsed.hostname.includes('youtube.com')) {
      if (parsed.searchParams.get('v')) {
        id = parsed.searchParams.get('v');
      } else if (parsed.pathname.startsWith('/embed/')) {
        id = parsed.pathname.split('/embed/')[1];
      } else if (parsed.pathname.startsWith('/shorts/')) {
        id = parsed.pathname.split('/shorts/')[1];
      }
    }

    if (!id) return null;
    id = id.split('?')[0].split('&')[0];
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

// ─── Gallery / Clipping Lightbox ──────────────────────────────────────────────
function ClippingModal({ item, onClose }) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const total = item.gallery.length;
  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, total]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        <header className="flex shrink-0 items-center gap-4 border-b border-mandal-green/10 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mandal-gold">
              {item.media} · {item.year}
            </p>
            <h3 className="mt-0.5 truncate font-display text-lg font-bold text-mandal-green">
              {item.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-mandal-mint px-3 py-1 text-xs font-bold text-mandal-green">
            {active + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-mandal-green/15 text-mandal-green transition hover:bg-mandal-mint"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center bg-[#f5f0e8] px-12 py-6"
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStart;
            if (Math.abs(dx) > 45) dx < 0 ? next() : prev();
            setTouchStart(null);
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 24px,#00000008 24px,#00000008 25px)' }}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={item.gallery[active]}
              alt={`${item.title} — clipping ${active + 1}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[58vh] w-auto select-none rounded object-contain shadow-xl"
              style={{ filter: 'contrast(1.04) brightness(0.98)' }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-mandal-green shadow-md transition hover:bg-mandal-mint"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-mandal-green shadow-md transition hover:bg-mandal-mint"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="shrink-0 border-t border-mandal-green/10 bg-white px-5 py-3">
            <div className="flex justify-center gap-2 overflow-x-auto [scrollbar-width:none]">
              {item.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="shrink-0 overflow-hidden rounded-lg transition-all duration-200"
                  style={{
                    width: 72,
                    height: 52,
                    outline: i === active ? '2.5px solid #1B5E3B' : '2px solid transparent',
                    outlineOffset: 2,
                    opacity: i === active ? 1 : 0.45,
                  }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function News() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [modalItem, setModalItem] = useState(null);

  const typeLabels = {
    newspaper: t('newsPage.newspaper'),
    yt: t('newsPage.youtube'),
  };

  const { items: uploadedNews, loading } = useFirestoreItems(contentCollections.news);

  const allItems = useMemo(() => {
    const dynamic = uploadedNews.map((item) => ({
      title: item.title || 'News Update',
      media: item.media || 'Panchganga',
      year: item.year || '2026',
      type: item.type || 'newspaper',
      youtubeLink: item.youtubeLink || '',
      coverImage: item.coverImage || item.gallery?.[0],
      gallery: item.gallery?.length ? item.gallery : [item.coverImage].filter(Boolean),
    }));
    return [...dynamic, ...newsItems];
  }, [uploadedNews]);

  const resolvedItems = useMemo(() => allItems.map((item) => {
    if (item.type === 'yt') {
      const ytThumb = getYouTubeThumbnail(item.youtubeLink);
      return { ...item, coverImage: item.coverImage || ytThumb };
    }
    return item;
  }), [allItems]);

  const availableYears = useMemo(
    () => ['All', ...new Set(resolvedItems.map((i) => i.year).filter(Boolean)).values()].sort((a, b) => a === 'All' ? -1 : b - a),
    [resolvedItems]
  );

  const filtered = useMemo(() => resolvedItems.filter((item) => {
    const matchYear = year === 'All' || item.year === year;
    const matchType = typeFilter === 'All' || item.type === typeFilter;
    const text = `${item.title} ${item.media} ${item.year}`.toLowerCase();
    return matchYear && matchType && text.includes(query.toLowerCase().trim());
  }), [resolvedItems, query, year, typeFilter]);

  const handleCardClick = (item) => {
    if (item.type === 'yt' && item.youtubeLink) {
      window.open(item.youtubeLink, '_blank', 'noopener,noreferrer');
    } else {
      setModalItem(item);
    }
  };

  return (
    <>
      <Seo titleKey="seo.newsTitle" descriptionKey="seo.newsDescription" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="section-pad devotional-gradient">
        <div className="container-pad text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-mandal-gold">
            {t('newsPage.eyebrow')}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl">
            {t('newsPage.title')}
          </h1>
        </div>
      </section>

      <MediaLogos />

      {/* ── FILTERS ───────────────────────────────────────────── */}
      <section className="border-b border-mandal-green/10 bg-white py-6">
        <div className="container-pad flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

          <div className="flex flex-wrap gap-2.5">
            {['All', 'newspaper', 'yt'].map((tKey) => (
              <button
                key={tKey}
                type="button"
                onClick={() => setTypeFilter(tKey)}
                className={`flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold transition ${typeFilter === tKey
                  ? 'bg-mandal-gold text-mandal-green shadow-sm'
                  : 'border border-mandal-green/15 bg-white text-mandal-ink/70 hover:border-mandal-gold'
                  }`}
              >
                {tKey === 'All' ? t('newsPage.allTypes') : typeLabels[tKey]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ──────────────────────────────────────────────── */}
      <section className="section-pad bg-white/60">
        <div className="container-pad">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${year}-${typeFilter}-${query}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {loading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

              {filtered.map((item) => {
                const isYoutube = item.type === 'yt' && item.youtubeLink;
                return (
                  <motion.article
                    key={`${item.title}-${item.year}`}
                    variants={fadeUp}
                    transition={{ duration: 0.35 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-mandal-green/10 bg-white shadow-soft transition hover:-translate-y-1 hover:border-mandal-gold/60 hover:shadow-[0_18px_40px_rgba(13,63,35,0.14)]"
                  >
                    <button
                      type="button"
                      onClick={() => handleCardClick(item)}
                      className="relative block overflow-hidden bg-[#f5f0e8]"
                      style={{ aspectRatio: '4/3' }}
                      aria-label={isYoutube ? `Watch ${item.media} video` : `Open clippings for ${item.title}`}
                    >
                      {!isYoutube && (
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,#00000008 20px,#00000008 21px)',
                          }}
                        />
                      )}

                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          loading="lazy"
                          className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${isYoutube ? 'object-cover' : 'object-contain p-3'
                            }`}
                          style={isYoutube ? undefined : { filter: 'contrast(1.05) brightness(0.97)' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}

                      <div
                        className="absolute inset-0 flex-col items-center justify-center gap-2 text-mandal-green/30"
                        style={{ display: item.coverImage ? 'none' : 'flex' }}
                      >
                        {isYoutube ? <Play size={40} strokeWidth={1.2} /> : <Newspaper size={40} strokeWidth={1.2} />}
                        <p className="text-xs font-medium">
                          {isYoutube ? 'Video link not added yet' : 'Clipping not added yet'}
                        </p>
                      </div>

                      {isYoutube && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/25">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
                            <Play size={22} className="translate-x-0.5 fill-mandal-green text-mandal-green" />
                          </span>
                        </div>
                      )}

                      <span className="absolute left-2.5 top-2.5 rounded-full bg-mandal-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        {TYPE_LABELS[item.type] || 'Press'}
                      </span>
                    </button>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                        <span className="truncate text-mandal-leaf">{item.media}</span>
                        <span className="flex shrink-0 items-center gap-1 text-mandal-ink/45">
                          <Calendar size={11} />
                          {item.year}
                        </span>
                      </div>

                      {isYoutube && (
                        <a
                          href={item.youtubeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-mandal-green px-4 py-2 text-xs font-bold text-white transition hover:bg-mandal-leaf"
                        >
                          <Play size={12} className="fill-mandal-gold text-mandal-gold" />
                          {t('newsPage.watchVideo')}
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {!loading && filtered.length === 0 && (
            <div className="mx-auto mt-16 max-w-sm text-center">
              <Newspaper size={40} strokeWidth={1} className="mx-auto text-mandal-green/20" />
              <p className="mt-4 font-display text-xl font-bold text-mandal-green">{t('newsPage.noCoverage')}</p>
              <p className="mt-2 text-sm text-mandal-ink/50">{t('newsPage.noCoverageDesc')}</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {modalItem && <ClippingModal item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>
    </>
  );
}
