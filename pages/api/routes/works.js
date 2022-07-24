const router = require('express').Router()
const {
  addWork,
  updateWork,
  getWork,
  deleteWork
} = require(`${__dirname}/../controllers/works.js`)

router.post('/', addWork)
router.patch('/:workId', updateWork)
router.get('/:workId?', getWork)
router.delete('/:workId', deleteWork)

module.exports = router
