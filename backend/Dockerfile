
# =========================
# Stage 1: Build
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci


# Copy application source code
COPY src ./src


# =========================
# Stage 2: Production
# =========================
FROM node:22-alpine AS production

WORKDIR /app

# Production environment
ENV NODE_ENV=production

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy application from build stage
COPY --from=build /app/src ./src

# Application port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# Start application
CMD ["node", "src/server.js"]