import express from 'express'
import bodyParser from 'body-parser'

const PORT = 4000
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.listen(PORT, ()=>console.log(`Server running on: http://localhost:${PORT}`))

let cakes = [
                { 
                    Name: "Red velvet",
                    TierNumber: 2,
                    Price: "£6.99"
                }
            ]
// app.get(`/`, (request, response) => {
//     response.send("welcome")
// })

app.get(`/cakes`, (request, response) => {
    response.json(cakes)
})