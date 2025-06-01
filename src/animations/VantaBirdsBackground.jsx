'use client'

import { useEffect, useRef, useState } from 'react'

export default function VantaBirdsBackground() {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadScripts = async () => {
      if (!window.THREE) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
          script.onload = resolve
          script.onerror = reject
          document.body.appendChild(script)
        })
      }

      if (!window.VANTA || !window.VANTA.BIRDS) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js'
          script.onload = resolve
          script.onerror = reject
          document.body.appendChild(script)
        })
      }

      if (!vantaEffect && window.VANTA?.BIRDS) {
        const effect = window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 0.5,
          scaleMobile: 1.0,
          backgroundColor: 0x000000,
          birdSize: 0.50,
          separation: 60.00,
          quantity: 3.00,
          color1: 0xbba0b4,
  color2: 0x138484,
  colorMode: "lerp"
        })
        setVantaEffect(effect)
      }
    }

    loadScripts()

    return () => {
      if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy()
      }
    }
  }, [])

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 w-screen h-screen"
    />
  )
}
