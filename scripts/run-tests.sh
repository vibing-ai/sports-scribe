#!/bin/bash

# Sport Scribe - Test Runner
set -e

echo "🧪 Running Sport Scribe test suite..."

# Run AI Backend tests
test_ai_backend() {
    echo "🧠 Testing AI Backend..."
    cd ai-backend
    
    # Activate virtual environment
    source venv/bin/activate 2>/dev/null || echo "Virtual environment not found, using system Python"
    
    # Run tests with coverage
    pytest --cov=agents --cov=tools --cov=config --cov=utils \
           --cov-report=term-missing \
           --cov-report=html:htmlcov \
           tests/
    
    cd ..
    echo "✅ AI Backend tests complete"
}

# Run Web Platform tests
test_web_platform() {
    echo "🌐 Testing Web Platform..."
    cd web
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Run tests
    npm test
    
    # Run type checking
    npm run type-check
    
    cd ..
    echo "✅ Web Platform tests complete"
}

# Run linting
run_linting() {
    echo "🔍 Running linters..."
    
    # AI Backend linting
    cd ai-backend
    source venv/bin/activate 2>/dev/null || echo "Using system Python"
    ruff check .
    black --check .
    mypy .
    cd ..
    
    # Web Platform linting
    cd web
    npm run lint
    cd ..
    
    echo "✅ Linting complete"
}

# Main test process
main() {
    case "${1:-all}" in
        "ai")
            test_ai_backend
            ;;
        "web")
            test_web_platform
            ;;
        "lint")
            run_linting
            ;;
        "all")
            test_ai_backend
            test_web_platform
            run_linting
            ;;
        *)
            echo "Usage: $0 [ai|web|lint|all]"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Test suite complete!"
}

main "$@" 