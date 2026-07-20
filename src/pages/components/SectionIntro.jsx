export default function SectionIntro({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-mandal-green sm:text-5xl">
        {title}
      </h1>
      {text ? <p className="body-copy mt-5">{text}</p> : null}
    </div>
  );
}
