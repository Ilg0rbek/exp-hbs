
const Poster = require('../models/posterModels')
//@route    GET  /
//@desc     Get home page
//access    Public
const getHomePage = async (req, res) => {
    const poster = await Poster.find().lean()
    res.render('home', {
        title: "Home page",
        url: process.env.url,
        user: req.session.user,
        poster,
        isLogged: req.session.isLogged
    })
}
module.exports = {
    getHomePage
}