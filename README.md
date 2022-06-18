# api101-workshop-BE

# api101-workshop-BE

Prerequistes
- install npm
- install latest version of node
- install postman

Things we will be covering

1. Setup the project
2. initalise the api
3. create first route
4. Route to get all cakes listings
5. Route to add a cake listing
6. Route to delete a cake listing
7. Route to ipdate a cake listing
8. Consume the api

1. Setup project

```
# Create your project repository
$ mkdir first-api-with-node-and-express

# Move into your project folder
$ cd first-api-with-node-and-express

# Initialize your Node.Js project with default parameters
$ npm init -y

# Default parameters of `npm init -y` indicate `index.js` as an entry point of the application.
# So we need to create it.
$ touch index.js
```
Next thing to do is to install Express

```
npm install express
````

now we update our package json tp use the latest javascript 

```
{
  /* Don't touch to the lines before */
  "dependencies": {
    "express": "^4.17.1"
  },
  /* Add the line below */
  "type": "module"
}
```

Next update your index. js
```
// Import Express.js
import express from 'express'

// This variable defines the port of your computer where the API will be available
const PORT = 3000

// This variable instantiate the Express.js library
const app = express()

// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
  console.log(`The Books API is running on: http://localhost:${PORT}.`)
)
```

odemon is a tool that helps develop Node. js based applications by automatically restarting the node application when file changes in the directory are detected.

```
npm i nodemon
```
inside our package.json

```
"scripts": {
    "start": "nodemon index.js"
},
```