const { v4 } = require('uuid')
const { addNewPosterToDB, getAllPosters, getPosterById, editPosterById, deletePosterById } = require('../db/posters')
const Poster = require('../models/posterModels')
const User = require('../models/userModel')

//@route    GET  /posters
//@desc     Get posters page
//access    Public
const getPostersPage = async (req, res) => {
    // const posters = await getAllPosters()
    try {
        if (req.query.search) {
            const { search } = req.query
            const posters = await Poster.find({ title: search }).lean()
            return res.status(200).render('poster/searchResults', {
                title: 'Search result',
                querySearch: req.query.search,
                url: process.env.url,
                posters
            })
        }
        const posters = await Poster.find().lean()
        res.render('poster/posters', {
            title: 'Posters page',
            url: process.env.url,
            posters: posters.reverse()
        })
    }
    catch (err) {
        console.log(err)
    }
}

//@route    GET  /add-poster
//@desc     Get add-poster page 
//@access   Public
const addNewPosterPage = (req, res) => {
    res.render('poster/add-poster', {
        title: "Yangi elon qoshish",
        url: process.env.url,
        user: req.session.user

    })
}

//@route    POST 

//@desc     Add new poster
//@access   Public
const addNewPoster = async (req, res) => {
    try {
        // const poster = {
        //     title: req.body.title,
        //     amount: req.body.amount,
        //     region: req.body.region,
        //     description: req.body.description,
        //     image: 'uploads/' + req.file.filename
        // }
        // await addNewPosterToDB(poster)
        const newPoster = await Poster({
            title: req.body.title,
            amount: req.body.amount,
            region: req.body.region,
            description: req.body.description,
            image: 'uploads/' + req.file.filename,
            auhtor: req.session.user._id
        })
        await User.findByIdAndUpdate(req.session.user._id,
            { $push: { posters: newPoster._id } },
            { new: true, upsert: true }
        )
        await newPoster.save((err, posterSaved) => {
            if (err) throw err
            const posterId = posterSaved._id
            res.redirect('/posters/' + posterId)
        })
    } catch (error) {
        console.log(error.message)
    }
}


//@route    GET 
//@desc     Get one poster
//@access   Public
const getOnePoster = async (req, res) => {
    try {
        // const poster = await getPosterById(req.params.id)
        const poster = await Poster
            .findByIdAndUpdate(
                req.params.id,
                { $inc: { visits: 1 } },
                { new: true }
            )
            .populate('auhtor')
            .lean()

        res.render('poster/one', {
            title: poster.title,
            url: process.env.url,
            poster,
            auhtor: poster.auhtor,
            user: req.session.user
        })
    } catch (err) {
        console.log(err)
    }
}

//@route    GET poster/:id/edit 
//@desc     Get edit poster page
//@access   Private (own)
const getEditPosterPage = async (req, res) => {
    try {
        // const poster = await getPosterById(req.params.id)
        const poster = await Poster.findById(req.params.id).lean()
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
        // await editPosterById(req.params.id, editedPoster)
        await Poster.findByIdAndUpdate(req.params.id, editedPoster)
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
        // await deletePosterById(req.params.id)
        await Poster.findByIdAndRemove(req.params.id)
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