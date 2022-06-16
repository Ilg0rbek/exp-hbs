//@route    GET  /posters
//@desc     Get posters page
//access    Public
const getPostersPage = (req, res) => {
    res.render('poster/posters',{
        title:'Posters page',
        url:"http://localhost:3001/"
    })
}

//@route    GET  /add-poster
//@desc     

const addNewPoster = (req, res) => {
    res.render('poster/add-poster',{
        title:"Yangi elon qoshish",
        url:"http://localhost:3001/"
    })
}

module.exports = {
    getPostersPage,
    addNewPoster
}