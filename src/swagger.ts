import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json'; // Local onde o JSON será gerado
const endpointsFiles = ['../src/shared/infra/http/routes/index.ts']; // Arquivo(s) com as rotas da API

// Informações da documentação
const doc = {
  info: {
    title: 'Minha API',
    description: 'API gerada automaticamente pelo swagger-autogen',
  },
  host: 'localhost:3333', // Altere para o host correto
  schemes: ['http'],
};

// Gerar o JSON
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentação gerada com sucesso!');
});
