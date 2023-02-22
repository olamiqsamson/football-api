const router = require('express').Router()
const getAllTeams = require('../controller/teamController')

router.get('/api/v1/teams', getAllTeams)
module.exports = router