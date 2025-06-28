'use client'

import { useEffect, useRef } from 'react'

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Aurora colors - very subtle
    const colors = [
      { r: 0, g: 255, b: 255, a: 0.08 },    // Cyan
      { r: 255, g: 0, b: 255, a: 0.05 },    // Magenta
      { r: 0, g: 255, b: 127, a: 0.03 }     // Green
    ]

    // Aurora wave parameters
    const waves = colors.map((color, index) => ({
      color,
      amplitude: 80 + index * 40,
      frequency: 0.001 + index * 0.0005,
      speed: 0.2 + index * 0.1,
      offset: index * Math.PI / 3,
      yOffset: 400 + index * 100
    }))

    let time = 0

    const animate = () => {
      time += 0.005
      
      // Clear canvas with black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw aurora waves
      waves.forEach(wave => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        // Create wave path
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude + wave.yOffset
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.color.a})`)
        gradient.addColorStop(0.5, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, ${wave.color.a * 0.3})`)
        gradient.addColorStop(1, `rgba(${wave.color.r}, ${wave.color.g}, ${wave.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
