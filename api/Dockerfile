FROM node:12.18.3

LABEL version="1.0"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 60

CMD ["nodemon", "./bin/www"]