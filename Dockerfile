# frontend/Dockerfile

# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install Yarn
RUN corepack enable

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Yarn
RUN corepack enable

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Set environment variables
ENV NODE_ENV=production

# Expose the port Next.js app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
