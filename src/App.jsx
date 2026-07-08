import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Scene from './components/Scene';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import { SITE } from './data';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 3D R3F Scene Fixed Background */}
      <Scene theme={theme} />
      
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: theme === 'girly' ? 'rgba(255, 255, 255, 0.95)' : (scrolled ? 'var(--bg-panel)' : 'transparent'),
        backdropFilter: 'blur(10px)',
        borderBottom: theme === 'girly' ? '1px solid rgba(100, 100, 100, 0.3)' : (scrolled ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid transparent'),
        transition: 'all 0.3s'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: theme === 'girly' ? '#11051c' : 'var(--neon-cyan)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', background: 'var(--neon-magenta)', color: '#fff', fontSize: '0.8rem' }}>NK</span>
            NIDHI_
          </a>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--neon-cyan)', fontSize: '1.5rem', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
          
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Quest Log</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Builds</a>
            <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)}>Achievements</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href={SITE.resume_url} className="cyber-btn primary">Resume</a>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'girly' : 'dark')}
              style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '4px', color: theme === 'girly' ? '#11051c' : 'var(--neon-cyan)' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? '🌸' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      {/* The main content scrolls naturally over the fixed 3D scene */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero theme={theme} />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <footer style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'var(--text-dim)', background: 'var(--bg-dark)' }}>
        © 2026 {SITE.name.toUpperCase()} — LEVEL: SECURITY EXPLORER
      </footer>
    </>
  );
}

export default App;
