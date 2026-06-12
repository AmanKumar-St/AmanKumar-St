FROM node:22-alpine
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Start development server with nodemon auto-reload
CMD ["npm", "run", "dev"]
