const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

// routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')

port = process.env.PORT | 8080
const app = express()

app.use(express.json())

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/todo', todoRoutes)

app.get('/', (req, res) => {
  res.send("hello world!")
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
})