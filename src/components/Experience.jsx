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

          <div className="timeline">
            <div className="timeline-line"></div>
            
            {EXPERIENCE.map((job, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                style={{ position: 'relative', marginBottom: '3rem' }}
              >
                <div className="timeline-marker">
                  {i + 1}
                </div>
                
                <div className="cyber-panel">
                  <div className="job-header">
                    {job.logo && (
                      <img 
                        src={job.logo} 
                        alt={job.company}
                        loading="lazy"
                        decoding="async"
                        width={100}
                        height={100}
                      />
                    )}
                    <div>
                      <div style={{ color: 'var(--neon-magenta)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>@ {job.company}</div>
                      <h3 className="text-cyan" style={{ margin: 0 }}>{job.title}</h3>
                    </div>
                  </div>
                  
                  <div className="job-meta">
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{job.date}</div>
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
