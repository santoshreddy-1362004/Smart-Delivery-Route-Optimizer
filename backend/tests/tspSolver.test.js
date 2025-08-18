const TSPSolver = require('../tspSolver');

describe('TSPSolver', () => {
  describe('validateMatrix', () => {
    test('should validate correct matrix', () => {
      const matrix = [
        [0, 1, 2],
        [1, 0, 3],
        [2, 3, 0]
      ];
      expect(TSPSolver.validateMatrix(matrix)).toBe(true);
    });

    test('should reject non-square matrix', () => {
      const matrix = [
        [0, 1],
        [1, 0, 3]
      ];
      expect(TSPSolver.validateMatrix(matrix)).toBe(false);
    });

    test('should reject matrix with non-zero diagonal', () => {
      const matrix = [
        [1, 1, 2],
        [1, 0, 3],
        [2, 3, 0]
      ];
      expect(TSPSolver.validateMatrix(matrix)).toBe(false);
    });

    test('should reject matrix with negative distances', () => {
      const matrix = [
        [0, -1, 2],
        [1, 0, 3],
        [2, 3, 0]
      ];
      expect(TSPSolver.validateMatrix(matrix)).toBe(false);
    });
  });

  describe('solve', () => {
    test('should solve 2-city TSP', () => {
      const matrix = [
        [0, 5],
        [3, 0]
      ];
      const solver = new TSPSolver(matrix);
      const result = solver.solve();
      
      expect(result.route).toEqual([0, 1, 0]);
      expect(result.distance).toBe(8); // 5 + 3
    });

    test('should solve 3-city TSP', () => {
      const matrix = [
        [0, 1, 4],
        [1, 0, 2],
        [4, 2, 0]
      ];
      const solver = new TSPSolver(matrix);
      const result = solver.solve();
      
      expect(result.route).toHaveLength(4); // Start + 2 cities + return
      expect(result.route[0]).toBe(0); // Start at city 0
      expect(result.route[result.route.length - 1]).toBe(0); // End at city 0
      expect(result.distance).toBe(7); // Optimal: 0->1->2->0 = 1+2+4 = 7
    });

    test('should solve 4-city TSP example from requirements', () => {
      const matrix = [
        [0, 5, 9, 10],
        [5, 0, 6, 7],
        [9, 6, 0, 8],
        [10, 7, 8, 0]
      ];
      const solver = new TSPSolver(matrix);
      const result = solver.solve();
      
      expect(result.route).toHaveLength(5); // 4 cities + return
      expect(result.route[0]).toBe(0);
      expect(result.route[4]).toBe(0);
      expect(result.distance).toBeLessThanOrEqual(30); // Should find optimal solution
    });

    test('should handle single city', () => {
      const matrix = [[0]];
      const solver = new TSPSolver(matrix);
      const result = solver.solve();
      
      expect(result.route).toEqual([0]);
      expect(result.distance).toBe(0);
    });
  });
});
