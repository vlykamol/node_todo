const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

port = process.env.PORT | 8080
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
})