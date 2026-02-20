import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

const DragonBallScene = forwardRef((props, ref) => {
  const groupRef = useRef()
  const innerSphereRef = useRef()
  const starsRef = useRef([])
  const energyRingRef = useRef()
  const dragonStarsRef = useRef([])
  const outerGlowRef = useRef()
  
  useImperativeHandle(ref, () => groupRef.current)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    // Inner sphere pulsating effect
    if (innerSphereRef.current) {
      innerSphereRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.03)
    }
    
    // Outer glow pulse
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05)
      outerGlowRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.1
    }
    
    // Energy ring rotation
    if (energyRingRef.current) {
      energyRingRef.current.rotation.x += 0.002
      energyRingRef.current.rotation.y += 0.003
      energyRingRef.current.rotation.z += 0.001
    }
    
    // Animate floating stars
    starsRef.current.forEach((star, i) => {
      if (star) {
        star.position.x += Math.sin(time * 2 + i) * 0.001
        star.position.y += Math.cos(time * 2 + i) * 0.001
        star.position.z += Math.sin(time * 1.5 + i) * 0.001
      }
    })
    
    // Animate dragon stars
    dragonStarsRef.current.forEach((star, i) => {
      if (star) {
        star.scale.setScalar(1 + Math.sin(time * 5 + i) * 0.2)
        star.material.emissiveIntensity = 0.5 + Math.sin(time * 5 + i) * 0.5
      }
    })
  })

  // Create dragon stars pattern (1 to 7 stars)
  const starPositions = [
    [0, 0.6, 0.2], // Top
    [0.4, 0.3, 0.1],
    [0.5, -0.2, 0],
    [0.2, -0.5, -0.1],
    [-0.2, -0.5, -0.1],
    [-0.5, -0.2, 0],
    [-0.4, 0.3, 0.1]
  ]

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer glow sphere */}
      <Sphere 
        ref={outerGlowRef}
        args={[1.8, 64, 64]}
      >
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF0000"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>

      {/* Main Dragon Ball Sphere */}
      <group ref={innerSphereRef}>
        {/* Inner core */}
        <Sphere args={[1.3, 64, 64]}>
          <meshStandardMaterial
            color="#FF8C00"
            emissive="#FF4500"
            roughness={0.2}
            metalness={0.3}
          />
        </Sphere>

        {/* Main transparent sphere with orange tint */}
        <Sphere args={[1.2, 64, 64]}>
          <meshStandardMaterial
            color="#FFA500"
            emissive="#FF4500"
            transparent
            opacity={0.7}
            roughness={0.1}
            metalness={0.2}
          />
        </Sphere>

        {/* Outer shell with stars pattern */}
        <Sphere args={[1.25, 128, 128]}>
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FF6B35"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>

        {/* Dragon stars (the 7 stars) */}
        {starPositions.map((pos, i) => (
          <Sphere
            key={`dragon-star-${i}`}
            ref={el => dragonStarsRef.current[i] = el}
            args={[0.15, 32, 32]}
            position={pos}
          >
            <meshStandardMaterial 
              color="#FF0000" 
              emissive="#FF0000"
              emissiveIntensity={1}
              roughness={0.1}
              metalness={0.1}
            />
          </Sphere>
        ))}

        {/* Additional small floating particles inside */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const radius = 0.9
          return (
            <Sphere
              key={`inner-particle-${i}`}
              args={[0.04, 8, 8]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.8,
                Math.sin(angle * 2) * 0.3
              ]}
            >
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700"
                emissiveIntensity={0.8}
              />
            </Sphere>
          )
        })}
      </group>

      {/* Multiple energy rings */}
      <group ref={energyRingRef}>
        {/* Main horizontal ring */}
        <Torus args={[1.6, 0.02, 32, 128]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FF6B35" 
            transparent 
            opacity={0.4}
          />
        </Torus>
        
        {/* Vertical ring */}
        <Torus args={[1.6, 0.02, 32, 128]} rotation={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#FFA500" 
            emissive="#FF4500" 
            transparent 
            opacity={0.3}
          />
        </Torus>
        
        {/* Diagonal rings */}
        <Torus args={[1.6, 0.015, 32, 128]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial 
            color="#FF8C00" 
            emissive="#FF0000" 
            transparent 
            opacity={0.2}
          />
        </Torus>
        
        <Torus args={[1.6, 0.015, 32, 128]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial 
            color="#FF8C00" 
            emissive="#FF0000" 
            transparent 
            opacity={0.2}
          />
        </Torus>
      </group>

      {/* Floating orbs around the main ball */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const verticalOffset = Math.sin(angle * 3) * 0.5
        return (
          <Sphere
            key={`orb-${i}`}
            ref={el => starsRef.current[i] = el}
            args={[0.08, 16, 16]}
            position={[
              Math.cos(angle) * 2.2,
              Math.sin(angle) * 2.2 + verticalOffset,
              Math.sin(angle * 2) * 0.8
            ]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? "#FF6B35" : i % 3 === 1 ? "#1E90FF" : "#FFD700"}
              emissive={i % 3 === 0 ? "#FF4500" : i % 3 === 1 ? "#0000FF" : "#FFA500"}
              emissiveIntensity={0.8}
            />
          </Sphere>
        )
      })}

      {/* Energy particles */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 2.0
        return (
          <Sphere
            key={`particle-${i}`}
            args={[0.03, 6, 6]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 3) * radius * 0.3,
              Math.sin(angle) * radius * 0.5
            ]}
          >
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFA500"
              emissiveIntensity={0.5}
            />
          </Sphere>
        )
      })}
    </group>
  )
})

DragonBallScene.displayName = 'DragonBallScene'

export default DragonBallScene