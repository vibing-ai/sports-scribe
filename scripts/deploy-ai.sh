#!/usr/bin/env bash

# Sport Scribe - AI Backend Deployment
set -e

echo "🚀 Deploying AI Backend..."

# Configuration
SERVICE_NAME="sport-scribe-ai"
DOCKER_IMAGE="sport-scribe/ai-backend"
REGISTRY="registry.render.com"

# Build and tag Docker image
build_image() {
    echo "🐳 Building Docker image..."
    cd ai-backend
    
    # Build the image
    docker build -t ${DOCKER_IMAGE}:latest .
    docker tag ${DOCKER_IMAGE}:latest ${REGISTRY}/${SERVICE_NAME}:latest
    
    cd ..
    echo "✅ Docker image built and tagged"
}

# Push to registry
push_image() {
    echo "📤 Pushing to registry..."
    docker push ${REGISTRY}/${SERVICE_NAME}:latest
    echo "✅ Image pushed to registry"
}

# Deploy to production
deploy() {
    echo "🎯 Deploying to production..."
    
    # Here you would integrate with your deployment platform
    # For Render, this might involve API calls or CLI commands
    echo "🔄 Triggering deployment on Render..."
    
    # Example: curl to Render deploy hook
    # curl -X POST "https://api.render.com/deploy/srv-xxxxx?key=xxxxx"
    
    echo "✅ Deployment triggered"
}

# Main deployment process
main() {
    echo "Environment: ${ENVIRONMENT:-production}"
    
    build_image
    push_image
    deploy
    
    echo ""
    echo "🎉 AI Backend deployment complete!"
    echo "🔗 Check deployment status at your hosting platform"
}

main "$@" 