const { v4 } = require('uuid')
const { addNewPosterToDB, getAllPosters, getPosterById, editPosterById, deletePosterById } = require('../db/posters')

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
//@desc     Get add-poster page 
//@access   Public
const addNewPosterPage = (req, res) => {
    res.render('poster/add-poster', {
        title: "Yangi elon qoshish",
        url: process.env.url
    })
}

//@route    POST 
//@desc     Add new poster
//@access   Public
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


//@route    GET 
//@desc     Get one poster
//@access   Public
const getOnePoster = async (req, res) => {
    const poster = await getPosterById(req.params.id)
    res.render('poster/one', {
        title: poster.title,
        url: process.env.url,
        poster
    })
}

//@route    GET poster/:id/edit 
//@desc     Get edit poster page
//@access   Private (own)
const getEditPosterPage = async (req, res) => {
    try {
        const poster = await getPosterById(req.params.id)
        res.render('poster/edit-poster', {
            title: "Edit poster page",
            url: process.env.url,
            poster
        })
    } catch (err) {
        console.log(err.message);
    }
}

//@route    POST /:id/edit 
//@desc     Get edit poster page
//@access   Private (own)
const updatePoster = async (req, res) => {
    const { title, amount, region, image, description } = req.body
    try {
        const editedPoster = {
            title,
            amount,
            region,
            image,
            description,
        }
        await editPosterById(req.params.id, editedPoster)
        res.redirect('/posters')
    } catch (error) {
        console.log(error);
    }
}

//@route    POST /:id/delte 
//@desc     Get delte poster 
//@access   Private (own)

const deletePoster = async (req, res) => {
     try {
        await deletePosterById(req.params.id)
        res.redirect('/posters')
     } catch (error) {
        console.log(error);
     }
}

module.exports = {
    getPostersPage,
    addNewPosterPage,
    addNewPoster,
    getOnePoster,
    getEditPosterPage,
    updatePoster,
    deletePoster
}