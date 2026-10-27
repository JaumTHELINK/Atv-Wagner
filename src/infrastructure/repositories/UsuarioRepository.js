const { Op } = require('sequelize');
const { Usuario } = require('../database/models/Usuario');

class UsuarioRepository {
  async criar(data) {
    return Usuario.create(data);
  }

  async buscarPorId(id) {
    return Usuario.findByPk(id);
  }

  async buscarPorNome(nome) {
    return Usuario.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
      },
    });
  }

  async listarTodos() {
    return Usuario.findAll();
  }
}

module.exports = UsuarioRepository;
