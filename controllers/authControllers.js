const User = require('../models/userModel')

//@route    GET  /auth/login 
//@desc     Get login page
//access    Public
const getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: "Login",
        url: process.env.url
    })
}

//@route    GET  /auth/register 
//@desc     Get register page
//access    Public
const getRegisterPage = (req, res) => {
    res.render('auth/signup', {
        title: "Registratsiya",
        url: process.env.url
    })
}

//@route    POST  /auth/signup 
//@desc     Register new users to DataBase
//access    Public
const registerNewUser = async (req, res) => {
    try {
        const { email, username, phone, password, password2 } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.redirect('/auth/signup')
        }
        if (password !== password2) {
            return res.redirect('/auth/signup')
        }
        await User.create({
            email,
            username,
            phone,
            password
        })
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error)
    }
}
//@route    POST  /auth/login 
//@desc     Login  users to Website
//access    Public
const LoginUSer = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            const matchPassword = userExist.password === req.body.password
            if (matchPassword) {
                req.session.user = userExist
                req.session.isLogged = true
                req.session.save((err) => {
                    if (err) throw err
                    res.redirect('/profile/' + req.session.user.username)
                })
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    registerNewUser,
    LoginUSer
}