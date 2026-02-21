import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useTexture } from '@react-three/drei'


const CharacterCard3D = ({ character, isActive, onClick }) => {
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(character.image)

  useFrame(({ clock }) => {
    if (cardRef.current && !isActive) {
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
      <mesh>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* IMAGE */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[1.8, 2.7]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      <Html position={[0, -1.8, 0.2]} center>
        <div className="bg-black/80 text-white px-3 py-1 rounded-lg">
          {character.name}
        </div>
      </Html>
    </group>
  )
}

export default CharacterCard3D