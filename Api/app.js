require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )