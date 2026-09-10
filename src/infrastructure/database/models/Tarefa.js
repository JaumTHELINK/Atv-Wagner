const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const Tarefa = sequelize.define(
  'Tarefa',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    status: {
      type: DataTypes.ENUM('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'),
      allowNull: false,
      defaultValue: 'PENDENTE',
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'usuario_id',
    },
  },
  {
    tableName: 'tarefas',
    timestamps: true,
  }
);

module.exports = { Tarefa };
