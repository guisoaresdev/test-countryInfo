const axios = require('axios')
require('dotenv').config()

const BASE_URL_DATE_NAGER = process.env.BASE_URL_DATE_NAGER
const BASE_URL_COUNTRIES_NOW = process.env.BASE_URL_COUNTRIES_NOW

async function fetchAvailableCountries() {
  const response = await axios.get(`${BASE_URL_DATE_NAGER}/AvailableCountries`)
  return response.data
}

async function fetchCountryInfo(countryCode) {
  const [borderData, flagData, countryInfoData] = await Promise.all([
    axios.get(`${BASE_URL_DATE_NAGER}/CountryInfo/${countryCode}`),
    axios.get(`${BASE_URL_COUNTRIES_NOW}/countries/flag/images`),
    axios.get(`${BASE_URL_DATE_NAGER}/AvailableCountries`),
  ])

  const borders = borderData.data.borders

  // Obter o nome do país a partir da resposta de AvailableCountries
  const countryInfo = countryInfoData.data.find(
    (country) => country.alpha2Code === countryCode,
  )
  const countryName = countryInfo ? countryInfo.name : ''

  // Fazer a requisição para a API de população usando o nome do país
  let populationCounts = []
  if (countryName) {
    const populationResponse = await axios.post(
      `${BASE_URL_COUNTRIES_NOW}/countries/population`,
      {
        country: countryName, // Usando o nome do país na requisição
      },
    )

    // Extraindo dados populacionais
    const populationData = populationResponse.data.data.find(
      (country) => country.country === countryName, // Verifique se a estrutura está correta
    )

    if (populationData) {
      populationCounts = populationData.populationCounts
    }
  }

  const flag = flagData.data.data.find(
    (country) => country.iso2 === countryCode,
  )?.flag

  return { borders, population: populationCounts, flag }
}

module.exports = { fetchAvailableCountries, fetchCountryInfo }
