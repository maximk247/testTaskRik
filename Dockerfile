# Use official Node.js image as the base
FROM node:16.17.0 as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use Nginx to serve the Angular application
FROM nginx:alpine
COPY --from=build /app/dist/test-task-rik /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
