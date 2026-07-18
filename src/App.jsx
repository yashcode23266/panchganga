import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import SocialWork from './pages/SocialWork.jsx';
import Gallery from './pages/Gallery.jsx';
import Awards from './pages/Awards.jsx';
import News from './pages/News.jsx';
import Celebrity from './pages/Celebrity.jsx';
import Admin from "./pages/Admin";

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
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/social-work" element={<SocialWork />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/news" element={<News />} />
            <Route path="/celebrity" element={<Celebrity />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
