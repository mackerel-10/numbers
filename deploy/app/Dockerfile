FROM node:20.14-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]