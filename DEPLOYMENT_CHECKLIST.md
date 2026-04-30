## Deployment Checklist

### Before Pushing to GitHub
- [ ] Create `.env` files (backend and frontend)
- [ ] Test locally: `npm run dev` (backend) and `npm run dev` (frontend)
- [ ] Verify API calls work
- [ ] Add to `.gitignore`:
  ```
  backend/.env
  backend/.env.local
  frontend/.env.local
  frontend/.env
  node_modules/
  .DS_Store
  ```

### GitHub Setup
- [ ] Push code to GitHub repository
- [ ] Verify all files are committed (except .env files)

### MongoDB Atlas
- [ ] Create/verify cluster
- [ ] Get connection URI
- [ ] Whitelist IP or allow all (0.0.0.0/0)

### GitHub OAuth
- [ ] Create GitHub OAuth App at https://github.com/settings/developers
- [ ] Get Client ID and Client Secret
- [ ] Set Authorization callback URL to: `https://your-backend.vercel.app/api/auth/github/callback`

### Vercel Backend Deployment
- [ ] Sign up at vercel.com
- [ ] Create Vercel account with GitHub
- [ ] Import repository
- [ ] Select `backend/` as root directory
- [ ] Add environment variables:
  - MONGO_URI
  - JWT_SECRET
  - GITHUB_CLIENT_ID
  - GITHUB_CLIENT_SECRET
  - NODE_ENV=production
  - FRONTEND_URL (will add after frontend deployment)
- [ ] Deploy
- [ ] Copy backend URL

### Update Backend Environment
- [ ] Go back to backend project settings
- [ ] Add FRONTEND_URL environment variable
- [ ] Redeploy backend

### Vercel Frontend Deployment
- [ ] Create new Vercel project
- [ ] Select `frontend/` as root directory
- [ ] Add environment variable:
  - VITE_API_BASE_URL (use your backend URL)
- [ ] Deploy
- [ ] Copy frontend URL

### Final Testing
- [ ] Visit frontend URL
- [ ] Check browser console for errors
- [ ] Test login functionality
- [ ] Test GitHub push
- [ ] Check Vercel logs for backend errors
- [ ] Test on different browsers

### Production Maintenance
- [ ] Monitor Vercel dashboard
- [ ] Monitor MongoDB usage
- [ ] Keep GitHub OAuth credentials secure
- [ ] Regularly check logs for errors
- [ ] Update dependencies periodically
