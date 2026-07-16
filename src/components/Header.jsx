import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const navItems = [
  ['/about', 'nav.about'],
  ['/social-work', 'nav.socialWork'],
  ['/gallery', 'nav.gallery'],
  ['/contact', 'nav.contact'],
  ['/awards', 'nav.awards'],
  ['/news', 'nav.news'],
  ['/celebrity', 'nav.celebrity'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const nextLanguage = language === 'en' ? 'mr' : 'en';

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? 'text-white' : 'text-white/72 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-mandal-gold/35 forest-surface text-white shadow-soft">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/images/panlogo.png"
            alt={t('brand.name')}
            className="h-14 w-14 rounded-full border-2 border-white bg-white object-contain shadow-soft"
          />
          <span className="max-w-[190px] font-display text-lg font-bold leading-5 text-white sm:max-w-none sm:text-xl">
            {t('brand.shortName')}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
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
            className="rounded-full border border-white/35 bg-white px-5 py-2 text-sm font-bold text-mandal-green shadow-sm transition hover:bg-mandal-mint"
          >
            {t('nav.language')}
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white text-mandal-green md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t('nav.close') : t('nav.menu')}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-mandal-gold/25 forest-surface md:hidden">
          <nav className="container-pad flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map(([to, key]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-semibold ${
                    isActive ? 'bg-white text-mandal-green' : 'text-white/80'
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
              className="mt-2 rounded-2xl border border-white/25 bg-white px-4 py-3 text-left font-bold text-mandal-green"
            >
              {t('nav.language')}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
