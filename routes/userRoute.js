const express = require('express')
const { registerUser, loginUser, currentUser } = require('../controllers/userController')
const validationToken = require('../middleware/validationToken')

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/",validationToken , currentUser)


module.exports = router
