FROM node:16.13.1

WORKDIR /usr/app/order

COPY ../orderapp/package.json .
COPY ../orderapp/package-lock.json .
COPY ../orderapp/.env .

#RUN npm install --quiet
RUN npm install

COPY . .