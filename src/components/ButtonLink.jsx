import { Link } from 'react-router-dom';

export default function ButtonLink({ to, children, variant = 'primary' }) {
  const classes =
    variant === 'secondary'
      ? 'border border-mandal-green/20 bg-white/80 text-mandal-green hover:bg-mandal-mint'
      : 'bg-mandal-green text-white hover:bg-mandal-leaf';

  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold shadow-sm ring-1 ring-mandal-gold/10 transition ${classes}`}
    >
      {children}
    </Link>
  );
}
