# Stage 1: Build the React app
FROM node:16 as build

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the React app, which will output to the 'dist' folder
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output from 'dist' to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
