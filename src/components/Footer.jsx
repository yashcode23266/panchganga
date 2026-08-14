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
  {
    label: 'WhatsApp Channel',
    href: 'https://whatsapp.com/channel/0029VbDQEMcLdQemKQiziV2v',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982l-1.413 5.163 5.286-1.385c1.455.794 3.1 1.213 4.787 1.214h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.666-1.037-5.172-2.923-7.059-1.886-1.886-4.391-2.924-7.06-2.925zm0 18.272h-.003c-1.488 0-2.947-.401-4.22-1.157l-.303-.18-3.136.821.836-3.056-.197-.314c-.832-1.325-1.272-2.862-1.272-4.442.001-4.463 3.633-8.093 8.1-8.093 2.164 0 4.197.844 5.727 2.375 1.53 1.53 2.373 3.563 2.373 5.726 0 4.464-3.632 8.093-8.099 8.093zm4.437-6.071c-.244-.122-1.442-.712-1.666-.793-.223-.081-.386-.122-.549.123-.163.244-.63.793-.772.956-.143.163-.285.183-.529.061-.244-.122-1.031-.38-1.963-1.211-.725-.647-1.215-1.446-1.357-1.69-.143-.244-.015-.376.107-.498.11-.11.244-.285.366-.427.122-.143.163-.244.244-.407.081-.163.041-.305-.02-.427-.061-.122-.549-1.323-.752-1.811-.198-.475-.399-.411-.549-.419l-.468-.008c-.163 0-.427.061-.65.305-.224.244-.854.834-.854 2.034s.874 2.36 .996 2.523c.122.163 1.72 2.627 4.167 3.684.582.252 1.037.403 1.392.516.584.186 1.116.16 1.536.097.469-.07 1.442-.59 1.646-1.16.203-.57.203-1.057.142-1.16-.06-.102-.224-.183-.468-.305z"/>
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
