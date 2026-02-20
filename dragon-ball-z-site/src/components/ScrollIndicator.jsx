import React, { useEffect, useState } from 'react'

const ScrollIndicator = () => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollY / maxScroll
      setRotation(progress * 360)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:block">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div 
          className="absolute inset-0 border-2 border-dbz-orange rounded-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            borderTopColor: 'transparent',
            borderRightColor: '#FFD700'
          }}
        ></div>
        
        {/* Inner circle with dragon ball */}
        <div className="absolute inset-2 bg-gradient-to-br from-dbz-orange to-dbz-yellow rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-2 right-3"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full bottom-2 left-3"></div>
        </div>
        
        {/* Stars (1-4) */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default ScrollIndicator