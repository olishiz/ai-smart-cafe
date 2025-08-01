#!/bin/bash

# AI Smart Cafe - Vercel Deployment Script
# This script helps deploy your application to Vercel

echo "🚀 AI Smart Cafe - Vercel Deployment Script"
echo "============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is available"

# Check if user is logged in
echo "🔍 Checking Vercel authentication..."
if vercel whoami &> /dev/null; then
    echo "✅ Already logged in to Vercel"
    CURRENT_USER=$(vercel whoami)
    echo "📝 Current user: $CURRENT_USER"
else
    echo "🔐 Not logged in. Starting authentication..."
    echo "🌐 This will open your browser for Vercel login..."
    vercel login
fi

# Verify build directory exists
if [ ! -d "build" ]; then
    echo "🔨 Build directory not found. Building the project..."
    npm run build
fi

echo "✅ Build directory ready"

# Show current project status
echo ""
echo "📋 Project Status:"
echo "   - Name: ai-smart-cafe"
echo "   - Framework: Create React App"
echo "   - Build Command: npm run build"
echo "   - Output Directory: build"
echo "   - Node.js Compatibility: ✅ Configured"
echo ""

# Ask for confirmation
read -p "🚀 Ready to deploy to production? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to Vercel production..."
    echo "⏳ This may take a few minutes..."
    
    # Deploy to production
    vercel --prod
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "📋 Your AI Smart Cafe is now live!"
    echo ""
    echo "🌟 Features deployed:"
    echo "   🏠 Modern Home interface"
    echo "   📊 Real-time Dashboard"
    echo "   🏪 Restaurant management"
    echo "   👥 Customer management"
    echo "   ⚙️ Settings panel"
    echo ""
    echo "💡 Next steps:"
    echo "   - Test all features on the live site"
    echo "   - Check mobile responsiveness"
    echo "   - Share the URL with others!"
    
else
    echo "❌ Deployment cancelled"
    echo "💡 Run this script again when you're ready to deploy"
fi

echo ""
echo "📚 For more help, check:"
echo "   - VERCEL_CLI_DEPLOYMENT.md"
echo "   - DEPLOYMENT.md"