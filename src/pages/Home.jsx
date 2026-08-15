import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink.jsx';
import Seo from '../components/Seo.jsx';
import SponsorsSection from '../components/SponsorsSection.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { fixedimages, homeImages } from '../data/images.js';
import Countdown from '../components/countdown.jsx';
import FeaturedVideo from '../components/FeaturedVideo.jsx';


const homeMapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4208.161080209635!2d72.83050811781206!3d18.992237429270908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf000b144179%3A0x5be27ecc4f695b0e!2sPanchganga%20sarvjanik%20utsav%20mandal!5e1!3m2!1sen!2sin!4v1784186813782!5m2!1sen!2sin';

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45, ease: 'easeOut' },
};

export default function Home() {
  const { language, t, pick } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />

      {/* <div className="overflow-hidden border-y border-mandal-gold/30 bg-[#ffffff] py-3 text-green-1100">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm font-semibold ">{}
          
          {[...Array(3)].map((_, index) => (
            <span key={index} className="flex items-center gap-10">
              <span>{t('home.announcement')}</span>
              <span className="text-mandal-gold">&bull;</span>
            </span>
          ))}
        </div>
      </div> */}


      <div className="overflow-hidden border-y border-mandal-gold/30 bg-[#ffffff] py-3 text-green-1100">
        <div className="marquee-track flex w-max gap-20 whitespace-nowrap text-sm font-semibold">

          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-20">
              {[...Array(3)].map((_, index) => (
                <span key={index} className="flex items-center gap-20">
                  <span>{t('home.announcement')}</span>
                  <span className="text-mandal-gold">&bull;</span>
                </span>
              ))}
            </div>
          ))}

        </div>
      </div>










      {/*HERO SECTION */}
      <section className="relative h-[calc(100vh-64px)] min-h-130 overflow-hidden bg-[#fffdf9] aspect-[1122/1402]">
        <div className="relative h-full w-full">
          <img
            src="/images/hero.webp"
            alt="Ganpati Bappa"
            width="1122"
            height="1402"
            fetchPriority="high"
            decoding="async"
            className="hero-image-fade absolute inset-0 h-full w-full scale-[1.5] object-contain object-[center_45%] sm:scale-100"
          />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="-mt-8 px-4 py-8 sm:-mt-12 sm:px-6 sm:py-14">
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

      <FeaturedVideo />


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
                {t('common.viewMore')}
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
              <figure key={`${item.year}-${pick(item.caption)}`} className="overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-soft">
                <div className="overflow-hidden rounded-[1.15rem] bg-mandal-mint/30">
                  <img className="h-72 w-full object-cover object-center" src={item.src} alt={pick(item.alt)} loading="lazy" />
                </div>
                <figcaption className="px-4 py-4 font-bold text-mandal-green">
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
            <div>
              <p className="eyebrow">{t('home.specialThanks')}</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green">
                {t('home.honoringSupporterTitle')}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-mandal-ink/80">
                {language === 'mr' ? (
                  <>
                    आम्ही <strong className="font-extrabold text-mandal-green text-xl underline decoration-mandal-gold/50 underline-offset-4">डॉ. सुमित संजय पाटील</strong> यांचे मनापासून आभार मानतो. त्यांच्या दूरदृष्टीपूर्ण संकल्पना आणि सामाजिक विषयांवरील संकल्पनांनी आमच्या देखाव्यांना जिवंतपणा दिला आहे. त्यांच्या सततच्या मार्गदर्शनाबद्दल आणि समर्पणाबद्दल आम्ही कृतज्ञ आहोत.
                  </>
                ) : (
                  <>
                    We extend our heartfelt gratitude to <strong className="font-extrabold text-mandal-green text-xl underline decoration-mandal-gold/50 underline-offset-4">Dr. Sumeet Sanjay Patil</strong>. His visionary concepts and socially relevant themes have brought our stories to life. We are grateful for his continued guidance and dedication.
                  </>
                )}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft flex items-center justify-center">
              <img
                src="/images/drsumit.jpeg"
                alt="Dr. Sumeet Sanjay Patil"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <div className="soft-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="eyebrow">{t('home.specialThanks')}</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-mandal-green">
                {t('home.lastingLegacyTitle')}
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-mandal-ink/80">
                {language === 'mr' ? (
                  <>
                    आम्ही कै. <strong className="font-extrabold text-mandal-green text-xl underline decoration-mandal-gold/50 underline-offset-4">सुनील कल्याणकर</strong> यांच्याप्रती कृतज्ञता व्यक्त करतो. ते १५ वर्षांहून अधिक काळ आमच्या टीमचा प्रमुख स्तंभ होते, जे पर्यावरणपूरक शाडूच्या मातीच्या मूर्ती साकारण्याच्या अप्रतिम कौशल्यासाठी प्रसिद्ध होते. त्यांची अँटीक फिनिश, शिल्पकला आणि अष्टभुजा व पंचमुखी गणेशासारख्या कलाकृती त्यांच्या अद्वितीय कलात्मकतेचे प्रतीक होत्या. गंभीर आजारपणातही त्यांचे समर्पण कधीच डगमगले नाही. त्यांचे मार्गदर्शन आणि कलात्मक वारसा आमच्या हृदयात कायम राहील.
                  </>
                ) : (
                  <>
                    We extend our heartfelt gratitude to Late <strong className="font-extrabold text-mandal-green text-xl underline decoration-mandal-gold/50 underline-offset-4">Sunil Kalyankar</strong>. He was an integral pillar of our team for over 15 years, renowned for his exceptional talent in crafting eco-friendly Shadu clay idols. His signature antique finishes, intricate balancing idols, and masterpieces like Ashtabhuja and Panchamukhi Ganesha reflected his extraordinary artistry. Even during severe illness, his dedication never wavered. His guidance and divine legacy will forever live on in our hearts.
                  </>
                )}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft flex items-center justify-center">
              <img
                src="/images/murti.jpeg"
                alt="Late Sunil Kalyankar"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
