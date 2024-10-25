const express = require('express')
const countryRoutes = require('./routes/countryRoutes')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000', // Permite requisições do frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}

const app = express()

// Middlewares
app.use(express.json())
app.use(cors(corsOptions)) // Habilita CORS com as opções definidas

// Rotas
app.use('/api/countries', countryRoutes)

module.exports = app
