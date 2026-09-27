import { motion } from 'framer-motion';
import { ABOUT } from '../data';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-magenta)', color: '#fff', fontSize: '0.8rem', marginBottom: '1rem' }}>
              CHARACTER INFO
            </span>
            <h2>About Me</h2>
          </div>

          <div className="about-grid">
            <div>
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: p }}></p>
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {ABOUT.tools.map((tool, i) => (
                  <span key={i} style={{ border: '1px solid var(--neon-cyan)', padding: '4px 8px', fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-panel">
              {ABOUT.skill_columns.map((col, i) => (
                <div key={i} className="mb-4">
                  <h4 className="text-magenta mb-1">▸ {col.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {col.skills.map((skill, j) => (
                      <span key={j} style={{ background: 'transparent', border: '1px solid var(--neon-magenta)', padding: '4px 8px', fontSize: '0.75rem', color: 'var(--text-main)' }}>
                        {skill}
                      </span>
                    ))}
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
