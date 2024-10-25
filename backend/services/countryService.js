const axios = require('axios')
require('dotenv').config()

const BASE_URL_DATE_NAGER = process.env.BASE_URL_DATE_NAGER
const BASE_URL_COUNTRIES_NOW = process.env.BASE_URL_COUNTRIES_NOW

// Função para buscar países disponíveis
async function fetchAvailableCountries() {
  const response = await axios.get(`${BASE_URL_DATE_NAGER}/AvailableCountries`)
  return response.data
}

// Função para buscar informações detalhadas do país
async function fetchCountryInfo(countryCode) {
  const [borderData, populationData, flagData] = await Promise.all([
    axios.get(`${BASE_URL_DATE_NAGER}/CountryInfo/${countryCode}`),
    axios.get(`${BASE_URL_COUNTRIES_NOW}/countries/population`),
    axios.get(`${BASE_URL_COUNTRIES_NOW}/countries/flag/images`),
  ])

  // Filtrar dados conforme necessário para o frontend
  const borders = borderData.data.borders

  const population = populationData.data.data.find(
    (country) => country.iso2 === countryCode,
  )
  const populationCounts = population ? population.populationCounts : []

  const flag = flagData.data.data.find(
    (country) => country.iso2 === countryCode,
  )?.flag

  return { borders, population: populationCounts, flag }
}

module.exports = { fetchAvailableCountries, fetchCountryInfo }
