#!/bin/bash

# Sport Scribe - Web Platform Deployment
set -e

echo "🌐 Deploying Web Platform..."

# Configuration
PROJECT_NAME="sport-scribe-web"
VERCEL_ORG="${VERCEL_ORG_ID}"

# Install Vercel CLI if not present
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    echo "✅ Vercel CLI ready"
}

# Build and deploy
deploy_vercel() {
    echo "🏗️  Building and deploying to Vercel..."
    cd web
    
    # Install dependencies
    npm ci
    
    # Run build
    npm run build
    
    # Deploy to production
    vercel --prod --yes
    
    cd ..
    echo "✅ Deployed to Vercel"
}

# Main deployment process
main() {
    echo "Environment: ${ENVIRONMENT:-production}"
    
    check_vercel_cli
    deploy_vercel
    
    echo ""
    echo "🎉 Web Platform deployment complete!"
    echo "🔗 Your site is live on Vercel"
}

main "$@" 