import { Camera, Mail, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const socialLinks = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@panchgangasarvutsavmandal?si=Mhil8JnER3PjdFQg',
    icon: (
      <Play size={17} fill="currentColor" />
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
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
    <footer className="bg-[#A3C73A] text-[#0B3D1F] relative overflow-hidden">

      <div className="relative z-10 container-pad grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">

        {/* Brand */}
        <div>
          <img
              src="public/images/panlogo.png"
              width="500"
              height="500"
              loading="lazy"
              decoding="async"
              className="mb-4 h-20 w-20 rounded-full object-contain"
            />
          <p className="text-2xl font-bold">{t('footer1.text')}</p>
          <p className="mt-4 max-w-md leading-7 text-[#0B3D1F]/80">
            {t('footer.text')}
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="mb-4 text-xl font-extrabold text-[#0B3D1F]">
            Important Links
          </h3>
          <div className="grid gap-2.5 text-sm font-semibold text-[#0B3D1F]/80">
            <Link to="/"          className="hover:text-[#0B3D1F] transition">Home</Link>
            <Link to="/about"     className="hover:text-[#0B3D1F] transition">About</Link>
            <Link to="/social-work" className="hover:text-[#0B3D1F] transition">Social Work</Link>
            <Link to="/gallery"   className="hover:text-[#0B3D1F] transition">Gallery</Link>
            <Link to="/awards"    className="hover:text-[#0B3D1F] transition">Awards</Link>
            <Link to="/news"      className="hover:text-[#0B3D1F] transition">News</Link>
            <Link to="/celebrity" className="hover:text-[#0B3D1F] transition">Celebrity Visits</Link>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="mb-5 text-xl font-extrabold text-[#0B3D1F]">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm font-semibold text-[#0B3D1F]/85">
            {/* Email */}
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0 text-[#0B3D1F]" />
              <a
                href="mailto:panchgangautsavmandal@gmail.com"
                className="break-all leading-5 hover:text-[#0B3D1F] hover:underline transition"
              >
                panchgangautsavmandal@gmail.com
              </a>
            </li>

            {/* Location */}
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#0B3D1F]" />
              <span className="leading-5">Mumbai, Maharashtra, India</span>
            </li>
          </ul>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#0B3D1F] text-white shadow-md transition hover:scale-105 hover:bg-[#16632F]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-[#1F7A3D]/30 py-5 text-center text-sm text-[#0B3D1F]/70">
        © {new Date().getFullYear()} {t('brand.shortName')}. {t('footer.rights')}
      </div>
    </footer>
  );
}