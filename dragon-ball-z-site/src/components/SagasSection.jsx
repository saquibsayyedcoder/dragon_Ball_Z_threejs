import React, { useState } from 'react'

const sagas = [
  {
    title: 'Saiyan Saga',
    description: 'The arrival of Raditz and the beginning of the Z era',
    episodes: '1-39',
    color: 'border-red-500',
    bgColor: 'from-red-900/50 to-orange-900/50'
  },
  {
    title: 'Frieza Saga',
    description: 'The journey to Namek and battle against the tyrant Frieza',
    episodes: '40-107',
    color: 'border-purple-500',
    bgColor: 'from-purple-900/50 to-blue-900/50'
  },
  {
    title: 'Cell Saga',
    description: 'The Androids appear and the Cell Games begin',
    episodes: '108-194',
    color: 'border-green-500',
    bgColor: 'from-green-900/50 to-teal-900/50'
  },
  {
    title: 'Majin Buu Saga',
    description: 'The ultimate battle against the magical menace Majin Buu',
    episodes: '195-291',
    color: 'border-pink-500',
    bgColor: 'from-pink-900/50 to-orange-900/50'
  }
]

const SagasSection = () => {
  const [activeSaga, setActiveSaga] = useState(0)

  return (
    <section className="min-h-screen py-20 px-4">
      <h2 className="section-title">SAGAS</h2>
      
      <div className="max-w-6xl mx-auto">
        {/* Saga selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sagas.map((saga, index) => (
            <button
              key={index}
              onClick={() => setActiveSaga(index)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300
                ${activeSaga === index 
                  ? `bg-gradient-to-r ${saga.bgColor} border-2 ${saga.color} scale-110` 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {saga.title}
            </button>
          ))}
        </div>

        {/* Active saga display */}
        <div className="relative">
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-r ${sagas[activeSaga].bgColor} blur-3xl opacity-50`}></div>
          
          {/* Content */}
          <div className="relative bg-black/60 backdrop-blur-md rounded-2xl p-8 border-2 border-dbz-orange/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-4 dbz-glow">
                  {sagas[activeSaga].title}
                </h3>
                <p className="text-xl text-gray-300 mb-4">
                  {sagas[activeSaga].description}
                </p>
                <p className="text-dbz-yellow text-lg mb-6">
                  Episodes: {sagas[activeSaga].episodes}
                </p>
                <button className="dbz-button">
                  Watch Saga
                </button>
              </div>
              
              <div className="relative h-64 md:h-96">
                {/* Placeholder for saga image/3D model */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sagas[activeSaga].bgColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white/50">
                    {sagas[activeSaga].title} Preview
                  </span>
                </div>
                
                {/* Floating energy balls */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-dbz-orange rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-dbz-yellow rounded-full blur-3xl animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SagasSection