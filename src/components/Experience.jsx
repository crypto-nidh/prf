import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-cyan)', color: '#000', fontSize: '0.8rem', marginBottom: '1rem' }}>
              QUEST LOG
            </span>
            <h2>Experience</h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ 
              position: 'absolute', left: '11px', top: 0, bottom: 0, width: '2px', 
              background: 'repeating-linear-gradient(to bottom, var(--neon-cyan) 0, var(--neon-cyan) 10px, transparent 10px, transparent 20px)'
            }}></div>
            
            {EXPERIENCE.map((job, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                style={{ position: 'relative', marginBottom: '3rem' }}
              >
                <div style={{
                  position: 'absolute', left: '-40px', top: '10px',
                  width: '24px', height: '24px', background: 'var(--bg-dark)',
                  border: '2px solid var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', color: 'var(--neon-cyan)'
                }}>
                  {i + 1}
                </div>
                
                <div className="cyber-panel">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    {job.logo && (
                      <img 
                        src={job.logo} 
                        alt={job.company}
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      />
                    )}
                    <div>
                      <div style={{ color: 'var(--neon-magenta)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>@ {job.company}</div>
                      <h3 className="text-cyan" style={{ margin: 0 }}>{job.title}</h3>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{job.date}</div>
                    <div style={{ display: 'inline-block', padding: '4px 8px', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', fontSize: '0.7rem' }}>
                      ✓ COMPLETED
                    </div>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {job.bullets.map((b, j) => (
                      <li key={j} style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--neon-cyan)' }}>&gt;</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
