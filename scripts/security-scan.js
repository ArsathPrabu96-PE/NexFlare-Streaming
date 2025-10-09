const axios = require('axios');

const API_URL = 'http://localhost:5000';

class SecurityScanner {
  constructor() {
    this.vulnerabilities = [];
  }

  async testSQLInjection() {
    const payloads = ["'; DROP TABLE users; --", "' OR '1'='1", "admin'--"];
    
    for (const payload of payloads) {
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email: payload,
          password: 'test'
        });
        
        if (response.status === 200) {
          this.vulnerabilities.push({
            type: 'SQL Injection',
            severity: 'HIGH',
            payload: payload,
            endpoint: '/api/auth/login'
          });
        }
      } catch (error) {
        // Expected behavior
      }
    }
  }

  async testXSS() {
    const payloads = [
      '<script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '<img src=x onerror=alert("XSS")>'
    ];
    
    for (const payload of payloads) {
      try {
        await axios.post(`${API_URL}/api/auth/register`, {
          email: 'test@example.com',
          password: 'password123',
          name: payload
        });
        
        this.vulnerabilities.push({
          type: 'XSS',
          severity: 'MEDIUM',
          payload: payload,
          endpoint: '/api/auth/register'
        });
      } catch (error) {
        // Expected behavior
      }
    }
  }

  async testRateLimiting() {
    const requests = [];
    
    for (let i = 0; i < 150; i++) {
      requests.push(
        axios.get(`${API_URL}/api/videos`).catch(() => null)
      );
    }
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r && r.status === 429);
    
    if (rateLimited.length === 0) {
      this.vulnerabilities.push({
        type: 'Rate Limiting',
        severity: 'MEDIUM',
        description: 'No rate limiting detected',
        endpoint: '/api/videos'
      });
    }
  }

  async testAuthBypass() {
    try {
      const response = await axios.get(`${API_URL}/api/users/profile`);
      
      if (response.status === 200) {
        this.vulnerabilities.push({
          type: 'Authentication Bypass',
          severity: 'HIGH',
          description: 'Protected endpoint accessible without token',
          endpoint: '/api/users/profile'
        });
      }
    } catch (error) {
      // Expected behavior
    }
  }

  async runScan() {
    console.log('Starting security scan...');
    
    await this.testSQLInjection();
    await this.testXSS();
    await this.testRateLimiting();
    await this.testAuthBypass();
    
    this.printResults();
  }

  printResults() {
    console.log('\n=== Security Scan Results ===');
    
    if (this.vulnerabilities.length === 0) {
      console.log('✅ No vulnerabilities detected');
      return;
    }
    
    this.vulnerabilities.forEach((vuln, index) => {
      console.log(`\n${index + 1}. ${vuln.type} (${vuln.severity})`);
      console.log(`   Endpoint: ${vuln.endpoint}`);
      if (vuln.payload) console.log(`   Payload: ${vuln.payload}`);
      if (vuln.description) console.log(`   Description: ${vuln.description}`);
    });
    
    console.log(`\nTotal vulnerabilities found: ${this.vulnerabilities.length}`);
  }
}

new SecurityScanner().runScan();