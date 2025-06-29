'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

const SoundContext = createContext()

export const useSoundManager = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundManager must be used within a SoundProvider')
  }
  return context
}

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioContext, setAudioContext] = useState(null)
  const [isAudioReady, setIsAudioReady] = useState(false)

  // Initialize audio context after user interaction
  const initializeAudio = () => {
    if (!audioContext && typeof window !== 'undefined') {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        setAudioContext(ctx)
        setIsAudioReady(true)
      } catch (error) {
        console.log('Audio not supported')
      }
    }
  }

  // Mock sound functions that can be replaced with actual audio files
  const playHover = () => {
    if (!isMuted && isAudioReady && audioContext) {
      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
        
        gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        // Silently fail if audio fails
      }
    }
  }

  const playClick = () => {
    if (!isMuted && isAudioReady && audioContext) {
      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.05)
        
        gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.05)
      } catch (error) {
        // Silently fail if audio fails
      }
    }
  }

  const playScroll = () => {
    if (!isMuted && isAudioReady && audioContext) {
      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.2)
        
        gainNode.gain.setValueAtTime(volume * 0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      } catch (error) {
        // Silently fail if audio fails
      }
    }
  }

  const playGlitch = () => {
    if (!isMuted && isAudioReady && audioContext) {
      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Create a glitch effect with multiple frequency changes
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.05)
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.15)
        
        gainNode.gain.setValueAtTime(volume * 0.15, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      } catch (error) {
        // Silently fail if audio fails
      }
    }
  }

  const playAmbient = () => {
    // Ambient sound is optional and can be implemented later
    console.log('Ambient sound would play here')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const adjustVolume = (newVolume) => {
    setVolume(newVolume)
  }

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      initializeAudio()
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }

    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  const value = {
    isMuted,
    volume,
    toggleMute,
    adjustVolume,
    playHover,
    playClick,
    playScroll,
    playGlitch,
    playAmbient,
    isAudioReady
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
      <SoundControls />
    </SoundContext.Provider>
  )
}

function SoundControls() {
  const { isMuted, volume, toggleMute, adjustVolume } = useSoundManager()

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 left-6 z-50 flex items-center space-x-3 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="text-white hover:text-cyan-400 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
      
      {!isMuted && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => adjustVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </motion.div>
      )}
    </motion.div>
  )
} 