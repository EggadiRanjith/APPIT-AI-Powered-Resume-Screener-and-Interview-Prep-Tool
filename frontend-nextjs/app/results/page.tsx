export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Resume Analysis Results</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
            <div className="text-4xl font-bold text-black">85/100</div>
          </div>

          {/* Skills Match */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Skills Match</h2>
            <ul className="space-y-2">
              {['React', 'Node.js', 'Python'].map(skill => (
                <li key={skill} className="flex justify-between">
                  <span>{skill}</span>
                  <span className="font-medium">90%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Suggested Improvements</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Add more details about project impacts</li>
              <li>Include relevant certifications</li>
              <li>Quantify achievements with metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
