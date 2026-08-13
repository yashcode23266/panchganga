import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const colors = {
  text: 'text-mandal-green',
  textSoft: 'text-mandal-green/82',
  hover: 'hover:text-mandal-leaf',
  surface: 'bg-mandal-green',
  surfaceHover: 'hover:bg-mandal-leaf',
};

const navItems = [
  ['/about', 'nav.about'],
  ['/social-work', 'nav.socialWork'],
  ['/gallery', 'nav.gallery'],
  ['/awards', 'nav.awards'],
  ['/news', 'nav.news'],
  ['/celebrity', 'nav.celebrity'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const nextLanguage = language === 'en' ? 'mr' : 'en';

  const navClass = ({ isActive }) =>
    `text-sm font-bold tracking-[0.01em] transition ${isActive ? 'text-mandal-leaf' : `${colors.textSoft} ${colors.hover}`
    }`;

  return (
    <header className={`sticky top-0 z-40 overflow-hidden bg-[#A3C73A] ${colors.text} shadow-md`}>
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#1F7A3D]/25" />
      <div className="relative z-10 container-pad flex h-20 items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            const newClickCount = logoClicks + 1;
            setLogoClicks(newClickCount);

            if (newClickCount === 5) {
              navigate('/admin-login');
              setLogoClicks(0);
            } else {
              navigate('/');

              setTimeout(() => {
                setLogoClicks(0);
              }, 3000);
            }
          }}
          className="flex items-center gap-3"
        >
          <img
            src="/images/panlogo.png"
            alt={t('brand.name')}
            className="h-16 w-16 object-contain drop-shadow-md sm:h-[4.5rem] sm:w-[4.5rem]"
          />

          <span
            className={`font-serif text-[0.8rem] font-black leading-none tracking-[-0.02em] ${colors.text} sm:text-[1.8rem]`}
          >
            {t('brand.shortName')}
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(([to, key]) => (
            <NavLink key={to} to={to} className={navClass}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setLanguage(nextLanguage)}
            className={`${colors.surface} ${colors.surfaceHover} rounded-xl px-5 py-2 text-sm font-bold tracking-[0.01em] text-white shadow-md transition`}
          >
            {t('nav.language')}
          </button>
        </div>

        <button
          type="button"
          className={`${colors.surface} grid h-11 w-11 place-items-center rounded-full text-white shadow-md md:hidden`}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t('nav.close') : t('nav.menu')}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="relative z-10 border-t border-[#1F7A3D]/20 bg-[#A3C73A] md:hidden">
          <nav className="relative container-pad flex flex-col gap-2 py-4">
            {navItems.map(([to, key]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-bold transition ${isActive
                    ? 'bg-[#0B3D1F] text-white'
                    : 'text-mandal-green hover:bg-white/45'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={() => setLanguage(nextLanguage)}
              className={`${colors.surface} mt-2 rounded-xl px-4 py-3 font-bold text-white`}
            >
              {t('nav.language')}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
