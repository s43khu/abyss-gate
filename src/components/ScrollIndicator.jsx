'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Mouse } from 'lucide-react'
import { useSoundManager } from './SoundManager'

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const { playScroll } = useSoundManager()

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  const handleScroll = () => {
    playScroll()
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <motion.button
        onClick={handleScroll}
        className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-1"
        >
          <Mouse size={24} className="mb-2" />
          <ChevronDown size={20} />
        </motion.div>
        
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm font-medium tracking-wider"
        >
          SCROLL
        </motion.span>
      </motion.button>

      {/* Progress Ring */}
      <motion.div
        className="absolute inset-0 w-16 h-16 border-2 border-white/20 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.3) ${scrollYProgress.get() * 360}deg, transparent ${scrollYProgress.get() * 360}deg)`
        }}
      />
    </motion.div>
  )
} 