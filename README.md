# Movie App install instructions:

**Note you need to have a .env file in the backend folder, this file should include API-keys. Ask me personally.:** 

## Database 

**Install docker Desktop:** https://www.docker.com/products/docker-desktop/

**Install postgreSQL docker image:** `docker pull postgres`


**build or pull the Frontend:** 
`
cd Frontend
docker build -t front-end .

or

docker pull docker.io/bewarpiri/front-end:latest
`

**build or pull the Backend:** 
`
cd Backend
docker build -t back-end .

or

docker pull docker.io/bewarpiri/back-end:latest
`

**run docker compose:** 
`
docker-compose up
`

**frontend is available at localhost:5173**


## About the tech-stack:

Stack:
Frontend:

JavaScript
React
Tailwind CSS
Daisy UI

Backend:
Node.js
Express.js
PostgreSQL

APIs:
OMDB API (Movie search)
OpenAI API (AI-based movie recommendations)

Development Tools:
Docker (container technology)
Vite (Build tool)
Nodemon (Development server)
Postman (API testing)

Stack:
PERN: PostgreSQL, Express.js, React, Node.js

Package Manager:
npm
