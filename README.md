# Introduction to API'S


Prerequistes
- install npm
- install latest version of node
- install postman


## Theoretical

Link to slides https://docs.google.com/presentation/d/1V7LihAqOY_hT5MeuNKIDnXUKGXJ3ur9ivI3xpdS57Mg/edit?usp=sharing

### What is an API

The term API is an acronym, and it stands for “Application Programming Interface.”

Think of an API like a waiter in a restaurant. He provides the menu which provides a list of dishes you can order, along with a description of each dish. When you specify what menu items you want, the restaurant’s kitchen does the work and provides you with some finished dishes. You don’t know exactly how the restaurant prepares that food, and you don’t really need to. The waiter goes and fetches the dish for you.

Similarly, an API lists a bunch of operations that developers can use, along with a description of what they do. 
In other words, if you want to interact with a computer or system to retrieve information or perform a function, an API helps you communicate what you want to that system so it can understand and fulfill the request. 

The client makes use of the API to request specific information. The API will go fetch a resource, which can be any object the API can offer info about. A server is any system that contains resources that the client wants.


For example, instagram’s API would offer a sso service in their API, which will allow consumers of the API to use their sso to authenticate their application. The application is not affiliated with instagram, nor does it care under the hood how the authentication process is down. You as the consumer just enter your details, the API of the social media login does the work in background and then gives you access to enter the website.

- Mini Range is the client
- Instagram’s user via the api is the resource used to authenticate
- Instagrams acts as the server, to cross reference the user credentials



What is a RESTFUL API

Brief History of REST
Before the launch of the REST protocol in 2000, web developers had no standard of how to develop a web API or even use one. Many protocols were used at that time, but they proved too tedious and complicated to carry out. Together with his colleagues, Roy Fielding sought to address this problem and developed what is known today as the REST protocol. The development of REST allowed two servers to exchange data worldwide. 

REST-compliant systems are called RESTful systems. These systems are characterized by their statelessness and the separation of client and server concerns. Since its launch in 2000, many companies such as eBay and Amazon have used the REST protocol. 

The 5 Principles of REST 
REST has five basic principles that it operates with.

1. Client-Server Mandate
The REST protocol allows for independent implementation for the client and the server. This independence means that both parties can make changes without knowing or interacting with one another.

2. Statelessness
which means calls can be made independent of one another. Not saving means the server treats every session as new and cannot take advantage of any previous information stored on the server.

3. Cacheable 
The response is cachable.
Caching Reduces bandwidth and decrease latency by decreasing the number of trips to and from the server for fetching data from memory.

4. Uniform Interface
The client and server interact in a uniform and predictable way. An important aspect of this is that the server exposes resources.

5. Layered System
The application behaves the same regardless of any intermediaries between the client and server.

### How REST API's work

As we have now established, REST defines the structure of an API with a set of rules. 
One rule states that linking to a URL should always return some information.

Every URL is known as a Request, whereas the data returned is known as Response.
The end of the url path which in out case it ‘prideandprejudice’ is what we call an endpoint. This communicates back and forth with a server to which it is connected to but we will see more of this in the practical.


REST API breaks a transaction down to generate a sequence of small components. Every component addresses a specific fundamental aspect of a transaction. It uses the following HTTP requests:

- GET request to fetch data
- PUT request to alter the state of data 
- POST request  to create data
- DELETE request to eliminate it



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
// The http method - GET maps to the READ crud function
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

// If it is not a cake from the list, we return 'false'
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

### 4. Delete the cake

The last route we will be creating is the delete request.

```
app.delete('/cakes', (request, response) => {
    const cakeTodelete = request.body.name

    cakes = cakes.filter((cake) => cake.name !== cakeTodelete)

    return response.json(cakes)
})
```