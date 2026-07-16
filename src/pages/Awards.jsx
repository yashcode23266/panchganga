import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Awards() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('about.eyebrow')} title="Awards" text="Recognition and achievements of the mandal." centered />
        </div>
      </section>
    </>
  );
}
