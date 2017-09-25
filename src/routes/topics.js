const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const topics = require('../controllers/topics')
const { asyncMiddleware } = require('../utils/common')

router.get('/', asyncMiddleware(topics.getTopics))
router.get('/:id', asyncMiddleware(topics.getTopic))
router.post('/', validate.topic, asyncMiddleware(topics.postTopic))
router.put('/:id', validate.topic, asyncMiddleware(topics.putTopic))
router.delete('/:id', asyncMiddleware(topics.deleteTopic))

module.exports = router
