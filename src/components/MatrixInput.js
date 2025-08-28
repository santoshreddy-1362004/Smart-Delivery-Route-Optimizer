import React, { useState } from 'react';
import './MatrixInput.css';

const MatrixInput = ({ onOptimize, loading, onClear }) => {
  const [size, setSize] = useState(4);
  const [matrix, setMatrix] = useState([
    [0, 5, 9, 10],
    [5, 0, 6, 7],
    [9, 6, 0, 8],
    [10, 7, 8, 0]
  ]);

  const initializeMatrix = (newSize) => {
    const newMatrix = Array(newSize).fill().map(() => Array(newSize).fill(0));
    
    // Copy existing values where possible
    for (let i = 0; i < Math.min(newSize, matrix.length); i++) {
      for (let j = 0; j < Math.min(newSize, matrix.length); j++) {
        if (i < matrix.length && j < matrix[i].length) {
          newMatrix[i][j] = matrix[i][j];
        }
      }
    }
    
    return newMatrix;
  };

  const handleSizeChange = (newSize) => {
    if (newSize >= 2 && newSize <= 10) {
      setSize(newSize);
      setMatrix(initializeMatrix(newSize));
    }
  };

  const handleMatrixChange = (row, col, value) => {
    const numValue = parseFloat(value) || 0;
    const newMatrix = [...matrix];
    newMatrix[row][col] = numValue;
    
    // Auto-fill symmetric value if not on diagonal
    if (row !== col) {
      newMatrix[col][row] = numValue;
    }
    
    setMatrix(newMatrix);
  };

  const loadSampleData = () => {
    const samples = {
      3: [
        [0, 2, 9],
        [2, 0, 6],
        [9, 6, 0]
      ],
      4: [
        [0, 5, 9, 10],
        [5, 0, 6, 7],
        [9, 6, 0, 8],
        [10, 7, 8, 0]
      ],
      5: [
        [0, 2, 9, 10, 7],
        [2, 0, 6, 4, 8],
        [9, 6, 0, 8, 3],
        [10, 4, 8, 0, 5],
        [7, 8, 3, 5, 0]
      ]
    };
    
    if (samples[size]) {
      setMatrix(samples[size]);
    }
  };

  const clearMatrix = () => {
    setMatrix(Array(size).fill().map(() => Array(size).fill(0)));
    onClear();
  };

  const isValidMatrix = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] < 0) return false;
        if (i === j && matrix[i][j] !== 0) return false;
      }
    }
    return true;
  };

  const handleOptimize = () => {
    if (isValidMatrix()) {
      onOptimize(matrix);
    }
  };

  return (
    <div className="matrix-input">
      <h2>📍 Enter Distance Matrix</h2>
      
      <div className="controls">
        <div className="size-control">
          <label htmlFor="size-input">Number of locations:</label>
          <input
            id="size-input"
            type="number"
            min="2"
            max="10"
            value={size}
            onChange={(e) => handleSizeChange(parseInt(e.target.value))}
            disabled={loading}
          />
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={loadSampleData}
            disabled={loading}
            className="secondary-button"
          >
            Load Sample
          </button>
          <button 
            onClick={clearMatrix}
            disabled={loading}
            className="secondary-button"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="matrix-container">
        <table className="distance-matrix">
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: size }, (_, i) => (
                <th key={i}>City {i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <th>City {i}</th>
                {row.map((cell, j) => (
                  <td key={j} className={i === j ? 'diagonal' : ''}>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={cell}
                      onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                      disabled={i === j || loading}
                      className={i === j ? 'diagonal-input' : ''}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="optimize-section">
        {!isValidMatrix() && (
          <p className="validation-error">
            ⚠️ Matrix must have zero diagonal and non-negative distances
          </p>
        )}
        
        <button
          onClick={handleOptimize}
          disabled={loading || !isValidMatrix()}
          className="optimize-button"
        >
          {loading ? '🔄 Optimizing...' : '🚀 Optimize Route'}
        </button>
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Enter distances between each pair of cities</li>
          <li>Diagonal values (city to itself) are automatically 0</li>
          <li>Matrix is symmetric - changing one value updates its mirror</li>
          <li>All distances must be non-negative</li>
          <li>Maximum 10 cities supported for performance</li>
        </ul>
      </div>
    </div>
  );
};

export default MatrixInput;
