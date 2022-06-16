//@route    GET  /
//@desc     Get home page
//access    Public
const getHomePage = (req, res) => {
    res.render('home')
}
module.exports = {
    getHomePage
}