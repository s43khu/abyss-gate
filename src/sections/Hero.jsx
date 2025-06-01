'use client';
import LetterGlitch from '@/animations/LetterGlitch';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function GlitchText({ text, className }) {
  const [glitchedText, setGlitchedText] = useState(text);
  const original = useRef(text);
  const chars = '!@#$%^&*';

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const newText = original.current.split('').map((char) => {
        if (char === ' ') return ' ';
        return Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : char;
      }).join('');
      setGlitchedText(newText);
    }, 500);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <h1 className={`text-4xl md:text-6xl font-serif font-bold text-center leading-tight tracking-tight ${className}`}>
      {glitchedText}
    </h1>
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
    <p className="max-w-xl text-gray-300 text-base md:text-lg flex justify-center flex-wrap text-center relative z-10">
      {chars.map((char, i) => {
        const isSloganChar = sloganIndices.includes(i);
        const amplitude = isSloganChar ? 150 : 80;
        const direction = i % 2 === 0 ? 1 : -1;
        const y = useTransform(scrollYProgress, [0, 1], [0, amplitude * direction]);
        return (
          <motion.span
            key={i}
            // style={{ y }}
            className={`inline-block ${isSloganChar ? 'text-white font-bold' : 'text-gray-400'}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen text-white flex items-center justify-center px-4 md:px-8">
      <div className="relative min-h-[800px] z-10 rounded-4xl shadow-lg p-8 md:p-4 max-w-8xl w-full overflow-hidden flex flex-col items-center justify-center text-center">

        {/* ✨ FADED OUTER OVERLAY (Vignette Style) */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-black/30">
          <div className="w-full h-full fade-edges"></div>
        </div>

        {/* 🎯 BACKGROUND LETTER EFFECT */}
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchColors={['#0f1a17', '#5e6472', '#0x9b178b']}
            glitchSpeed={50}
            outerVignette={true}
            centerVignette={true}
            smooth={true}
          />
        </div>

        {/* 🔥 FOREGROUND CONTENT */}
        <div className="relative z-10 space-y-6">
          <GlitchText text="Welcome to AbyssGate" />
          <AnimatedParagraph text="Discover the legacy and the journey from concept to impact." />
        </div>
      </div>
    </section>
  );
}

