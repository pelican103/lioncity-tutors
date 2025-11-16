'use client';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Badge Component
 * Usage: <AnimatedBadge text="New" color="primary" />
 */
export default function AnimatedBadge({ text, color = 'primary', pulse = false }) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]} ${pulse ? 'animate-pulse' : ''}`}
    >
      {text}
    </motion.span>
  );
}
