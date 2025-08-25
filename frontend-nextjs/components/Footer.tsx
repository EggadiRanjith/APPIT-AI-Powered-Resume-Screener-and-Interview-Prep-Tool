export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              ResumeAI
            </h3>
            <p className="text-gray-400 pr-4">
              Transform your job search with AI-powered resume analysis and interview preparation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              {['Features', 'Pricing', 'Enterprise', 'Security'].map(item => (
                <li key={item} className="hover:text-white transition-colors">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              {['Documentation', 'API Reference', 'Blog', 'Support'].map(item => (
                <li key={item} className="hover:text-white transition-colors">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy'].map(item => (
                <li key={item} className="hover:text-white transition-colors">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ResumeAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
              <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
