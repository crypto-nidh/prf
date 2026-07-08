import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, Shield, Flower } from 'lucide-react';
import { SITE, STATS } from '../data';

const iconMap = {
  trophy: Trophy,
  award: Award,
  shield: Shield,
};

export default function Hero({ theme }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container">
        <motion.div 
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="cyber-panel"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-end' }}>
            <div style={{
              width: '180px', height: '180px', 
              border: '2px solid var(--neon-cyan)',
              padding: '6px',
              position: 'relative',
              background: 'rgba(0, 240, 255, 0.05)'
            }}>
              <img 
                src={SITE.photo} 
                alt={SITE.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(120%)' }}
              />
              {theme === 'girly' ? (
                <>
                  <div style={{ position: 'absolute', top: -8, left: -8, color: 'var(--neon-magenta)' }}><Flower size={24} /></div>
                  <div style={{ position: 'absolute', bottom: -8, right: -8, color: 'var(--neon-magenta)' }}><Flower size={24} /></div>
                </>
              ) : (
                <>
                  <div style={{ position: 'absolute', top: -4, left: -4, width: 10, height: 10, background: 'var(--neon-magenta)' }}></div>
                  <div style={{ position: 'absolute', bottom: -4, right: -4, width: 10, height: 10, background: 'var(--neon-magenta)' }}></div>
                </>
              )}
            </div>

            <div>
              <span style={{ background: 'var(--neon-cyan)', color: 'var(--bg-dark)', padding: '4px 8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                SYSTEM_ACCESS_GRANTED
              </span>
              <h1 className="glitch text-cyan mt-4" data-text={`Hi, I'm ${SITE.name}`} style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                Hi, I'm {SITE.name}
              </h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', opacity: 0.9 }}>
                I break web apps for fun — then tell you how to fix them. <br/>
                <span className="text-dim">Level: Security Explorer</span>
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#projects" className="cyber-btn primary">▶ VIEW BUILDS</a>
                <a href="#contact" className="cyber-btn">✉ INITIALIZE CONTACT</a>
              </div>
            </div>
          </div>

          <motion.div 
            style={{ y: y2, display: 'flex', gap: '1.5rem', marginTop: '3rem', flexWrap: 'wrap' }}
          >
            {STATS.map((stat, i) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <div key={i} style={{ 
                  border: '1px solid rgba(0, 240, 255, 0.3)', 
                  padding: '1rem', 
                  minWidth: '150px',
                  background: 'rgba(0,0,0,0.4)',
                  borderTop: '3px solid var(--neon-cyan)'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--neon-cyan)' }}>
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <div style={{ fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
