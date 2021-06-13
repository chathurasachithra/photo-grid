FROM node:12.18.0

LABEL version="1.0"

WORKDIR /home/node/web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]