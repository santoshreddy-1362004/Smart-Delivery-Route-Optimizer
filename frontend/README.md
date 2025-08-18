# Frontend - Route Optimizer React App

This is the React frontend for the Smart Delivery Route Optimizer that provides a user-friendly interface for the TSP solver.

## Features

- **Interactive Matrix Input**: Dynamic table for entering distance matrices
- **Real-time Validation**: Input validation with helpful error messages
- **Route Visualization**: Canvas-based visual representation of the optimal route
- **Sample Data**: Pre-loaded examples for quick testing
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during optimization

## Components

### MatrixInput
- Dynamic matrix size (2-10 cities)
- Symmetric matrix entry (auto-fills mirror values)
- Sample data loading
- Input validation

### RouteResult
- Displays optimization results
- Shows route segments
- Algorithm information

### RouteVisualizer
- Canvas-based route visualization
- Cities arranged in a circle
- Route arrows and direction indicators
- Legend with color coding

## Usage

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will be available at `http://localhost:3000` and will proxy API requests to `http://localhost:5000`.

## API Integration

The frontend communicates with the backend via the `/optimize-route` endpoint:

```javascript
fetch('/optimize-route', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ matrix })
})
```

## Visualization

The route visualizer uses HTML5 Canvas to draw:
- Cities as colored circles (green for start/end, purple for others)
- Route paths as connected lines
- Direction arrows on route segments
- Legend for color coding

## Mobile Responsive

The interface adapts to different screen sizes:
- Collapsible controls on mobile
- Scrollable matrix table
- Responsive visualization canvas
