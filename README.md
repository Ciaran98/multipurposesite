# Multipurpose Site

This is a multipurpose site that will have multiple functions, these are:

- Store
- Social Network
- More to be added later

## Step by step process

_01/06/2022_

Created mongoDB database  
Created .gitignore  
Created README.md

- git init
- npm init

install dependencies

- npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request

```
Express = For backend framework
Express-validator = Data validation for api
Bcryptjs = Data encryption for passwords
Config = For global variables
Gravatar = For user profile pictures
JSONwebtoken = Token for user validation
Mongoose = Interact with database
Request = HTTP request
```

Install dev dependencies

- npm i -D nodemon concurrently

```
Nodemon = Watch server so refresh after changes is not needed
Concurrently = Run front-end and back-end server concurrently
```

Create Server.js & initiialise Express on server  
Created npm scripts in package.jso  
Created config folder, and default.json, where default variables will be stored  
Created db.js, MongoDB database connection is initialised  
Config folder and its contents not pushed to git as they contain sensitive information  
Initialised Routes and API folder that will contain the routes for the api, these are

- auth
- posts
- products
- profile
- transactions
- users

Defined routes in the server.js file  
Created new workspace on Postman for api testing purposes  
Initialised Models folder for database schemas  
Created User model  
Initialise middleware in server.js  
Created user post request, new user can be registered with name, email, encrypted password, and gravatar picture
