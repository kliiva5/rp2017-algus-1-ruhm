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

router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400)

  try {
    const topic = await Topic.findById(id)
    return res.json({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.post('/', async (req, res) => {
  const { name } = req.body

  try {
    const newTopic = new Topic({ name })
    const topic = await newTopic.save()
    return res.status(201).send({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    await Topic.findByIdAndUpdate(id, { name })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Topic.findByIdAndUpdate(id, { deleted: new Date() })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

module.exports = router
