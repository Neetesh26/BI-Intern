FROM node:22

WORKDIR /EcomBackend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node","dist/server.js"]