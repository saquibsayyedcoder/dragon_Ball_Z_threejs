import React, { useState, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import CharacterScene from "./CharacterScene"

const CharacterViewer3D = ({ character, onClose }) => {
  const [rotation, setRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const handleRotate = (delta) => {
    setRotation(prev => prev + delta)
    setAutoRotate(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-dbz-orange p-3 rounded-full z-10"
      >
        ✕
      </button>

      <Canvas camera={{ position: [0, 0, 6] }}>
        <Suspense fallback={null}>

          <CharacterScene
            character={character}
            rotation={rotation}
          />

          <OrbitControls
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
          />

        </Suspense>
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button onClick={() => handleRotate(-0.5)} className="bg-dbz-orange px-4 py-2 rounded text-white">
          Left
        </button>

        <button onClick={() => setAutoRotate(!autoRotate)} className="bg-dbz-yellow px-4 py-2 rounded">
          Auto
        </button>

        <button onClick={() => handleRotate(0.5)} className="bg-dbz-orange px-4 py-2 rounded text-white">
          Right
        </button>
      </div>
    </div>
  )
}

export default CharacterViewer3D