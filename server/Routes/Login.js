const express = require('express')
const route = express.Router()
const LoginController = require('../Controller/Login')

route.post('/checkuser',LoginController.CheckUser)

module.exports = route