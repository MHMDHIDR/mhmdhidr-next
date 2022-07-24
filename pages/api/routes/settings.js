const router = require('express').Router()
const { updateSettings, getSettings } = require(`${__dirname}/../controllers/settings.js`)

router.patch('/:settingId', updateSettings)
router.get('/', getSettings)

module.exports = router
