# 🚚 Smart Delivery Route Optimizer

A full-stack web application that solves the **Traveling Salesman Problem (TSP)** using the **Held-Karp Dynamic Programming algorithm**. Built with **React** frontend and **Node.js/Express** backend, designed to work completely offline without any external APIs.

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

## 🏗️ Project Structure

```
Smart-Delivery-Route-Optimizer/
├── backend/                    # Node.js + Express API
│   ├── server.js              # Main server file
│   ├── tspSolver.js           # Held-Karp TSP algorithm implementation
│   ├── package.json           # Backend dependencies
│   ├── tests/                 # Unit tests
│   └── README.md              # Backend documentation
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── App.js            # Main application component
│   │   ├── components/       # React components
│   │   │   ├── MatrixInput.js # Distance matrix input
│   │   │   ├── RouteResult.js # Results display
│   │   │   └── RouteVisualizer.js # Route visualization
│   │   └── index.js          # React entry point
│   ├── public/               # Static files
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend documentation
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Setup

1. **Clone or navigate to the project directory**

2. **Backend Setup:**
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:5000`

3. **Frontend Setup (in a new terminal):**
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

4. **Access the application:**
Open your browser and go to `http://localhost:3000`

## 📊 Usage Example

### API Testing
You can test the backend API directly:

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

### Backend Tests
```bash
cd backend
npm test
```

### Manual Testing
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

## 🔧 Configuration

### Backend Configuration
- **Port**: 5000 (configurable via PORT environment variable)
- **CORS**: Enabled for frontend communication
- **Body Limit**: 10MB for large matrices

### Frontend Configuration
- **Proxy**: Configured to proxy API requests to backend
- **Build**: Optimized production build available

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

## 📝 API Documentation

### POST /optimize-route

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

