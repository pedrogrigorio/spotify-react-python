FROM node:alpine

WORKDIR /usr/app

COPY package*.json /usr/app
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start-watch"]