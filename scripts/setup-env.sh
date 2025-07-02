#!/bin/bash

# Sport Scribe - Environment Setup
set -e

echo "🔧 Setting up environment files..."

# Setup AI Backend environment
setup_ai_env() {
    echo "🧠 Setting up AI Backend environment..."
    
    if [ ! -f ai-backend/.env ]; then
        cp ai-backend/.env.example ai-backend/.env
        echo "✅ Created ai-backend/.env from template"
    else
        echo "⚠️  ai-backend/.env already exists, skipping..."
    fi
}

# Setup Web Platform environment
setup_web_env() {
    echo "🌐 Setting up Web Platform environment..."
    
    if [ ! -f web/.env.local ]; then
        cp web/.env.local.example web/.env.local
        echo "✅ Created web/.env.local from template"
    else
        echo "⚠️  web/.env.local already exists, skipping..."
    fi
}

# Main setup
main() {
    setup_ai_env
    setup_web_env
    
    echo ""
    echo "📝 Environment files created! Please edit them with your credentials:"
    echo "   - ai-backend/.env (OpenAI API key, Supabase service key)"
    echo "   - web/.env.local (Supabase URL and anon key)"
    echo ""
    echo "🔒 Never commit actual credentials to git!"
}

main "$@" 