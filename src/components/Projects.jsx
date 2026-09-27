import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const moveProjects = (direction) => {
    setActiveIndex((prev) => (prev + direction + PROJECTS.length) % PROJECTS.length);
  };

  useEffect(() => {
    const currentProject = trackRef.current?.children[activeIndex];
    const marquee = marqueeRef.current;
    if (!currentProject || !marquee) return;

    const cardBounds = currentProject.getBoundingClientRect();
    const marqueeBounds = marquee.getBoundingClientRect();
    const targetLeft = marquee.scrollLeft + cardBounds.left - marqueeBounds.left - (marquee.clientWidth - currentProject.clientWidth) / 2;

    marquee.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [activeIndex]);

  return (
    <section id="projects">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <h2>Projects</h2>
          </div>

          <div className="projects-slider">
            <button type="button" className="certs-arrow certs-arrow--left" aria-label="Previous project" onClick={() => moveProjects(-1)}>
              <ChevronLeft size={22} />
            </button>

            <div ref={marqueeRef} className="projects-marquee">
              <div ref={trackRef} className="projects-track">
                {PROJECTS.map((proj) => (
                  <motion.div
                    key={proj.title}
                    whileHover={{ y: -6 }}
                    className="cyber-panel project-card"
                  >
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img src={proj.image} alt={proj.title} loading="lazy" decoding="async" width={640} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) contrast(1.2)' }} />
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: proj.sev_class === 'sev-high' ? 'var(--neon-magenta)' : 'var(--neon-cyan)',
                        color: proj.sev_class === 'sev-high' ? '#fff' : '#000',
                        padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold'
                      }}>
                        {proj.sev_label}
                      </div>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <h3 className="text-cyan mb-1">{proj.title}</h3>
                      {proj.paragraphs.map((p, j) => (
                        <p key={j} style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>{p}</p>
                      ))}

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {proj.tags.map((tag, j) => (
                          <span key={j} style={{ border: '1px solid var(--text-dim)', padding: '2px 6px', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a href={proj.link} className="cyber-btn" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                        ▶ VIEW ON GITHUB
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button type="button" className="certs-arrow certs-arrow--right" aria-label="Next project" onClick={() => moveProjects(1)}>
              <ChevronRight size={22} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
