# ===== 1. Build stage =====
FROM node:25-alpine3.21 AS builder

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the source code
COPY . .

# Build the NestJS app (compiles to dist/)
RUN npm run build


# ===== 2. Production stage =====
FROM node:25-alpine3.21 AS production

WORKDIR /app

# Copy only the built files and minimal dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled dist from the builder
COPY --from=builder /app/dist ./dist

# Copy any other necessary files (like .env if needed)
# COPY .env .env

# Expose NestJS port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]
