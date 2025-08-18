/**
 * Held-Karp Dynamic Programming Algorithm for TSP
 * Time Complexity: O(n^2 * 2^n)
 * Space Complexity: O(n * 2^n)
 */
class TSPSolver {
  constructor(distanceMatrix) {
    this.matrix = distanceMatrix;
    this.n = distanceMatrix.length;
    this.memo = new Map();
  }

  /**
   * Solve TSP using Held-Karp algorithm
   * @returns {Object} - { route: number[], distance: number }
   */
  solve() {
    if (this.n <= 1) {
      return { route: [0], distance: 0 };
    }

    if (this.n === 2) {
      return { 
        route: [0, 1, 0], 
        distance: this.matrix[0][1] + this.matrix[1][0] 
      };
    }

    // Initialize: start from city 0, visit all other cities
    const allCities = (1 << this.n) - 1; // All bits set
    const visited = 1; // Only city 0 visited initially

    // Find minimum cost to visit all cities and return to start
    const { cost, parent } = this.tsp(0, allCities ^ visited);
    const totalCost = cost + this.matrix[this.getLastCity(parent, allCities ^ visited)][0];

    // Reconstruct the optimal route
    const route = this.reconstructPath(0, allCities ^ visited, parent);
    route.push(0); // Return to start

    return {
      route: route,
      distance: totalCost
    };
  }

  /**
   * Recursive function with memoization
   * @param {number} currentCity - Current city index
   * @param {number} remainingCities - Bitmask of remaining cities to visit
   * @returns {Object} - { cost: number, parent: Map }
   */
  tsp(currentCity, remainingCities) {
    // Base case: no more cities to visit
    if (remainingCities === 0) {
      return { 
        cost: this.matrix[currentCity][0], 
        parent: new Map() 
      };
    }

    // Check memoization
    const key = `${currentCity}-${remainingCities}`;
    if (this.memo.has(key)) {
      return this.memo.get(key);
    }

    let minCost = Infinity;
    let bestParent = new Map();
    let bestNextCity = -1;

    // Try visiting each remaining city
    for (let nextCity = 0; nextCity < this.n; nextCity++) {
      if (remainingCities & (1 << nextCity)) {
        const newRemaining = remainingCities ^ (1 << nextCity);
        const subResult = this.tsp(nextCity, newRemaining);
        const totalCost = this.matrix[currentCity][nextCity] + subResult.cost;

        if (totalCost < minCost) {
          minCost = totalCost;
          bestParent = new Map(subResult.parent);
          bestNextCity = nextCity;
        }
      }
    }

    // Store the best next city for path reconstruction
    bestParent.set(`${currentCity}-${remainingCities}`, bestNextCity);

    const result = { cost: minCost, parent: bestParent };
    this.memo.set(key, result);
    return result;
  }

  /**
   * Reconstruct the optimal path from the parent map
   */
  reconstructPath(startCity, remainingCities, parent) {
    const path = [startCity];
    let currentCity = startCity;
    let remaining = remainingCities;

    while (remaining !== 0) {
      const key = `${currentCity}-${remaining}`;
      const nextCity = parent.get(key);
      if (nextCity === undefined) break;
      
      path.push(nextCity);
      remaining ^= (1 << nextCity);
      currentCity = nextCity;
    }

    return path;
  }

  /**
   * Get the last city from the parent map for a given state
   */
  getLastCity(parent, remainingCities) {
    // Find the city that leads to the empty set
    for (let city = 0; city < this.n; city++) {
      const key = `${city}-0`;
      if (parent.has(key)) {
        continue;
      }
      // This is a bit complex, let's use a simpler approach
      if (remainingCities & (1 << city)) {
        const newRemaining = remainingCities ^ (1 << city);
        if (newRemaining === 0) {
          return city;
        }
      }
    }
    return 0; // Fallback
  }

  /**
   * Validate distance matrix
   * @param {number[][]} matrix 
   * @returns {boolean}
   */
  static validateMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      return false;
    }

    const n = matrix.length;
    
    // Check if matrix is square
    for (let i = 0; i < n; i++) {
      if (!Array.isArray(matrix[i]) || matrix[i].length !== n) {
        return false;
      }
      
      // Check diagonal is zero
      if (matrix[i][i] !== 0) {
        return false;
      }
      
      // Check for negative distances
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] < 0) {
          return false;
        }
      }
    }
    
    return true;
  }
}

module.exports = TSPSolver;
