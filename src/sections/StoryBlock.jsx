'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSoundManager } from '@/components/SoundManager'
import { ArrowRight, Calendar, Tag, Sparkles, Zap, Eye } from 'lucide-react'

export default function StoryBlock({ title, image, content, year, category, flip = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { playHover, playClick } = useSoundManager()

  // Enhanced content with more detailed stories
  const enhancedContent = {
    "The Discovery": `In the depths of 2023, a team of visionary developers stumbled upon something extraordinary. Deep within the digital realm, they discovered the gateway to infinite possibilities - a portal that would forever change the landscape of web development. This wasn't just another project; it was the beginning of a new era where creativity meets cutting-edge technology.

The journey began with a simple question: "What if we could create digital experiences that transcend the ordinary?" Armed with Next.js 14, React 19, and an unyielding passion for innovation, they embarked on a quest to push the boundaries of what was possible on the web.

The first breakthrough came when they integrated GSAP animations with Framer Motion, creating seamless transitions that felt like magic. Every scroll, every hover, every interaction became an opportunity to tell a story. The team realized they weren't just building websites - they were crafting digital experiences that would inspire generations to come.

As the months passed, the project evolved into something greater than anyone had imagined. Advanced 3D visualizations using Three.js and Vanta.js created immersive backgrounds that responded to user interaction. Custom sound effects using the Web Audio API added another layer of engagement, making every click feel meaningful and purposeful.

The discovery phase taught them that true innovation comes from the intersection of technology and artistry. Every line of code was written with intention, every animation designed with purpose. The AbyssGate was no longer just a concept - it was becoming a living, breathing digital experience that would set new standards for web development.`,

    "The Breakthrough": `The year 2024 marked the turning point in the AbyssGate journey. After months of relentless experimentation and countless iterations, the team achieved what seemed impossible - a breakthrough that would forever change how people experience the web.

The breakthrough wasn't just about technology; it was about understanding the human element of digital interaction. The team discovered that the most powerful experiences come from the perfect balance of performance and creativity. They developed a system where every animation served a purpose, every sound effect enhanced the narrative, and every visual element contributed to the overall story.

Advanced scroll-triggered animations became the cornerstone of the experience. Using GSAP's ScrollTrigger, they created horizontal scrolling sections that felt natural and intuitive. The story sections became more than just content - they became chapters in an interactive digital novel, each revealing new layers of the AbyssGate universe.

The integration of custom cursor effects and interactive elements added a layer of sophistication that set AbyssGate apart from anything else on the web. Every hover state, every click, every scroll became an opportunity to surprise and delight users. The team realized they were creating something that would inspire other developers to push their own boundaries.

Performance optimization became a top priority. The team implemented lazy loading, optimized animations, and ensured that the experience remained smooth across all devices. They discovered that true innovation isn't just about adding features - it's about creating experiences that feel effortless and magical.

The breakthrough phase also saw the development of a comprehensive sound system that enhanced the user experience without being intrusive. Custom hover sounds, click effects, and ambient audio created an immersive environment that made users feel like they were part of the story.

As the project matured, the team began to see the broader implications of their work. They weren't just building a website - they were creating a new standard for digital experiences. The AbyssGate became a testament to what's possible when passion, technology, and creativity come together.`,

    "The Legacy": `Today, AbyssGate stands as a testament to the power of innovation and the endless possibilities of modern web development. What started as an experimental project has evolved into a comprehensive showcase of cutting-edge technologies and creative vision.

The legacy of AbyssGate extends far beyond its codebase. It represents a new approach to digital storytelling, where every element serves a purpose and every interaction tells a story. The project has inspired countless developers to think differently about web development, to push beyond conventional boundaries and explore new possibilities.

The technology stack that powers AbyssGate reads like a roadmap to the future of web development. Next.js 14 provides the foundation for lightning-fast performance and seamless user experiences. React 19 brings the latest features and optimizations, ensuring that the application remains at the cutting edge of what's possible.

GSAP animations create the smooth, professional transitions that make every interaction feel polished and intentional. Framer Motion adds the subtle micro-interactions that bring the interface to life. Three.js and Vanta.js create the stunning 3D backgrounds that transport users to another world.

The custom sound system, built with the Web Audio API, adds an auditory dimension that enhances the overall experience without being overwhelming. Every sound is carefully crafted to complement the visual elements and reinforce the narrative.

The responsive design ensures that the AbyssGate experience is accessible to users on any device, from smartphones to large desktop displays. The mobile-first approach guarantees that the experience remains engaging and functional regardless of screen size.

The legacy of AbyssGate is not just in its technical achievements, but in its ability to inspire. It shows that web development is not just about functionality - it's about creating experiences that move people, that make them feel something special. It demonstrates that with the right combination of technology, creativity, and passion, anything is possible.

As the digital landscape continues to evolve, AbyssGate will remain a beacon of innovation, inspiring future generations of developers to dream bigger, think differently, and create experiences that transcend the ordinary. The legacy continues to grow, and the story is far from over.`
  }

  const currentContent = enhancedContent[title] || content

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
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full"
              >
                <Tag className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-medium text-cyan-400">{category}</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
              >
                {title}
              </motion.h2>

              {/* Year Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{year}</span>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-4"
              >
                <div className="text-base md:text-lg text-gray-300 leading-relaxed space-y-3">
                  {currentContent.split('\n\n').slice(0, 3).map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm"
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
                className="grid grid-cols-2 gap-3"
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
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: flip ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`relative ${flip ? 'lg:col-start-1' : ''}`}
            >
              <div className="relative group">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
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
