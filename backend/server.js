const express = require('express');
const cors = require('cors');
const TSPSolver = require('./tspSolver');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Smart Delivery Route Optimizer API',
    version: '1.0.0',
    endpoints: {
      'POST /optimize-route': 'Optimize delivery route using TSP algorithm'
    }
  });
});

app.post('/optimize-route', (req, res) => {
  try {
    const { matrix } = req.body;

    // Validate input
    if (!matrix) {
      return res.status(400).json({
        error: 'Missing required field: matrix',
        message: 'Please provide a distance matrix'
      });
    }

    if (!TSPSolver.validateMatrix(matrix)) {
      return res.status(400).json({
        error: 'Invalid distance matrix',
        message: 'Matrix must be square, have zero diagonal, and non-negative distances'
      });
    }

    // Check matrix size (limit for performance)
    if (matrix.length > 15) {
      return res.status(400).json({
        error: 'Matrix too large',
        message: 'Maximum supported matrix size is 15x15 due to computational complexity'
      });
    }

    // Solve TSP
    const solver = new TSPSolver(matrix);
    const result = solver.solve();

    // Log the request for debugging
    console.log(`TSP solved for ${matrix.length} cities. Route: [${result.route.join(', ')}], Distance: ${result.distance}`);

    res.json({
      route: result.route,
      distance: result.distance,
      cities: matrix.length,
      algorithm: 'Held-Karp Dynamic Programming'
    });

  } catch (error) {
    console.error('Error solving TSP:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to optimize route. Please check your input and try again.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Route Optimizer Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
