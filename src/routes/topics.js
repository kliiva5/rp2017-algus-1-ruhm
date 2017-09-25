const express = require('express')
const router = express.Router()
const validate = require('../utils/validate')
const topics = require('../controllers/topics')

router.get('/', topics.getTopics)
router.get('/:id', topics.getTopic)
router.post('/', validate.topic, topics.postTopic)
router.put('/:id', validate.topic, topics.putTopic)
router.delete('/:id', topics.deleteTopic)

module.exports = router
