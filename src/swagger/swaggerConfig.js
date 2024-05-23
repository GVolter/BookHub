const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookHub API',
      version: '1.0.0',
      description: 'BookHub API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
