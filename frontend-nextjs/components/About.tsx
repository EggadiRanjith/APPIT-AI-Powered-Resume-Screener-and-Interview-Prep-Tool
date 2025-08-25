export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">About ResumeAI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-600">
              ResumeAI is an advanced resume screening platform powered by artificial intelligence. Our mission is to help job seekers optimize their resumes and increase their chances of landing their dream jobs.
            </p>
            <p className="text-gray-600">
              Founded in 2024, we've helped thousands of professionals improve their resumes through AI-powered analysis and recommendations.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <ul className="space-y-4 text-gray-600">
              <li>• Empower job seekers with AI technology</li>
              <li>• Provide accurate resume analysis</li>
              <li>• Offer actionable improvement suggestions</li>
              <li>• Make job applications more successful</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
