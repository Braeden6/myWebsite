# Base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Expose the app on port 4173
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "start"]