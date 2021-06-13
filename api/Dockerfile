FROM node:12.12.0

LABEL version="1.0"

WORKDIR /home/node/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 60

CMD ["nodemon", "./bin/www"]