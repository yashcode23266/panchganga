import { Camera, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#A3C73A] text-[#0B3D1F] relative overflow-hidden">

      {/* White Gradient Overlay */}

      <div className="relative z-10 container-pad grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        
        {/* Brand */}
        <div>
          <p className="text-2xl font-bold">{t('brand.name')}</p>
          <p className="mt-4 max-w-md leading-7 text-[#0B3D1F]/80">
            {t('footer.text')}
          </p>
        </div>

        {/* Location */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[#0B3D1F]">
            {t('common.location')}
          </p>
          <p className="mt-4 flex gap-3 leading-7 text-[#0B3D1F]/80">
            <MapPin className="mt-1 shrink-0 text-[#0B3D1F]" size={18} />
            {t('contact.address')}
          </p>
        </div>

        {/* Social */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[#0B3D1F]">
            {t('common.follow')}
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              className="grid h-11 w-11 place-items-center rounded-full bg-[#0B3D1F] text-white shadow-md hover:bg-[#16632F] transition"
              to="/contact"
              aria-label={t('common.email')}
            >
              <Mail size={18} />
            </Link>

            <a
              className="grid h-11 w-11 place-items-center rounded-full bg-[#0B3D1F] text-white shadow-md hover:bg-[#16632F] transition"
              href="https://instagram.com"
              aria-label="Instagram"
            >
              <Camera size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-[#1F7A3D]/30 py-5 text-center text-sm text-[#0B3D1F]/70">
        © {new Date().getFullYear()} {t('brand.shortName')}. {t('footer.rights')}
      </div>
    </footer>
  );
}