import { Camera, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-mandal-gold/25 forest-surface text-white">
      <div className="container-pad grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-white">{t('brand.name')}</p>
          <p className="mt-4 max-w-md leading-7 text-white/70">{t('footer.text')}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-mandal-gold">{t('common.location')}</p>
          <p className="mt-4 flex gap-3 leading-7 text-white/72">
            <MapPin className="mt-1 shrink-0 text-mandal-gold" size={18} />
            {t('contact.address')}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-mandal-gold">{t('common.follow')}</p>
          <div className="mt-4 flex gap-3">
            <Link className="grid h-11 w-11 place-items-center rounded-full bg-white text-mandal-green" to="/contact" aria-label={t('common.email')}>
              <Mail size={18} />
            </Link>
            <a className="grid h-11 w-11 place-items-center rounded-full bg-white text-mandal-green" href="https://instagram.com" aria-label="Instagram">
              <Camera size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-mandal-gold/25 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {t('brand.shortName')}. {t('footer.rights')}
      </div>
    </footer>
  );
}
