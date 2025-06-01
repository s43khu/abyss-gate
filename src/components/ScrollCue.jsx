'use client'
import { motion } from 'framer-motion'

export default function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-10 animate-bounce text-white text-sm opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      Scroll ↓
    </motion.div>
  )
}
