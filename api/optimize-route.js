import TSPSolver from './tspSolver.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

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
}
