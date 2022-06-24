const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

//@route    GET  /auth/login 
//@desc     Get login page
//access    Public
const getLoginPage = (req, res) => {
    if (!req.session.isLogged) {
        res.render('auth/login', {
            title: "Login",
            url: process.env.url
        })
    }
}

//@route    GET  /auth/register 
//@desc     Get register page
//access    Public
const getRegisterPage = (req, res) => {
    if (!req.session.isLogged) {
        res.render('auth/signup', {
            title: "Registratsiya",
            url: process.env.url
        })
    }
}

//@route    POST  /auth/signup 
//@desc     Register new users to DataBase
//access    Public
const registerNewUser = async (req, res) => {
    try {
        const { email, username, phone, password, password2 } = req.body
        const salt = await bcrypt.genSalt(12)
        const hashedpassword = await bcrypt.hash(password, salt)
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
            password: hashedpassword
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
            const matchPassword = await bcrypt.compare(req.body.password, userExist.password)
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

//@route    Get  /auth/logout 
//@desc     Logout  users to Website
//access    Private

const logOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

module.exports = {
    getLoginPage,
    getRegisterPage,
    registerNewUser,
    LoginUSer,
    logOut
}