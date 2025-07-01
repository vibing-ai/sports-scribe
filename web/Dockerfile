FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install next-themes
RUN npm install -D typescript @types/react @types/node @types/react-dom

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 