import { Camera, Mail, MapPin } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const mapsUrl = 'https://maps.app.goo.gl/UDqnSqzJCpjDA88w6';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Seo titleKey="seo.contactTitle" descriptionKey="seo.contactDescription" />
      <section className="section-pad devotional-gradient">
        <div className="container-pad">
          <SectionIntro eyebrow={t('contact.eyebrow')} title={t('contact.title')} text={t('contact.note')} centered />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="soft-panel p-6 sm:p-8">
            <div className="grid gap-8">
              <div>
                <p className="eyebrow">{t('contact.addressLabel')}</p>
                <p className="mt-4 flex gap-3 text-lg leading-8 text-mandal-ink/75">
                  <MapPin className="mt-1 shrink-0 text-mandal-gold" size={22} />
                  {t('contact.address')}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-mandal-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-mandal-leaf"
                >
                  <MapPin size={18} />
                  Open in Google Maps
                </a>
              </div>
              <div>
                <p className="eyebrow">{t('common.email')}</p>
                <a className="mt-4 flex gap-3 text-lg font-bold text-mandal-green" href={`mailto:${t('contact.emailValue')}`}>
                  <Mail className="text-mandal-gold" size={22} />
                  {t('contact.emailValue')}
                </a>
              </div>
              <div>
                <p className="eyebrow">{t('contact.socialTitle')}</p>
                <div className="mt-4 flex gap-3">
                  <a className="grid h-12 w-12 place-items-center rounded-full bg-mandal-green text-white" href="https://instagram.com" aria-label="Instagram">
                    <Camera size={20} />
                  </a>
                  <a className="grid h-12 w-12 place-items-center rounded-full bg-mandal-mint text-mandal-green" href={`mailto:${t('contact.emailValue')}`} aria-label={t('common.email')}>
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-mandal-green/10 bg-white shadow-soft">
            <div className="border-b border-mandal-green/10 px-5 py-4">
              <p className="font-display text-2xl font-bold text-mandal-green">{t('contact.mapTitle')}</p>
            </div>
            <iframe
              title={t('contact.mapTitle')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4208.161080209635!2d72.83050811781206!3d18.992237429270908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf000b144179%3A0x5be27ecc4f695b0e!2sPanchganga%20sarvjanik%20utsav%20mandal!5e1!3m2!1sen!2sin!4v1784186813782!5m2!1sen!2sin"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
