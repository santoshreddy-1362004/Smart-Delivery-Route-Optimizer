import React, { useEffect, useRef } from 'react';
import './RouteVisualizer.css';

const RouteVisualizer = ({ route }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!route || route.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = Math.min(400, rect.width - 40);
    canvas.height = canvas.width;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate city positions
    const cities = route.slice(0, -1); // Remove duplicate start city
    const numCities = cities.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    const cityPositions = cities.map((cityIndex, i) => {
      const angle = (2 * Math.PI * i) / numCities - Math.PI / 2;
      return {
        index: cityIndex,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    // Draw route lines
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();

    for (let i = 0; i < route.length - 1; i++) {
      const currentCity = cityPositions.find(c => c.index === route[i]);
      const nextCity = cityPositions.find(c => c.index === route[i + 1]);
      
      if (currentCity && nextCity) {
        if (i === 0) {
          ctx.moveTo(currentCity.x, currentCity.y);
        }
        ctx.lineTo(nextCity.x, nextCity.y);
      }
    }
    ctx.stroke();

    // Draw route direction arrows
    ctx.fillStyle = '#667eea';
    for (let i = 0; i < route.length - 1; i++) {
      const currentCity = cityPositions.find(c => c.index === route[i]);
      const nextCity = cityPositions.find(c => c.index === route[i + 1]);
      
      if (currentCity && nextCity) {
        const angle = Math.atan2(nextCity.y - currentCity.y, nextCity.x - currentCity.x);
        const midX = (currentCity.x + nextCity.x) / 2;
        const midY = (currentCity.y + nextCity.y) / 2;
        
        drawArrow(ctx, midX, midY, angle, 8);
      }
    }

    // Draw cities
    cityPositions.forEach((city, index) => {
      // City circle
      ctx.beginPath();
      ctx.arc(city.x, city.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = index === 0 ? '#28a745' : '#764ba2';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // City label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(city.index.toString(), city.x, city.y);

      // City name below
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.fillText(`City ${city.index}`, city.x, city.y + 35);
    });

    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height);

  }, [route]);

  const drawArrow = (ctx, x, y, angle, size) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size/2);
    ctx.lineTo(-size, size/2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawLegend = (ctx, width, height) => {
    const legendX = 10;
    const legendY = height - 60;

    // Start city legend
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#28a745';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Start/End City', legendX + 25, legendY);

    // Regular city legend
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + 20, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#764ba2';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillText('Other Cities', legendX + 25, legendY + 20);
  };

  if (!route || route.length < 2) {
    return (
      <div className="route-visualizer">
        <h2>🗺️ Route Visualization</h2>
        <div className="no-route">
          <p>No route to display. Optimize a route first!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="route-visualizer">
      <h2>🗺️ Route Visualization</h2>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="route-canvas"></canvas>
      </div>
      <div className="visualization-info">
        <p>
          <strong>Route Path:</strong> {route.join(' → ')}
        </p>
        <p className="visualization-note">
          Green circle = Start/End city, Purple circles = Intermediate cities
        </p>
      </div>
    </div>
  );
};

export default RouteVisualizer;
