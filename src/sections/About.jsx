'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSoundManager } from '@/components/SoundManager'
import { 
  Code, 
  Zap, 
  Cpu, 
  Globe, 
  Palette, 
  Smartphone,
  Database,
  Shield,
  Rocket,
  Eye
} from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { playHover } = useSoundManager()

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Advanced Animations",
      description: "Powered by GSAP and Framer Motion, creating seamless transitions and breathtaking visual effects that push the boundaries of web animation.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Interactions",
      description: "Every click, scroll, and hover triggers dynamic responses with custom sound effects and visual feedback for an immersive experience.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Performance Optimized",
      description: "Built with Next.js 14 and React 19, utilizing cutting-edge technologies for lightning-fast loading and smooth performance across all devices.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "3D Visualizations",
      description: "Three.js and Vanta.js powered backgrounds create stunning 3D environments that respond to user interaction and device capabilities.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Modern Design System",
      description: "Tailwind CSS framework with custom animations and a cohesive design language that adapts seamlessly across all screen sizes.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Excellence",
      description: "Mobile-first approach ensures perfect functionality and visual appeal on smartphones, tablets, and desktop computers.",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Scalable Architecture",
      description: "Modular component structure with clean code practices, making it easy to extend, maintain, and deploy across different environments.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "Built with security best practices, ensuring data protection and safe user interactions in the digital realm.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Future Ready",
      description: "Designed to evolve with emerging technologies, ready to integrate AI, WebGL, and next-generation web standards.",
      color: "from-violet-400 to-purple-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Immersive UX",
      description: "Custom cursor effects, scroll animations, and interactive elements create a truly engaging user experience that captivates visitors.",
      color: "from-emerald-400 to-teal-500"
    }
  ]

  return (
    <section id="about" ref={ref} className="min-h-screen text-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About AbyssGate
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A cutting-edge web experience that pushes the boundaries of digital innovation. 
            Built with passion, powered by technology, designed for the future.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              To create digital experiences that transcend the ordinary, where every interaction tells a story 
              and every animation serves a purpose. We believe in the power of technology to inspire, 
              connect, and transform the way we experience the web.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={playHover}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Next.js 14', 'React 19', 'GSAP', 'Framer Motion', 'Three.js', 'Tailwind CSS',
              'Vanta.js', 'Web Audio API', 'TypeScript', 'Vercel', 'PostCSS', 'ESLint'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={playHover}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300"
              >
                <span className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Experience the Future?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Join us in exploring the endless possibilities of modern web development. 
              Every scroll, every interaction, every moment is crafted with precision and passion.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 