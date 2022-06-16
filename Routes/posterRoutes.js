const { Router } = require('express')
const { getPostersPage, addNewPoster } = require('../controllers/postersControllers')
const router = Router()

router.get('/', getPostersPage)
router.get('/add', addNewPoster)


module.exports = router