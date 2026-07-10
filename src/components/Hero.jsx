import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Trophy, Award, Shield, Flower } from 'lucide-react';
import { SITE, STATS } from '../data';

const iconMap = {
  trophy: Trophy,
  award: Award,
  shield: Shield,
};

export default function Hero({ theme }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, reduceMotion ? 1 : 0.35]);

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <motion.div style={{ y, opacity }}>
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
            className="cyber-panel"
          >
            <div className="hero-layout">
              <div className="hero-photo">
                <img 
                  src={SITE.photo} 
                  alt={SITE.name}
                  width={180}
                  height={180}
                  fetchPriority="high"
                  decoding="async"
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

              <div className="hero-copy">
                <span style={{ background: 'var(--neon-cyan)', color: 'var(--bg-dark)', padding: '4px 8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  SYSTEM_ACCESS_GRANTED
                </span>
                <h1 className="glitch text-cyan mt-4 hero-title" data-text={`Hi, I'm ${SITE.name}`}>
                  Hi, I'm {SITE.name}
                </h1>
                <p className="hero-tagline">
                  I break web apps for fun — then tell you how to fix them. <br/>
                  <span className="text-dim">Level: Security Explorer</span>
                </p>
                
                <div className="hero-actions">
                  <a href="#projects" className="cyber-btn primary">▶ VIEW BUILDS</a>
                  <a href="#contact" className="cyber-btn">✉ INITIALIZE CONTACT</a>
                </div>
              </div>
            </div>

            <div className="hero-stats">
              {STATS.map((stat, i) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={i} className="hero-stat">
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--neon-cyan)' }}>
                      {IconComponent && <IconComponent size={28} />}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--neon-cyan)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
