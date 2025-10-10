'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Title with Graphical Design */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Terms of Service
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
              <div className="text-2xl">📋</div>
              <div className="h-1 w-16 bg-gradient-to-l from-purple-500 to-transparent rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">🎯</span>
                  Acceptance of Terms
                </h2>
                <p className="text-lg leading-relaxed">
                  By accessing and using NexFlare streaming platform, you accept and agree to be bound by the terms 
                  and provision of this agreement. These Terms of Service govern your use of our platform and services.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">🔐</span>
                  User Accounts
                </h2>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One account per person; sharing accounts is prohibited</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">🎬</span>
                  Content Usage
                </h2>
                <div className="space-y-4 text-lg">
                  <p>
                    <strong className="text-cyan-400">Permitted Use:</strong> You may stream content for personal, 
                    non-commercial use only. Content is provided for your entertainment and educational purposes.
                  </p>
                  <p>
                    <strong className="text-red-400">Prohibited Activities:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Downloading, copying, or redistributing content</li>
                    <li>Using automated systems to access our services</li>
                    <li>Attempting to circumvent security measures</li>
                    <li>Sharing your account with others</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">💳</span>
                  Subscription and Billing
                </h2>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                  <li>We may change subscription fees with 30 days advance notice</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>You may cancel your subscription at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">🚫</span>
                  Termination
                </h2>
                <p className="text-lg leading-relaxed">
                  We reserve the right to terminate or suspend your account immediately, without prior notice, 
                  for conduct that we believe violates these Terms of Service or is harmful to other users, 
                  us, or third parties.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">⚖️</span>
                  Limitation of Liability
                </h2>
                <p className="text-lg leading-relaxed">
                  NexFlare shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  <span className="mr-3">📞</span>
                  Contact Information
                </h2>
                <p className="text-lg leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us through our 
                  support channels available in the application.
                </p>
              </section>

              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="mr-2">📅</span>
                  Last updated: October 10, 2025
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link 
                href="/register" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="mr-2">👤</span>
                Create Account
              </Link>
              <Link 
                href="/privacy" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="mr-2">🔒</span>
                Privacy Policy
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span className="mr-2">🏠</span>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}