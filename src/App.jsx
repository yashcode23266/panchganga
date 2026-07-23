import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const SocialWork = lazy(() => import('./pages/SocialWork.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Awards = lazy(() => import('./pages/Awards.jsx'));
const News = lazy(() => import('./pages/News.jsx'));
const Celebrity = lazy(() => import('./pages/Celebrity.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const AdminContentManager = lazy(() => import('./pages/AdminContentManager.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: 'easeOut' },
};

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden devotional-gradient text-mandal-ink">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} {...pageMotion}>
          <Suspense
            fallback={
              <div className="grid min-h-[50vh] place-items-center px-4">
                <div className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-mandal-green shadow-soft">
                  Loading...
                </div>
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/social-work" element={<SocialWork />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/news" element={<News />} />
              <Route path="/celebrity" element={<Celebrity />} />
              <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/:section" element={
                  <ProtectedRoute>
                    <AdminContentManager />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/:section/:mode" element={
                  <ProtectedRoute>
                    <AdminContentManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
