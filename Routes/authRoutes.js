const { Router } = require('express')
const {
    getLoginPage,
    getRegisterPage,
    registerNewUser,
    LoginUSer
} = require('../controllers/authControllers')

const router = Router()

router.get('/login', getLoginPage)
router.post('/login', LoginUSer)
router.get('/signup', getRegisterPage)
router.post('/signup', registerNewUser)


module.exports = router