const FEATURED_VIDEO = {
  title: 'Panchganga Sarvajanik Utsav Mandal',
  subtitle: 'Watch the journey of devotion, tradition, and our shared celebration.',
  youtubeEmbedUrl: 'https://www.youtube.com/embed/V5vg1h4sft4',
};

export default function FeaturedVideo() {
  return (
    <section className="relative overflow-hidden section-pad devotional-gradient">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mandal-gold to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-mandal-mint/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-mandal-green/10 blur-3xl" />

      <div className="container-pad relative text-center">
        <h2 className="font-display text-4xl font-bold text-mandal-green sm:text-5xl">
          {FEATURED_VIDEO.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-mandal-ink/65">
          {FEATURED_VIDEO.subtitle}
        </p>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-mandal-green/10 bg-white p-2 shadow-soft" style={{ aspectRatio: '16/9' }}>
            <iframe
              src={FEATURED_VIDEO.youtubeEmbedUrl}
              title={FEATURED_VIDEO.title}
              className="h-full w-full rounded-xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
