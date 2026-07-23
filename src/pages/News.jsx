import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Camera, ChevronLeft, ChevronRight, Play, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections } from '../utils/contentStore.js';

const photos = [
  'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600100397608-f0108a02ef5f?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1594376852272-69a2a15b3b61?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1567591379221-7be4995a21e0?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1606293926249-ed22a4f67f56?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1610041321420-a596dd14ebc9?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1400&q=85',
];

const newsItems = [
  { title: 'Ganeshotsav 2026: Tradition in Every Detail', media: 'Zee 24 Taas', year: '2026', description: 'A festival special showcasing the artistry, devotion and disciplined preparation behind this year’s celebration.', youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', coverImage: photos[0], gallery: [photos[0], photos[1], photos[2], photos[3]] },
  { title: 'Panchganga Brings the Neighbourhood Together', media: 'Maharashtra Times', year: '2026', description: 'A warm print feature on the mandal’s people-first celebrations and shared spirit of service.', youtubeLink: '', coverImage: photos[1], gallery: [photos[1], photos[4], photos[5]] },
  { title: 'A Celebration Rooted in Seva', media: 'TV9 Marathi', year: '2025', description: 'An on-ground television report following volunteers as they transform festival devotion into community action.', youtubeLink: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', coverImage: photos[2], gallery: [photos[2], photos[6], photos[0], photos[7], photos[3]] },
  { title: 'The Art and Soul of Panchganga', media: 'Loksatta', year: '2025', description: 'A detailed newspaper story about the craft, heritage and volunteers behind the mandal’s distinctive decor.', youtubeLink: '', coverImage: photos[3], gallery: [photos[3], photos[0], photos[8], photos[1]] },
  { title: 'Mumbai’s Ganeshotsav: A Special Report', media: 'ABP Majha', year: '2025', description: 'A citywide festival report featuring Panchganga’s welcoming traditions and memorable evening aarti.', youtubeLink: 'https://www.youtube.com/watch?v=L_jWHffIx5E', coverImage: photos[4], gallery: [photos[4], photos[2], photos[9], photos[5]] },
  { title: 'Where Heritage Meets Hope', media: 'Sakal', year: '2024', description: 'Coverage of the mandal’s social initiatives alongside its thoughtful and graceful Ganeshotsav presentation.', youtubeLink: '', coverImage: photos[5], gallery: [photos[5], photos[0], photos[6]] },
  { title: 'Inside the Grand Festival Preparations', media: 'News18 Lokmat', year: '2024', description: 'A behind-the-scenes look at the teams, planning and care that shape the Panchganga experience.', youtubeLink: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', coverImage: photos[6], gallery: [photos[6], photos[7], photos[1], photos[4], photos[8]] },
  { title: 'Devotion, Design and Community', media: 'Saam TV', year: '2023', description: 'A visual report celebrating the creative vision and inclusive energy of the festival.', youtubeLink: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', coverImage: photos[7], gallery: [photos[7], photos[3], photos[9], photos[2]] },
  { title: 'An Enduring Legacy in the City', media: 'Mumbai Mirror', year: '2023', description: 'A retrospective newspaper article on the people and values that continue to guide the mandal.', youtubeLink: '', coverImage: photos[8], gallery: [photos[8], photos[5], photos[0]] },
  { title: 'Ganeshotsav Through the Lens of Faith', media: 'Lokmat News', year: '2022', description: 'Festival coverage capturing the vibrant darshan, cultural moments and heartfelt participation of devotees.', youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', coverImage: photos[9], gallery: [photos[9], photos[1], photos[4], photos[6]] },
];

const years = ['All', '2026', '2025', '2024', '2023', '2022'];
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

function GalleryModal({ item, onClose }) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const total = item.gallery.length;
  const previous = () => setActive((value) => (value - 1 + total) % total);
  const next = () => setActive((value) => (value + 1) % total);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [active, total, onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-mandal-green/90 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-label={`${item.title} gallery`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/25 shadow-2xl">
        <header className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6 sm:py-4">
          <div className="min-w-0"><p className="truncate font-display text-lg font-bold sm:text-xl">{item.title}</p><p className="text-xs text-white/65">{item.media} · {active + 1} of {total}</p></div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Close gallery"><X className="h-5 w-5" /></button>
        </header>
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-8" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => { const end = event.changedTouches[0].clientX; if (touchStart && Math.abs(end - touchStart) > 45) end < touchStart ? next() : previous(); setTouchStart(null); }}>
          <AnimatePresence mode="wait"><motion.img key={active} src={item.gallery[active]} alt={`${item.title}, image ${active + 1}`} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full max-h-[62vh] w-full select-none rounded-xl object-contain" /></AnimatePresence>
          <button type="button" onClick={previous} className="absolute left-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white transition hover:bg-mandal-gold hover:text-mandal-green sm:left-8 sm:h-12 sm:w-12" aria-label="Previous image"><ChevronLeft /></button>
          <button type="button" onClick={next} className="absolute right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white transition hover:bg-mandal-gold hover:text-mandal-green sm:right-8 sm:h-12 sm:w-12" aria-label="Next image"><ChevronRight /></button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-4 sm:justify-center"><div className="flex gap-2">{item.gallery.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setActive(index)} className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-14 sm:w-20 ${active === index ? 'border-mandal-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`} aria-label={`View image ${index + 1}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div></div>
      </div>
    </motion.div>
  );
}

export default function News() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All');
  const [galleryItem, setGalleryItem] = useState(null);
  const { items: uploadedNews, loading } = useFirestoreItems(contentCollections.news);
  const allNewsItems = useMemo(() => {
    const dynamic = uploadedNews.map((item) => ({
      title: item.title || 'News Update',
      media: item.media || 'Panchganga',
      year: item.year || '2026',
      description: item.description || '',
      youtubeLink: item.youtubeLink || '',
      coverImage: item.coverImage || item.gallery?.[0],
      gallery: item.gallery?.length ? item.gallery : [item.coverImage].filter(Boolean),
    }));
    return [...dynamic, ...newsItems];
  }, [uploadedNews]);
  const availableYears = useMemo(() => ['All', ...new Set(allNewsItems.map((item) => item.year).filter(Boolean))], [allNewsItems]);
  const filteredItems = useMemo(() => allNewsItems.filter((item) => {
    const matchesYear = year === 'All' || item.year === year;
    const text = `${item.title} ${item.media} ${item.year}`.toLowerCase();
    return matchesYear && text.includes(query.toLowerCase().trim());
  }), [allNewsItems, query, year]);

  return <>
    <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />
    <section className="relative isolate overflow-hidden devotional-gradient">
      <motion.div animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-16 top-6 h-64 w-64 rounded-full border border-mandal-gold/25 bg-mandal-gold/10 blur-[1px]" />
      <motion.div animate={{ x: [0, 22, 0], y: [0, 14, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-20 -left-14 h-72 w-72 rounded-full bg-mandal-mint/70 blur-3xl" />
      <div className="gold-divider absolute inset-x-0 top-0" />
      <div className="container-pad relative section-pad pb-14 text-center sm:pb-20"><motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl"><p className="eyebrow">Panchganga in the media</p><h1 className="headline mt-4">📰 News &amp; Media Gallery</h1><p className="body-copy mt-5">Explore memorable television coverage, newspaper articles and media highlights featuring Panchganga Sarvajanik Utsav Mandal throughout the years.</p></motion.div></div>
    </section>
    <section className="section-pad bg-white/65 pt-10 sm:pt-14"><div className="container-pad">
      <div className="soft-panel mx-auto max-w-3xl p-2"><label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-mandal-ink/55"><Search className="h-5 w-5 shrink-0 text-mandal-gold" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm font-medium text-mandal-ink outline-none placeholder:text-mandal-ink/45 sm:text-base" placeholder="Search by news title, channel, newspaper or year…" aria-label="Search media coverage" /></label></div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">{availableYears.map((option) => <button type="button" key={option} onClick={() => setYear(option)} className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-5 ${year === option ? 'bg-mandal-green text-white shadow-soft' : 'border border-mandal-green/10 bg-white text-mandal-green hover:border-mandal-gold hover:text-mandal-leaf'}`}>{option}</button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={`${year}-${query}`} initial="hidden" animate="visible" exit="hidden" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />) : null}
        {filteredItems.map((item) => <motion.article key={item.title} variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ y: -7 }} className="group flex overflow-hidden rounded-[1.5rem] border border-mandal-green/10 bg-white shadow-soft transition hover:border-mandal-gold/80 hover:shadow-[0_20px_45px_rgba(13,63,35,0.17)]"><div className="flex w-full flex-col"><div className="relative aspect-[16/10] overflow-hidden"><img src={item.coverImage} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-mandal-green/45 to-transparent" /><span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-mandal-green/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur"><Camera className="h-3.5 w-3.5 text-mandal-gold" />{item.gallery.length} Photos</span></div><div className="flex flex-1 flex-col p-5 sm:p-6"><div className="flex items-center justify-between gap-3 text-xs font-bold"><span className="truncate text-mandal-leaf">{item.media}</span><span className="inline-flex shrink-0 items-center gap-1 text-mandal-ink/50"><Calendar className="h-3.5 w-3.5 text-mandal-gold" />{item.year}</span></div><h2 className="mt-3 font-display text-2xl font-bold leading-tight text-mandal-green">{item.title}</h2><p className="mt-3 text-sm leading-6 text-mandal-ink/65">{item.description}</p><div className="mt-5 flex flex-wrap gap-2 pt-1">{item.youtubeLink && <a href={item.youtubeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-mandal-green px-4 py-2.5 text-sm font-bold text-white transition hover:bg-mandal-leaf"><Play className="h-3.5 w-3.5 fill-mandal-gold text-mandal-gold" />Watch Video</a>}<button type="button" onClick={() => setGalleryItem(item)} className="inline-flex items-center gap-1.5 rounded-full border border-mandal-green/15 bg-mandal-mint/55 px-4 py-2.5 text-sm font-bold text-mandal-green transition hover:border-mandal-gold hover:bg-mandal-gold/15"><Camera className="h-4 w-4 text-mandal-gold" />View Gallery</button></div></div></div></motion.article>)}
      </motion.div></AnimatePresence>
      {filteredItems.length === 0 && <div className="soft-panel mx-auto mt-10 max-w-xl p-10 text-center"><p className="font-display text-2xl font-bold text-mandal-green">No media coverage found</p><p className="mt-2 text-sm text-mandal-ink/65">Try another year or a different search phrase.</p></div>}
    </div></section>
    <AnimatePresence>{galleryItem && <GalleryModal item={galleryItem} onClose={() => setGalleryItem(null)} />}</AnimatePresence>
  </>;
}
