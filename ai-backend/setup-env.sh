#!/bin/bash

# Setup Environment for Sport Scribe AI Backend
# This script helps contributors quickly set up their development environment

echo "🏈 Setting up Sport Scribe AI Backend environment..."

# Check if env.example exists
if [ ! -f "env.example" ]; then
    echo "❌ Error: env.example not found. Are you in the ai-backend directory?"
    exit 1
fi

# Copy env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "📄 Copying env.example to .env..."
    cp env.example .env
    echo "✅ Created .env file from template"
else
    echo "⚠️  .env file already exists. Skipping copy."
fi

echo ""
echo "🔑 Next steps:"
echo "1. Edit .env file and add your API keys:"
echo "   - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)"
echo "   - RAPIDAPI_KEY (get from https://rapidapi.com/api-sports/api/api-football)"
echo "   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (from your Supabase project)"
echo ""
echo "2. Install dependencies:"
echo "   pip install -r requirements.txt"
echo ""
echo "3. Run the application:"
echo "   python main.py"
echo ""
echo "📚 For more details, see the README.md file" 