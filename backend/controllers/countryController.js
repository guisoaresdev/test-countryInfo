const {
  fetchAvailableCountries,
  fetchCountryInfo,
} = require('../services/countryService')

async function getAvailableCountries(req, res) {
  try {
    const countries = await fetchAvailableCountries()
    res.json(countries)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Erro ao buscar lista de países', details: error.message })
  }
}

async function getCountryInfo(req, res) {
  const { countryCode } = req.params
  try {
    const countryInfo = await fetchCountryInfo(countryCode)
    res.json(countryInfo)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Erro ao buscar informações do país',
      details: error.message,
    })
  }
}

module.exports = { getAvailableCountries, getCountryInfo }
