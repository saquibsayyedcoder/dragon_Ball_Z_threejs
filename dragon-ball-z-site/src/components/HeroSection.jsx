import React, { useEffect, useRef, useState } from 'react'

const HeroSection = () => {
  const [opacity, setOpacity] = useState(1)
  const [scale, setScale] = useState(1)
  const sectionRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, 
          (window.innerHeight - rect.top) / window.innerHeight
        ))
        
        // Fade out as we scroll past
        setOpacity(Math.max(0, 1 - scrollProgress * 1.5))
        
        // Scale down effect
        setScale(Math.max(0.8, 1 - scrollProgress * 0.2))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center relative sticky top-0"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Background ki effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dbz-orange rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-dbz-yellow rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Content */}
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="dbz-glow block">DRAGON BALL</span>
          <span className="text-dbz-orange dbz-glow text-7xl md:text-9xl">Z</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
          Scroll to rotate the Dragon Ball and discover the legendary saga
        </p>

      </div>
    </section>
  )
}

export default HeroSection