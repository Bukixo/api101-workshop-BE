import express from 'express'
import bodyParser from 'body-parser'

const PORT = 4000
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.listen(PORT, ()=>console.log(`Server running on: http://localhost:${PORT}`))

let cakes = [ 
                { 
                    name: "Red velvet",
                    tierNumber: 2,
                    price: "£6.99"
                }
            ]
// app.get(`/`, (request, response) => {
//     response.send("welcome")
// })

app.get(`/cakes`, (request, response) => {
    response.json(cakes)
})

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
})