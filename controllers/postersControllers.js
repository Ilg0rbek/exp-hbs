const { v4 } = require('uuid')
const { addNewPosterToDB, getAllPosters } = require('../db/posters')

//@route    GET  /posters
//@desc     Get posters page
//access    Public
const getPostersPage = async (req, res) => {
    const posters = await getAllPosters()
    res.render('poster/posters', {
        title: 'Posters page',
        url: process.env.url,
        posters
    })
}

//@route    GET  /add-poster
//@desc     

const addNewPosterPage = (req, res) => {
    res.render('poster/add-poster', {
        title: "Yangi elon qoshish",
        url: process.env.url
    })
}

const addNewPoster = async (req, res) => {
    const { title, amount, region, image, describe } = req.body
    const poster = {
        id: v4(),
        title,
        amount,
        region,
        image,
        describe
    }
    await addNewPosterToDB(poster)
    res.redirect('/')
}

module.exports = {
    getPostersPage,
    addNewPosterPage,
    addNewPoster
}