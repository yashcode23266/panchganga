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
