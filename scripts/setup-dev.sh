#!/usr/bin/env bash

# Sport Scribe - Development Environment Setup
set -e

echo "🚀 Setting up Sport Scribe development environment..."

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."

    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is required but not installed. Please install Node.js 18+"
        exit 1
    fi

    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 is required but not installed. Please install Python 3.11+"
        exit 1
    fi

    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is required but not installed. Please install Docker"
        exit 1
    fi

    echo "✅ All requirements satisfied"
}

# Setup AI Backend
setup_ai_backend() {
    echo "🧠 Setting up AI Backend..."
    cd ai-backend

    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt
    pip install -r requirements-dev.txt

    # Setup environment file
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "📝 Please edit ai-backend/.env with your API keys"
    fi

    # Install pre-commit hooks
    pre-commit install

    cd ..
    echo "✅ AI Backend setup complete"
}

# Setup Web Platform
setup_web_platform() {
    echo "🌐 Setting up Web Platform..."
    cd web

    # Install dependencies
    npm install

    # Setup environment file
    if [ ! -f .env.local ]; then
        cp .env.local.example .env.local
        echo "📝 Please edit web/.env.local with your Supabase credentials"
    fi

    # Setup git hooks
    npx husky install

    cd ..
    echo "✅ Web Platform setup complete"
}

# Main setup process
main() {
    check_requirements
    setup_ai_backend
    setup_web_platform

    echo ""
    echo "🎉 Development environment setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Edit ai-backend/.env with your OpenAI API key"
    echo "2. Edit web/.env.local with your Supabase credentials"
    echo "3. Run: docker-compose -f docker-compose.dev.yml up"
    echo ""
    echo "Happy coding! 🚀"
}

main "$@"
