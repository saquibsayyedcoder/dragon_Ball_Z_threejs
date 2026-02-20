import React, { useEffect, useRef, useState } from 'react'
import CharacterViewer3D from './CharacterViewer3D'

const characters = [
  {
    name: 'Goku',
    image: '/teste.jpeg',
    description: 'The Saiyan warrior who protects Earth',
    power: 'Super Saiyan God SS',
    color: 'from-orange-500 to-red-500',
    transformations: ['Base', 'Super Saiyan', 'SS2', 'SS3', 'SSG', 'SSB']
  },
  {
    name: 'Vegeta',
    image: '/Z Fighters (@DragonBall43ver) on X.jpeg',
    description: 'Prince of all Saiyans',
    power: 'Super Saiyan Blue',
    color: 'from-blue-500 to-purple-500',
    transformations: ['Base', 'Super Saiyan', 'SS2', 'SSG', 'SSB', 'SSBE']
  },
  {
    name: 'Gohan',
    image: '/Gohan.jpeg',
    description: 'The hidden power of the Saiyans',
    power: 'Ultimate Gohan',
    color: 'from-purple-500 to-pink-500',
    transformations: ['Base', 'Super Saiyan', 'SS2', 'Ultimate', 'Beast']
  },
  {
    name: 'Frieza',
    image: '/Frieza - Phone Wallpaper Fan Art.jpeg',
    description: 'Emperor of the universe',
    power: 'Golden Frieza',
    color: 'from-purple-600 to-pink-600',
    transformations: ['1st Form', '2nd Form', '3rd Form', 'Final Form', 'Golden']
  }
]

const CharactersSection = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev, entry.target.dataset.index])
          }
        })
      },
      { threshold: 0.3 }
    )

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleCardClick = (character) => {
    setSelectedCharacter(character)
  }

  const handleCloseViewer = () => {
    setSelectedCharacter(null)
  }

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <h2 className="section-title">Z FIGHTERS</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {characters.map((character, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            data-index={index}
            onClick={() => handleCardClick(character)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group relative overflow-hidden rounded-xl transform transition-all duration-500 cursor-pointer
              ${visibleCards.includes(index.toString()) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'}
              ${hoveredCard === index ? 'scale-105 shadow-2xl shadow-dbz-orange/50' : ''}
              hover:z-10`}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'all 0.5s ease'
            }}
          >
            {/* 3D Card Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-dbz-orange to-dbz-yellow opacity-0 group-hover:opacity-20 transition-opacity"
              style={{
                transform: 'translateZ(10px)'
              }}
            ></div>
            
            {/* Card background with gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-75 group-hover:opacity-90 transition-opacity`}></div>
            
            {/* Character image with 3D tilt effect */}
            <div 
              className="relative h-80 overflow-hidden"
              style={{
                transform: hoveredCard === index ? 'rotateX(5deg) rotateY(5deg)' : 'none',
                transition: 'transform 0.3s ease'
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Power level overlay */}
              <div className="absolute top-2 right-2 bg-black/80 text-dbz-yellow px-3 py-1 rounded-full text-sm font-bold">
                {character.power}
              </div>

              {/* 360° badge */}
              <div className="absolute bottom-2 left-2 bg-dbz-orange text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                360° View
              </div>
            </div>
            
            {/* Character info */}
            <div className="relative p-6 bg-black/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2 dbz-glow">{character.name}</h3>
              <p className="text-gray-300 mb-4 text-sm">{character.description}</p>
              
              {/* Transformations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {character.transformations.map((trans, i) => (
                  <span 
                    key={i}
                    className="text-xs bg-dbz-orange/20 text-dbz-yellow px-2 py-1 rounded"
                  >
                    {trans}
                  </span>
                ))}
              </div>
              
              {/* Click to view 3D indicator */}
              <div className="text-center mt-2">
                <span className="text-xs text-dbz-orange group-hover:opacity-100 opacity-70 transition-opacity">
                  Click to view in 3D
                </span>
              </div>
              
              {/* Ki blast effect on hover */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-dbz-orange rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Character Viewer Modal */}
      {selectedCharacter && (
        <CharacterViewer3D 
          character={selectedCharacter} 
          onClose={handleCloseViewer}
        />
      )}

      {/* Instructions */}
      <div className="text-center mt-12 text-gray-400">
        <p className="text-sm">✨ Click on any character to view them in 360° 3D! ✨</p>
      </div>
    </section>
  )
}

export default CharactersSection