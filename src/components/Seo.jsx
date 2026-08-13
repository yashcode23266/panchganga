import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Seo({ titleKey, descriptionKey, image }) {
  const { t } = useLanguage();

  useEffect(() => {
    const title = t(titleKey) || 'Panchganga Sarvajanik Utsav Mandal';
    const description = t(descriptionKey) || 'Official web portal of Panchganga Sarvajanik Utsav Mandal, Mumbai.';
    const imageUrl = image || 'https://panchgangamandal.org/images/panlogo.png';
    const currentUrl = window.location.href;

    document.title = title;

    const setMeta = (selector, attr, value) => {
      const node = document.head.querySelector(selector);
      if (node) {
        node.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="title"]', 'content', title);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', currentUrl);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl);

    const canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentUrl);
    }
  }, [descriptionKey, image, t, titleKey]);

  return null;
}
