#!/bin/bash

# Smart Delivery Route Optimizer - Development Setup Script

echo "🚚 Smart Delivery Route Optimizer Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Setup backend
echo ""
echo "📦 Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

# Test backend
echo "🧪 Testing backend setup..."
if node -e "require('./tspSolver.js'); console.log('TSP Solver module loaded successfully')"; then
    echo "✅ Backend setup successful"
else
    echo "❌ Backend setup failed"
    exit 1
fi

cd ..

# Setup frontend
echo ""
echo "🎨 Setting up frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

echo "✅ Frontend setup successful"
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "1. Start backend:  cd backend && npm start"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:5000"
