const express = require('express')
const router = express.Router()
const devsController = require('../controllers/devs')

router.get('/', devsController.getDevs)

router.post('/createDev', devsController.createDev)
router.post('/createDev2', devsController.createDev2)

module.exports = router