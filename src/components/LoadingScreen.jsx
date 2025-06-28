'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')
  const [isComplete, setIsComplete] = useState(false)

  console.log('LoadingScreen render - progress:', progress, 'text:', loadingText, 'isComplete:', isComplete)

  useEffect(() => {
    console.log('LoadingScreen useEffect triggered')
    
    // Simple loading simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10
        console.log('Progress updated to:', newProgress)
        
        if (newProgress >= 100) {
          console.log('Loading complete, calling onComplete')
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onComplete()
            }, 500)
          }, 500)
          return 100
        }
        
        // Update text based on progress
        if (newProgress < 20) setLoadingText('Initializing...')
        else if (newProgress < 40) setLoadingText('Loading assets...')
        else if (newProgress < 60) setLoadingText('Preparing animations...')
        else if (newProgress < 80) setLoadingText('Establishing connection...')
        else setLoadingText('Welcome to AbyssGate')
        
        return newProgress
      })
    }, 500)

    return () => {
      console.log('LoadingScreen cleanup')
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <div className="text-center space-y-8 max-w-md mx-auto px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AbyssGate
              </h1>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg md:text-xl text-gray-300"
            >
              {loadingText}
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-2"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background Animation */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                backgroundSize: ['100% 100%', '200% 200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 