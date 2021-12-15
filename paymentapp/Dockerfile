FROM node:16.13.1

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8002

CMD ["npm", "run", "start:prod"]