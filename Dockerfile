# Stage 1: Build the React application
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# KOREKSI: Ubah menjadi 80, karena Nginx secara default berjalan di port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]