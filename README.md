# Cloudfift-Backend
Backend written with Express NodeJS
Email & Password is used for authentication.

The API based on Node.js, Express, MongoDB & Redis, following the MVC pattern i.e. Model View Controller.

Mongoose is used for storing Users in Database. Redis is used for storing Refresh Tokens - to validate them as well at the same time Blacklisting them.

To start setting up the project
Step 1: Clone the repo

git clone https://github.com/chiysom/Cloudfift-Backend.git

Step 2: cd into the cloned repo and run:

npm install

Step 3: Put your credentials in the .env file.

PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER
REFRESH_TOKEN_SECRET=GENERATE_FROM_GENERATE_KEYS_FILE_IN_HELPER

Step 4: To generate 256-bit keys for JWT

node ./helpers/generate_keys.js

Step 5: Run Mongo daemon

brew service mongod start

Step 6: Start the API by

npm start
