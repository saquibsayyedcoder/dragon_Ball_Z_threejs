import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const CharacterModel = ({ modelPath, position, scale = 1, animation }) => {
  const group = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (animation && actions[animation]) {
      actions[animation].play()
    }
  }, [animation, actions])

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

export default CharacterModel