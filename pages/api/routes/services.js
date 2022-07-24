const router = require('express').Router()
const {
  addService,
  updateService,
  getService,
  deleteService
} = require(`${__dirname}/../controllers/services.js`)

router.post('/', addService)
router.patch('/:serviceId', updateService)
router.get('/:serviceId?', getService)
router.delete('/:serviceId?', deleteService)

module.exports = router
