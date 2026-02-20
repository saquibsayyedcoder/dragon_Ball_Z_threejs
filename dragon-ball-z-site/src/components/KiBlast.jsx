import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const KiBlast = ({ position, color = '#FFD700' }) => {
  const blastRef = React.useRef()
  
  useFrame((state) => {
    if (blastRef.current) {
      blastRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2
      blastRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2
      blastRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2
    }
  })

  return (
    <group ref={blastRef} position={position}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Sphere args={[0.5, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
    </group>
  )
}

export default KiBlast