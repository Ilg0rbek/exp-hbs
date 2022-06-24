const User = require('../models/userModel')


//@route    GET  /profile/:username 
//@desc     Get User proflie page
//access    Private

const getProfilePage = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.params.username })
            .populate('posters')
            .lean()
        if (!user) throw new Error("Bunday foydalanuvchi yoq")
        res.render('profile/profile', {
            title: `${user.username}`,
            url: process.env.url,
            user,
            posters: user.posters,
            isAuth: req.session.isLogged
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getProfilePage
}