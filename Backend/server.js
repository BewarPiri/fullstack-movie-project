import express from "express"

const app = express()
const API_KEY = process.env.API_KEY

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})