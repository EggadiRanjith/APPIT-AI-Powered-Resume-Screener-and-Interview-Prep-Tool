const features = [
  {
    title: 'Smart AI Analysis',
    description: 'Upload resume, get detailed feedback with our advanced AI algorithms',
    icon: '📊',
    gradient: 'from-blue-500/10 to-purple-500/10'
  },
  {
    title: 'Job Compatibility Score',
    description: 'Get precise 0-100 matching scores using machine learning',
    icon: '🎯',
    gradient: 'from-green-500/10 to-blue-500/10'
  },
  {
    title: 'Missing Skills Detection',
    description: 'AI-powered gap analysis for skill improvement recommendations',
    icon: '🔍',
    gradient: 'from-orange-500/10 to-pink-500/10'
  },
  {
    title: 'Interview Preparation',
    description: 'Personalized interview questions based on your profile',
    icon: '📝',
    gradient: 'from-purple-500/10 to-red-500/10'
  }
]

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-jakarta text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
            Why Choose ResumeAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of resume screening with our advanced AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-40`} />
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
              
              <div className="relative p-8">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
