FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# Copy source code with proper ownership
COPY --chown=nextjs:nodejs . .

# Build the application
RUN npm run build

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
