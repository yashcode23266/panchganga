import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink.jsx';
import Seo from '../components/Seo.jsx';
import SponsorsSection from '../components/SponsorsSection.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { fixedimages, homeImages } from '../data/images.js';
import Countdown from '../components/countdown.jsx';

const homeMapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4208.161080209635!2d72.83050811781206!3d18.992237429270908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf000b144179%3A0x5be27ecc4f695b0e!2sPanchganga%20sarvjanik%20utsav%20mandal!5e1!3m2!1sen!2sin!4v1784186813782!5m2!1sen!2sin';

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45, ease: 'easeOut' },
};

export default function Home() {
  const { t, pick } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />

      <div className="overflow-hidden border-y border-mandal-gold/30 bg-[#ffffff] py-3 text-green-1100">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm font-semibold">
          {[...Array(3)].map((_, index) => (
            <span key={index} className="flex items-center gap-10">
              <span>{t('home.announcement')}</span>
              <span className="text-mandal-gold">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-white">
        <div className="gold-divider absolute inset-x-0 top-0" />
        <div className="container-pad flex min-h-[calc(100vh-5rem)] items-center justify-center py-8 sm:py-10">
          <motion.div
            className="relative mx-auto w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className="absolute -inset-4 rounded-[3rem] border border-mandal-gold/25 bg-white shadow-soft" />
            <img
              className="relative max-h-[78vh] w-full object-contain p-2 sm:p-4 bg-white"
              src={homeImages.hero.src}
              alt={pick(homeImages.hero.alt)}
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="px-4 py-8 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-4 shadow-xl ring-1 ring-green-200 sm:p-8">
          <Countdown />
        </div>
      </section>

      <SponsorsSection />


      <div className="hidden">
        <div className="marquee-track flex w-[200%] gap-10 whitespace-nowrap text-sm font-semibold">
          {[...Array(2)].map((_, index) => (
            <span key={index} className="flex min-w-1/2 items-center gap-10">
              <span>{t('home.announcement')}</span>
              <span className="text-mandal-gold">•</span>
              <span>{t('home.announcement')}</span>
              <span className="text-mandal-gold">•</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section-pad green-wash">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div {...fadeIn}>
            <img
              className="rounded-[2rem] border border-mandal-green/10 bg-white object-contain shadow-soft max-h-[30rem] w-full"
              src={homeImages.intro.src}
              alt={pick(homeImages.intro.alt)}
              loading="lazy"
            />
          </motion.div>
          <motion.div {...fadeIn}>
            <p className="eyebrow">{t('brand.established')}</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl">
              {t('home.introTitle')}
            </h2>
            <p className="body-copy mt-5">{t('home.introText')}</p>
            <div className="mt-8 border-l-4 border-mandal-green pl-6">
              <h3 className="font-display text-3xl font-bold text-mandal-green">{t('home.festivalTitle')}</h3>
              <p className="mt-3 leading-8 text-mandal-ink/70">{t('home.festivalText')}</p>
            </div>
            <div className="mt-8">
              <ButtonLink to="/about" variant="secondary">
                View More
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white/70">
        <div className="container-pad">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{t('common.viewGallery')}</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green">{t('home.galleryTitle')}</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 font-bold text-mandal-green">
              {t('common.viewGallery')} <ArrowRight size={18} />
            </Link>
          </div>
          <p className="mt-4 max-w-2xl leading-8 text-mandal-ink/70">{t('home.galleryText')}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fixedimages.slice(0, 3).map((item) => (
              <figure key={`${item.year}-${pick(item.caption)}`} className="overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
                <img className="h-64 w-full object-contain" src={item.src} alt={pick(item.alt)} loading="lazy" />
                <figcaption className="border-t border-mandal-green/10 px-5 py-4 font-bold text-mandal-green">
                  {pick(item.caption)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      

      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <div className="soft-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="eyebrow">{t('common.location')}</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green">{t('home.contactPreviewTitle')}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-mandal-ink/70">{t('home.contactPreviewText')}</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft">
              <iframe
                title={t('home.contactPreviewTitle')}
                src={homeMapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>


<section className="section-pad devotional-gradient">
  <div className="container-pad">
    <div className="soft-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
      
      {/* LEFT TEXT */}
      <div>
        <p className="eyebrow">SPECIAL THANKS</p>

        <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green">
          Honoring Our Supporter
        </h2>

        <p className="mt-4 max-w-2xl leading-8 text-mandal-ink/70">
          We extend our heartfelt gratitude to{" "}
          <span className="font-semibold text-mandal-ink">Mr. [Name]</span>{" "}
          for his valuable support and contribution towards making this festival successful.
        </p>
      </div>

      {/* RIGHT IMAGE (same style as map box) */}
      <div className="overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft flex items-center justify-center">
        
        <img
          src="/images/zee.png"   // 👉 replace with your image
          alt="supporter"
          className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
        />

      </div>

    </div>
  </div>
</section>


    </>
  );
}
