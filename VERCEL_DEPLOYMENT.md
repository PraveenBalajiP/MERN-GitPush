# Vercel Deployment Step-by-Step Guide

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **MongoDB Atlas**: Have a connection URI ready
3. **Vercel Account**: Sign up at vercel.com with GitHub
4. **Environment Variables**: Prepare all required .env variables

---

## Step 1: Prepare Your Project

### 1.1 Create `.env` file in backend/ folder
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-key-min-32-chars-random
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
FRONTEND_URL=https://your-frontend-name.vercel.app
```

### 1.2 Create `.env.local` file in frontend/ folder
```
VITE_API_BASE_URL=https://your-backend-name.vercel.app
```

### 1.3 Commit and Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## Step 2: Deploy Backend on Vercel

### 2.1 Go to Vercel Dashboard
- Visit https://vercel.com/dashboard
- Click "Add New..." → "Project"
- Select your GitHub repository

### 2.2 Configure Backend Deployment
1. **Root Directory**: Select `backend/`
2. **Framework Preset**: Select "Node.js"
3. **Environment Variables**: Add all from your `.env` file
   - MONGO_URI
   - JWT_SECRET
   - GITHUB_CLIENT_ID
   - GITHUB_CLIENT_SECRET
   - NODE_ENV=production
   - FRONTEND_URL=https://your-frontend-name.vercel.app
4. **Click Deploy**

### 2.3 Get Your Backend URL
- After deployment, you'll see your backend URL (e.g., `https://backend-name.vercel.app`)
- Save this URL

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Create New Project in Vercel
- Click "Add New..." → "Project"
- Select your GitHub repository again

### 3.2 Configure Frontend Deployment
1. **Root Directory**: Select `frontend/`
2. **Framework**: "Vite"
3. **Build Command**: `npm run build`
4. **Environment Variables**: 
   - `VITE_API_BASE_URL=https://your-backend-name.vercel.app`
5. **Click Deploy**

### 3.3 Get Your Frontend URL
- After deployment, you'll see your frontend URL (e.g., `https://frontend-name.vercel.app`)

---

## Step 4: Update Backend CORS

Your backend now has dynamic CORS that reads from the `FRONTEND_URL` environment variable. Make sure this is set correctly in your backend environment variables on Vercel.

---

## Step 5: Update MongoDB Atlas

### 5.1 Whitelist Vercel IP (Optional for Vercel)
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Enter `0.0.0.0/0` (allows all IPs) OR
4. Add Vercel's IP: Contact Vercel support or use `0.0.0.0/0`

### 5.2 Verify Connection String
- Ensure your `MONGO_URI` has the correct format
- Test the connection locally first

---

## Step 6: Test Your Deployment

### 6.1 Frontend Tests
- Visit your frontend URL
- Try logging in
- Test pushing to GitHub
- Check history and user pages

### 6.2 Backend Tests
- Check Vercel logs for any errors
- Use browser DevTools to see API calls
- Verify CORS is working (no CORS errors)

---

## Troubleshooting

### Issue: CORS Error
**Solution**: 
- Check that `FRONTEND_URL` is set correctly in backend environment variables
- Format should be: `https://your-frontend-domain.vercel.app` (no trailing slash)
- Redeploy backend after changing environment variables

### Issue: MongoDB Connection Error
**Solution**:
- Verify `MONGO_URI` is correct
- Check if IP is whitelisted in MongoDB Atlas
- Use `0.0.0.0/0` to allow all IPs (less secure)
- Test connection string locally first

### Issue: API calls return 404
**Solution**:
- Check frontend environment variable `VITE_API_BASE_URL` is correct
- Ensure backend is deployed and running
- Check network tab in browser DevTools

### Issue: Cookies not working
**Solution**:
- Backend CORS already has `credentials: true`
- Ensure frontend axios calls use `withCredentials: true` (already set in api.js)
- Frontend and backend must use HTTPS (Vercel provides this automatically)

---

## After Deployment

### Update Your .env Files

Don't commit `.env` files to GitHub. Instead:

1. Create `.env.example` (already done)
2. Add to `.gitignore`:
   ```
   backend/.env
   frontend/.env.local
   ```
3. Developers should copy `.env.example` to `.env` and fill in values

### Monitor Your Deployment
- Visit Vercel Dashboard regularly
- Check logs for errors
- Monitor Vercel usage for free tier limits

### Free Tier Limits
- **Frontend**: Unlimited
- **Backend**: Limited to 12 serverless function invocations per day on free tier
- **Database**: Use MongoDB Atlas free tier (shared cluster)

---

## Environment Variables Reference

### Backend
| Variable | Required | Example |
|----------|----------|---------|
| MONGO_URI | ✅ | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| JWT_SECRET | ✅ | Any secure random string |
| GITHUB_CLIENT_ID | ✅ | From GitHub OAuth settings |
| GITHUB_CLIENT_SECRET | ✅ | From GitHub OAuth settings |
| FRONTEND_URL | ✅ | `https://frontend-name.vercel.app` |
| NODE_ENV | ✅ | `production` |
| PORT | ❌ | Vercel handles this (3000) |

### Frontend
| Variable | Required | Example |
|----------|----------|---------|
| VITE_API_BASE_URL | ✅ | `https://backend-name.vercel.app` |

---

## Additional Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- GitHub OAuth: https://docs.github.com/en/developers/apps/building-oauth-apps
