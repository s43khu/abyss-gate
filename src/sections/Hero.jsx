'use client';
import LetterGlitch from '@/animations/LetterGlitch';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSoundManager } from '@/components/SoundManager';
import ScrollIndicator from '@/components/ScrollIndicator';

function GlitchText({ text, className }) {
  const [glitchedText, setGlitchedText] = useState(text);
  const original = useRef(text);
  const chars = '!@#$%^&*';
  const { playGlitch, isAudioReady } = useSoundManager();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const newText = original.current.split('').map((char) => {
        if (char === ' ') return ' ';
        return Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : char;
      }).join('');
      setGlitchedText(newText);
      
      // Play glitch sound occasionally (only if audio is ready)
      if (Math.random() < 0.3 && isAudioReady) {
        try {
          playGlitch();
        } catch (error) {
          // Ignore sound errors
        }
      }
    }, 500);
    return () => clearInterval(glitchInterval);
  }, [playGlitch, isAudioReady]);

  return (
    <motion.h1 
      className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-center leading-tight tracking-tight ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {glitchedText}
    </motion.h1>
  );
}

function AnimatedParagraph({ text }) {
  const { scrollYProgress } = useScroll();
  const hiddenSlogan = 'LEGACYJOURNEY';
  const chars = text.split('');
  let sloganIndices = [];
  let startIndex = 0;

  for (let letter of hiddenSlogan) {
    const idx = chars.slice(startIndex).findIndex(c => c.toUpperCase() === letter);
    if (idx !== -1) {
      sloganIndices.push(startIndex + idx);
      startIndex = startIndex + idx + 1;
    }
  }

  return (
    <div className="w-full flex justify-center">
      <motion.p 
        className="max-w-2xl text-gray-300 text-lg md:text-xl lg:text-2xl text-center relative z-10 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {chars.map((char, i) => {
          const isSloganChar = sloganIndices.includes(i);
          const amplitude = isSloganChar ? 150 : 80;
          const direction = i % 2 === 0 ? 1 : -1;
          const y = useTransform(scrollYProgress, [0, 1], [0, amplitude * direction]);
          return (
            <motion.span
              key={i}
              style={{ y }}
              className={`inline-block transition-colors duration-300 ${
                isSloganChar 
                  ? 'text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent' 
                  : 'text-gray-400'
              }`}
              whileHover={{ scale: 1.2, color: isSloganChar ? '#60a5fa' : '#ffffff' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { playHover, isAudioReady } = useSoundManager();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Simple fade out with scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" className="relative h-screen text-white flex items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={['#0f1a17', '#5e6472', '#9b178b', '#00ffff', '#ff00ff']}
          glitchSpeed={30}
          outerVignette={true}
          centerVignette={true}
          smooth={true}
          fillDuration={3000}
        />
      </div>

      {/* Animated Background Gradients */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 max-w-6xl w-full text-center space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ opacity: heroOpacity }}
      >
        {/* Glitch Text */}
        <GlitchText text="Welcome to AbyssGate" />
        
        {/* Animated Paragraph */}
        <AnimatedParagraph text="Discover the legacy and the journey from concept to impact." />
        
        {/* Call to Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-400/30"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)",
              onHoverStart: () => {
                if (isAudioReady) {
                  try {
                    playHover();
                  } catch (error) {
                    // Ignore sound errors
                  }
                }
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Story
          </motion.button>
          
          <motion.button
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              onHoverStart: () => {
                if (isAudioReady) {
                  try {
                    playHover();
                  } catch (error) {
                    // Ignore sound errors
                  }
                }
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40"
          animate={{
            y: [0, 30, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <motion.div
          className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400 rounded-full opacity-50"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}

