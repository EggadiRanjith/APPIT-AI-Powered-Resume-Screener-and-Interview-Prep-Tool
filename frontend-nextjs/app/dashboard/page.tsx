export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Analyses', value: '12' },
            { label: 'Average Score', value: '85/100' },
            { label: 'Improved Skills', value: '15' },
            { label: 'Latest Score', value: '90/100' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-100 pb-4">
                  <p className="text-sm text-gray-600">Resume analyzed - Jan {item}, 2024</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Skill Progress</h2>
            <div className="space-y-4">
              {['Technical Skills', 'Soft Skills', 'Experience'].map((skill) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{skill}</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-black rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
