import express from 'express'
import bodyParser from 'body-parser'

const PORT = 4000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`))

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

    let cakeInstance = {
        name: cakeName,
        tierNumber: cakeTier,
        price: cakePrice
    }

    const cakeAlreadyExists = cakes.some(x => x.name === cakeName && x.tierNumber === cakeTier && x.price === cakePrice)

    if (cakeAlreadyExists)
        return response.send("Cake instance already exists")

    cakes.push(cakeInstance)
    return response.send(`New cake instance: ${cakeInstance.name}, has been added`)
})

app.put('/cakes', (request, response) => {
    const cakeNameToUpdate = request.body.nameToUpdate
    const updatedCakeName = request.body.updatedName

    const cakeTierToUpdate = request.body.tierToUpdate
    const updatedCakeTier = request.body.updatedTier

    const indexOfCakeToUpdate = cakes.findIndex(
        (cake) => cake.name === cakeNameToUpdate || cake.tierNumber === cakeTierToUpdate
    )
    console.log(updatedCakeTier, cakeNameToUpdate)
    if (indexOfCakeToUpdate === -1) return response.json(
        {
            success: false
        }
    )

    if (updatedCakeTier != undefined) {
        cakes[indexOfCakeToUpdate].tierNumber = updatedCakeTier

    }

    if (updatedCakeName != undefined) {
        cakes[indexOfCakeToUpdate].name = updatedCakeName

    }
    return response.json({ success: true })
})

app.delete('/cakes', (request, response) => {
  const cakeTodelete = request.body.name  

  cakes = cakes.filter((cake) => cake.name !== cakeTodelete)

  return response.json(cakes)
})