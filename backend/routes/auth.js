const AuthController = require('../controllers/authController')
const {Router} = require('express')
const Auth = require('../middleware/auth')

const router = new Router()

router.post('/', AuthController.authenticate)
router.get('/',  Auth.user, AuthController.getUserData)

module.exports = router