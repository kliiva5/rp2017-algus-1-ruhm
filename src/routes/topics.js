const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.json({ topics: [] })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400)

  return res.json({ topics: [] })
})

module.exports = router
