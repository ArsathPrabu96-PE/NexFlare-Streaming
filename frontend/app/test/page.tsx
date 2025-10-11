export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🧪 Test Page - Version 2.2.0
        </h1>
        <p className="text-gray-300">
          This page verifies that the deployment is working correctly.
        </p>
        <div className="mt-8 space-y-2">
          <p className="text-green-400">✅ Next.js App Router</p>
          <p className="text-green-400">✅ React Components</p>
          <p className="text-green-400">✅ Tailwind CSS</p>
          <p className="text-blue-400">🚀 Deployment Status: Active</p>
        </div>
      </div>
    </div>
  )
}