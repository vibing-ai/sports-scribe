# Web Platform - Sport Scribe

## Overview

Next.js web platform for publishing and managing AI-generated sports articles.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS + Hero UI
- Supabase (Database & Auth)
- Framer Motion (for animations)

## Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Hero UI Configuration

This project uses Hero UI for components. Key files:

- `app/providers.tsx` - Hero UI provider setup
- `tailwind.config.js` - Hero UI plugin configuration
- `.npmrc` - pnpm hoisting configuration (if using pnpm)

## Features

- Real-time article publishing
- Admin dashboard
- Article management
- Analytics and monitoring
