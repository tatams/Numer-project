const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']
const a = {
    apiKey: {
        type: "apiKey",
        name: "authorization",
        in: "headers",
        description : "Enter Token"
      }
}

const doc = {
  info: {
    title: "Example API",
    version: "1.0.0"
  },
  securityDefinitions:a
}

swaggerAutogen(outputFile, endpointsFiles,doc)