const { Router } = require('express')
const { getPostersPage, addNewPoster, addNewPosterPage } = require('../controllers/postersControllers')
const router = Router()

router.get('/', getPostersPage)
router.get('/add', addNewPosterPage)
router.post('/add', addNewPoster)


module.exports = router