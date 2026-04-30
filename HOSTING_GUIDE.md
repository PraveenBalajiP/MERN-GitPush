# Hosting Your MERN Project on Vercel

## Overview
- **Frontend**: Deploy to Vercel (automatic from GitHub)
- **Backend**: Deploy to Vercel as serverless functions

---

## Step 1: Environment Variables Setup

### A. Backend Environment Variables (.env)
Create a `.env` file in the `backend/` folder with:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
NODE_ENV=production
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### B. Frontend Environment Variables (.env.local)
Create a `.env.local` file in the `frontend/` folder with:
```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

---

## Step 2: Backend Configuration for Vercel

### 2.1 Create `backend/vercel.json`
This tells Vercel how to deploy your backend as serverless functions.

### 2.2 Update `backend/package.json`
- Change start script to work with Vercel

### 2.3 Update `backend/server.js`
- Make it export as a serverless handler

---

## Step 3: Frontend Configuration

### 3.1 Update CORS in Backend
The CORS needs to accept your frontend URL

### 3.2 Update API Base URL in Frontend
Configure axios to use the production backend URL

---

## Step 4: Deploy to Vercel

### Frontend:
1. Push code to GitHub
2. Go to vercel.com and login with GitHub
3. Import your repository
4. Select `frontend/` as root directory
5. Add environment variables
6. Click Deploy

### Backend:
1. Same repo import in Vercel
2. Create new project from same repo
3. Select `backend/` as root directory
4. Add environment variables
5. Add the `vercel.json` configuration
6. Click Deploy

---

## Step 5: Update Frontend API Calls

In frontend components, ensure API calls use the environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const response = await axios.get(`${API_URL}/api/auth/user`, { withCredentials: true });
```

---

## Important Notes

- **MongoDB Atlas**: Ensure your IP is whitelisted (allow 0.0.0.0 for public access)
- **CORS**: Frontend URL must be added to CORS origin in backend
- **Cookies**: Make sure credentials are set to true in axios calls
- **Domain**: After deployment, update all hardcoded URLs with actual domain names
