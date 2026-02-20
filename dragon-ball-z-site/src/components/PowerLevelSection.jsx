import React, { useEffect, useRef, useState } from 'react'

const PowerLevelSection = () => {
  const [powerLevel, setPowerLevel] = useState(0)
  const sectionRef = useRef()
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Calculate how much of the section is visible
        const visiblePercentage = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        ))
        
        // Map to power level (0 to 1,000,000)
        setPowerLevel(Math.floor(visiblePercentage * 1000000))
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">POWER LEVEL</h2>
        
        <div className="relative mb-12">
          {/* Power level number */}
          <div className="text-7xl md:text-9xl font-bold dbz-glow animate-pulse-slow">
            {powerLevel.toLocaleString()}
          </div>
          
          {/* Power level bar */}
          <div className="w-full h-8 bg-gray-800 rounded-full overflow-hidden mt-8">
            <div 
              className="h-full bg-gradient-to-r from-dbz-orange to-dbz-yellow transition-all duration-300"
              style={{ width: `${(powerLevel / 1000000) * 100}%` }}
            />
          </div>
          
          <p className="text-2xl mt-4 text-gray-400">It's over 9000!</p>
        </div>
        
        {/* Scouter effect */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-dbz-orange blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-black/60 backdrop-blur-md border-2 border-dbz-orange rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="text-gray-400">Battle Power:</div>
              <div className="text-dbz-yellow font-bold">{powerLevel.toLocaleString()}</div>
              
              <div className="text-gray-400">Status:</div>
              <div className="text-green-500 font-bold">
                {powerLevel > 9000 ? 'OVER 9000!!!' : 'Normal'}
              </div>
              
              <div className="text-gray-400">Transformation:</div>
              <div className="text-dbz-orange font-bold">
                {powerLevel > 500000 ? 'Super Saiyan God' : 
                 powerLevel > 150000 ? 'Super Saiyan 3' :
                 powerLevel > 9000 ? 'Super Saiyan' : 'Base Form'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PowerLevelSection