import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Award, Calendar, Medal, Sparkles, Star, Trophy } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections } from '../utils/contentStore.js';

const imageUrls = {
  trophy: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=85',
  medal: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=85',
  certificate: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=900&q=85',
  ceremony: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1100&q=85',
  group: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85',
};

const statistics = [
  { value: 25, suffix: '+', label: 'Awards Received', icon: Trophy },
  { value: 15, suffix: '+', label: 'Years of Recognition', icon: Star },
  { value: 5, suffix: '+', label: 'Major Organizations', icon: Medal },
  { value: 100, suffix: '+', label: 'Achievements', icon: Award },
];

const timelineAwards = [
  { year: '2025', title: 'BMC Excellence Award', text: 'Honoured for thoughtful festival management, public safety and community participation.' },
  { year: '2024', title: 'Mumbai Police Appreciation Award', text: 'Recognised for exemplary coordination and a peaceful, well-organised celebration.' },
  { year: '2023', title: 'Best Cultural Festival Award', text: 'Celebrating the mandal’s commitment to preserving culture through a vibrant festival.' },
  { year: '2022', title: 'Environmental Excellence Award', text: 'Awarded for sustainable practices and an eco-conscious approach to Ganeshotsav.' },
];

const otherAwards = [
  { name: 'Cultural Heritage Honour', organization: 'Maharashtra Cultural Forum', year: '2024', description: 'For safeguarding local traditions and welcoming new generations into the celebration.', image: imageUrls.medal },
  { name: 'Community Service Award', organization: 'Mumbai Social Foundation', year: '2023', description: 'In recognition of meaningful year-round initiatives that serve the local community.', image: imageUrls.ceremony },
  { name: 'Best Public Festival', organization: 'Mumbai Festival Council', year: '2022', description: 'For an inclusive festival experience shaped by devotion, creativity and care.', image: imageUrls.trophy },
  { name: 'Green Mandal Recognition', organization: 'Clean Mumbai Initiative', year: '2021', description: 'Acknowledging responsible celebrations, waste management and environmental awareness.', image: imageUrls.certificate },
  { name: 'Civic Partnership Honour', organization: 'Ward Cultural Committee', year: '2020', description: 'Presented for sustained support of civic awareness and neighbourhood unity.', image: imageUrls.group },
  { name: 'Festival Innovation Award', organization: 'Maharashtra Utsav Network', year: '2019', description: 'For presenting heritage in fresh, engaging and respectful ways for all visitors.', image: imageUrls.ceremony },
];

const galleryItems = [
  { label: 'Trophy', image: imageUrls.trophy },
  { label: 'Certificate', image: imageUrls.certificate },
  { label: 'Award ceremony', image: imageUrls.ceremony },
  { label: 'Mandal family', image: imageUrls.group },
];

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedCount({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const duration = 1050;
    const startedAt = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Awards() {
  const { items: uploadedAwards, loading } = useFirestoreItems(contentCollections.awards);
  const dynamicAwards = uploadedAwards.map((award) => ({
    name: award.name || 'Award',
    organization: award.organization || 'Panchganga',
    year: award.year || '2026',
    description: award.description || '',
    image: award.image || award.images?.[0] || imageUrls.trophy,
  }));
  const allOtherAwards = [...dynamicAwards, ...otherAwards];
  const allGalleryItems = [
    ...uploadedAwards.flatMap((award) =>
      (award.images?.length ? award.images : [award.image].filter(Boolean)).map((image, index) => ({
        label: index === 0 ? award.name || 'Award' : `${award.name || 'Award'} ${index + 1}`,
        image,
      })),
    ),
    ...galleryItems,
  ];

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />

      <section className="relative overflow-hidden devotional-gradient">
        <div className="gold-divider absolute inset-x-0 top-0" />
        <div className="absolute -right-20 top-12 h-72 w-72 rounded-full border border-mandal-gold/25 bg-mandal-gold/5" />
        <div className="absolute right-[12%] top-20 h-24 w-24 rotate-45 border border-mandal-gold/20" />
        <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-mandal-mint/80 blur-2xl" />
        <div className="container-pad relative section-pad">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.12 }} className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-mandal-gold/40 bg-white/85 text-mandal-gold shadow-soft">
              <Trophy className="h-8 w-8" aria-hidden="true" />
            </motion.div>
            <p className="eyebrow mt-6">A legacy of excellence</p>
            <h1 className="headline mt-4">Awards &amp; Achievements</h1>
            <p className="body-copy mt-5">Celebrating decades of excellence, dedication, and recognition received by Panchganga Sarvajanik Utsav Mandal.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/75">
        <div className="container-pad">
          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="relative overflow-hidden rounded-[2rem] border border-mandal-gold/35 bg-white shadow-soft lg:grid lg:grid-cols-[1fr_0.9fr]">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-mandal-gold" />
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-mandal-mint px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mandal-green"><Sparkles className="h-3.5 w-3.5 text-mandal-gold" />Featured achievement</div>
              <p className="mt-7 font-semibold text-mandal-leaf">Recognised in 2018</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl">Limca Book of Records Award</h2>
              <p className="mt-5 max-w-xl leading-8 text-mandal-ink/70">A defining moment in the Panchganga story. This recognition celebrates the mandal’s exceptional scale of devotion, meticulous organisation and enduring contribution to Mumbai’s cultural fabric.</p>
              <a href="#timeline" className="mt-8 inline-flex items-center gap-2 rounded-full bg-mandal-green px-6 py-3 text-sm font-bold text-white transition hover:bg-mandal-leaf focus:outline-none focus:ring-2 focus:ring-mandal-gold focus:ring-offset-2">Explore our journey <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="relative min-h-[19rem] overflow-hidden bg-mandal-green p-5 sm:p-7 lg:min-h-full">
              <motion.img whileHover={{ scale: 1.045 }} transition={{ duration: 0.55, ease: 'easeOut' }} src={imageUrls.trophy} alt="Golden trophy representing the Limca Book of Records Award" className="h-full min-h-[18rem] w-full rounded-[1.5rem] border-2 border-mandal-gold/75 object-cover shadow-soft" />
              <div className="absolute bottom-10 left-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-mandal-green backdrop-blur"><Trophy className="mr-2 inline h-4 w-4 text-mandal-gold" />A landmark honour</div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map(({ value, suffix, label, icon: Icon }) => (
              <motion.div key={label} variants={fadeUp} transition={{ duration: 0.4, ease: 'easeOut' }} whileHover={{ y: -5 }} className="soft-panel group p-5 sm:p-6">
                <Icon className="h-6 w-6 text-mandal-gold transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <p className="mt-4 font-display text-4xl font-bold text-mandal-green"><AnimatedCount value={value} suffix={suffix} /></p>
                <p className="mt-1 text-sm font-semibold text-mandal-ink/65">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="timeline" className="section-pad devotional-gradient">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }}>
            <p className="eyebrow">Recognition through the years</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">Awards timeline</h2>
            <p className="mt-5 max-w-md leading-8 text-mandal-ink/70">Every honour is a reflection of shared effort—of our volunteers, devotees, partners and the entire Panchganga family.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="relative space-y-6 border-l border-mandal-gold/50 pl-7 sm:pl-9">
            {timelineAwards.map((item) => (
              <motion.article key={item.year} variants={fadeUp} transition={{ duration: 0.42 }} className="relative rounded-2xl border border-mandal-green/10 bg-white/90 p-5 shadow-soft sm:p-6">
                <span className="absolute -left-[2.25rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-mandal-cream bg-mandal-gold sm:-left-[2.75rem]"><Medal className="h-3.5 w-3.5 text-mandal-green" /></span>
                <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-mandal-green px-3 py-1 text-xs font-bold text-white">{item.year}</span><h3 className="font-display text-2xl font-bold text-mandal-green">{item.title}</h3></div>
                <p className="mt-3 leading-7 text-mandal-ink/68">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/75">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }} className="soft-panel p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">A record of consistency</p><h2 className="mt-2 font-display text-3xl font-bold text-mandal-green sm:text-4xl">Repeated honours</h2></div><Trophy className="h-8 w-8 text-mandal-gold" /></div>
            <div className="mt-7 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><h3 className="font-display text-3xl font-bold text-mandal-green">BMC Excellence Award</h3><p className="mt-2 text-sm font-bold text-mandal-leaf">Won 5 Times</p><p className="mt-3 leading-7 text-mandal-ink/68">A lasting recognition of the mandal’s dependable standards in festival operations and public service.</p></div><div className="flex flex-wrap gap-2.5">{['2015', '2017', '2019', '2022', '2025'].map((year) => <span key={year} className="rounded-full border border-mandal-gold/45 bg-mandal-gold/10 px-4 py-2 text-sm font-bold text-mandal-green">{year}</span>)}</div></div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad devotional-gradient">
        <div className="container-pad"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }}><p className="eyebrow">Honours we cherish</p><h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">Other awards</h2></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />) : null}
            {allOtherAwards.map((award) => <motion.article key={`${award.name}-${award.year}`} variants={fadeUp} transition={{ duration: 0.42 }} whileHover={{ y: -7 }} className="group overflow-hidden rounded-[1.5rem] border border-mandal-green/10 bg-white shadow-soft transition-shadow hover:shadow-[0_20px_46px_rgba(13,63,35,0.17)]"><div className="relative aspect-[16/9] overflow-hidden"><img src={award.image} alt={award.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-mandal-gold/50 bg-white/95 text-mandal-gold"><Trophy className="h-5 w-5" /></span></div><div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-mandal-leaf">{award.organization}</p><h3 className="mt-2 font-display text-2xl font-bold leading-tight text-mandal-green">{award.name}</h3><p className="mt-3 text-sm leading-6 text-mandal-ink/68">{award.description}</p><p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mandal-green"><Calendar className="h-4 w-4 text-mandal-gold" />{award.year}</p></div></motion.article>)}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/75"><div className="container-pad"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Moments of pride</p><h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">Award gallery</h2></div><p className="max-w-sm text-sm leading-6 text-mandal-ink/65">Snapshots that honour the people and moments behind every recognition.</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{allGalleryItems.map((item) => <motion.figure key={`${item.label}-${item.image}`} variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl border border-mandal-green/10 bg-white shadow-soft"><div className="aspect-square overflow-hidden"><img src={item.image} alt={item.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><figcaption className="px-4 py-3 text-sm font-bold text-mandal-green">{item.label}</figcaption></motion.figure>)}</motion.div></div></section>
    </>
  );
}
