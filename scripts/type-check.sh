#!/bin/bash

# Sport Scribe - Type Checking
set -e

echo "🔍 Running type checks..."

# Type check AI Backend
check_ai_backend() {
    echo "🧠 Type checking AI Backend..."
    cd ai-backend
    
    # Activate virtual environment
    source venv/bin/activate 2>/dev/null || echo "Using system Python"
    
    # Run mypy type checking
    mypy agents/ tools/ config/ utils/ --strict
    
    cd ..
    echo "✅ AI Backend type checking complete"
}

# Type check Web Platform
check_web_platform() {
    echo "🌐 Type checking Web Platform..."
    cd web
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Run TypeScript compiler
    npx tsc --noEmit
    
    cd ..
    echo "✅ Web Platform type checking complete"
}

# Main type checking process
main() {
    case "${1:-all}" in
        "ai")
            check_ai_backend
            ;;
        "web")
            check_web_platform
            ;;
        "all")
            check_ai_backend
            check_web_platform
            ;;
        *)
            echo "Usage: $0 [ai|web|all]"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Type checking complete!"
}

main "$@" 