'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default function AbyssGateBackground() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const composerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.fog = new THREE.Fog(0x000000, 1, 1000)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0.1)
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing setup
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    )
    composer.addPass(bloomPass)
    composerRef.current = composer

    // Create cursed particles (souls)
    const particleCount = 200
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Cursed colors - dark purples, deep blues, and ethereal greens
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        colors[i * 3] = 0.2 + Math.random() * 0.3 // Purple
        colors[i * 3 + 1] = 0.0 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.4
      } else if (colorChoice < 0.7) {
        colors[i * 3] = 0.0 + Math.random() * 0.2 // Deep blue
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.4
      } else {
        colors[i * 3] = 0.0 + Math.random() * 0.2 // Ethereal green
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.4
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.3
      }

      sizes[i] = Math.random() * 3 + 1
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Particle material with custom shader
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: null }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + 0.5 * sin(time * 2.0 + position.x * 10.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          
          float alpha = 1.0 - (distance * 2.0);
          alpha = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Create portal rings
    const createPortalRing = (radius, segments, color) => {
      const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, segments)
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      })
      const ring = new THREE.Mesh(geometry, material)
      ring.rotation.x = Math.PI / 2
      return ring
    }

    const portalRings = []
    for (let i = 0; i < 3; i++) {
      const ring = createPortalRing(2 + i * 0.5, 64, new THREE.Color(0x4a0e6b))
      portalRings.push(ring)
      scene.add(ring)
    }

    // Create ethereal smoke effect
    const smokeGeometry = new THREE.PlaneGeometry(10, 10, 32, 32)
    const smokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + time) * 0.1;
          pos.z += cos(pos.y * 2.0 + time * 0.5) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vec2 uv = vUv;
          float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time * 0.5);
          float alpha = (0.1 + 0.05 * noise) * (1.0 - uv.y);
          gl_FragColor = vec4(0.2, 0.0, 0.4, alpha * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })

    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
    smoke.position.z = -2
    scene.add(smoke)

    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Animate particles
      const positions = particles.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += Math.sin(time + i) * 0.01
        positions[i * 3 + 1] += Math.cos(time + i * 0.5) * 0.01
        positions[i * 3 + 2] += Math.sin(time * 0.5 + i * 0.3) * 0.01
      }
      particles.attributes.position.needsUpdate = true

      // Animate portal rings
      portalRings.forEach((ring, index) => {
        ring.rotation.z += 0.005 * (index + 1)
        ring.material.opacity = 0.3 + 0.2 * Math.sin(time * 2 + index)
      })

      // Update shader uniforms
      particleMaterial.uniforms.time.value = time
      smokeMaterial.uniforms.time.value = time

      // Render
      composer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      composer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, rgba(74, 14, 107, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)' }}
    />
  )
}
