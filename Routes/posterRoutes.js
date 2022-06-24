const { Router } = require('express')
const upload = require('../utils/fileUpload')
const {
    getPostersPage,
    addNewPoster,
    addNewPosterPage,
    getOnePoster,
    getEditPosterPage,
    updatePoster,
    deletePoster
} = require('../controllers/postersControllers')
const { protected } = require('../middlewares/auth')
const router = Router()

router.get('/', getPostersPage)
router.get('/add', protected, addNewPosterPage)
router.post('/add', protected, upload.single('image'), addNewPoster)
router.get('/:id', getOnePoster)
router.get('/:id/edit', protected, getEditPosterPage)
router.post('/:id/edit', protected, updatePoster)
router.post('/:id/delete', protected, deletePoster)

module.exports = router