#!/bin/bash

# Sport Scribe - Lint Auto-fix
set -e

echo "🔧 Auto-fixing linting issues..."

# Fix AI Backend linting
fix_ai_backend() {
    echo "🧠 Fixing AI Backend..."
    cd ai-backend
    
    # Activate virtual environment
    source venv/bin/activate 2>/dev/null || echo "Using system Python"
    
    # Auto-fix with ruff
    ruff check --fix .
    
    # Auto-format with black
    black .
    
    # Sort imports
    isort .
    
    cd ..
    echo "✅ AI Backend linting fixed"
}

# Fix Web Platform linting
fix_web_platform() {
    echo "🌐 Fixing Web Platform..."
    cd web
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Auto-fix ESLint issues
    npm run lint -- --fix
    
    # Format with Prettier
    npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"
    
    cd ..
    echo "✅ Web Platform linting fixed"
}

# Main fix process
main() {
    case "${1:-all}" in
        "ai")
            fix_ai_backend
            ;;
        "web")
            fix_web_platform
            ;;
        "all")
            fix_ai_backend
            fix_web_platform
            ;;
        *)
            echo "Usage: $0 [ai|web|all]"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Linting fixes complete!"
    echo "💡 Don't forget to review the changes before committing"
}

main "$@" 