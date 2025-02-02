const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FAQ System API',
      description: "BharatFD Backend API endpoints for a FAQ System documented on swagger",
      contact: {
        name: "Gaurav Negi",
        email: "negigaurav637@gmail.com",
        url: "https://github.com/gaurav637/BharatFD_Backend"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:8080",
        description: "Development server"
      }
    ]
  },
  apis: ['./src/**/*.ts', './src/**/*.js', './router/**/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "FAQ System API Documentation"
  }))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`Swagger documentation available at http://localhost:${port}/docs`)
}

module.exports = swaggerDocs