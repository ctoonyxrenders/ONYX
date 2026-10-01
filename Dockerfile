# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the project
COPY . .

# Copy .env for build-time env vars
COPY .env .env

# Build Next.js app (this reads NEXT_PUBLIC_* vars from .env)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
