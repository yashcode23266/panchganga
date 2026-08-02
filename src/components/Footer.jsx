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
    icon: <Play size={17} fill="currentColor" />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/watch/viralkamleshrajput/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/panchganga.ganeshotsav',
    icon: <Camera size={17} />,
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={`relative overflow-hidden bg-[#A3C73A] ${footerText}`}>
      <div className="relative z-10 container-pad grid gap-10 py-12 md:grid-cols-[1.35fr_1fr_1.1fr]">
        <div>
          <img
            src="/images/panlogo.png"
            alt={t('brand.name')}
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
            className="mb-4 h-20 w-20 rounded-full bg-white object-contain p-1 shadow-md"
          />
          <p className={`font-display text-2xl font-bold leading-tight ${footerText} sm:text-3xl`}>{t('footer1.text')}</p>
          <p className="mt-4 max-w-md text-sm font-medium leading-7 text-mandal-green/78">
            {t('footer.text')}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className={`mb-4 text-sm font-black uppercase tracking-[0.14em] ${footerText}`}>Important Links</h3>
          <div className={`grid gap-2.5 text-sm font-bold tracking-[0.01em] ${footerTextSoft}`}>
            <Link to="/" className={`transition ${footerHover}`}>Home</Link>
            <Link to="/about" className={`transition ${footerHover}`}>About</Link>
            <Link to="/social-work" className={`transition ${footerHover}`}>Social Work</Link>
            <Link to="/gallery" className={`transition ${footerHover}`}>Gallery</Link>
            <Link to="/awards" className={`transition ${footerHover}`}>Awards</Link>
            <Link to="/news" className={`transition ${footerHover}`}>News</Link>
            <Link to="/celebrity" className={`transition ${footerHover}`}>Celebrity Visits</Link>
          </div>
        </nav>

        <div>
          <h3 className={`mb-5 text-sm font-black uppercase tracking-[0.14em] ${footerText}`}>Contact Us</h3>

          <ul className="space-y-3 text-sm font-bold tracking-[0.01em] text-mandal-green/84">
            <li className="grid gap-1 sm:grid-cols-[5.8rem_1fr] sm:gap-3">
              <span className={`flex items-center gap-2 font-black ${footerText}`}>
                <Mail size={15} className="shrink-0" />
                Email:
              </span>
              <a
                href="mailto:panchgangautsavmandal@gmail.com"
                className={`break-all leading-5 transition ${footerHover} hover:underline`}
              >
                panchgangautsavmandal@gmail.com
              </a>
            </li>

            <li className="grid gap-1 sm:grid-cols-[5.8rem_1fr] sm:gap-3">
              <span className={`flex items-center gap-2 font-black ${footerText}`}>
                <MapPin size={15} className="shrink-0" />
                Location:
              </span>
              <span className="leading-5">Mumbai, Maharashtra, India</span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-mandal-green text-white shadow-md transition hover:scale-105 hover:bg-mandal-leaf"
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
