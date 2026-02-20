import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html, useProgress, PerspectiveCamera } from '@react-three/drei'
import DragonBallScene from './components/DragonBallScene'
import HeroSection from './components/HeroSection'
import CharactersSection from './components/CharactersSection'
import SagasSection from './components/SagasSection'
import PowerLevelSection from './components/PowerLevelSection'
import * as THREE from 'three'
import ScrollIndicator from './components/ScrollIndicator'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 border-t-4 border-dbz-orange border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-bold dbz-glow">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

function ScrollControlledScene() {
  const groupRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll))
      const rotation = scrollProgress * Math.PI * 2
      
      groupRef.current.rotation.y = rotation
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 0.5
    }
  })

  return <DragonBallScene ref={groupRef} />
}

function FloatingParticles() {
  const particlesRef = useRef()
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  
  // Generate random positions
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30
    positions[i + 1] = (Math.random() - 0.5) * 30
    positions[i + 2] = (Math.random() - 0.5) * 30
  }
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#FFD700" 
        size={0.05} 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scrollY / maxScroll) * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-dbz-orange to-dbz-yellow transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function App() {
  const containerRef = useRef()
  const [cameraPosition, setCameraPosition] = useState([0, 0, 15])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      
      // Camera moves closer/farther based on scroll
      const distance = 15 - (progress * 5)
      setCameraPosition([0, 0, distance])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#FF6B35" intensity={0.5} />
            
            {/* Stars background */}
            <Stars 
              radius={100} 
              depth={50} 
              count={5000} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1}
            />
            
            {/* Scroll-controlled Dragon Ball */}
            <ScrollControlledScene />
            
            {/* Floating particles */}
            <FloatingParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Elements (outside Canvas) */}
      <ScrollProgress />
      <ScrollIndicator />

      {/* Scrollable Content */}
      <div className="relative z-10">
        <HeroSection />
        <PowerLevelSection />
        <CharactersSection />
        <SagasSection />
      </div>
    </div>
  )
}

export default App