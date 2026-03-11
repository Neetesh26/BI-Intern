FROM node:20-alpine

WORKDIR /EcomBackend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node","dist/server.js"]