// Quick test of TSPSolver in Node.js environment
import TSPSolver from './api/tspSolver.js';

const testMatrix = [
  [0, 5, 9, 10],
  [5, 0, 6, 7],
  [9, 6, 0, 8],
  [10, 7, 8, 0]
];

console.log('Testing TSPSolver...');

try {
  const solver = new TSPSolver(testMatrix);
  const result = solver.solve();
  console.log('Success!', result);
} catch (error) {
  console.error('Error:', error);
}
