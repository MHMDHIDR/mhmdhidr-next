//require librairies/frameworks
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')
const fileUpload = require('express-fileupload')

//PORT
const PORT = process.env.PORT || 5000

//DON't SHOW EXPRESS IN RESPONSE
app.disable('x-powered-by')

//APP Use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(
  cors({
    origin: [`https://mhmdhidr.netlify.app`, `http://dev.com:3000`]
  })
)

//Main GET Route
app.get('/', (req, res) =>
  res.send(
    `<body style='overflow:hidden;word-spacing:2rem;height:100vh;display:grid;place-items:center;font-size:3em;font-weight:bold;color:white;background-color:#222'>WELCOME TO MY PORTFOLIO API</body>`
  )
)

// Use Routes
app.use('/settings', require(`${__dirname}/routes/settings.js`))
app.use('/works', require(`${__dirname}/routes/works.js`))
app.use('/services', require(`${__dirname}/routes/services.js`))
app.use('/users', require(`${__dirname}/routes/users.js`))

connectDB()

app.listen(PORT, () =>
  console.log(`CONNECTED TO MONGO AND SERVER STARTED ON PORT => ${PORT}`)
)
