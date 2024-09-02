const express = require('express')
const route = express.Router()
const RegistrationController = require('../Controller/Registration')

route.post('/addnewuser',RegistrationController.AddNewUser)
route.get('/verify/:token/:encodedData',RegistrationController.VerifyUser)

module.exports = route;