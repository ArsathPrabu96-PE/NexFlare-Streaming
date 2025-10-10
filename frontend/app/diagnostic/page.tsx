'use client'

import { useState } from 'react'

export default function DiagnosticPage() {
  const [testResult, setTestResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testBackendConnection = async () => {
    setIsLoading(true)
    setTestResult('Testing backend connection...')
    
    try {
      // Test 1: Basic connectivity
      const response = await fetch('https://nexflare-backend.onrender.com', {
        method: 'GET',
        mode: 'cors'
      })
      
      setTestResult(prev => prev + `\n✅ Backend reachable: ${response.status}`)
      
      // Test 2: API health check
      try {
        const healthResponse = await fetch('https://nexflare-backend.onrender.com/api/health', {
          method: 'GET',
          mode: 'cors'
        })
        setTestResult(prev => prev + `\n✅ Health check: ${healthResponse.status}`)
      } catch (healthError) {
        setTestResult(prev => prev + `\n❌ Health check failed: ${healthError}`)
      }
      
      // Test 3: Registration endpoint
      try {
        const regResponse = await fetch('https://nexflare-backend.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpass123',
            name: 'Test User'
          })
        })
        
        const regData = await regResponse.text()
        setTestResult(prev => prev + `\n✅ Registration test: ${regResponse.status} - ${regData.substring(0, 100)}`)
        
      } catch (regError) {
        setTestResult(prev => prev + `\n❌ Registration test failed: ${regError}`)
      }
      
    } catch (error) {
      setTestResult(prev => prev + `\n❌ Backend connection failed: ${error}`)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Backend Diagnostic Tool
        </h1>
        
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          <button
            onClick={testBackendConnection}
            disabled={isLoading}
            className="w-full mb-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Backend Connection'}
          </button>
          
          {testResult && (
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-green-400 font-bold mb-2">Test Results:</h3>
              <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                {testResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}