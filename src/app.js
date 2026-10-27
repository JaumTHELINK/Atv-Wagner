const express = require('express');
const swaggerUi = require('swagger-ui-express');
let swaggerFile = {};
try {
  swaggerFile = require('../swagger-output.json');
} catch {
  // swagger-output.json will be loaded when generated
}
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (_req, res) => {
  res.status(200).json({
    mensagem: 'API de gerenciamento de tarefas está funcionando.',
  });
});

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  const payload = {
    mensagem: error.message || 'Erro interno do servidor.',
  };

  if (error.detalhes) {
    payload.detalhes = error.detalhes;
  }

  return res.status(status).json(payload);
});

module.exports = app;
