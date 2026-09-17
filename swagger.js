const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    title: 'API de Gerenciamento de Tarefas',
    description:
      'API para gerenciar usuários e tarefas com regras de negócio, documentação interativa e validação estruturada.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    UsuarioInput: {
      type: 'object',
      required: ['nome', 'email'],
      properties: {
        nome: {
          type: 'string',
          minLength: 3,
          example: 'João',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'joao@email.com',
        },
      },
    },
    TarefaInput: {
      type: 'object',
      required: ['usuarioId', 'titulo'],
      properties: {
        usuarioId: {
          type: 'integer',
          example: 1,
        },
        titulo: {
          type: 'string',
          example: 'Estudar Node.js',
        },
        descricao: {
          type: 'string',
          example: 'Revisar Express e padrões de projeto.',
        },
      },
    },
    ErroValidacao: {
      type: 'object',
      properties: {
        mensagem: {
          type: 'string',
          example: 'Dados inválidos.',
        },
        detalhes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              campo: {
                type: 'string',
                example: 'email',
              },
              mensagem: {
                type: 'string',
                example: 'Email inválido.',
              },
            },
          },
        },
      },
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
