const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

const UserRouter = require('./src/routes/user-route')
const PageRouter = require('./src/routes/page-route')
const TodoRouter = require('./src/routes/todo-route')

dotenv.config()

require('./db-connection')

app.use(cors())
app.use(bodyParser.json())

app.use('/user',UserRouter)
app.use('/page',PageRouter)
app.use('/todo',TodoRouter)

app.get('/', (req, res) => {
    res.send('Homepage')
})

module.exports = app