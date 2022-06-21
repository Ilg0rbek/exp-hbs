const { Router } = require('express')
const { getPostersPage, addNewPoster, addNewPosterPage, getOnePoster } = require('../controllers/postersControllers')
const router = Router()

router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)
router.get('/:id', getOnePoster)

module.exports = router