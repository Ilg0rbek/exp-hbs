const { Router } = require('express')
const {
    getLoginPage,
    getRegisterPage,
    registerNewUser,
    LoginUSer,
    logOut
} = require('../controllers/authControllers')
const { guest } = require('../middlewares/auth')
const router = Router()

router.get('/login', guest, getLoginPage)
router.post('/login', guest, LoginUSer)
router.get('/signup', guest, getRegisterPage)
router.post('/signup', guest, registerNewUser)
router.get('/logout', logOut)


module.exports = router