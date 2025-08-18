# Backend - Route Optimizer API

This is the backend service for the Smart Delivery Route Optimizer that implements the Traveling Salesman Problem (TSP) using the Held-Karp Dynamic Programming algorithm.

## Features

- **Held-Karp Algorithm**: Exact solution for TSP with O(n² × 2ⁿ) time complexity
- **REST API**: Clean API endpoint for route optimization
- **Input Validation**: Comprehensive validation of distance matrices
- **Error Handling**: Robust error handling and meaningful error messages
- **Performance Limits**: Supports matrices up to 15×15 for reasonable response times

## API Endpoints

### POST /optimize-route

Optimizes a delivery route given a distance matrix.

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

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-18T10:30:00.000Z"
}
```

## Installation & Usage

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

The server will run on `http://localhost:5000` by default.

## Algorithm Details

The Held-Karp algorithm uses dynamic programming with bitmasks to solve TSP exactly:

1. **State**: `dp[mask][i]` = minimum cost to visit cities in `mask` ending at city `i`
2. **Transition**: Try all unvisited cities as the next destination
3. **Base Case**: Single city with cost to return to start
4. **Result**: Minimum among all ways to visit all cities and return to start

**Time Complexity**: O(n² × 2ⁿ)  
**Space Complexity**: O(n × 2ⁿ)

## Input Requirements

- Distance matrix must be square (n×n)
- Diagonal elements must be 0 (distance from city to itself)
- All distances must be non-negative
- Matrix size is limited to 15×15 for performance reasons
