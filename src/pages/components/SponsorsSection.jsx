import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { sponsorImages } from '../data/images.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SponsorsSection() {
  const { pick } = useLanguage();
  const [active, setActive] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const carouselRef = useRef(null);
  const isInteractingRef = useRef(false);
  const sponsors = sponsorImages;
  const loopSponsors = [...sponsors, ...sponsors];

  const modalImages = useMemo(() => active?.images || [active?.logo].filter(Boolean), [active]);

  const openSponsor = (sponsor) => {
    setActive(sponsor);
    setActiveImage(0);
  };

  const changeImage = (direction) => {
    if (!modalImages.length) return;
    setActiveImage((index) => (index + direction + modalImages.length) % modalImages.length);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    let frameId;
    const rotate = () => {
      const halfway = carousel.scrollWidth / 2;
      if (!isInteractingRef.current && halfway > carousel.clientWidth) {
        carousel.scrollLeft += 0.9;
        if (carousel.scrollLeft >= halfway) carousel.scrollLeft = 0;
      }
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="section-pad relative overflow-hidden bg-mandal-ivory">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mandal-gold to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-mandal-saffron/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-mandal-gold/10 blur-3xl" />

      <motion.div
        className="container-pad relative"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold uppercase text-mandal-green sm:text-5xl">Sponsors</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-mandal-ink/80 sm:text-xl">
            "Together, supporting a legacy of faith, grandeur, and the soul of Ganesh Utsav."
          </p>
        </div>

        <div className="mt-11 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={() => {
              isInteractingRef.current = true;
            }}
            onPointerUp={() => {
              isInteractingRef.current = false;
            }}
            onPointerCancel={() => {
              isInteractingRef.current = false;
            }}
            onPointerLeave={() => {
              isInteractingRef.current = false;
            }}
          >
            {loopSponsors.map((sponsor, index) => (
              <motion.button
                key={`${pick(sponsor.name)}-${index}`}
                type="button"
                onClick={() => openSponsor(sponsor)}
                className="group relative min-w-[220px] overflow-hidden rounded-xl border border-mandal-gold/30 bg-white p-5 text-center shadow-sm outline-none transition sm:min-w-[260px]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: Math.min(index, sponsors.length - 1) * 0.035 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 18px 38px rgba(13, 63, 35, 0.14)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 rounded-xl ring-1 ring-transparent transition group-hover:ring-mandal-gold" />
                <div className="mx-auto grid h-24 w-full place-items-center rounded-lg bg-white p-3">
                  <img
                    src={sponsor.logo}
                    alt={pick(sponsor.alt) || pick(sponsor.name)}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-4 text-lg font-black leading-tight text-mandal-green">{pick(sponsor.name)}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-mandal-ink/78 p-3 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button className="absolute inset-0 cursor-default" type="button" onClick={() => setActive(null)} aria-label="Close" />
            <motion.div
              className="relative max-h-[94vh] w-full max-w-7xl overflow-y-auto rounded-[2rem] border border-mandal-gold/35 bg-mandal-ivory shadow-soft"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-mandal-green text-white shadow-soft"
                aria-label="Close sponsor gallery"
              >
                <X size={20} />
              </button>

              <div className="border-b border-mandal-gold/30 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-5 pr-16">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-mandal-gold/20">
                    <img src={active.logo} alt={pick(active.alt) || pick(active.name)} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-mandal-green">Sponsor Gallery</p>
                    <h3 className="mt-1 font-display text-4xl font-bold uppercase text-mandal-green sm:text-5xl">{pick(active.name)}</h3>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <p className="mb-6 max-w-3xl leading-8 text-mandal-ink/70">
                  {active.message || 'Thank you for supporting.'}
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {modalImages.map((image, index) => (
                    <motion.button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-3xl bg-white ring-1 transition ${
                        index === activeImage ? 'ring-mandal-gold' : 'ring-mandal-gold/20'
                      } ${index === 0 ? 'sm:row-span-2' : ''}`}
                      whileHover={{ scale: 1.025 }}
                    >
                      <motion.img
                        src={image}
                        alt={`${pick(active.name)} gallery ${index + 1}`}
                        className={`${index === 0 ? 'h-80 sm:h-[31rem]' : 'h-64'} w-full cursor-grab object-contain p-3 active:cursor-grabbing`}
                        loading="lazy"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.16}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -60) changeImage(1);
                          if (info.offset.x > 60) changeImage(-1);
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
