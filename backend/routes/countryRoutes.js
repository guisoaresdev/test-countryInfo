// routes/countryRoutes.js
const express = require('express')
const router = express.Router()
const {
  getAvailableCountries,
  getCountryInfo,
} = require('../controllers/countryController')

router.get('/', getAvailableCountries)
router.get('/:countryCode', getCountryInfo)

module.exports = router
