import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../data';

export default function Certifications() {
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

          <div className="certs-marquee">
            <div className="certs-track">
              {[CERTIFICATIONS, CERTIFICATIONS].map((certifications, groupIndex) => (
                <div className="certs-group" key={groupIndex}>
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={`${groupIndex}-${i}`}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        border: '1px solid var(--panel-border)',
                        padding: '1.5rem',
                        background: 'var(--bg-panel)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        opacity: cert.status === 'progress' ? 0.6 : 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
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
                      <div style={{ color: cert.status === 'done' ? 'var(--neon-green)' : 'var(--neon-cyan)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                        {cert.status === 'done' ? '✓ DONE' : '◐ IN PROGRESS'}
                      </div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{cert.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{cert.issuer}</div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 className="text-magenta mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={24} /> CTF LEADERBOARD
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
