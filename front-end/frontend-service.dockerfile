# ---------- Stage 1: Build the app ----------
FROM  node:25-alpine3.21 AS builder

# Accept build argument
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL


# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production + build deps)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the app for production
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.29.3-alpine

# Copy build output from Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a basic Nginx config (optional custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
