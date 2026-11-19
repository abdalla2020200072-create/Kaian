import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

interface CelebrationOverlayProps {
  burstKey: number;
  message?: string | null;
}

const PARTICLES = [
  { id: 1, dx: -140, dy: -110, rot: -45, color: '#F59E0B', delay: 0 },
  { id: 2, dx: 140, dy: -115, rot: 45, color: '#0EA5E9', delay: 0.03 },
  { id: 3, dx: -190, dy: -20, rot: -90, color: '#F43F5E', delay: 0.05 },
  { id: 4, dx: 185, dy: -25, rot: 90, color: '#10B981', delay: 0.02 },
  { id: 5, dx: -95, dy: -165, rot: -20, color: '#FBBF24', delay: 0.04 },
  { id: 6, dx: 95, dy: -165, rot: 25, color: '#38BDF8', delay: 0.06 },
  { id: 7, dx: -120, dy: 90, rot: -120, color: '#FB7185', delay: 0.03 },
  { id: 8, dx: 120, dy: 85, rot: 120, color: '#34D399', delay: 0.04 },
  { id: 9, dx: 0, dy: -180, rot: 15, color: '#F59E0B', delay: 0.01 },
];

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  burstKey,
  message,
}) => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {burstKey > 0 && (
          <motion.div
            key={burstKey}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.25, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 }}
                animate={{
                  x: p.dx,
                  y: p.dy,
                  scale: [0.3, 1.25, 0.9],
                  opacity: [1, 1, 0],
                  rotate: p.rot,
                }}
                transition={{ duration: 1.0, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <Star
                  className="w-8 h-8"
                  style={{ color: p.color, fill: p.color }}
                />
              </motion.div>
            ))}

            {message && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-white/95 border-2 border-amber-300 px-8 py-4 shadow-xl"
              >
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-600">
                  {message}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
