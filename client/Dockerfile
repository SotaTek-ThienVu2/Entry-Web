FROM node:13-alpine

EXPOSE 3000

WORKDIR /usr/src/client

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]