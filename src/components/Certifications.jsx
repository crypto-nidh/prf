import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../data';

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);

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

  useEffect(() => {
    const cards = trackRef.current?.children;
    const marquee = marqueeRef.current;
    if (!cards || cards.length === 0 || !marquee) return;

    const currentCard = cards[0];
    const cardBounds = currentCard.getBoundingClientRect();
    const marqueeBounds = marquee.getBoundingClientRect();
    const targetLeft = marquee.scrollLeft + cardBounds.left - marqueeBounds.left - (marquee.clientWidth - currentCard.clientWidth) / 2;

    marquee.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [activeIndex]);

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
            <h2>Certifications</h2>
          </div>

          <div className="certs-shell">
            <div className="certs-slider">
              <button type="button" className="certs-arrow certs-arrow--left" aria-label="Previous certificate" onClick={() => moveCerts(-1)}>
                <ChevronLeft size={22} />
              </button>

              <div ref={marqueeRef} className="certs-marquee">
                <div ref={trackRef} className="certs-track">
                  {visibleCerts.map((cert, i) => (
                    <motion.div
                      key={`${cert.name}-${i}`}
                      whileHover={{ scale: 1.02 }}
                      className={`cert-card ${cert.highlight ? 'cert-card--highlight' : ''}`}
                    >
                      {cert.image && (
                        <img
                          src={cert.image}
                          alt={cert.name}
                          loading="lazy"
                          decoding="async"
                          width={480}
                          height={260}
                          className="cert-image"
                          style={{
                            width: '100%',
                            height: '370px',
                            objectFit: 'contain',
                            marginBottom: 0,
                            background: 'transparent'
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <button type="button" className="certs-arrow certs-arrow--right" aria-label="Next certificate" onClick={() => moveCerts(1)}>
                <ChevronRight size={22} />
              </button>
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
