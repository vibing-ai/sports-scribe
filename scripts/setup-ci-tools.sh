#!/usr/bin/env bash

# Sport Scribe - CI/CD Tools Setup
set -e

echo "🛠️  Setting up CI/CD quality tools..."

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "🖥️  Detected OS: ${MACHINE}"

# Install shellcheck
install_shellcheck() {
    echo "📋 Installing shellcheck..."
    
    if command -v shellcheck &> /dev/null; then
        echo "✅ shellcheck already installed"
        return
    fi
    
    case "${MACHINE}" in
        "Mac")
            if command -v brew &> /dev/null; then
                brew install shellcheck
            else
                echo "❌ Homebrew not found. Please install shellcheck manually"
                return 1
            fi
            ;;
        "Linux")
            if command -v apt-get &> /dev/null; then
                sudo apt-get update && sudo apt-get install -y shellcheck
            elif command -v yum &> /dev/null; then
                sudo yum install -y ShellCheck
            elif command -v dnf &> /dev/null; then
                sudo dnf install -y ShellCheck
            else
                echo "❌ Package manager not found. Please install shellcheck manually"
                return 1
            fi
            ;;
        *)
            echo "❌ Unsupported OS. Please install shellcheck manually"
            return 1
            ;;
    esac
    
    echo "✅ shellcheck installed"
}

# Install yamllint
install_yamllint() {
    echo "📝 Installing yamllint..."
    
    if command -v yamllint &> /dev/null; then
        echo "✅ yamllint already installed"
        return
    fi
    
    pip3 install yamllint
    echo "✅ yamllint installed"
}

# Install hadolint (Docker linter)
install_hadolint() {
    echo "🐳 Installing hadolint..."
    
    if command -v hadolint &> /dev/null; then
        echo "✅ hadolint already installed"
        return
    fi
    
    case "${MACHINE}" in
        "Mac")
            if command -v brew &> /dev/null; then
                brew install hadolint
            else
                echo "❌ Homebrew not found. Installing via curl..."
                curl -sL -o /usr/local/bin/hadolint "https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-$(uname -s)-$(uname -m)"
                chmod +x /usr/local/bin/hadolint
            fi
            ;;
        "Linux")
            curl -sL -o /usr/local/bin/hadolint "https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-$(uname -s)-$(uname -m)"
            chmod +x /usr/local/bin/hadolint
            ;;
        *)
            echo "❌ Unsupported OS. Please install hadolint manually"
            return 1
            ;;
    esac
    
    echo "✅ hadolint installed"
}

# Install ajv-cli (JSON schema validator)
install_ajv_cli() {
    echo "🔍 Installing ajv-cli..."
    
    if command -v ajv &> /dev/null; then
        echo "✅ ajv-cli already installed"
        return
    fi
    
    if command -v npm &> /dev/null; then
        npm install -g ajv-cli
        echo "✅ ajv-cli installed"
    else
        echo "❌ npm not found. Please install Node.js first"
        return 1
    fi
}

# Install sqlfluff (SQL linter)
install_sqlfluff() {
    echo "🗃️  Installing sqlfluff..."
    
    if command -v sqlfluff &> /dev/null; then
        echo "✅ sqlfluff already installed"
        return
    fi
    
    pip3 install sqlfluff
    echo "✅ sqlfluff installed"
}

# Create yamllint config
create_yamllint_config() {
    echo "📝 Creating yamllint configuration..."
    
    cat > .yamllint.yml << 'EOF'
extends: default

rules:
  line-length:
    max: 120
  document-start: disable
  truthy:
    allowed-values: ['true', 'false', 'on', 'off']
EOF
    
    echo "✅ yamllint configuration created"
}

# Create hadolint config
create_hadolint_config() {
    echo "🐳 Creating hadolint configuration..."
    
    cat > .hadolint.yaml << 'EOF'
ignored:
  - DL3008  # Pin versions in apt get install (we handle this in Dockerfile)
  - DL3009  # Delete the apt-get lists after installing something
  - DL3015  # Avoid additional packages by specifying --no-install-recommends

trustedRegistries:
  - docker.io
  - gcr.io
  - registry.hub.docker.com

allowedRegistries:
  - docker.io
  - gcr.io
  - registry.hub.docker.com
EOF
    
    echo "✅ hadolint configuration created"
}

# Create sqlfluff config
create_sqlfluff_config() {
    echo "🗃️  Creating sqlfluff configuration..."
    
    cat > .sqlfluff << 'EOF'
[sqlfluff]
dialect = postgres
templater = jinja
sql_file_exts = .sql,.SQL

[sqlfluff:indentation]
indented_joins = false
indented_ctes = false
indented_using_on = true
template_blocks_indent = true

[sqlfluff:layout:type:comma]
spacing_before = touch
line_position = trailing

[sqlfluff:rules:capitalisation.keywords]
capitalisation_policy = lower

[sqlfluff:rules:capitalisation.identifiers]
capitalisation_policy = lower

[sqlfluff:rules:capitalisation.functions]
capitalisation_policy = lower
EOF
    
    echo "✅ sqlfluff configuration created"
}

# Main installation process
main() {
    echo "🚀 Installing CI/CD tools..."
    
    install_shellcheck || echo "⚠️  shellcheck installation failed"
    install_yamllint || echo "⚠️  yamllint installation failed"
    install_hadolint || echo "⚠️  hadolint installation failed"
    install_ajv_cli || echo "⚠️  ajv-cli installation failed"
    install_sqlfluff || echo "⚠️  sqlfluff installation failed"
    
    echo ""
    echo "📝 Creating configuration files..."
    create_yamllint_config
    create_hadolint_config
    create_sqlfluff_config
    
    echo ""
    echo "🎉 CI/CD tools setup complete!"
    echo ""
    echo "Installed tools:"
    echo "  - shellcheck: Shell script linting"
    echo "  - yamllint: YAML file linting"
    echo "  - hadolint: Dockerfile linting"
    echo "  - ajv-cli: JSON schema validation"
    echo "  - sqlfluff: SQL linting and formatting"
    echo ""
    echo "💡 Run 'scripts/lint-all.sh' to use all linters"
}

main "$@" 