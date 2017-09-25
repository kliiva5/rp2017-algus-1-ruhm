const Curriculum = require('../models/curriculums')

module.exports.getCurriculums = async (req, res) => {
  const curriculums = await Curriculum.find({})
  return res.json({ curriculums })
}

module.exports.postCurriculum = async (req, res, next) => {
  const { curriculum, manager } = req.body
  const newCurriculum = new Curriculum({ curriculum, manager })
  const savedCurriculum = await newCurriculum.save()
    .catch(err => {
      if (err.code === 11000) {
        return res.status(422).json({ errors: [{ msg: 'Duplicate key curriculum' }] })
      }
      next(err)
    })
  return res.status(201).send({ curriculum: savedCurriculum })
}
