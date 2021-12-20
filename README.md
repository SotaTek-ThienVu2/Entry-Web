### INTRO
This repository contains 3 projects:
- Order Application: orderapp
- Payment Application: paymentapp
- Client Application: client

### HOW TO RUN
- Run with Docker:
    + Open Docker-desktop
    + Copy the contents of `.env.docker` in the `orderapp` and `paymentapp` folders to `.env`
    + config your connection
    + Open terminal and run `docker-compose up`
- Run in local:
    + Copy the contents of `.env.dev` in the `orderapp` and `paymentapp` folders to `.env`
    + Create mysql database `payment` and `order`
    + Config connection in `.env`
    + `npm i --save` to install required dependencies
    + `npm run start` to start the server for each project.
    +  `npm run start:watch` to start the server for each project.
    
### HOW TO TEST
- After running 3 projects, please go to:
  `http://localhost:8000` -> to test the client application,
  `http://localhost:8001/api/` -> to Swagger document for Order Application
  `http://localhost:8002/api/` -> to Swagger document for Payment Application
