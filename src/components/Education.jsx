import { motion } from 'framer-motion';
import { Code, Lock, Globe, BookOpen } from 'lucide-react';
import { EDUCATION } from '../data';

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-green)', color: '#000', fontSize: '0.8rem', marginBottom: '1rem' }}>
              ACADEMIC FOUNDATION
            </span>
            <h2>Education</h2>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="cyber-panel"
            style={{ maxWidth: '600px', background: 'var(--bg-panel)', border: '1px solid var(--panel-border)' }}
          >
            <div className="edu-header">
              {EDUCATION.logo && (
                <div className="edu-logo">
                  <img 
                    src={EDUCATION.logo} 
                    alt={EDUCATION.school}
                    loading="lazy"
                    decoding="async"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: 'var(--neon-cyan)', fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', marginBottom: '0.5rem' }}>
                  {EDUCATION.degree}
                </h3>
                <div style={{ color: 'var(--neon-magenta)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', marginBottom: '1rem', fontWeight: 'bold' }}>
                  {EDUCATION.school}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>
                  {EDUCATION.years}
                </div>
              </div>
            </div>
          </motion.div>

          <div style={{ marginTop: '3rem', padding: 'clamp(1rem, 3vw, 2rem)', background: 'rgba(0, 229, 255, 0.05)', border: '1px dashed var(--panel-border)', borderRadius: '0' }}>
            <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '1rem' }}>Focus Areas</h4>
            <div className="focus-grid">
              <div>
                <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code size={18} /> Core
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Data Structures, Algorithms, Database Systems</div>
              </div>
              <div>
                <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={18} /> Security
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Cybersecurity, Network Security, Cryptography</div>
              </div>
              <div>
                <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={18} /> Development
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Web Development, Full-Stack, Cloud Computing</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
