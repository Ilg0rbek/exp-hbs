const User = require('../models/userModel')


//@route    GET  /profile/:username 
//@desc     Get User proflie page
//access    Private

const getProfilePage = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).lean()
        if (!user) throw new Error("Bunday foydalanuvchi yoq")
        res.render('profile/profile', {
            title: `${user.username}`,
            url: process.env.url,
            user,
            isAuth: req.session.isLogged
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getProfilePage
}