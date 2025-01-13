import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger-output.json'
const endpointsFiles = ['../shared/infra/http/routes/index.ts']

// Informações da documentação
const doc = {
  info: {
    title: 'MY_SALES',
    description: 'Documentation my sales',
  },
  host: 'localhost:3333',
  schemes: ['http'],
}

// Gerar o JSON
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(
  () => {
    console.log('Documentação gerada com sucesso!')
  },
)
