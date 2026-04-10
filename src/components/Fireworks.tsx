import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
}

export function Fireworks({ show, onComplete }: { show: boolean; onComplete: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      // Generate particles
      const newParticles: Particle[] = [];
      const colors = ['#8BA8D8', '#C88B6B', '#F5F1E8', '#8B8B5C', '#6B5B4B', '#C8A888'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: 0,
          y: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: (Math.PI * 2 * i) / 50,
          velocity: 100 + Math.random() * 100,
        });
      }
      
      setParticles(newParticles);
      
      // Clear after animation
      setTimeout(() => {
        setParticles([]);
        onComplete();
      }, 2000);
    }
  }, [show, onComplete]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(particle.angle) * particle.velocity,
            y: Math.sin(particle.angle) * particle.velocity,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}