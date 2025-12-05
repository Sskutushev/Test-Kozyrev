# Multi-stage build for an optimized final image size

# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from the Upgrade directory
COPY Upgrade/package*.json ./
RUN npm ci

# Copy source files needed for the build
COPY script.js ./
COPY styles.scss ./
COPY Upgrade/scripts/ ./scripts/
COPY Upgrade/assets/ ./assets/

# Run the full production build (optimizes images, minifies assets)
RUN npm run build

# Stage 2: Production environment
FROM nginx:1.25-alpine

# Copy the optimized assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY Upgrade/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Health check to ensure the server is running
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
