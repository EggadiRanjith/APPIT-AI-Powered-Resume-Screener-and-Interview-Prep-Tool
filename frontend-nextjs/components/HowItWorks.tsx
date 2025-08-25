const steps = [
  {
    title: 'Upload Your Resume',
    description: 'Simply upload your resume in PDF or DOCX format to get started.',
    icon: '📄'
  },
  {
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your resume for key elements and improvements.',
    icon: '🤖'
  },
  {
    title: 'Get Detailed Feedback',
    description: 'Receive comprehensive feedback and specific improvement suggestions.',
    icon: '📊'
  },
  {
    title: 'Optimize & Apply',
    description: 'Implement the suggestions and increase your chances of success.',
    icon: '✨'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{step.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-100 transform translate-y-[-50%]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
