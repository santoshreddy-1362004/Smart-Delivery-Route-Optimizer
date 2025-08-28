# 🚚 Smart Delivery Route Optimizer

A full-stack web application that solves the **Traveling Salesman Problem (TSP)** using the **Held-Karp Dynamic Programming algorithm**. Built with **React** frontend and **Node.js/Express** backend, designed to work completely offline without any external APIs.

## ⚡ Quick Start

### For Local Development (Recommended)

```bash
# 1. Clone/navigate to project
cd Smart-Delivery-Route-Optimizer

# 2. Start Backend (Terminal 1)
cd backend
npm install
npm start
# ✅ Backend runs on http://localhost:5000

# 3. Start Frontend (Terminal 2)  
cd frontend
npm install
npm start
# ✅ Frontend runs on http://localhost:3000

# 4. Open http://localhost:3000 in your browser
```

### For Production Deployment (Vercel)

```bash
npm i -g vercel
vercel login
vercel
# ✅ Deploys to https://your-app.vercel.app
```

## ✨ Features

### Backend
- **Held-Karp Algorithm**: Exact TSP solution with O(n² × 2ⁿ) complexity
- **REST API**: Clean `/optimize-route` endpoint
- **Input Validation**: Comprehensive matrix validation
- **Error Handling**: Robust error handling and meaningful messages
- **Performance Limits**: Supports up to 15 cities for reasonable response times

### Frontend
- **Interactive Matrix Input**: Dynamic distance matrix entry
- **Real-time Validation**: Input validation with helpful feedback
- **Route Visualization**: Canvas-based visual representation
- **Sample Data**: Pre-loaded examples for quick testing
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Visual feedback during optimization
- ✅ Check CORS settings in `backend/server.js`
- ✅ Verify proxy configuration in `frontend/package.json`
- ✅ Check network tab in browser dev tools

**Matrix Input Issues:**
- ✅ Ensure diagonal elements are 0
- ✅ Matrix must be square (n×n)
- ✅ All values must be non-negative numbers
- ✅ Maximum size is 15×15 for performance

**Build Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For root-level React app
npm run build
```

**Vercel Deployment Issues:**
- ✅ Check function logs: `vercel logs [url]`
- ✅ Verify API routes start with `/api/`
- ✅ Ensure `api/package.json` has correct dependencies
- ✅ Test locally with `vercel dev`

## 🏆 Performance Notes

- **Algorithm Limits**: TSP is NP-hard; practical limit ~15 cities
- **Memory Usage**: O(n × 2ⁿ) space complexity requires careful memory management
- **Response Time**: Sub-second response for matrices up to 10×10
- **Browser Compatibility**: Modern browsers with Canvas support

## 🚀 Deployment*Held-Karp Algorithm**: Exact TSP solution with O(n² × 2ⁿ) complexity
- **REST API**: Clean `/optimize-route` endpoint
- **Input Validation**: Comprehensive matrix validation
- **Error Handling**: Robust error handling and meaningful messages
- **Performance Limits**: Supports up to 15 cities for reasonable response times

### Frontend
- **Interactive Matrix Input**: Dynamic distance matrix entry
- **Real-time Validation**: Input validation with helpful feedback
- **Route Visualization**: Canvas-based visual representation
- **Sample Data**: Pre-loaded examples for quick testing
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Visual feedback during optimization

## 🏗️ Project Structure

### Current Structure (Vercel-Ready)
```
Smart-Delivery-Route-Optimizer/
├── src/                        # React frontend components (root level)
│   ├── App.js                 # Main application component  
│   ├── components/            # React components
│   │   ├── MatrixInput.js     # Distance matrix input
│   │   ├── RouteResult.js     # Results display
│   │   └── RouteVisualizer.js # Route visualization
│   └── index.js               # React entry point
├── public/                     # Static files (root level)
│   └── index.html             # Main HTML file
├── package.json                # React app dependencies (root level)
├── api/                        # Vercel serverless functions
│   ├── optimize-route.js      # TSP solver API endpoint
│   ├── health.js              # Health check endpoint
│   ├── tspSolver.js           # TSP algorithm implementation
│   └── package.json           # API dependencies
├── backend/                    # Original backend (for local dev)
│   ├── server.js              # Express server
│   ├── tspSolver.js           # TSP algorithm
│   └── package.json           # Backend dependencies
├── frontend/                   # Original frontend (reference)
├── vercel.json                 # Vercel deployment config
├── .vercelignore              # Deployment ignore file
├── DEPLOYMENT.md              # Deployment instructions
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

### Local Development Options

#### Option 1: Full-Stack Development (Recommended)

**Backend Setup (Terminal 1):**
```bash
cd backend
npm install
npm start
```
✅ Backend runs on `http://localhost:5000`

**Frontend Setup (Terminal 2):**
```bash
cd frontend
npm install
npm start
```
✅ Frontend runs on `http://localhost:3000`

**Access:** Open `http://localhost:3000` in your browser

#### Option 2: Root-Level React Development

If you want to run the React app from the project root:

```bash
# Install dependencies
npm install

# Start development server
npm start
```
✅ App runs on `http://localhost:3000`

*Note: You'll need to run the backend separately for API functionality*

#### Option 3: Vercel Development (Production Simulation)

```bash
# Install Vercel CLI
npm i -g vercel

# Login (first time only)
vercel login

# Start local development server
vercel dev
```
✅ Full app with serverless functions on `http://localhost:3000`

## 📊 Usage Example

### Web Interface
1. Open the application in your browser
2. Enter a distance matrix or use sample data
3. Click "Optimize Route" 
4. View the optimal route and visualization

### API Testing (Backend)
Test the backend API directly:

```bash
curl -X POST http://localhost:5000/optimize-route \
  -H "Content-Type: application/json" \
  -d '{
    "matrix": [
      [0, 5, 9, 10],
      [5, 0, 6, 7],
      [9, 6, 0, 8],
      [10, 7, 8, 0]
    ]
  }'
```

**Expected Response:**
```json
{
  "route": [0, 1, 2, 3, 0],
  "distance": 28,
  "cities": 4,
  "algorithm": "Held-Karp Dynamic Programming"
}
```

### Web Interface Usage
1. **Enter Matrix Size**: Choose number of cities (2-10)
2. **Fill Distance Matrix**: Enter distances between cities
3. **Load Sample**: Use pre-loaded sample data for quick testing
4. **Optimize Route**: Click the optimize button
5. **View Results**: See the optimal route and total distance
6. **Visualize**: View the route on the interactive graph

## 🧮 Algorithm Details

### Held-Karp Dynamic Programming Algorithm

The implementation uses the Held-Karp algorithm, which:

1. **Uses Bitmasks**: Represents visited cities as binary numbers
2. **Dynamic Programming**: `dp[mask][i]` = minimum cost to visit cities in `mask` ending at city `i`
3. **Optimal Substructure**: Builds solution from smaller subproblems
4. **Exact Solution**: Guarantees the globally optimal route

**Time Complexity**: O(n² × 2ⁿ)  
**Space Complexity**: O(n × 2ⁿ)

### Input Constraints
- Distance matrix must be square (n×n)
- Diagonal elements must be 0 (distance from city to itself)
- All distances must be non-negative
- Maximum 15 cities supported for performance

## 🧪 Testing

### Automated Tests
```bash
# Backend unit tests
cd backend
npm test
```

### Manual Testing Examples

**API Testing (if running backend locally):**
1. **Small Instance (3 cities)**:
   ```
   [0, 2, 9]
   [2, 0, 6]
   [9, 6, 0]
   ```
   Expected: Route [0, 1, 2, 0] with distance 17

2. **Example Instance (4 cities)**:
   ```
   [0, 5, 9, 10]
   [5, 0, 6, 7]
   [9, 6, 0, 8]
   [10, 7, 8, 0]
   ```
   Expected: Optimal route with distance ≤ 30

## 🎨 Frontend Components

### MatrixInput
- Dynamic matrix size selector
- Interactive distance table
- Symmetric entry (auto-fills mirror values)
- Sample data loading
- Real-time validation

### RouteResult
- Optimization results display
- Route breakdown by segments
- Algorithm information
- Performance metrics

### RouteVisualizer
- HTML5 Canvas visualization
- Cities arranged in circle
- Route paths with direction arrows
- Color-coded legend

## 🔧 Configuration & Setup

### Development Environment

**Backend Configuration:**
- **Port**: 5000 (configurable via `PORT` environment variable)
- **CORS**: Enabled for frontend communication  
- **Body Limit**: 10MB for large matrices
- **Hot Reload**: `nodemon` for development

**Frontend Configuration:**
- **Development Port**: 3000
- **Proxy**: Configured to proxy API requests to backend (in `frontend/`)
- **Build Output**: `build/` directory for production
- **Hot Reload**: React development server

**Root-Level React App:**
- **Port**: 3000 (when run from project root)
- **API Endpoints**: Configured for both development and production
- **Build**: Same React build process

### Production (Vercel)

**Serverless Functions:**
- **API Routes**: `/api/optimize-route`, `/api/health`
- **Runtime**: Node.js 18.x
- **CORS**: Configured for all origins
- **Timeout**: 10 seconds (Hobby plan)

**Static Files:**
- **React Build**: Served from root
- **CDN**: Global edge network
- **Routing**: Handled by `vercel.json`

### File Structure Notes

- **Original Structure**: `frontend/` and `backend/` directories (preserved)
- **Vercel Structure**: Root-level React app with `api/` functions
- **Flexible**: Both structures work depending on development preference

## 🌟 Key Features Implemented

✅ **Exact TSP Solution**: Held-Karp algorithm implementation  
✅ **REST API**: Clean POST endpoint for route optimization  
✅ **Matrix Validation**: Comprehensive input validation  
✅ **Interactive UI**: Dynamic matrix input with validation  
✅ **Route Visualization**: Canvas-based graph visualization  
✅ **Sample Data**: Pre-loaded examples for testing  
✅ **Responsive Design**: Mobile-friendly interface  
✅ **Error Handling**: User-friendly error messages  
✅ **Performance Limits**: Reasonable limits for web usage  
✅ **No External APIs**: Works completely offline  
✅ **Vercel Deploy**: Production-ready serverless deployment
✅ **MIT License**: Open source with permissive license

## 📝 API Documentation

### POST /optimize-route (or /api/optimize-route in production)

**Request Body:**
```json
{
  "matrix": [
    [0, 5, 9, 10],
    [5, 0, 6, 7],
    [9, 6, 0, 8],
    [10, 7, 8, 0]
  ]
}
```

**Response:**
```json
{
  "route": [0, 1, 2, 3, 0],
  "distance": 28,
  "cities": 4,
  "algorithm": "Held-Karp Dynamic Programming"
}
```

**Error Responses:**
- `400`: Invalid matrix or missing required fields
- `500`: Internal server error

### GET /health
Health check endpoint returning server status.

## 🛠️ Development

### Project Setup for Development
1. Install dependencies for both frontend and backend
2. Run backend on port 5000
3. Run frontend on port 3000 (with proxy to backend)
4. Both servers support hot reloading

### Code Structure
- **Clean Separation**: Frontend and backend are completely separate
- **Modular Components**: React components are modular and reusable
- **Algorithm Isolation**: TSP solver is in its own module with tests
- **Error Boundaries**: Proper error handling at all levels

## 🏆 Performance Notes

- **Algorithm Limits**: TSP is NP-hard; practical limit ~15 cities
- **Memory Usage**: O(n × 2ⁿ) space complexity requires careful memory management
- **Response Time**: Sub-second response for matrices up to 10×10
- **Browser Compatibility**: Modern browsers with Canvas support

## � Deployment

### Vercel (Recommended)

This project is configured for easy deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel
```

The project includes:
- Pre-configured `vercel.json` for routing
- Serverless API functions in `/api/` directory  
- Optimized React build configuration
- CORS handling for production

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Other Platforms

The app can also be deployed on:
- **Netlify**: Upload `build/` folder + configure redirects for API
- **Heroku**: Deploy backend separately, configure frontend API URLs
- **AWS/GCP**: Use serverless functions + static hosting

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

