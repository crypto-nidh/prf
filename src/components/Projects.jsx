import { motion } from 'framer-motion';
import { PROJECTS } from '../data';

export default function Projects() {
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
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-magenta)', color: '#fff', fontSize: '0.8rem', marginBottom: '1rem' }}>
              CRAFTED ITEMS
            </span>
            <h2>Projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {PROJECTS.map((proj, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="cyber-panel"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) contrast(1.2)' }} />
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
        </motion.div>
      </div>
    </section>
  );
}
