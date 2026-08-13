import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import Seo from '../components/Seo.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { eventImages } from '../data/images.js';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections, toLocalized } from '../utils/contentStore.js';

export default function SocialWork() {
  const { t, pick } = useLanguage();
  const [activeItem, setActiveItem] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const { items: uploadedItems, loading } = useFirestoreItems(contentCollections.socialWork);
  const dynamicItems = uploadedItems.map((item) => ({
    key: item.id,
    image: item.image || item.images?.[0],
    images: item.images?.length ? item.images : [item.image].filter(Boolean),
    title: toLocalized(item.title || 'Social Work'),
    text: toLocalized(item.description || ''),
  }));
  const socialWorkItems = [...dynamicItems, ...eventImages.map((item) => ({
    ...item,
    images: item.images?.length ? item.images : [item.image].filter(Boolean),
  }))];
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
      <Seo titleKey="seo.socialWorkTitle" descriptionKey="seo.socialWorkDescription" />
      <section className="section-pad bg-white/80">
        <div className="container-pad">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow">{t('socialWork.eyebrow')}</p>
            <h2 className="mt-4 font-display text-5xl font-bold text-mandal-green sm:text-6xl">
              {t('socialWork.title')}
            </h2>
            <p className="body-copy mx-auto mt-5 max-w-2xl text-mandal-ink/75">
              {t('socialWork.intro')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {loading ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />) : null}
            {socialWorkItems.map((event, index) => (
              <article key={event.key} className="group overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
                <button
                  type="button"
                  onClick={() => openPhotos(event)}
                  className="block w-full overflow-hidden rounded-[1.75rem] bg-mandal-mint/30 text-left outline-none ring-mandal-gold/0 transition focus:ring-4"
                  aria-label={`${t('openPhotosFor')} ${pick(event.title)}`}
                >
                  <img
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                    src={event.image}
                    alt={pick(event.title)}
                    loading="lazy"
                  />
                </button>
                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-mandal-leaf">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-mandal-green">{pick(event.title)}</h3>
                  <p className="mt-4 leading-8 text-mandal-ink/70">{pick(event.text)}</p>
                </div>
              </article>
            ))}
          </div>
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
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1F7A3D]">{t('socialWork.title')}</p>
                <h3 className="truncate font-display text-2xl font-bold text-[#0B3D1F]">{pick(activeItem.title)}</h3>
              </div>
              <button
                type="button"
                onClick={closePhotos}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0B3D1F] text-white transition hover:bg-[#16632F]"
                aria-label={t('common.close')}
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative bg-[#F6FAEF] p-4 sm:p-6">
              <img
                src={modalImages[activePhoto]}
                alt={`${pick(activeItem.title)} ${activePhoto + 1}`}
                className="mx-auto h-[62vh] max-h-[680px] w-full rounded-2xl object-contain"
              />

              {modalImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    className="absolute left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B3D1F] shadow-md transition hover:bg-[#A3C73A]"
                    aria-label={t('previousPhoto')}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B3D1F] shadow-md transition hover:bg-[#A3C73A]"
                    aria-label={t('nextPhoto')}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              ) : null}
            </div>

            {modalImages.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto px-5 pb-5">
                {modalImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activePhoto === index ? 'border-[#1F7A3D]' : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                    aria-label={`${t('viewPhoto')} ${index + 1}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
