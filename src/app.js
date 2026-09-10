const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.status(200).json({
    mensagem: 'API de gerenciamento de tarefas está funcionando.',
  });
});

module.exports = app;
