# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build frontend (Vite/Tailwind)
RUN npm run build

# Expose the port Cloud Run will use
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
