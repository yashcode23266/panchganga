import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export const contentCollections = {
  gallery: 'gallery',
  sponsors: 'sponsors',
  socialWork: 'socialWork',
  news: 'news',
  awards: 'awards',
};

export async function fetchCollectionItems(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => {
      const left = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds ?? 0;
      const right = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds ?? 0;
      return right - left;
    });
}

export function toLocalized(value) {
  if (!value) return { en: '', mr: '' };
  if (typeof value === 'object') return value;
  return { en: value, mr: value };
}

/**
 * Automatically injects Cloudinary format, quality, and width parameters
 * for fast loading and reduced payload size.
 */
export function getOptimizedImageUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url;

  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    const searchTarget = '/upload/';
    const index = url.indexOf(searchTarget);
    if (index !== -1 && !url.includes('f_auto,q_auto')) {
      const prefix = url.slice(0, index + searchTarget.length);
      const suffix = url.slice(index + searchTarget.length);
      return `${prefix}f_auto,q_auto,w_${width},c_limit/${suffix}`;
    }
  }

  return url;
}

