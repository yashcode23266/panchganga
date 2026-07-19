import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Play, Tv } from 'lucide-react';
import Seo from '../components/Seo.jsx';

const newsItems = [
  {
    title: 'Panchganga Utsav Mandal: A Celebration of Faith and Community',
    channel: 'Zee 24 Taas',
    date: 'September 16, 2025',
    description: 'A special report on the mandal’s celebrations, artistry and community spirit during the festive season.',
    youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
  },
  {
    title: 'Inside the Grand Ganeshotsav Preparations',
    channel: 'TV9 Marathi',
    date: 'September 12, 2025',
    description: 'An on-ground look at the careful planning and devotion behind this year’s festival preparations.',
    youtubeLink: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  },
  {
    title: 'Tradition Meets Thoughtful Social Service',
    channel: 'ABP Majha',
    date: 'September 8, 2025',
    description: 'The mandal’s service initiatives and its commitment to creating a meaningful celebration.',
    youtubeLink: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
  },
  {
    title: 'A Legacy of Devotion in Mumbai',
    channel: 'News18 Lokmat',
    date: 'August 30, 2025',
    description: 'A feature on the legacy, cultural significance and warm public response to the mandal.',
    youtubeLink: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  },
  {
    title: 'The Artistry Behind This Year’s Decoration',
    channel: 'Saam TV',
    date: 'August 27, 2025',
    description: 'Watch the creative team reveal the inspiration and craft behind the festive presentation.',
    youtubeLink: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
  },
  {
    title: 'Mandal Leaders Share the Festival Vision',
    channel: 'Lokmat News',
    date: 'August 22, 2025',
    description: 'An interview with the organisers on preserving tradition while welcoming every generation.',
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  },
  {
    title: 'Special Report: Ganeshotsav in the City',
    channel: 'India Today Marathi',
    date: 'August 18, 2025',
    description: 'A citywide special featuring the celebrations and community participation at Panchganga.',
    youtubeLink: 'https://www.youtube.com/watch?v=09R8_2nJtjg',
  },
  {
    title: 'Panchganga’s Message of Unity and Service',
    channel: 'YouTube News Maharashtra',
    date: 'August 12, 2025',
    description: 'A conversation about the values that bring devotees, neighbours and volunteers together.',
    youtubeLink: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
  },
];

const getYouTubeVideoId = (link) => {
  try {
    const url = new URL(link);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1);
    if (url.hostname.includes('youtube.com')) {
      return url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop() || '';
    }
  } catch {
    return '';
  }
  return '';
};

const getYouTubeThumbnail = (link, quality = 'maxresdefault') => {
  const videoId = getYouTubeVideoId(link);
  return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : '';
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

function VideoThumbnail({ item, featured = false }) {
  const fallbackThumbnail = getYouTubeThumbnail(item.youtubeLink, 'hqdefault');

  return (
    <a
      href={item.youtubeLink}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${item.title} on YouTube`}
      className={`group/thumb relative block overflow-hidden bg-mandal-green ${featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[29rem]' : 'aspect-video'}`}
    >
      <img
        src={getYouTubeThumbnail(item.youtubeLink)}
        alt={`Video thumbnail for ${item.title}`}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover/thumb:scale-105"
        loading={featured ? 'eager' : 'lazy'}
        onError={(event) => {
          if (event.currentTarget.src !== fallbackThumbnail) event.currentTarget.src = fallbackThumbnail;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-mandal-green/65 via-mandal-green/10 to-transparent" />
      <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white/95 text-mandal-green shadow-soft transition duration-300 group-hover/thumb:scale-110 ${featured ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-12 w-12'}`}>
        <Play className={featured ? 'ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9' : 'ml-0.5 h-5 w-5 fill-current'} aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-mandal-green/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
        <Tv className="h-3.5 w-3.5 text-mandal-gold" aria-hidden="true" />
        Media coverage
      </span>
    </a>
  );
}

function WatchButton({ link, featured = false }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-mandal-gold focus:ring-offset-2 ${featured ? 'bg-mandal-green px-6 py-3.5 text-sm text-white hover:bg-mandal-leaf sm:px-7' : 'border border-mandal-green/15 bg-mandal-mint/55 px-4 py-2.5 text-sm text-mandal-green hover:border-mandal-green hover:bg-mandal-green hover:text-white'}`}
    >
      <Play className="h-4 w-4 fill-mandal-gold text-mandal-gold group-hover:fill-current" aria-hidden="true" />
      Watch on YouTube
      {featured && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </a>
  );
}

export default function News() {
  const featuredItem = newsItems.find((item) => item.featured) || newsItems[0];
  const latestItems = newsItems.filter((item) => item !== featuredItem);

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />

      <section className="relative overflow-hidden devotional-gradient">
        <div className="gold-divider absolute inset-x-0 top-0" />
        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full border border-mandal-gold/20 bg-mandal-gold/5" />
        <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-mandal-mint/70 blur-2xl" />
        <div className="container-pad relative section-pad pb-14 sm:pb-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="max-w-3xl">
            <p className="eyebrow">Panchganga in the media</p>
            <h1 className="headline mt-4">News &amp; Media Coverage</h1>
            <p className="body-copy mt-5 max-w-2xl">
              Stay updated with the latest television interviews, media coverage and special reports featuring Panchganga Sarvajanik Utsav Mandal.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-mandal-green">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mandal-green text-mandal-gold"><Play className="h-4 w-4 fill-current" aria-hidden="true" /></span>
              Watch our stories, interviews and special features.
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/70">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.45, ease: 'easeOut' }} className="mb-8 sm:mb-10">
            <p className="eyebrow">Featured coverage</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">In the spotlight</h2>
          </motion.div>

          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft lg:grid lg:grid-cols-[1.08fr_0.92fr]">
            <VideoThumbnail item={featuredItem} featured />
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-mandal-leaf">
                <span className="inline-flex items-center gap-2"><Tv className="h-4 w-4 text-mandal-gold" aria-hidden="true" />{featuredItem.channel}</span>
                <span className="inline-flex items-center gap-2 text-mandal-ink/55"><Calendar className="h-4 w-4 text-mandal-gold" aria-hidden="true" />{featuredItem.date}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-mandal-green sm:text-4xl">{featuredItem.title}</h3>
              <p className="mt-4 leading-8 text-mandal-ink/70">{featuredItem.description}</p>
              <div className="mt-7"><WatchButton link={featuredItem.youtubeLink} featured /></div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.45, ease: 'easeOut' }} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">More from the media</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">Latest news</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-mandal-ink/65">Explore television features, interviews and reports from our growing media archive.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={cardContainer} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestItems.map((item) => (
              <motion.article key={item.youtubeLink} variants={fadeUp} transition={{ duration: 0.42, ease: 'easeOut' }} whileHover={{ y: -7 }} className="group overflow-hidden rounded-[1.5rem] border border-mandal-green/10 bg-white shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_46px_rgba(13,63,35,0.17)]">
                <VideoThumbnail item={item} />
                <div className="flex min-h-[17.5rem] flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 text-mandal-leaf"><Tv className="h-3.5 w-3.5 text-mandal-gold" aria-hidden="true" />{item.channel}</span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-mandal-ink/50"><Calendar className="h-3.5 w-3.5 text-mandal-gold" aria-hidden="true" />{item.date}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-mandal-green">{item.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-mandal-ink/68">{item.description}</p>
                  <div className="mt-auto pt-5"><WatchButton link={item.youtubeLink} /></div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
