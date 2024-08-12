#// Dockerfile
 
FROM node:18-alpine AS base
 
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
 
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN npm run build && npm cache clean --force
 
FROM base AS runner
WORKDIR /app
 
COPY --from=builder /app .
EXPOSE 5173
ENV PORT 5173
CMD ["npm", "run", "dev"]