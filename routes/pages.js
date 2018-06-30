const express = require('express')
const pageController = require('../controllers/pages')
const router = express.Router()

router.get('/', pageController.index)
router.get('/sobre', pageController.sobre)

module.exports = router 