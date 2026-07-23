import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setIsAdmin(false);

      if (currentUser) {
        try {
          const adminDoc = await getDoc(doc(db, 'adminUsers', currentUser.uid));
          setIsAdmin(adminDoc.exists() && adminDoc.data()?.active !== false);
        } catch (error) {
          console.error('Failed to check admin access', error);
          setIsAdmin(false);
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ user, isAdmin, loading }), [user, isAdmin, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
