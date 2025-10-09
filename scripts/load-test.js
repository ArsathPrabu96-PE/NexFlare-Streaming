const http = require('http');

const API_URL = 'http://localhost:5000';
const CONCURRENT_USERS = 50;
const TEST_DURATION = 30000;

class LoadTester {
  constructor() {
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      responseTimes: []
    };
  }

  async makeRequest(path) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const req = http.get(`${API_URL}${path}`, (res) => {
        const responseTime = Date.now() - startTime;
        this.results.totalRequests++;
        this.results.responseTimes.push(responseTime);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.results.successfulRequests++;
        } else {
          this.results.failedRequests++;
        }
        resolve();
      });

      req.on('error', () => {
        this.results.totalRequests++;
        this.results.failedRequests++;
        resolve();
      });
    });
  }

  async runTest() {
    console.log(`Load testing ${CONCURRENT_USERS} users for ${TEST_DURATION/1000}s`);
    
    const promises = [];
    for (let i = 0; i < CONCURRENT_USERS; i++) {
      promises.push(this.simulateUser());
    }

    await Promise.all(promises);
    this.printResults();
  }

  async simulateUser() {
    const endpoints = ['/api/videos', '/health'];
    const endTime = Date.now() + TEST_DURATION;
    
    while (Date.now() < endTime) {
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      await this.makeRequest(endpoint);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  printResults() {
    const avgTime = this.results.responseTimes.reduce((a, b) => a + b, 0) / this.results.responseTimes.length;
    const successRate = (this.results.successfulRequests / this.results.totalRequests) * 100;

    console.log('\n=== Results ===');
    console.log(`Total: ${this.results.totalRequests}`);
    console.log(`Success: ${this.results.successfulRequests}`);
    console.log(`Failed: ${this.results.failedRequests}`);
    console.log(`Success Rate: ${successRate.toFixed(2)}%`);
    console.log(`Avg Response: ${avgTime.toFixed(2)}ms`);
  }
}

new LoadTester().runTest();