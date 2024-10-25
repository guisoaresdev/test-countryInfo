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
    // Primeira chamada para obter os dados do país, incluindo o `commonName`
    const countryDataResponse = await axios.get(
      `${BASE_URL_DATE_NAGER}/CountryInfo/${countryCode}`,
    )
    const { commonName, borders } = countryDataResponse.data

    // Requisição de população usando o `commonName` como o atributo `country`
    const populationData = await axios.post(
      `${BASE_URL_COUNTRIES_NOW}/countries/population`,
      {
        country: commonName,
      },
    )

    // Encontrar os dados de população e extrair a lista de `populationCounts`
    const populationCounts = populationData.data.data.populationCounts || []

    // Requisição para obter o link da bandeira do país
    const flagDataResponse = await axios.get(
      `${BASE_URL_COUNTRIES_NOW}/countries/flag/images`,
    )
    const flag = flagDataResponse.data.data.find(
      (country) => country.iso2 === countryCode,
    )?.flag

    return { borders, population: populationCounts, flag }
  } catch (error) {
    console.error('Erro ao buscar informações do país:', error.message)
    throw error
  }
}

module.exports = { fetchAvailableCountries, fetchCountryInfo }
