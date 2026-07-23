import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { CardSkeleton } from '../components/Skeleton.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { eventImages } from '../data/images.js';
import useFirestoreItems from '../hooks/useFirestoreItems.js';
import { contentCollections, toLocalized } from '../utils/contentStore.js';

export default function SocialWork() {
  const { t, pick } = useLanguage();
  const { items: uploadedItems, loading } = useFirestoreItems(contentCollections.socialWork);
  const dynamicItems = uploadedItems.map((item) => ({
    key: item.id,
    image: item.image || item.images?.[0],
    title: toLocalized(item.title || 'Social Work'),
    text: toLocalized(item.description || ''),
  }));
  const socialWorkItems = [...dynamicItems, ...eventImages];

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
                <div className="overflow-hidden rounded-[1.75rem] bg-mandal-mint/30">
                  <img
                    className="h-56 w-full object-cover"
                    src={event.image}
                    alt={pick(event.title)}
                    loading="lazy"
                  />
                </div>
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
    </>
  );
}
