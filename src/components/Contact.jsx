import { motion } from 'framer-motion';
import { Mail, Code, BookOpen, Share2, Link } from 'lucide-react';
import { SITE } from '../data';

export default function Contact() {
  return (
    <section id="contact" style={{ paddingBottom: '150px' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="cyber-panel"
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--neon-cyan)', color: '#000', fontSize: '0.8rem', marginBottom: '1rem' }}>
              LET'S TALK
            </span>
            <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Mail size={28} /> Send a Message</h2>
            <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>
              Have a bug bounty tip, a CTF team invite, or a role to talk about? Send a message below and it'll land straight in my inbox.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href={`mailto:${SITE.email}`} className="cyber-btn primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> EMAIL</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="cyber-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Link size={18} /> LINKEDIN</a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="cyber-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={18} /> GITHUB</a>
            <a href={SITE.medium} target="_blank" rel="noopener noreferrer" className="cyber-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={18} /> MEDIUM</a>
            <a href={SITE.twitter} target="_blank" rel="noopener noreferrer" className="cyber-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Share2 size={18} /> TWITTER</a>
            <div className="cyber-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'default', opacity: 0.8 }}>
              <span style={{ fontWeight: 'bold' }}>D</span> {SITE.discord}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
