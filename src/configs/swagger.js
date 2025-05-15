import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'Tài liệu Swagger cho hệ thống bán hàng GUYFORM',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/configs/swaggerOutput.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
