# GitPush Studio

A full-stack MERN application focused on making Git commits and pushes easier from a guided UI. Authenticate with JWT, connect your GitHub configuration, prepare entry content, and push it quickly from one workspace.

*Last updated: 09/05/2026*

## 🚀 Features

- **User Authentication**: Secure JWT-based login/registration with bcrypt password hashing
- **GitHub Configuration**: Save repository details needed for push workflows
- **Protected Routes**: Middleware-based authorization for secure API endpoints
- **Workspace Entry Flow**: Write question/answer content or add multiple text/files before pushing
- **Quick Commit + Push**: Build commit-ready payloads and push directly from the app
- **Responsive UI**: Modern React frontend with Vite for fast development and builds
- **Full-Stack Deployment**: Production-ready setup for Vercel with CI/CD automation
- **HTTP-Only Cookies**: Secure credential transmission across frontend and backend

## 🛠 Tech Stack

### Backend
- **Node.js + Express.js** - REST API server
- **MongoDB** - NoSQL database with Atlas
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Vercel** - Serverless deployment

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side routing
- **Vanta.js + Three.js** - 3D background animations

## 📋 Prerequisites

- Node.js >= 16
- MongoDB Atlas account (free tier available)
- GitHub account with OAuth app credentials
- Vercel account for deployment

## ⚙️ Local Setup

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/MERN-GitPush.git
cd MERN-GitPush

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### Backend (.env)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-min-32-chars-random-string
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Development Servers

```bash
# Terminal 1: Backend (from backend/ directory)
npm run dev

# Terminal 2: Frontend (from frontend/ directory)
npm run dev
```

Backend runs on `http://localhost:5000`  
Frontend runs on `http://localhost:5173`

## 📦 Project Structure

```
MERN-GitPush/
├── backend/
│   ├── middleware/
│   │   ├── generateTokenAndCookie.js    # JWT generation & cookie setting
│   │   └── protectedRoute.js            # Route protection middleware
│   ├── models/
│   │   └── user.models.js               # User schema
│   ├── routes/
│   │   ├── auth.routes.js               # Registration & login
│   │   ├── github.routes.js             # GitHub OAuth routes
│   │   └── routes.js                    # Protected dashboard routes
│   ├── mongoConnection/
│   │   └── mongoConnection.js           # MongoDB connection
│   ├── server.js                        # Express app setup & CORS
│   ├── vercel.json                      # Vercel deployment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/                  # React components
│   │   ├── css/                         # Component styles
│   │   ├── api.js                       # Axios instance & API calls
│   │   ├── App.jsx                      # Main app component
│   │   └── main.jsx                     # Entry point
│   ├── vite.config.js                   # Vite configuration
│   ├── package.json
│   └── index.html
├── VERCEL_DEPLOYMENT.md                 # Deployment guide
└── README.md                            # This file
```

## 🔐 Authentication Flow

1. **Register/Login**: User submits credentials via React form
2. **Backend Validation**: Express validates password with bcrypt
3. **JWT Generation**: Server generates JWT token signed with `JWT_SECRET`
4. **Cookie Storage**: HTTP-only cookie with `Secure` & `SameSite=None` (production)
5. **Protected Routes**: Middleware extracts token from cookie, verifies JWT
6. **Workspace Access**: Authenticated users can open the workspace and run commit/push actions

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify authentication (protected)
- `GET /api/auth/github-url` - Get GitHub user URL (protected)

### Protected Routes
- `GET /home` - Home dashboard (protected)
- `GET /about` - About page (protected)
- `GET /history` - User history (protected)

### GitHub OAuth
- `GET /api/github/url` - GitHub OAuth redirect URL
- `GET /api/github/callback` - GitHub callback handler

## 🚀 Vercel Deployment

### Backend Deployment
1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. New Project → Select GitHub repo
4. Set root directory to `backend/`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL=https://your-frontend.vercel.app`
   - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
6. Deploy

### Frontend Deployment
1. New Project → Select GitHub repo
2. Set root directory to `frontend/`
3. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend.vercel.app`
4. Deploy

**Note**: Frontend must be redeployed after setting `VITE_API_BASE_URL` (Vite inlines env vars at build time).

## 🔗 CORS & Cross-Site Cookies

- Backend dynamically allows frontend origin via `FRONTEND_URL` env var
- Cookies use `SameSite=None` in production (required for cross-domain requests)
- Frontend axios includes `withCredentials: true` for cookie transmission
- Both frontend & backend must use HTTPS in production

## 📝 Available Scripts

### Backend
```bash
npm start       # Start server in production
npm run dev     # Start with nodemon (dev mode)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build locally
npm run lint    # Run ESLint
```

## 📄 License

This project is open source and available under the MIT License.


**Deployed at**:
- Frontend: https://your-frontend.vercel.app
- Backend: https://your-backend.vercel.app