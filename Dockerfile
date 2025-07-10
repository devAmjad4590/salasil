# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package manifests and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose the Vite dev-server port
EXPOSE 1420

# Default command: start Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
