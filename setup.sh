#!/bin/bash

# LinkSnip Installation & Setup Script
# This is a reference guide for setup - follow along or modify as needed

echo "🚀 LinkSnip - URL Shortener Setup"
echo "=================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in url-shortner directory"
    echo "Please run from: /home/shubham/Desktop/url-shortner"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
echo "Command: npm install"
echo ""
echo "This will take 2-3 minutes. Continue? (yes/no)"
read answer

if [ "$answer" != "yes" ]; then
    echo "Skipping npm install"
else
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ npm install failed"
        exit 1
    fi
fi

echo ""

# Step 2: Check if .env.local exists
echo "🔧 Step 2: Setting up environment variables..."

if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created"
fi

echo ""
echo "⚠️  IMPORTANT: You must edit .env.local with your credentials"
echo ""
echo "Required environment variables:"
echo "  - MONGODB_URI (from MongoDB Atlas)"
echo "  - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo "  - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET (from Google Console)"
echo "  - GITHUB_ID & GITHUB_SECRET (from GitHub Settings)"
echo ""
echo "Edit the file now? (yes/no)"
read edit_now

if [ "$edit_now" = "yes" ]; then
    nano .env.local
fi

echo ""

# Step 3: Build check
echo "🔨 Step 3: Building the application..."
echo "Command: npm run build"
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "⚠️  Build failed - check error messages above"
fi

echo ""

# Step 4: Start dev server
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Make sure .env.local has all credentials"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo "  4. Test the application"
echo ""
echo "Start dev server now? (yes/no)"
read start_dev

if [ "$start_dev" = "yes" ]; then
    npm run dev
fi

echo "Done! 🚀"
