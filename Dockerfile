FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY .eslintrc.js nest-clie.json tsconfig.json tsconfig.build.json ./

COPY docker.env /app/.env

CMD ["npm", "run", "start"]