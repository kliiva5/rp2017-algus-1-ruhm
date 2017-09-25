const Topic = require('../models/topics')

module.exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({})
    return res.json({ topics })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
}

module.exports.getTopic = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400)
    const topic = await Topic.findById(id)
    return res.json({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
}

module.exports.postTopic = async (req, res) => {
  try {
    const { name } = req.body
    const newTopic = new Topic({ name })
    const topic = await newTopic.save()
    return res.status(201).send({ topic })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
}

module.exports.putTopic = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    await Topic.findByIdAndUpdate(id, { name })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
}

module.exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params
    await Topic.findByIdAndUpdate(id, { deleted: new Date() })
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(400).send({ error: { msg: 'something went wrong here' } })
  }
}
