# api101-workshop-BE

# api101-workshop-BE

Prerequistes
- install npm
- install latest version of node
- install postman

Things we will be covering

Theorectical

1. What is an API and how is it used?
2. What is Postman
3. What is express


Pracitcal

1. Setup the project and initalise the api
3. Create first route
4. Route to get all cakes listings
5. Route to add a cake listing
6. Route to delete a cake listing
7. Route to ipdate a cake listing
8. Consume the api

### 1. Setup project and initalise the api 

The first thing we will be doing create a space for us to setup our api.
Create your project repository

```
$ mkdir cake-listing-api
```

Move into your project folder:

```
$ cd cake-listing-api
```

 Initialize your Node.Js project with default parameters

```
$ npm init -y
```

Default parameters of `npm init -y` indicate `index.js` as an entry point of the application.
So we need to create it.

```
$ touch index.js
```

Next thing to do is to install Express:

```
npm install express
````

Now we update our package.json tO use the latest javascript: 

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
  console.log(``Server running on: http://localhost:${PORT}``)
)
```
To run the application run the following:

```
node index.js
```

>Show example of what happens when we make a change to ie port number to show that it needs to be manually restarted.

Nodemon is a tool that helps develop Node. js based applications by automatically restarting the node application when file changes in the directory are detected.

```
npm i nodemon
```

Now update our our package.json to include the script to run nodemon

```
"scripts": {
    "start": "nodemon index.js"
},
```

Now run nodemon

```
$ nodemon
```
We have successfully setup and initalised our server. Now we need to build out our api.

### 2. Create first route

As we already know, the backbone of an API is the ability to navigate through routes. Which currently is non existent. As seen on postman. Let's fix that.

```
// The code below creates a GET route with these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to execute
app.get('/', (request, response) => {
  // The string we want to display on http://localhost:3000
  response.send('Welcome on the Cakes API!")
})
```

Now let's be more specific to get all cake listings, where we give a specfic route name,
returning in JSON which is a popular format for API.

As mentioned before, we will not be using a database, so instead we create a object to contain a cake listing, that will always be availble when we start our server. 
```
let cakes = [
    {
        name: "Red velvet",
        tierNumber: 2,
        price: "£6.99"
    }
]
```

Now let's create our first endpoint, that will allow our api to consume the cake object that we have created.

```
app.get(`/cakes`, (request, response) => {
    response.json(cakes)
})
```

Now if we were to go back on postman to check our endpoint we should see a json object displayed.
And so you have created your first GET request. now let's add more cakes on to our listings!

### 3. Create a route to add a Cake by creating a PUT request

In the UI PUT requests work by inserting to a form. That specific information wil then be used to create a new insatnce.
In order to recieve parameters we need to install the npm package body-parser.

```
npm install body-parser
```

```
// Import body-parser (to handle parameters more easily)
import bodyParser from 'body-parser'
```

Indicate to Express.js that you're using an additional plugin to treat parameters
```
app.use(bodyParser.urlencoded({ extended: true }))
```

Let's build out our PUT request

```
app.post('/addCakes', (request, response) => {
    const cakeNameBody = request.body.name
    const cakeTierBody = request.body.tierNumber
    const cakePriceBody = request.body.price

    let cakeInstance = {
        name: cakeNameBody,
        tierNumber: cakeTierBody,
        price: cakePriceBody
    }

    const cakeAlreadyExists = cakes.some(cake => cake.name === cakeNameBody && cake.tierNumber === cakeTierBody && cake.price === cakePriceBody)

    if (cakeAlreadyExists)
        return response.send("Cake instance already exists")

    cakes.push(cakeInstance)
    return response.send(`New cake instance: ${cakeInstance.name}, has been added`)
})
```
Let's now go check our postman by creating a PUT request, and see if we can add a new cake listing.

### 3. Update a cake

Update a specific cake by creating an update route.

```
app.put('/cakes', (request, response) => {
  // We get the parameters 'nameToUpdate' and 'updatedName' from the body
    const cakeNameToUpdate = request.body.nameToUpdate
    const updatedCakeName = request.body.updatedName

    const cakeTierToUpdate = request.body.tierToUpdate
    const updatedCakeTier = request.body.updatedTier

// We search if the cake to update is in the list
    const indexOfCakeToUpdate = cakes.findIndex(
        (cake) => cake.name === cakeNameToUpdate || cake.tierNumber === cakeTierToUpdate
    )
    console.log(updatedCakeTier, cakeNameToUpdate)
    if (indexOfCakeToUpdate === -1) return response.json(
        {
            success: false
        }
    )

// If it is not a book from the list, we return 'false'
    if (updatedCakeTier != undefined) {
        cakes[indexOfCakeToUpdate].tierNumber = updatedCakeTier

    }

    if (updatedCakeName != undefined) {
        cakes[indexOfCakeToUpdate].name = updatedCakeName

    }
    return response.json({ success: true })
})
```
Again we check on postman that we are bale to update the a cake instance successfully.

### 4. Delete the book

The last route we will be creating is the delete request.

```
app.delete('/cakes', (request, response) => {
    const cakeTodelete = request.body.name

    cakes = cakes.filter((cake) => cake.name !== cakeTodelete)

    return response.json(cakes)
})
```

What a route is? A route is the complete URL path. For example "http://localhost:3000/books".

What an endpoint is? An endpoint is the end of your URL path. For example if your full URL is "http://localhost:3000/books", your endpoint is "/books".a