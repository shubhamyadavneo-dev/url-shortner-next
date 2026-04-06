# LinkSnip - Modern URL Shortener SASS Application

A beautiful, modern URL shortener built with Next.js, MongoDB, and Tailwind CSS. Perfect for creating a SaaS product with user authentication, analytics, and a stunning user interface.

## Features

✨ **Core Features**
- 🔗 URL Shortening with custom short codes
- 📊 Advanced Analytics & Click Tracking
- 🎨 Light/Dark Theme Toggle
- 📱 Mobile Optimized & Responsive
- 🔐 Secure OAuth Authentication (Google, GitHub)
- 🎫 QR Code Generation
- 📈 User Dashboard with CRUD Operations
- 🎭 Beautiful Modern Design with Animations
- 📝 SEO Optimized

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion (Animations)
- **Backend:** Next.js Server Actions
- **Database:** MongoDB
- **Authentication:** NextAuth.js (OAuth)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Project Structure

```
url-shortner/
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth Configuration
│   ├── dashboard/                  # User Dashboard
│   ├── auth/signin/               # Sign In Page
│   ├── [slug]/                    # Redirect Handler
│   ├── features/                  # Features Page
│   ├── pricing/                   # Pricing Page
│   ├── privacy/                   # Privacy Policy
│   ├── terms/                     # Terms of Service
│   ├── layout.tsx                 # Root Layout
│   ├── page.tsx                   # Home Page
│   └── globals.css                # Global Styles
├── components/
│   ├── Header.tsx                 # Navigation Header
│   ├── Footer.tsx                 # Footer with CTA
│   ├── UrlShortenerForm.tsx       # Main Form Component
│   ├── dashboard/
│   │   └── DashboardContent.tsx   # Dashboard CRUD
│   └── providers/
│       ├── SessionProvider.tsx    # NextAuth Provider
│       └── ThemeProvider.tsx      # Theme Provider
├── lib/
│   ├── mongodb.ts                 # DB Connection
│   ├── auth.ts                    # NextAuth Config
│   ├── utils.ts                   # Utility Functions
│   ├── models/
│   │   └── Url.ts                 # URL Schema
│   └── actions/
│       └── urlActions.ts          # Server Actions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .env.example                   # Environment Template
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account (free tier available)
- Google & GitHub OAuth credentials

### Installation

1. **Clone or download the project**
   ```bash
   cd url-shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your environment variables in `.env.local`:

### Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

#### MongoDB Setup (Required)
[Get MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener?retryWrites=true&w=majority
```

#### NextAuth Configuration (Required)
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-string-here
# Generate a secret: openssl rand -base64 32
```

#### Google OAuth (Recommended)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the OAuth 2.0 API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

#### GitHub OAuth (Recommended)
1. Go to [GitHub Settings > Developer settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
```
GITHUB_ID=your-github-oauth-id
GITHUB_SECRET=your-github-oauth-secret
```

#### Application Settings
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Running the Application

1. **Development Mode**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production Build**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Other Platforms

The application can be deployed to:
- Railway
- Render
- Heroku
- DigitalOcean
- AWS
- Any Node.js hosting platform

## Usage

### Creating Shortened URLs

1. **For Guests:**
   - Visit homepage
   - Enter URL in the form
   - Prompted to sign in
   - After login, URL is shortened

2. **For Logged-in Users:**
   - Access dashboard or homepage form
   - Enter URL with optional title and description
   - Get shortened URL with QR code
   - Copy and share instantly

### Dashboard Features

- View all your shortened URLs
- Track click count for each URL
- View creation date and analytics
- Delete URLs you no longer need
- See QR codes for each link
- Copy links with one click
- View total statistics

## Customization

### Branding
- Edit the logo in `components/Header.tsx`
- Update site name "LinkSnip" to your brand
- Change colors in `tailwind.config.ts`

### Theme Colors
In `tailwind.config.ts`:
```typescript
colors: {
  primary: "#6366f1",      // Change primary color
  secondary: "#ec4899",    // Change secondary color
}
```

### Buy Me A Coffee Integration
In `components/Footer.tsx`:
```typescript
href="https://www.buymeacoffee.com/your-username"
```

## Features Breakdown

### Authentication
- OAuth with Google and GitHub
- Secure session management
- Automatic user profile creation
- Session persistence

### URL Management
- Generate unique short codes
- Custom short code support
- QR code generation
- Click tracking
- Automatic expiration (optional)

### Analytics
- Click count tracking
- Geographic data (via IP)
- Device information
- Creation and update timestamps
- Comprehensive dashboard

### Design
- Modern glassmorphism effects
- Smooth animations
- Dark/Light theme support
- Responsive mobile design
- SEO optimized pages

## API Endpoints

### Authentication
- `POST /api/auth/signin/[provider]` - OAuth sign in
- `POST /api/auth/callback/[provider]` - OAuth callback
- `POST /api/auth/signout` - Sign out

### URL Management (Server Actions)
- `shortenUrl()` - Create shortened URL
- `getUserUrls()` - Fetch user's URLs
- `deleteUrl()` - Delete a shortened URL
- `updateUrl()` - Update URL metadata
- `getUrlStats()` - Get URL statistics
- `incrementClickCount()` - Increment clicks

## Error Handling

The application includes comprehensive error handling:
- Form validation
- Database error handling
- Authentication error pages
- Toast notifications for user feedback
- Fallback pages for missing content

## Performance Optimizations

- Image optimization with Next.js
- CSS-in-JS with Tailwind
- Code splitting and lazy loading
- Server-side rendering for SEO
- Database connection pooling
- CDN-friendly caching headers

## Security Features

- HTTPS encryption
- CSRF protection via NextAuth
- SQL injection prevention (MongoDB)
- XSS protection
- Secure session management
- Environment variable protection
- Rate limiting ready (can be added)

## Monitoring & Analytics

Add monitoring by:
1. Google Analytics (update `_document.tsx`)
2. Sentry for error tracking
3. Database monitoring
4. Server logs

## License

This project is provided as-is for your SaaS application development.

## Support & Contact

For issues and questions:
- 📧 Email: support@linksnip.dev
- 🐙 GitHub Issues: [LinkSnip Issues](https://github.com/linksnip)
- 💬 Discord: [LinkSnip Community](https://discord.gg/linksnip)

## Roadmap

- [ ] API endpoints for programmatic access
- [ ] Custom domain support
- [ ] Link password protection
- [ ] Advanced team collaboration
- [ ] White-label solution
- [ ] Mobile app (React Native)
- [ ] Integration marketplace

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### v1.0.0 (Initial Release)
- Core URL shortening functionality
- User authentication with OAuth
- Dashboard with CRUD operations
- Analytics and click tracking
- QR code generation
- Dark mode support
- Responsive design
- SEO optimization

---

**Made with ❤️ by the LinkSnip Team**

Happy link shortening! 🎉
