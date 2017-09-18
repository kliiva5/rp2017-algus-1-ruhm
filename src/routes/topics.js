const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator/check')

const Topic = require('../models/topics')

router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find({})
    return res.json({ topics })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400)
    const topic = await Topic.findById(id)
    return res.json({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.post('/', [
  body('name').exists().withMessage('Name must exist')
  .isAlphanumeric().withMessage('Name must contain only letters and numbers')
  .isLength({ min: 4 }).withMessage('Name must be at least 4 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
    const { name } = req.body
    const newTopic = new Topic({ name })
    const topic = await newTopic.save()
    return res.status(201).send({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.put('/:id', [
  body('name').exists().withMessage('Name must exist')
  .isAlphanumeric().withMessage('Name must contain only letters and numbers')
  .isLength({ min: 4 }).withMessage('Name must be at least 4 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

    const { id } = req.params
    const { name } = req.body
    await Topic.findByIdAndUpdate(id, { name })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Topic.findByIdAndUpdate(id, { deleted: new Date() })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
})

module.exports = router
