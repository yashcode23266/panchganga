import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Award, Calendar, ChevronLeft, ChevronRight, Medal, Sparkles, Star, Trophy, X } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections } from '../utils/contentStore.js';

const imageUrls = {
  trophy: '/images/limca-book-of-records.jpeg',
  medal: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=85',
  certificate: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=900&q=85',
  ceremony: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1100&q=85',
  group: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85',
};

const statistics = [
  { value: 25, suffix: '+', labelKey: 'awardsPage.awardsReceived', icon: Trophy },
  { value: 15, suffix: '+', labelKey: 'awardsPage.yearsRecognition', icon: Star },
  { value: 5, suffix: '+', labelKey: 'awardsPage.majorOrgs', icon: Medal },
  { value: 100, suffix: '+', labelKey: 'awardsPage.achievements', icon: Award },
];

const timelineAwards = [
  {
    year: '2025',
    title: { en: 'BMC Excellence Award', mr: 'महापालिका उत्कृष्टता पुरस्कार' },
    text: { en: 'Honoured for thoughtful festival management, public safety and community participation.', mr: 'उत्कृष्ट उत्सव नियोजन, सार्वजनिक सुरक्षितता आणि लोकसहभागाबद्दल सन्मानित.' },
  },
  {
    year: '2024',
    title: { en: 'Mumbai Police Appreciation Award', mr: 'मुंबई पोलीस प्रशंसा सन्मान' },
    text: { en: 'Recognised for exemplary coordination and a peaceful, well-organised celebration.', mr: 'आदर्श समन्वय आणि शांततापूर्ण, शिस्तबद्ध उत्सवासाठी सन्मानित.' },
  },
  {
    year: '2023',
    title: { en: 'Best Cultural Festival Award', mr: 'सर्वोत्कृष्ट सांस्कृतिक उत्सव पुरस्कार' },
    text: { en: 'Celebrating the mandal’s commitment to preserving culture through a vibrant festival.', mr: 'भव्य उत्सवाच्या माध्यमातून संस्कृतीचे जतन करण्याच्या कटिबद्धतेचा गौरव.' },
  },
  {
    year: '2022',
    title: { en: 'Environmental Excellence Award', mr: 'पर्यावरण उत्कृष्टता पुरस्कार' },
    text: { en: 'Awarded for sustainable practices and an eco-conscious approach to Ganeshotsav.', mr: 'पर्यावरणपूरक गणेशोत्सव पद्धती आणि शाश्वत उपक्रमांसाठी सन्मानित.' },
  },
];

const otherAwards = [
  {
    name: { en: 'Shri Ganesh Gaurav Award', mr: 'श्री गणेश गौरव पुरस्कार' },
    organization: { en: 'Brihanmumbai Municipal Corporation', mr: 'बृहन्मुंबई महानगरपालिका' },
    year: '2012, 2015, 2016, 2017, 2018, 2019, 2022, 2023, 2024',
    description: { en: 'For safeguarding local traditions and welcoming new generations into the celebration.', mr: 'स्थानिक परंपरांचे रक्षण आणि नवीन पिढीला उत्सवात सहभागी करून घेतल्याबद्दल.' },
    image: '/images/bmcframe.jpeg',
    images: ['/images/bmc2012.jpeg', '/images/bmc2015.jpeg', '/images/bmc2016.jpeg', '/images/bmc2017.jpeg', '/images/bmc2018.jpeg', '/images/bmc2019.jpeg', '/images/bmc2022.jpeg', '/images/bmcfpj2022.jpeg', '/images/bmc2023.jpeg', '/images/bmc2024.jpeg',]
  },
  {
    name: { en: 'Ganesh Murti Ustav Spardha', mr: 'गणेश मूर्ती उत्सव स्पर्धा' },
    organization: { en: 'Lokstta', mr: 'लोकसत्ता' },
    year: '2024, 2023',
    description: { en: 'In recognition of meaningful year-round initiatives that serve the local community.', mr: 'स्थानिक समुदायाची सेवा करणाऱ्या समाजोपयोगी वर्षभर उपक्रमांबद्दल.' },
    image: '/images/lokstta24.jpeg',
    images: ['/images/lokstta24.jpeg', '/images/lokstta2030.jpeg', '/images/loksttaframe.jpeg', '/images/loksttaframe1.jpeg', '/images/loksttaframe2.jpeg', '/images/loksttaframe3.jpeg', '/images/loksattaganpati1.jpeg', '/images/loksttaraja.jpeg',],
  },
  {
    name: { en: 'Best Decoration and cleanliness', mr: 'सर्वोत्कृष्ट देखावा व स्वच्छता' },
    organization: { en: 'Bharatiya janata Party', mr: 'भारतीय जनता पार्टी' },
    year: '2022, 2023',
    description: { en: 'For an inclusive festival experience shaped by devotion, creativity and care.', mr: 'भक्ती, कलात्मकता आणि आपुलकीने नटलेल्या सर्वसमावेशक उत्सवासाठी.' },
    image: '/images/bjp1.jpeg',
    images: ['/images/bjp1.jpeg', '/images/bjp2.jpeg',],
  },
  {
    name: { en: 'Green Mandal Recognition', mr: 'हरित मंडळ गौरव' },
    organization: { en: 'Clean Mumbai Initiative', mr: 'स्वच्छ मुंबई उपक्रम' },
    year: '2012,2017,2024,2025',
    description: { en: 'Acknowledging responsible celebrations, waste management and environmental awareness.', mr: 'जबाबदार उत्सव, कचरा व्यवस्थापन आणि पर्यावरण जागृतीसाठी सन्मान.' },
    image: '/images/eco2025.jpeg',
    images: ['/images/eco2012.jpeg', '/images/eco2017.jpeg', '/images/eco2024.jpeg', '/images/eco2025.jpeg', '/images/eco.jpeg',],
  },
  {
    name: { en: 'Ustav MumbaiCha', mr: 'उत्सव मुंबईचा' },
    organization: { en: 'Ward Cultural Committee', mr: 'प्रभाग सांस्कृतिक समिती' },

    description: { en: 'Presented for sustained support of civic awareness and neighbourhood unity.', mr: 'नागरी जागृती आणि परिसर एकोप्यासाठी सतत दिलेल्या पाठिंब्याबद्दल.' },
    image: '/images/utsavmumbaicha.jpeg',
    images: ['/images/utsavmumbaicha.jpeg',],
  },
  {
    name: { en: 'Mumbai Police ganeshutsav', mr: 'मुंबई पोलीस गणेशोत्सव' },
    organization: { en: 'Maharashtra Utsav Network', mr: 'महाराष्ट्र उत्सव नेटवर्क' },
    year: '2016 , 2018',
    description: { en: 'For presenting heritage in fresh, engaging and respectful ways for all visitors.', mr: 'सर्व भाविकांसाठी सांस्कृतिक वारसा नाविन्यपूर्ण व आदरपूर्वक मांडल्याबद्दल.' },
    image: '/images/policeframe.jpeg',
    images: ['/images/policeframe.jpeg', '/images/police2012.jpeg', '/images/police2018.jpeg',],
  },
  {
    name: { en: 'Most valuable Award', mr: 'सर्वात मूल्यवान पुरस्कार' },
    organization: { en: 'Maharashtra Utsav Network', mr: 'महाराष्ट्र उत्सव नेटवर्क' },
    year: '2014, 2016, 2017,2018,2019, 2024, 2025',
    description: { en: 'For presenting heritage in fresh, engaging and respectful ways for all visitors.', mr: 'सर्व भाविकांसाठी सांस्कृतिक वारसा नाविन्यपूर्ण व आदरपूर्वक मांडल्याबद्दल.' },
    image: '/images/abu00.jpeg',
    images: ['/images/abu2014.jpeg', '/images/abu2016.jpeg', '/images/abu20161.jpeg', '/images/abu2016171.jpeg', '/images/abu11.jpeg', '/images/abu1718.jpeg', '/images/abu21819.jpeg', '/images/abu2024.jpeg', '/images/abu00.jpeg',],
  },
];

const galleryItems = [
  { label: { en: 'Trophy', mr: 'चषक' }, image: imageUrls.trophy },
  { label: { en: 'Certificate', mr: 'प्रमाणपत्र' }, image: imageUrls.certificate },
  { label: { en: 'Award ceremony', mr: 'पुरस्कार सोहळा' }, image: imageUrls.ceremony },
  { label: { en: 'Mandal family', mr: 'मंडळ कुटुंब' }, image: imageUrls.group },
];

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedCount({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setCount(Math.round((value * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Awards() {
  const { t, pick } = useLanguage();
  const { items: uploadedAwards, loading } = useFirestoreItems(contentCollections.awards);
  const [activeItem, setActiveItem] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);

  const dynamicAwards = uploadedAwards.map((award) => ({
    name: award.name || 'Award',
    organization: award.organization || 'Panchganga',
    year: award.year || '2026',
    description: award.description || '',
    image: award.image || award.images?.[0] || imageUrls.trophy,
    images: award.images?.length ? award.images : [award.image].filter(Boolean),
  }));

  const allOtherAwards = [...dynamicAwards, ...otherAwards].map((award) => ({
    ...award,
    images: award.images?.length ? award.images : [award.image].filter(Boolean),
  }));

  const allGalleryItems = [
    ...uploadedAwards.flatMap((award) =>
      (award.images?.length ? award.images : [award.image].filter(Boolean)).map((image, index) => ({
        label: index === 0 ? pick(award.name) || 'Award' : `${pick(award.name) || 'Award'} ${index + 1}`,
        image,
      })),
    ),
    ...galleryItems,
  ];

  const modalImages = activeItem?.images?.length ? activeItem.images : [activeItem?.image].filter(Boolean);

  const openPhotos = (item) => {
    setActiveItem(item);
    setActivePhoto(0);
  };

  const closePhotos = () => {
    setActiveItem(null);
    setActivePhoto(0);
  };

  const changePhoto = (direction) => {
    if (!modalImages.length) return;
    setActivePhoto((index) => (index + direction + modalImages.length) % modalImages.length);
  };

  return (
    <>
      <Seo titleKey="seo.awardsTitle" descriptionKey="seo.awardsDescription" />

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
            <p className="eyebrow mt-6">{t('awardsPage.eyebrow')}</p>
            <h1 className="headline mt-4">{t('awardsPage.title')}</h1>
            <p className="body-copy mt-5">{t('awardsPage.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/75">
        <div className="container-pad">
          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="relative overflow-hidden rounded-[2rem] border border-mandal-gold/35 bg-white shadow-soft lg:grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-mandal-gold" />
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-mandal-mint px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-mandal-green"><Sparkles className="h-3.5 w-3.5 text-mandal-gold" />{t('about.awardsList.a1Label')}</div>
              <p className="mt-7 font-semibold text-mandal-leaf">2017</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl">Limca Book of Records Award</h2>
              <p className="mt-5 max-w-xl leading-8 text-mandal-ink/70">{t('about.awardsList.a1Desc')}</p>
            </div>
            <div className="relative min-h-[19rem] overflow-hidden bg-mandal-green p-5 sm:p-7 lg:h-[32rem]">
              <motion.img whileHover={{ scale: 1.045 }} transition={{ duration: 0.55, ease: 'easeOut' }} src={imageUrls.trophy} alt="Limca Book of Records Award" className="h-full w-full rounded-[1.5rem] border-2 border-mandal-gold/75 object-cover shadow-soft" />
              <div className="absolute bottom-10 left-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-mandal-green backdrop-blur"><Trophy className="mr-2 inline h-4 w-4 text-mandal-gold" />Limca Book of Records</div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map(({ value, suffix, labelKey, icon: Icon }) => (
              <motion.div key={labelKey} variants={fadeUp} transition={{ duration: 0.4, ease: 'easeOut' }} whileHover={{ y: -5 }} className="soft-panel group p-5 sm:p-6">
                <Icon className="h-6 w-6 text-mandal-gold transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <p className="mt-4 font-display text-4xl font-bold text-mandal-green"><AnimatedCount value={value} suffix={suffix} /></p>
                <p className="mt-1 text-sm font-semibold text-mandal-ink/65">{t(labelKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="timeline" className="section-pad devotional-gradient">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }}>
            <p className="eyebrow">{t('about.timelineHeader')}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">{t('awardsPage.title')}</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="relative space-y-6 border-l border-mandal-gold/50 pl-7 sm:pl-9">
            {timelineAwards.map((item) => (
              <motion.article key={item.year} variants={fadeUp} transition={{ duration: 0.42 }} className="relative rounded-2xl border border-mandal-green/10 bg-white/90 p-5 shadow-soft sm:p-6">
                <span className="absolute -left-[2.25rem] top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-mandal-cream bg-mandal-gold sm:-left-[2.75rem]"><Medal className="h-3.5 w-3.5 text-mandal-green" /></span>
                <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-mandal-green px-3 py-1 text-xs font-bold text-white">{item.year}</span><h3 className="font-display text-2xl font-bold text-mandal-green">{pick(item.title)}</h3></div>
                <p className="mt-3 leading-7 text-mandal-ink/68">{pick(item.text)}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp} transition={{ duration: 0.45 }}><p className="eyebrow">{t('awardsPage.eyebrow')}</p><h2 className="mt-3 font-display text-4xl font-bold text-mandal-green sm:text-5xl">{t('awardsPage.title')}</h2></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={stagger} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />) : null}
            {allOtherAwards.map((award) => <motion.article key={`${pick(award.name)}-${award.year}`} variants={fadeUp} transition={{ duration: 0.42 }} whileHover={{ y: -7 }} className="group overflow-hidden rounded-[1.5rem] border border-mandal-green/10 bg-white shadow-soft transition-shadow hover:shadow-[0_20px_46px_rgba(13,63,35,0.17)]"><button type="button" onClick={() => openPhotos(award)} className="block w-full overflow-hidden rounded-[1.25rem] text-left outline-none transition focus:ring-4 focus:ring-mandal-gold/40" aria-label={`Open photos for ${pick(award.name)}`}><div className="relative aspect-[16/9] overflow-hidden"><img src={award.image} alt={pick(award.name)} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-mandal-gold/50 bg-white/95 text-mandal-gold"><Trophy className="h-5 w-5" /></span></div></button><div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-mandal-leaf">{pick(award.organization)}</p><h3 className="mt-2 font-display text-2xl font-bold leading-tight text-mandal-green">{pick(award.name)}</h3><p className="mt-3 text-sm leading-6 text-mandal-ink/68">{pick(award.description)}</p><p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mandal-green"><Calendar className="h-4 w-4 text-mandal-gold" />{award.year}</p></div></motion.article>)}
          </motion.div>
        </div>
      </section>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-[#0B3D1F]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePhotos();
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#1F7A3D]/15 px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1F7A3D]">Award Photos</p>
                <h3 className="truncate font-display text-2xl font-bold text-[#0B3D1F]">{pick(activeItem.name) || pick(activeItem.title)}</h3>
              </div>
              <button
                type="button"
                onClick={closePhotos}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0B3D1F] text-white transition hover:bg-[#16632F]"
                aria-label="Close award photos"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative bg-[#F6FAEF] p-4 sm:p-6">
              <img
                src={modalImages[activePhoto]}
                alt={`${pick(activeItem.name) || pick(activeItem.title)} ${activePhoto + 1}`}
                className="mx-auto h-[62vh] max-h-[680px] w-full rounded-2xl object-contain"
              />

              {modalImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    className="absolute left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B3D1F] shadow-md transition hover:bg-[#A3C73A]"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B3D1F] shadow-md transition hover:bg-[#A3C73A]"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
