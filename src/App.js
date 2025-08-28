import React, { useState } from 'react';
import './App.css';
import MatrixInput from './components/MatrixInput';
import RouteResult from './components/RouteResult';
import RouteVisualizer from './components/RouteVisualizer';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const optimizeRoute = async (matrix) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Use relative path for API calls - Vercel will handle routing
      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? '/api/optimize-route' 
        : 'http://localhost:5000/optimize-route';
        
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrix }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to optimize route');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚚 Smart Delivery Route Optimizer</h1>
        <p>Solve the Traveling Salesman Problem with the Held-Karp Algorithm</p>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="input-section">
            <MatrixInput 
              onOptimize={optimizeRoute} 
              loading={loading}
              onClear={clearResults}
            />
            
            {error && (
              <div className="error-message">
                <h3>❌ Error</h3>
                <p>{error}</p>
              </div>
            )}
          </div>

          {result && (
            <div className="results-section">
              <RouteResult result={result} />
              <RouteVisualizer route={result.route} />
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Built with React & Node.js | Algorithm: Held-Karp Dynamic Programming</p>
      </footer>
    </div>
  );
}

export default App;
