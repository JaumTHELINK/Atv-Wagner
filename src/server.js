const app = require('./app');
const { sequelize } = require('./infrastructure/database/connection');
const { Usuario } = require('./infrastructure/database/models/Usuario');
const { Tarefa } = require('./infrastructure/database/models/Tarefa');

const PORT = process.env.PORT || 3000;

Usuario.hasMany(Tarefa, {
  foreignKey: 'usuarioId',
  as: 'tarefas',
});

Tarefa.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario',
});

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
    process.exit(1);
  });
