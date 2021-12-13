FROM node:16.13.1

WORKDIR /usr/app/payment

COPY ../paymentapp/package.json .
COPY ../paymentapp/package-lock.json .
COPY ../paymentapp/.env .

#RUN npm install --quiet
RUN npm install

COPY . .