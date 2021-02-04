const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const auth = require('../middelware/auth')
