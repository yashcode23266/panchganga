import { useCallback, useEffect, useState } from 'react';
import { fetchCollectionItems } from '../utils/contentStore.js';

export default function useFirestoreItems(collectionName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    return fetchCollectionItems(collectionName)
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(`Failed to load ${collectionName}`, error);
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [collectionName]);

  useEffect(() => {
    let active = true;

    reload().finally(() => {
      if (!active) return;
    });

    return () => {
      active = false;
    };
  }, [reload]);

  return { items, loading, reload };
}
