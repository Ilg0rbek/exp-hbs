const User = require('../models/userModel')


//@route    GET  /profile/:username 
//@desc     Get User proflie page
//access    Private

const getProfilePage = async (req, res) => {
    try {
        const userProfile = await User
            .findOne({ username: req.params.username })
            .populate('posters')
            .lean()
        if (!userProfile) throw new Error("Bunday foydalanuvchi yoq")
        let isMe = false
        if (req.session.user) {
            isMe = userProfile._id == req.session.user._id.toString()
        }
        res.render('profile/profile', {
            title: `${userProfile.username}`,
            url: process.env.url,
            user: req.session.user,
            userProfile,
            isMe,
            posters: userProfile.posters,
            isAuth: req.session.isLogged
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getProfilePage
}