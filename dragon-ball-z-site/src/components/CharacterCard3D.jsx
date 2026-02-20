import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Html, Image } from '@react-three/drei'

const CharacterCard3D = ({ character, isActive, onClick }) => {
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (cardRef.current && !isActive) {
      // Subtle floating animation when not active
      cardRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1
      cardRef.current.rotation.y += 0.005
    }
  })

  return (
    <group 
      ref={cardRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Card base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#FF6B35" emissiveIntensity={hovered ? 0.3 : 0.1} />
      </mesh>
      
      {/* Character image on front */}
      <Image 
        url={character.image}
        position={[0, 0, 0.11]}
        scale={[1.8, 2.7, 1]}
      />
      
      {/* Border glow */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.85, 2.75, 0.01]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF6B35" transparent opacity={hovered ? 0.8 : 0.3} />
      </mesh>
      
      {/* Character name */}
      <Html position={[0, -1.8, 0.2]} center>
        <div className="bg-black/80 text-white px-3 py-1 rounded-lg border border-dbz-orange whitespace-nowrap">
          {character.name}
        </div>
      </Html>
      
      {/* Power level */}
      <Html position={[0, 1.8, 0.2]} center>
        <div className="bg-black/80 text-dbz-yellow px-2 py-1 rounded-lg text-sm">
          {character.power}
        </div>
      </Html>
    </group>
  )
}

export default CharacterCard3D