//@route    GET  /
//@desc     Get home page
//access    Public
const getHomePage = (req, res) => {
    res.render('home', {
        title: "Home page",
        url: process.env.url,
        user: req.session.user,
        isLogged:req.session.isLogged
    })
}
module.exports = {
    getHomePage
}