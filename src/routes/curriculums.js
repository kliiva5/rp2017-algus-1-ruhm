const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const curriculums = require('../controllers/curriculums')

const { asyncMiddleware } = require('../utils/common')

router.get('/', asyncMiddleware(curriculums.getCurriculums))
router.post('/', validate.curriculum, asyncMiddleware(curriculums.postCurriculum))

module.exports = router
