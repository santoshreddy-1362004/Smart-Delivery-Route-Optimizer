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
      return { cost: 0, parent: new Map() };
    }

    // Check memoization
    const key = `${currentCity}-${remainingCities}`;
    if (this.memo.has(key)) {
      return this.memo.get(key);
    }

    let minCost = Infinity;
    let bestParent = new Map();

    // Try visiting each remaining city
    for (let nextCity = 0; nextCity < this.n; nextCity++) {
      if (remainingCities & (1 << nextCity)) {
        const newRemaining = remainingCities ^ (1 << nextCity);
        const { cost, parent } = this.tsp(nextCity, newRemaining);
        const totalCost = this.matrix[currentCity][nextCity] + cost;

        if (totalCost < minCost) {
          minCost = totalCost;
          bestParent = new Map(parent);
          bestParent.set(`${currentCity}-${remainingCities}`, nextCity);
        }
      }
    }

    const result = { cost: minCost, parent: bestParent };
    this.memo.set(key, result);
    return result;
  }

  /**
   * Reconstruct the optimal path from parent pointers
   * @param {number} start - Starting city
   * @param {number} remainingCities - Initial remaining cities bitmask
   * @param {Map} parent - Parent pointers from TSP solution
   * @returns {number[]} - Optimal route
   */
  reconstructPath(start, remainingCities, parent) {
    const path = [start];
    let currentCity = start;
    let remaining = remainingCities;

    while (remaining !== 0) {
      const key = `${currentCity}-${remaining}`;
      if (!parent.has(key)) {
        console.error('Parent key not found:', key);
        break;
      }
      
      const nextCity = parent.get(key);
      path.push(nextCity);
      remaining = remaining ^ (1 << nextCity);
      currentCity = nextCity;
    }

    return path;
  }

  /**
   * Helper function to get the last city in the optimal tour
   * @param {Map} parent - Parent pointers
   * @param {number} remainingCities - Remaining cities bitmask
   * @returns {number} - Last city index
   */
  getLastCity(parent, remainingCities) {
    // This is a simplified approach - in practice, we track this during reconstruction
    let current = 0;
    let remaining = remainingCities;
    
    while (remaining !== 0) {
      const key = `${current}-${remaining}`;
      if (!parent.has(key)) break;
      
      const next = parent.get(key);
      remaining = remaining ^ (1 << next);
      current = next;
    }
    
    return current;
  }

  /**
   * Alternative simpler approach for getting last city
   */
  getLastCitySimple(parent, remainingCities) {
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

export default TSPSolver;
