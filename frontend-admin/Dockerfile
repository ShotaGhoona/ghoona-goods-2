FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV development
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Expose port
EXPOSE 3001

# Start the development server
CMD ["npm", "run", "dev"]