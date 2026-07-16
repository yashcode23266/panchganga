import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Seo({ titleKey, descriptionKey }) {
  const { t } = useLanguage();

  useEffect(() => {
    const title = t(titleKey);
    const description = t(descriptionKey);
    document.title = title;

    const setMeta = (selector, attr, value) => {
      const node = document.head.querySelector(selector);
      if (node) node.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
  }, [descriptionKey, t, titleKey]);

  return null;
}
