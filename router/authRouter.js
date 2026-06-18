const {register,login} = require('../controller/authController')
const express = require("express")
const authenticationRouter = express.Router()


authenticationRouter.post("/register",register)
authenticationRouter.post("/login",login)

module.exports = authenticationRouter
