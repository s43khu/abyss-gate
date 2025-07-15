'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSoundManager } from '@/components/SoundManager'
import { ArrowRight, Calendar, Tag, Sparkles, Zap, Eye } from 'lucide-react'

export default function StoryBlock({ title, image, content, year, category, flip = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { playHover, playClick } = useSoundManager()
  const [expanded, setExpanded] = useState(false)

  // Enhanced content with AbyssGate lore theme
  const enhancedContent = {
    "The Discovery": `In the depths of 2023, I discovered the forbidden gateway - the AbyssGate. Deep within the digital realm, I stumbled upon ancient knowledge that would forever change the landscape of web development. This wasn't just another coding project; it was the beginning of my pact with the abyss, where cursed relics and bound souls would power the future of digital experiences.

The journey began with a simple question: "What if I could create digital experiences that transcend the ordinary?" Armed with Next.js 14, React 19, and an unyielding passion for innovation, I embarked on a quest to master the forbidden arts of web development, creating something that would showcase my skills as a developer while embracing the dark aesthetic of the AbyssGate.

The first breakthrough came when I integrated GSAP animations with Framer Motion, creating seamless transitions that felt like portals between realms. Every scroll, every hover, every interaction became an opportunity to demonstrate my technical expertise while maintaining the cursed aesthetic. I realized I wasn't just building websites - I was crafting digital experiences that would showcase my development capabilities and inspire other developers to cross the forbidden threshold.

As the months passed, the project evolved into something greater than I had imagined. Advanced 3D visualizations using Three.js and Vanta.js created immersive backgrounds that responded to user interaction like ancient runes awakening. Custom sound effects using the Web Audio API added another layer of engagement, making every click feel like a pact being sealed.

The discovery phase taught me that true innovation comes from the intersection of technology and the forbidden arts. Every line of code was written with intention, every animation designed with purpose. The AbyssGate was no longer just a concept - it was becoming a living, breathing digital realm that would demonstrate my full-stack development skills and creative vision while embracing the dark aesthetic.`,

    "The Breakthrough": `The year 2024 marked the turning point in my journey through the abyss. After months of relentless coding, debugging, and countless iterations, I achieved what seemed impossible - a breakthrough that would showcase my expertise in modern web development while maintaining the cursed aesthetic of the AbyssGate realm.

The breakthrough wasn't just about technology; it was about understanding the human element of digital interaction within the context of the forbidden. I discovered that the most powerful experiences come from the perfect balance of performance and creativity, wrapped in the dark aesthetic of cursed relics and bound souls. I developed a system where every animation served a purpose, every sound effect enhanced the narrative, and every visual element contributed to the overall story of the AbyssGate.

Advanced scroll-triggered animations became the cornerstone of the experience, like portals opening between realms. Using GSAP's ScrollTrigger, I created horizontal scrolling sections that felt natural and intuitive, like walking through ancient corridors of the abyss. The story sections became more than just content - they became chapters in an interactive digital grimoire, each revealing new layers of my development skills and technical capabilities while maintaining the cursed aesthetic.

The integration of custom cursor effects and interactive elements added a layer of sophistication that set AbyssGate apart from anything else on the web. Every hover state, every click, every scroll became an opportunity to surprise and delight users while demonstrating my attention to detail and technical prowess, all wrapped in the dark aesthetic of the forbidden realm.

Performance optimization became a top priority, like maintaining the integrity of ancient pacts. I implemented lazy loading, optimized animations, and ensured that the experience remained smooth across all devices. I discovered that true innovation isn't just about adding features - it's about creating experiences that feel effortless and magical while maintaining excellent performance metrics and the cursed aesthetic.

The breakthrough phase also saw the development of a comprehensive sound system that enhanced the user experience without being intrusive, like whispers from the void. Custom hover sounds, click effects, and ambient audio created an immersive environment that made users feel like they were part of the AbyssGate story.

As the project matured, I began to see the broader implications of my work. I wasn't just building a website - I was creating a new standard for digital experiences that would serve as my portfolio and showcase my development skills while embracing the dark aesthetic of the AbyssGate realm. The AbyssGate became a testament to what's possible when passion, technology, and creativity come together in the hands of a skilled developer who has made a pact with the abyss.`,

    "The Legacy": `Today, AbyssGate stands as a testament to my growth as a developer and the endless possibilities of modern web development, wrapped in the dark aesthetic of cursed relics and bound souls. What started as an experimental coding project has evolved into a comprehensive showcase of my technical skills, creative vision, and dedication to excellence in web development, all while maintaining the forbidden aesthetic of the AbyssGate realm.

The legacy of AbyssGate extends far beyond its codebase. It represents my approach to digital storytelling, where every element serves a purpose and every interaction tells a story of the forbidden realm. The project has inspired countless developers to think differently about web development, to push beyond conventional boundaries and explore new possibilities while embracing the dark aesthetic of cursed relics and eternal pacts.

The technology stack that powers AbyssGate reads like a grimoire of forbidden knowledge. Next.js 14 provides the foundation for lightning-fast performance and seamless user experiences, like ancient runes powering the gateway. React 19 brings the latest features and optimizations, ensuring that the application remains at the cutting edge of what's possible while maintaining the cursed aesthetic.

GSAP animations create the smooth, professional transitions that make every interaction feel polished and intentional, like portals opening between realms. Framer Motion adds the subtle micro-interactions that bring the interface to life, like ancient spirits awakening. Three.js and Vanta.js create the stunning 3D backgrounds that transport users to another world, like stepping through the AbyssGate into the forbidden realm.

The custom sound system, built with the Web Audio API, adds an auditory dimension that enhances the overall experience without being overwhelming, like whispers from the void. Every sound is carefully crafted to complement the visual elements and reinforce the narrative of the cursed realm.

The responsive design ensures that the AbyssGate experience is accessible to users on any device, from smartphones to large desktop displays, like the gateway adapting to different realms. The mobile-first approach guarantees that the experience remains engaging and functional regardless of screen size while maintaining the dark aesthetic.

The legacy of AbyssGate is not just in its technical achievements, but in its ability to inspire. It shows that web development is not just about functionality - it's about creating experiences that move people, that make them feel something special, that transport them to the forbidden realm. It demonstrates that with the right combination of technology, creativity, and passion, anything is possible, even crossing the AbyssGate into immortality.

As the digital landscape continues to evolve, AbyssGate will remain a beacon of innovation, inspiring future generations of developers to dream bigger, think differently, and create experiences that transcend the ordinary while embracing the dark aesthetic of cursed relics and eternal pacts. The legacy continues to grow, and the story is far from over.`
  }

  const currentContent = enhancedContent[title] || content
  const paragraphs = currentContent.split('\n\n')
  const shortContent = paragraphs[0]

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Content Container */}
      <div ref={ref} className="w-full h-full flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${flip ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: flip ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={`space-y-6 ${flip ? 'lg:col-start-2' : ''}`}
            >
              {/* Card Container */}
              <div className="bg-black/70 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/40 max-h-[420px] md:max-h-[480px] overflow-y-auto">
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full mb-2"
                >
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">{category}</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight mb-2"
                >
                  {title}
                </motion.h2>

                {/* Year Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-2 text-gray-400 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">{year}</span>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-3"
                >
                  <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-2">
                    {expanded
                      ? paragraphs.map((paragraph, index) => (
                          <p key={index} className="text-gray-300 leading-relaxed">{paragraph}</p>
                        ))
                      : <p className="text-gray-300 leading-relaxed">{shortContent}</p>
                    }
                  </div>
                  {paragraphs.length > 1 && (
                    <button
                      className="mt-2 text-xs text-cyan-400 hover:underline focus:outline-none"
                      onClick={() => setExpanded((v) => !v)}
                    >
                      {expanded ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center space-x-4 mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-xs md:text-sm"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs">Innovation</span>
                  </div>
                </motion.div>

                {/* Feature Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="grid grid-cols-2 gap-3 mt-3"
                >
                  {[
                    { icon: <Zap className="w-4 h-4" />, label: "Performance" },
                    { icon: <Eye className="w-4 h-4" />, label: "Visual Effects" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-400">
                      <div className="text-cyan-400">{feature.icon}</div>
                      <span className="text-xs font-medium">{feature.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Image with Pixel Card Effect */}
            <motion.div
              initial={{ opacity: 0, x: flip ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`relative ${flip ? 'lg:col-start-1' : ''}`}
            >
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl border-4 border-dashed border-cyan-400 group-hover:border-pink-500 transition-all duration-300 shadow-lg">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[1.5px]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Animated Overlay */}
                  <div className="absolute inset-0 pointer-events-none animate-pulse bg-gradient-to-br from-cyan-400/10 via-transparent to-pink-500/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Pixel border effect */}
                  <div className="absolute inset-0 border-2 border-dotted border-cyan-300 rounded-xl pointer-events-none animate-[pulse_2s_infinite]" />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
