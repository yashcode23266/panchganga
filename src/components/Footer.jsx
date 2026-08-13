import { Camera, Mail, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const footerText = 'text-mandal-green';
const footerTextSoft = 'text-mandal-green/82';
const footerHover = 'hover:text-mandal-leaf';

const socialLinks = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@panchgangasarvutsavmandal?si=Mhil8JnER3PjdFQg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1dxt65UrJ9/?mibextid=wwXIfr',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/panchganga.ganeshotsav',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={`relative overflow-hidden bg-[#A3C73A] ${footerText}`}>
      <div className="relative z-10 container-pad grid gap-10 py-12 text-center md:grid-cols-[1.35fr_1fr_1.1fr] md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/images/panlogo.png"
            alt={t('brand.name')}
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
            className="mb-4 h-20 w-20 rounded-full bg-white object-contain p-1 shadow-md"
          />
          <p className={`font-display text-2xl font-bold leading-tight ${footerText} sm:text-3xl`}>{t('common.aboutMandal')}</p>
          <p className="mt-4 max-w-md text-sm font-medium leading-7 text-mandal-green/78">
            {t('footer.text')}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col items-center md:items-start">
          <h3 className={`mb-4 text-sm font-black uppercase tracking-[0.14em] ${footerText}`}>{t('footer.quickLinks')}</h3>
          <div className={`grid gap-2.5 text-sm font-bold tracking-[0.01em] ${footerTextSoft}`}>
            <Link to="/" className={`transition ${footerHover}`}>{t('nav.home')}</Link>
            <Link to="/about" className={`transition ${footerHover}`}>{t('nav.about')}</Link>
            <Link to="/social-work" className={`transition ${footerHover}`}>{t('nav.socialWork')}</Link>
            <Link to="/gallery" className={`transition ${footerHover}`}>{t('nav.gallery')}</Link>
            <Link to="/awards" className={`transition ${footerHover}`}>{t('nav.awards')}</Link>
            <Link to="/news" className={`transition ${footerHover}`}>{t('nav.news')}</Link>
            <Link to="/celebrity" className={`transition ${footerHover}`}>{t('nav.celebrity')}</Link>
          </div>
        </nav>

        <div className="flex flex-col items-center md:items-start">
          <h3 className={`mb-5 text-sm font-black uppercase tracking-[0.14em] ${footerText}`}>{t('nav.contact')}</h3>

          <ul className="space-y-3 text-sm font-bold tracking-[0.01em] text-mandal-green/84 flex flex-col items-center md:items-start">
            <li className="flex flex-col items-center sm:flex-row sm:gap-2 md:items-start">
              <span className={`flex items-center gap-2 font-black ${footerText}`}>
                <Mail size={15} className="shrink-0" />
                {t('common.email')}:
              </span>
              <a
                href="mailto:panchgangautsavmandal@gmail.com"
                className={`break-all leading-5 transition ${footerHover} hover:underline`}
              >
                panchgangautsavmandal@gmail.com
              </a>
            </li>

            <li className="flex flex-col items-center sm:flex-row sm:gap-2 md:items-start">
              <span className={`flex items-center gap-2 font-black ${footerText}`}>
                <MapPin size={15} className="shrink-0" />
                {t('common.location')}:
              </span>
              <span className="leading-5">{t('footer.address')}</span>
            </li>
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-mandal-green text-white shadow-md transition hover:scale-110 hover:bg-mandal-leaf"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-mandal-green/30 py-5 text-center text-sm font-semibold text-mandal-green/70">
        © {new Date().getFullYear()} {t('brand.shortName')}. {t('footer.rights')}
      </div>
    </footer>
  );
}
