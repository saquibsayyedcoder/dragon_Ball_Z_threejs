import React, { useRef } from "react"
import { Plane, Html, useTexture } from "@react-three/drei"
import * as THREE from "three"

const CharacterScene = ({ character, rotation }) => {
  const groupRef = useRef()

  const texture = useTexture(character.image)

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />

      <group ref={groupRef} rotation={[0, rotation, 0]}>

        {/* FRONT */}
        <Plane args={[3, 4]} position={[0, 0, 0.11]}>
          <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
        </Plane>

        {/* BACK */}
        <Plane args={[3, 4]} position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial color="#111" side={THREE.DoubleSide} />
        </Plane>

        {/* EDGE */}
        <mesh>
          <boxGeometry args={[3, 4, 0.2]} />
          <meshStandardMaterial color="#FFD700" wireframe opacity={0.3} transparent />
        </mesh>

        <Html position={[0, 2.6, 0]} center>
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
            {character.name}
          </div>
        </Html>

        <Html position={[0, -2.6, 0]} center>
          <div className="bg-black/80 text-dbz-yellow px-3 py-1 rounded-lg">
            Power: {character.power}
          </div>
        </Html>

      </group>
    </>
  )
}

export default CharacterScene