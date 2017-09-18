const express = require('express')
const router = express.Router()

const Topic = require('../models/topics')

router.get('/', (req, res) => {
  Topic.find({}).then(entries => {
    return res.json({ topics: entries })
  }).catch(e => {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400)

  return res.json({ topics: [] })
})

router.post('/', (req, res) => {
  const { name } = req.body

  const newTopic = new Topic({ name })
  newTopic.save()
    .then(topic => {
      return res.status(201).send({ topic })
    })
    .catch(e => {
      console.error(e)
      return res.status(400).send({ error: { msg: 'something went wrong here' } })
    })
})

module.exports = router
