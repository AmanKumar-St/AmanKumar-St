# Stage 1: Build Tailwind CSS
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tailwind.config.js ./
COPY index.html ./
COPY src/ ./src/
RUN npm run build:css

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine
COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/dist/ /usr/share/nginx/html/dist/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
