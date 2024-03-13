FROM node:20.9.0 as build
WORKDIR /usr/app
COPY . .

CMD ["npm","run","dev"]