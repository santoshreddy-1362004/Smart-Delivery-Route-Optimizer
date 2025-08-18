import React from 'react';
import './RouteResult.css';

const RouteResult = ({ result }) => {
  const formatRoute = (route) => {
    return route.map(city => `City ${city}`).join(' → ');
  };

  const getRouteSegments = (route) => {
    const segments = [];
    for (let i = 0; i < route.length - 1; i++) {
      segments.push({
        from: route[i],
        to: route[i + 1],
        segment: `${route[i]} → ${route[i + 1]}`
      });
    }
    return segments;
  };

  return (
    <div className="route-result">
      <h2>🎯 Optimization Result</h2>
      
      <div className="result-summary">
        <div className="metric">
          <span className="metric-label">Optimal Distance:</span>
          <span className="metric-value">{result.distance.toFixed(2)}</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Cities Visited:</span>
          <span className="metric-value">{result.cities}</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Algorithm:</span>
          <span className="metric-value">{result.algorithm}</span>
        </div>
      </div>

      <div className="route-display">
        <h3>📍 Optimal Route</h3>
        <div className="route-path">
          {formatRoute(result.route)}
        </div>
        
        <div className="route-segments">
          <h4>Route Segments:</h4>
          <ul>
            {getRouteSegments(result.route).map((segment, index) => (
              <li key={index} className="segment-item">
                <span className="segment-number">{index + 1}.</span>
                <span className="segment-path">City {segment.from} → City {segment.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="algorithm-info">
        <h4>ℹ️ About the Algorithm</h4>
        <p>
          The <strong>Held-Karp algorithm</strong> uses dynamic programming to find the 
          exact optimal solution to the Traveling Salesman Problem. It has a time 
          complexity of O(n² × 2ⁿ) and guarantees the shortest possible route.
        </p>
      </div>
    </div>
  );
};

export default RouteResult;
