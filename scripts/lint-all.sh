#!/usr/bin/env bash

# Sport Scribe - Comprehensive Linting
set -e

echo "🔍 Running comprehensive code quality checks..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
ERRORS=0

# Helper function to report results
report_result() {
    local tool=$1
    local exit_code=$2
    
    if [ "$exit_code" -eq 0 ]; then
        echo -e "${GREEN}✅ $tool passed${NC}"
    else
        echo -e "${RED}❌ $tool failed${NC}"
        ((ERRORS++))
    fi
}

# Shell script linting
lint_shell_scripts() {
    echo "📋 Linting shell scripts..."
    
    if ! command -v shellcheck &> /dev/null; then
        echo -e "${YELLOW}⚠️  shellcheck not installed, skipping...${NC}"
        return 0
    fi
    
    find scripts/ -name "*.sh" -exec shellcheck {} \;
    report_result "shellcheck" $?
}

# YAML linting
lint_yaml_files() {
    echo "📝 Linting YAML files..."
    
    if ! command -v yamllint &> /dev/null; then
        echo -e "${YELLOW}⚠️  yamllint not installed, skipping...${NC}"
        return 0
    fi
    
    yamllint .
    report_result "yamllint" $?
}

# Docker linting
lint_docker_files() {
    echo "🐳 Linting Dockerfiles..."
    
    if ! command -v hadolint &> /dev/null; then
        echo -e "${YELLOW}⚠️  hadolint not installed, skipping...${NC}"
        return 0
    fi
    
    find . -name "Dockerfile*" -exec hadolint {} \;
    report_result "hadolint" $?
}

# JSON schema validation
validate_json_schemas() {
    echo "🔍 Validating JSON schemas..."
    
    if ! command -v ajv &> /dev/null; then
        echo -e "${YELLOW}⚠️  ajv-cli not installed, skipping...${NC}"
        return 0
    fi
    
    # Validate JSON files against schemas if they exist
    if [ -d "shared/schemas" ]; then
        find shared/schemas -name "*.json" -exec ajv compile -s {} \; 2>/dev/null
        report_result "ajv JSON validation" $?
    else
        echo -e "${YELLOW}⚠️  No JSON schemas found, skipping...${NC}"
    fi
}

# SQL linting
lint_sql_files() {
    echo "🗃️  Linting SQL files..."
    
    if ! command -v sqlfluff &> /dev/null; then
        echo -e "${YELLOW}⚠️  sqlfluff not installed, skipping...${NC}"
        return 0
    fi
    
    if find . -name "*.sql" -type f | grep -q .; then
        sqlfluff lint shared/schemas/database/
        report_result "sqlfluff" $?
    else
        echo -e "${YELLOW}⚠️  No SQL files found, skipping...${NC}"
    fi
}

# Python linting (AI Backend)
lint_python_code() {
    echo "🐍 Linting Python code..."
    
    if [ ! -d "ai-backend" ]; then
        echo -e "${YELLOW}⚠️  AI backend directory not found, skipping...${NC}"
        return 0
    fi
    
    cd ai-backend
    
    # Activate virtual environment if it exists
    if [ -d "venv" ]; then
        source venv/bin/activate
    fi
    
    # Run ruff
    if command -v ruff &> /dev/null; then
        ruff check .
        report_result "ruff (Python)" $?
    fi
    
    # Run mypy
    if command -v mypy &> /dev/null; then
        mypy . --ignore-missing-imports
        report_result "mypy (Python)" $?
    fi
    
    # Run bandit for security
    if command -v bandit &> /dev/null; then
        bandit -r . -f json -o bandit-report.json || true
        bandit -r . --severity-level medium
        report_result "bandit (Python security)" $?
    fi
    
    # Run safety for vulnerabilities
    if command -v safety &> /dev/null; then
        safety check --json || true
        safety check
        report_result "safety (Python vulnerabilities)" $?
    fi
    
    cd ..
}

# TypeScript/JavaScript linting (Web Platform)
lint_typescript_code() {
    echo "📱 Linting TypeScript/JavaScript code..."
    
    if [ ! -d "web" ]; then
        echo -e "${YELLOW}⚠️  Web directory not found, skipping...${NC}"
        return 0
    fi
    
    cd web
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Run ESLint
    npm run lint
    report_result "ESLint (TypeScript/JavaScript)" $?
    
    # Run TypeScript compiler
    npx tsc --noEmit
    report_result "TypeScript compiler" $?
    
    cd ..
}

# Main linting process
main() {
    echo "🚀 Starting comprehensive linting..."
    echo ""
    
    lint_shell_scripts
    echo ""
    
    lint_yaml_files
    echo ""
    
    lint_docker_files
    echo ""
    
    validate_json_schemas
    echo ""
    
    lint_sql_files
    echo ""
    
    lint_python_code
    echo ""
    
    lint_typescript_code
    echo ""
    
    # Final report
    echo "📊 Linting Summary:"
    if [ $ERRORS -eq 0 ]; then
        echo -e "${GREEN}🎉 All checks passed!${NC}"
        exit 0
    else
        echo -e "${RED}❌ $ERRORS check(s) failed${NC}"
        echo ""
        echo "💡 Tips:"
        echo "  - Run 'scripts/lint-fix.sh' to auto-fix some issues"
        echo "  - Check individual tool outputs above for details"
        echo "  - Install missing tools with 'scripts/setup-ci-tools.sh'"
        exit 1
    fi
}

main "$@" 