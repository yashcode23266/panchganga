import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Celebrity() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.homeTitle" descriptionKey="seo.homeDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('about.eyebrow')} title="Celebrity" text="Special guests and notable visitors." centered />
        </div>
      </section>
    </>
  );
}
