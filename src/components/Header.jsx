import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const navItems = [
  ['/about', 'nav.about'],
  ['/social-work', 'nav.socialWork'],
  ['/gallery', 'nav.gallery'],
  ['/awards', 'nav.awards'],
  ['/news', 'nav.news'],
  ['/celebrity', 'nav.celebrity'],
  ['/admin-login', 'Admin'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const nextLanguage = language === 'en' ? 'mr' : 'en';

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? 'text-[#1F7A3D]' : 'text-green-1100 hover:text-[#1F7A3D]'
    }`;

  return (
    <header className="sticky top-0 z-40 shadow-md bg-[#A3C73A] overflow-hidden">

      {/* White Gradient Overlay */}

      <div className="relative z-10 container-pad flex h-20 items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/images/panlogo.png"
            alt={t('brand.name')}
            className="h-14 w-14 rounded-full border-2 border-white bg-white object-contain shadow-md"
          />
          <span className="max-w-[190px] font-bold text-lg text-green-1100 sm:text-xl">
            {t('brand.shortName')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(([to, key]) => (
            <NavLink key={to} to={to} className={navClass}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        {/* Language Button */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setLanguage(nextLanguage)}
            className="bg-[#0a3217] hover:bg-[#1F7A3D] text-white px-5 py-2 rounded-xl font-semibold shadow-md transition"
          >
            {t('nav.language')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full bg-[#0a3217] text-white md:hidden shadow-md"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t('nav.close') : t('nav.menu')}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="relative z-10 md:hidden bg-[#A3C73A]">
          
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

          <nav className="relative container-pad flex flex-col gap-2 py-4">
            {navItems.map(([to, key]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? 'bg-[#1F7A3D] text-white'
                      : 'text-gray-800 hover:bg-white/50'
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
              className="mt-2 bg-[#1F7A3D] text-white px-4 py-3 rounded-xl font-semibold"
            >
              {t('nav.language')}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}