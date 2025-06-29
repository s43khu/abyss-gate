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
      title: "Soulgate",
      description: "Auth system and onboarding - the first layer of identity where souls are keys to the forbidden realm.",
      color: "from-cyan-400 to-blue-500",
      status: "coming-soon"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Riftpass",
      description: "NFT Pass System - access rights and cursed tickets to traverse the abyss.",
      color: "from-purple-400 to-pink-500",
      status: "coming-soon"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Cursechain",
      description: "Blockchain and transaction layer - the main transaction layer powered by cursed relics.",
      color: "from-green-400 to-emerald-500",
      status: "coming-soon"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Blightvault",
      description: "Storage system - vault of corrupted and rare assets from the depths of the abyss.",
      color: "from-orange-400 to-red-500",
      status: "coming-soon"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Voidlink",
      description: "Bridging infrastructure - portal connections across realms and chains.",
      color: "from-indigo-400 to-purple-500",
      status: "coming-soon"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pact",
      description: "Smart contracts - where contracts are deals with the abyss itself.",
      color: "from-teal-400 to-cyan-500",
      status: "coming-soon"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Wraithnode",
      description: "Validators and nodes - shadow watchers maintaining the realm's integrity.",
      color: "from-yellow-400 to-orange-500",
      status: "coming-soon"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Demonpipe",
      description: "Data pipelines - cursed data flows across services in the forbidden realm.",
      color: "from-red-400 to-pink-500",
      status: "coming-soon"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Obelisk",
      description: "Contract registry and governance - ancient ledger storing forbidden knowledge.",
      color: "from-violet-400 to-purple-500",
      status: "coming-soon"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Necrohub",
      description: "Admin and control center - central cursed dashboard for developers and admins.",
      color: "from-emerald-400 to-teal-500",
      status: "coming-soon"
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
            The AbyssGate Ecosystem
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A realm powered by cursed relics, bound souls, and eternal pacts. 
            Cross the forbidden and discover the future of digital experiences.
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
              The Forbidden Pact
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              To create digital experiences that transcend the ordinary, where every interaction tells a story 
              of the forbidden realm. I believe in the power of technology to inspire, 
              connect, and transform the way I experience the web through cursed relics and eternal pacts.
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
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden">
                {/* Coming Soon Overlay */}
                {feature.status === 'coming-soon' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        Coming Soon
                      </div>
                      <div className="text-xs text-gray-400 animate-pulse">
                        The abyss awaits...
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Status Badge */}
                {feature.status === 'coming-soon' && (
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full">
                      <span className="text-xs text-purple-400 font-medium">Coming Soon</span>
                    </div>
                  </div>
                )}
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
            The Grimoire
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ancient knowledge and forbidden technologies that power the AbyssGate realm
          </p>
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
              Ready to Cross the Forbidden?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Join me in exploring the endless possibilities of the AbyssGate realm. 
              Every scroll, every interaction, every moment is crafted with precision and passion for the forbidden arts.
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