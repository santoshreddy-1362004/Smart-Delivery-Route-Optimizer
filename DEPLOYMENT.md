# Vercel Deployment Guide for Smart Delivery Route Optimizer

## Project Structure (Updated for Vercel)

```
Smart-Delivery-Route-Optimizer/
├── src/                        # React frontend source (moved to root)
├── public/                     # React public files (moved to root)
├── package.json                # React app config (moved to root)
├── api/                        # Vercel serverless functions
│   ├── optimize-route.js      # Main TSP endpoint
│   ├── health.js              # Health check endpoint
│   └── package.json           # API dependencies
├── backend/                    # Original backend (for local dev)
├── frontend/                   # Original frontend (kept for reference)
├── vercel.json                 # Vercel configuration
├── .vercelignore              # Deployment ignore file
└── DEPLOYMENT.md              # This file
```

## Quick Deploy Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project root**:
   ```bash
   cd /path/to/Smart-Delivery-Route-Optimizer
   vercel
   ```

3. **Follow prompts**:
   - Link to existing project or create new one
   - Select deployment settings (should auto-detect React)
   - Wait for deployment to complete

### Option 2: Deploy via GitHub (Connect Repository)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Vercel will auto-detect the React app and deploy

## Key Configuration Files

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### API Structure
- `api/optimize-route.js` - Main TSP solver endpoint
- `api/health.js` - Health check endpoint
- Each API file exports a default handler function

## Environment & Dependencies

### Frontend Dependencies (Root package.json)
- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1

### API Dependencies (api/package.json)
- No external dependencies (uses local TSPSolver)

## API Endpoints

Once deployed, your API will be available at:
- `https://your-app.vercel.app/api/optimize-route` (POST)
- `https://your-app.vercel.app/api/health` (GET)

## Local Development

### Frontend (Root)
```bash
npm start
```

### Original Backend (for testing)
```bash
cd backend && npm start
```

### Vercel Dev (Simulate production locally)
```bash
vercel dev
```

## Common Deployment Issues & Solutions

### 1. Build Errors
- **Issue**: `react-scripts: not found`
- **Solution**: Run `npm install` in project root first

### 2. API Import Errors
- **Issue**: Cannot import TSPSolver
- **Solution**: Check that `../backend/tspSolver.js` path is correct

### 3. CORS Issues
- **Issue**: API calls blocked by CORS
- **Solution**: CORS headers are already configured in API files

### 4. Function Timeout
- **Issue**: Large matrices cause timeout
- **Solution**: Already limited to 15x15 matrices in code

## Testing the Deployment

After deployment, test:

1. **Frontend loads**: Visit your Vercel URL
2. **API health**: Visit `/api/health`
3. **TSP solver**: Try the matrix input form
4. **Error handling**: Test with invalid matrices

## Performance Notes

- **Matrix Size Limit**: 15x15 (due to O(n² × 2ⁿ) complexity)
- **Vercel Function Timeout**: 10s on Hobby plan, 60s on Pro
- **Cold Start**: First API call may be slower

## Troubleshooting

### Check Vercel Logs
```bash
vercel logs [deployment-url]
```

### Local Testing
```bash
vercel dev --debug
```

### Function Inspector
Visit your Vercel dashboard → Project → Functions tab

## Next Steps After Deployment

1. **Custom Domain**: Add your domain in Vercel dashboard
2. **Analytics**: Enable Vercel Analytics
3. **Environment Variables**: Set any needed env vars
4. **Monitoring**: Set up error tracking if needed
