import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html, Plane } from '@react-three/drei'
import * as THREE from 'three'

const CharacterViewer3D = ({ character, onClose }) => {
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const groupRef = useRef()
  const textureRef = useRef()

  // Load the image as a texture
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(character.image, (texture) => {
      textureRef.current = texture
    })
  }, [character.image])

  // Manual rotation with mouse drag
  const handleRotate = (delta) => {
    setRotation(prev => prev + delta)
    setAutoRotate(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-dbz-orange hover:bg-dbz-orange-dark rounded-full p-3 z-10 transition-all duration-300 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, 5, -10]} color="#FF6B35" intensity={0.5} />
          
          {/* Character Card in 3D Space */}
          <group 
            ref={groupRef}
            rotation={[0, rotation, 0]}
            onPointerDown={(e) => {
              e.stopPropagation()
              setAutoRotate(false)
            }}
          >
            {/* Front face with character image */}
            <Plane args={[3, 4]} position={[0, 0, 0.1]}>
              <meshStandardMaterial 
                map={textureRef.current}
                side={THREE.DoubleSide}
              />
            </Plane>
            
            {/* Back face with character info */}
            <Plane args={[3, 4]} position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
              <meshStandardMaterial color="#1a1a1a" side={THREE.DoubleSide} />
            </Plane>
            
            {/* Edges of the card */}
            <Box args={[3, 4, 0.2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#FFD700" emissive="#FF6B35" transparent opacity={0.3} wireframe />
            </Box>
            
            {/* Character name floating above */}
            <Html position={[0, 2.5, 0]} center>
              <div className="bg-black/80 text-white px-4 py-2 rounded-lg border border-dbz-orange whitespace-nowrap">
                <span className="text-xl font-bold dbz-glow">{character.name}</span>
              </div>
            </Html>
            
            {/* Power level below */}
            <Html position={[0, -2.5, 0]} center>
              <div className="bg-black/80 text-dbz-yellow px-3 py-1 rounded-lg border border-dbz-orange">
                Power: {character.power}
              </div>
            </Html>
            
            {/* Floating stars around the card */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              return (
                <Sphere
                  key={i}
                  args={[0.1, 8, 8]}
                  position={[
                    Math.cos(angle) * 2.2,
                    Math.sin(angle) * 2.2,
                    Math.sin(angle * 2) * 0.5
                  ]}
                >
                  <meshStandardMaterial color="#FFD700" emissive="#FF6B35" />
                </Sphere>
              )
            })}
          </group>
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={1.0}
            autoRotate={autoRotate}
            autoRotateSpeed={2.0}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
        </Canvas>
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button 
          onClick={() => handleRotate(-0.5)}
          className="bg-dbz-orange hover:bg-dbz-orange-dark text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110"
        >
          ← Rotate Left
        </button>
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            autoRotate 
              ? 'bg-dbz-yellow text-black' 
              : 'bg-gray-600 text-white'
          }`}
        >
          {autoRotate ? 'Auto Rotate On' : 'Auto Rotate Off'}
        </button>
        <button 
          onClick={() => handleRotate(0.5)}
          className="bg-dbz-orange hover:bg-dbz-orange-dark text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110"
        >
          Rotate Right →
        </button>
      </div>
    </div>
  )
}

// Helper components
const Box = ({ args, position, children, ...props }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial {...props} />
      {children}
    </mesh>
  )
}

const Sphere = ({ args, position, ...props }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={args} />
      <meshStandardMaterial {...props} />
    </mesh>
  )
}

export default CharacterViewer3D