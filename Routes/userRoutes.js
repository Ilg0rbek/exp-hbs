const { Router } = require('express')
const { getProfilePage } = require('../controllers/profileControllers')


const router = Router()

router.get('/:username', getProfilePage)



module.exports = router