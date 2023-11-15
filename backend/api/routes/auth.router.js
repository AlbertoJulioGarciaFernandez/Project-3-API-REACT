const { signup, login } = require('../controllers/auth.controller.js')

const router = require('express').Router() //le indicamos que vamos a usar el router de express para que maneje las peticiones

router.post('/signup', signup)
router.post('/login', login)

module.exports = router