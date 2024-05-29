FROM node:22-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY src/ .

EXPOSE 8000

CMD ["npm", "app"]