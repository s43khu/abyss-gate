'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Home, BookOpen, User, Mail, Database, Wifi } from 'lucide-react'
import { useSoundManager } from './SoundManager'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDockMode, setIsDockMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { playHover, playClick } = useSoundManager()

  const navItems = [
    { name: 'Home', href: '#home', id: 'home', icon: <Home className="w-5 h-5" /> },
    { name: 'Story', href: '#story', id: 'story', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'About', href: '#about', id: 'about', icon: <User className="w-5 h-5" /> },
    { name: 'Blightvault', href: '#blightvault', id: 'blightvault', icon: <Database className="w-5 h-5" /> },
    { name: 'Demonpipe', href: '#demonpipe', id: 'demonpipe', icon: <Wifi className="w-5 h-5" /> },
    { name: 'Contact', href: '#contact', id: 'contact', icon: <Mail className="w-5 h-5" /> }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      
      setIsScrolled(scrollY > 50)
      
      // Only update dock mode if not transitioning
      if (!isTransitioning) {
        setIsDockMode(scrollY > heroHeight * 0.8)
      }
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransitioning])

  const scrollToSection = async (href) => {
    const element = document.querySelector(href)
    if (element) {
      setIsTransitioning(true)
      playClick()
      
      // Get current scroll position
      const currentScrollY = window.scrollY
      const targetScrollY = element.offsetTop
      
      // If clicking home from dock mode
      if (href === '#home' && isDockMode) {
        console.log('Scrolling to home from dock mode')
        
        // Smooth scroll to hero
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // Wait for scroll to complete, then switch to navbar mode
        setTimeout(() => {
          setIsDockMode(false)
          setIsTransitioning(false)
        }, 1000)
      } else if (href === '#home' && !isDockMode) {
        // If already in navbar mode, just scroll to top
        console.log('Scrolling to home from navbar mode')
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setIsTransitioning(false)
      } else {
        // For other sections
        console.log('Scrolling to section:', href)
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        })
        
        // For non-home sections, switch to dock mode after scroll
        setTimeout(() => {
          setIsDockMode(true)
          setIsTransitioning(false)
        }, 1000)
      }
      
      setIsOpen(false)
    } else {
      console.error('Element not found:', href)
      setIsTransitioning(false)
    }
  }

  return (
    <>
      {/* Regular Navbar - Shows when not in dock mode */}
      <AnimatePresence mode="wait">
        {!isDockMode && (
          <motion.nav
            key="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.5
            }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/20 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <a 
                    href="#home" 
                    className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#home')
                    }}
                    onMouseEnter={playHover}
                  >
                    AbyssGate
                  </a>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                        onMouseEnter={playHover}
                        className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          activeSection === item.id
                            ? 'text-cyan-400'
                            : 'text-gray-300 hover:text-cyan-400'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.name}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsOpen(!isOpen)
                      playClick()
                    }}
                    className="text-gray-300 hover:text-cyan-400 p-2"
                  >
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X size={24} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu size={24} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-black/40 backdrop-blur-md"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                        onMouseEnter={playHover}
                        className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                          activeSection === item.id
                            ? 'text-cyan-400 bg-cyan-400/10'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Dock Navigation - Shows when in dock mode */}
      <AnimatePresence mode="wait">
        {isDockMode && (
          <motion.div
            key="dock"
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6
            }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div 
              className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            >
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ scale: 0, y: 20, rotate: -180 }}
                    animate={{ scale: 1, y: 0, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1 + 0.3, 
                      type: "spring", 
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -8,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.button
                      onClick={() => {
                        scrollToSection(item.href)
                      }}
                      onMouseEnter={playHover}
                      className={`relative p-3 rounded-xl transition-all duration-300 group ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      
                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="dockActive"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Tooltip */}
                      <motion.div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap"
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 