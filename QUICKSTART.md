# LinkSnip - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd url-shortner
npm install
```

### Step 2: Create Environment Variables
```bash
cp .env.example .env.local
```

### Step 3: Configure Required Services

#### MongoDB (Free Tier - MongoDB Atlas)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free)
3. Create a new cluster
4. Get your connection string
5. Add to `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority
   ```

#### NextAuth Secret
Generate a secret:
```bash
openssl rand -base64 32
```
Add to `.env.local`:
```
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3000
```

#### Google OAuth (Optional but Recommended)
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create new project
3. Enable OAuth 2.0
4. Create credentials
5. Add URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-id
   GOOGLE_CLIENT_SECRET=your-secret
   ```

#### GitHub OAuth (Optional)
1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy to `.env.local`:
   ```
   GITHUB_ID=your-id
   GITHUB_SECRET=your-secret
   ```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 📋 Complete Environment Template

Here's what your `.env.local` should look like:

```env
# MongoDB Configuration (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority

# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Google OAuth (OPTIONAL)
GOOGLE_CLIENT_ID=your-google-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-secret

# GitHub OAuth (OPTIONAL)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

## 📱 Features to Explore

- ✅ **Homepage:** Beautiful landing page with CTA
- ✅ **URL Shortener:** Main form to create short links
- ✅ **Authentication:** OAuth with Google/GitHub
- ✅ **Dashboard:** Manage all your shortened URLs
- ✅ **Analytics:** Track clicks on your links
- ✅ **QR Codes:** Generate QR codes for each link
- ✅ **Theme Toggle:** Light/Dark mode in header
- ✅ **Responsive Design:** Works on all devices
- ✅ **Modern Animations:** Smooth Framer Motion effects

## 📚 File Structure Overview

```
app/               → Pages & routing
  └─ api/         → API routes & NextAuth
  └─ auth/        → Authentication pages
  └─ dashboard/   → User dashboard
  └─ [slug]/      → URL redirect
components/        → React components
  └─ dashboard/   → Dashboard components
  └─ providers/   → React providers
lib/               → Core logic
  └─ actions/     → Server actions
  └─ models/      → Database models
```

## 🎨 Customization

### Change Brand Name
Search and replace "LinkSnip" with your brand name

### Change Colors
Edit `tailwind.config.ts`:
```typescript
primary: "#6366f1",    // Your primary color
secondary: "#ec4899",  // Your secondary color
```

### Add Buy Me A Coffee
Edit `components/Footer.tsx`:
```typescript
href="https://www.buymeacoffee.com/your-username"
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string in `.env.local`
- Ensure MongoDB Atlas cluster is running
- Check IP whitelist allows your IP

### OAuth Not Working
- Verify redirect URIs match exactly
- Check credentials in `.env.local`
- Ensure services are enabled

### Port Already in Use
```bash
npm run dev -- -p 3001
```

## 📞 Getting Help

- Read README.md for detailed documentation
- Check MongoDB console for debug logs
- Verify all environment variables are set
- Check browser console for errors

## ✨ What's Included

- ✅ Complete Next.js application
- ✅ MongoDB database setup
- ✅ OAuth authentication (Google, GitHub)
- ✅ Beautiful UI with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ User dashboard with CRUD
- ✅ QR code generation
- ✅ Analytics and click tracking
- ✅ Dark/Light theme support
- ✅ Mobile responsive design
- ✅ SEO optimized pages
- ✅ Professional documentation

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Run development server
4. ✅ Test URL shortening
5. ✅ Try Sign In with Google/GitHub
6. ✅ Explore Dashboard
7. ✅ Deploy to Vercel
8. ✅ Add custom domain (optional)

Ready to go! 🚀
