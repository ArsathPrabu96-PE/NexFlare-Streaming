import React, { useState } from 'react';

const CORSTestPage = () => {
  const [results, setResults] = useState('');

  const testHealth = async () => {
    try {
      const response = await fetch('https://nexflare-backend.onrender.com/api/health');
      const data = await response.json();
      setResults('Health Test Success:\n' + JSON.stringify(data, null, 2));
    } catch (error) {
      setResults('Health Test Error:\n' + error.message);
    }
  };

  const testRegistration = async () => {
    try {
      const response = await fetch('https://nexflare-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'testpassword123'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults('Registration Test Success:\n' + JSON.stringify(data, null, 2));
      } else {
        const errorData = await response.text();
        setResults('Registration Test Error Response:\n' + errorData);
      }
    } catch (error) {
      setResults('Registration Test Error:\n' + error.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CORS Test for NexFlare Backend</h1>
      
      <div className="space-x-4 mb-6">
        <button 
          onClick={testHealth}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Health Endpoint
        </button>
        <button 
          onClick={testRegistration}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Registration CORS
        </button>
      </div>
      
      {results && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Results:</h3>
          <pre className="whitespace-pre-wrap text-sm">{results}</pre>
        </div>
      )}
    </div>
  );
};

export default CORSTestPage;