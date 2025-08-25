"use client"

import { useEffect, useState } from 'react'

const stats = [
  { label: 'Resumes Analyzed', value: 50000, suffix: '+', icon: '📊' },
  { label: 'Active Users', value: 10000, suffix: '+', icon: '👥' },
  { label: 'Success Rate', value: 95, suffix: '%', icon: '🎯' },
  { label: 'Job Matches', value: 25000, suffix: '+', icon: '🤝' },
]

export default function Stats() {
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    const duration = 2000
    const steps = 50

    stats.forEach((stat, index) => {
      const increment = stat.value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(current)
          return newCounters
        })
      }, duration / steps)
    })
  }, [])

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-[0_8px_16px_rgb(0_0_0/0.1)] hover:shadow-[0_16px_32px_rgb(0_0_0/0.15)] transition-all duration-500 p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="text-4xl mb-6 block">{stat.icon}</span>
                <div className="font-jakarta text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {counters[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
