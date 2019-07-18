<<<<<<< HEAD
const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/userController')

Router.post('/signup', UserController.signup)
Router.post('/signin', UserController.signin)

module.exports = Router
=======
const router= require('express').Router()
const userController= require('../controllers/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports=router
>>>>>>> done backend
