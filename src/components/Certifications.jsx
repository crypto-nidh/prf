import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../data';

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const visibleCerts = Array.from({ length: Math.min(4, CERTIFICATIONS.length) }, (_, i) => {
    return CERTIFICATIONS[(activeIndex + i) % CERTIFICATIONS.length];
  });

  const moveCerts = (direction) => {
    setActiveIndex((prev) => {
      const next = (prev + direction + CERTIFICATIONS.length) % CERTIFICATIONS.length;
      return next;
    });
  };

  return (
    <section id="certifications">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-green)', color: '#000', fontSize: '0.8rem', marginBottom: '1rem' }}>
              ACHIEVEMENTS UNLOCKED
            </span>
            <h2>Certifications</h2>
          </div>

          <div className="certs-shell">
            <div className="certs-nav">
              <button type="button" aria-label="Previous certificate" onClick={() => moveCerts(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" aria-label="Next certificate" onClick={() => moveCerts(1)}>
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="certs-marquee">
              <div className="certs-track">
                {visibleCerts.map((cert, i) => (
                  <motion.div
                    key={`${cert.name}-${i}`}
                    whileHover={{ scale: 1.02 }}
                    className={`cert-card ${cert.highlight ? 'cert-card--highlight' : ''} ${cert.status === 'progress' ? 'is-progress' : ''}`}
                  >
                    {cert.highlight && <span className="cert-badge">Featured</span>}
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={180}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'contain',
                          marginBottom: '1rem',
                          background: 'rgba(0,0,0,0.2)'
                        }}
                      />
                    )}
                    <div className="cert-status" style={{ color: cert.status === 'done' ? 'var(--neon-green)' : 'var(--neon-cyan)' }}>
                      {cert.status === 'done' ? '✓ DONE' : '◐ IN PROGRESS'}
                    </div>
                    <h4>{cert.name}</h4>
                    <div className="cert-issuer">{cert.issuer}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 className="text-magenta mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={24} /> Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px dashed var(--panel-border)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '60px', flexShrink: 0, color: 'var(--neon-magenta)', fontWeight: 'bold' }}>{a.rank}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{a.title}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
