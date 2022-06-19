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

2. Creat first route
API routes hwoever non exist - test on postman

```
// The code below creates a GET route with these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to execute
app.get('/', (request, response) => {
  // The string we want to display on http://localhost:3000
  response.send('Welcome on the books API! Take a breath and start using it!')
})
```

Now let's be more specific to get all books, where we give a specfic route name, returning in JSON which isa popular format for API/

```
app.get(`/cakes`, (request, response) => {
    response.json(cakes)
})
```

Create a route to add a Cake

In order to recieve parameters we need to install the npm package body-parser.

```
npm install body-parser
```

```
// Import body-parser (to handle parameters more easily)
import bodyParser from 'body-parser'
```
```
/ Indicate to Express.js that you're using an additional plugin to treat parameters
app.use(bodyParser.urlencoded({ extended: true }))
```
The first function parameter request will be useful to access the body of the request. You can do the following to get a parameter: request.body.parameterName.

```
app.post('/addCakes', (request, response) => {
    const cakeName = request.body.name
    const cakeTier = request.body.tierNumber
    const cakePrice = request.body.price
    console.log(request.body)

    let cakeInstance = {
        name: cakeName,
        tierNumber: cakeTier,
        price: cakePrice
    }

    const cakeAlreadyExists = cakes.some(x => x.name === cakeName && x.tierNumber === cakeTier && x.price === cakePrice)

    if (cakeAlreadyExists)
    return response.send("Cake instance already exists")

    cakes.push(cakeInstance)
    console.log(cakes)
    return response.send(`New cake instance: ${cakeInstance.name}, has been added`)
```