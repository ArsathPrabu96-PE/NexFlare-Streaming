'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-cyan-400">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
              <p>
                At NexFlare, we collect only the information necessary to provide you with 
                the best streaming experience. This includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email address for account creation and authentication</li>
                <li>User preferences and viewing history</li>
                <li>Device information for optimal video streaming</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
              <p>
                Your information helps us:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide personalized content recommendations</li>
                <li>Optimize streaming quality for your device</li>
                <li>Improve our platform and user experience</li>
                <li>Send important account and service updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal 
                information. Your data is encrypted and stored securely on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Third-Party Services</h2>
              <p>
                NexFlare may use third-party services for analytics and content delivery. 
                These services have their own privacy policies that govern their data practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us 
                through our support channels.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Last updated: October 10, 2025
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              href="/register" 
              className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              ← Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}