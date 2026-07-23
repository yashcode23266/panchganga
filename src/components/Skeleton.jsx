export function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-2xl bg-mandal-green/10 ${className}`} />;
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`rounded-3xl border border-mandal-green/10 bg-white p-5 shadow-soft ${className}`}>
      <SkeletonBlock className="h-44 w-full" />
      <SkeletonBlock className="mt-5 h-5 w-2/3" />
      <SkeletonBlock className="mt-3 h-4 w-1/2" />
    </div>
  );
}

export function RowSkeleton({ count = 4 }) {
  return (
    <div className="flex gap-5 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} className="min-w-[260px] sm:min-w-[315px]" />
      ))}
    </div>
  );
}
