const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

// routes

const userRoutes = require('./routes/userRoutes')

port = process.env.PORT | 8080
const app = express()

app.use(express.json())

app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
})