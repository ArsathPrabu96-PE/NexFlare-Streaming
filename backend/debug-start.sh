#!/bin/bash
echo "=== Environment Debug ==="
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "MONGODB_URI length: ${#MONGODB_URI}"
echo "MONGODB_URI first 30 chars: ${MONGODB_URI:0:30}..."
echo "=========================="

# Start the application
npm start