import { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Seo from './components/Seo';
import Hero from './components/Hero';
import { SITE } from './data';

const Scene = lazy(() => import('./components/Scene'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <Seo />
      <Suspense fallback={null}>
        <Scene theme={theme} />
      </Suspense>

      <a href="#main-content" className="skip-link">Skip to content</a>
      
      <header
        className="site-header"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: theme === 'girly' ? 'rgba(255, 255, 255, 0.95)' : (scrolled || menuOpen ? 'var(--bg-panel)' : 'transparent'),
          backdropFilter: 'blur(10px)',
          borderBottom: theme === 'girly' ? '1px solid rgba(100, 100, 100, 0.3)' : (scrolled || menuOpen ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid transparent'),
          transition: 'all 0.3s'
        }}
      >
        <div className="container">
          <a
            href="#hero"
            className="site-logo"
            style={{ color: theme === 'girly' ? '#11051c' : 'var(--neon-cyan)' }}
            onClick={() => setMenuOpen(false)}
            aria-label={`${SITE.name} — home`}
          >
            <img
              src="/favicon.svg"
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
              style={{ width: '30px', height: '30px', display: 'block' }}
            />
            NIDHI_
          </a>
          
          <button 
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Quest Log</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Builds</a>
            <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)}>Achievements</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href={SITE.resume_url} className="cyber-btn primary" aria-label="Download resume PDF">Resume</a>
            <button 
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'girly' : 'dark')}
              style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '4px', color: theme === 'girly' ? '#11051c' : 'var(--neon-cyan)' }}
              title="Toggle Theme"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? '🌸' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero theme={theme} />
        <Suspense fallback={<div className="container" style={{ minHeight: '40vh' }} aria-hidden="true" />}>
          <About />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>

      <footer style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem clamp(1rem, 4vw, 2rem)', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'var(--text-dim)', background: 'var(--bg-dark)', wordBreak: 'break-word' }} role="contentinfo">
        © 2026 {SITE.name.toUpperCase()} — LEVEL: SECURITY EXPLORER
      </footer>
    </>
  );
}

export default App;
