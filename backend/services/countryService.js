const axios = require('axios')
require('dotenv').config()

const BASE_URL_DATE_NAGER = process.env.BASE_URL_DATE_NAGER
const BASE_URL_COUNTRIES_NOW = process.env.BASE_URL_COUNTRIES_NOW

async function fetchAvailableCountries() {
  const response = await axios.get(`${BASE_URL_DATE_NAGER}/AvailableCountries`)
  return response.data
}

async function fetchCountryInfo(countryCode) {
  try {
    const countryDataResponse = await axios.get(
      `${BASE_URL_DATE_NAGER}/CountryInfo/${countryCode}`,
    )
    const { commonName, borders } = countryDataResponse.data

    const populationData = await axios.post(
      `${BASE_URL_COUNTRIES_NOW}/countries/population`,
      {
        country: commonName,
      },
    )

    const populationCounts = populationData.data.data.populationCounts || []

    const flagDataResponse = await axios.get(
      `${BASE_URL_COUNTRIES_NOW}/countries/flag/images`,
    )
    const flag = flagDataResponse.data.data.find(
      (country) => country.iso2 === countryCode,
    )?.flag

    return { borders, population: populationCounts, flag }
  } catch (error) {
    console.error('Error when searching for country data:', error.message)
    throw error
  }
}

module.exports = { fetchAvailableCountries, fetchCountryInfo }
