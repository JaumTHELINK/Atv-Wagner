const { Usuario } = require('../database/models/Usuario');

class UsuarioRepository {
  async criar(data) {
    return Usuario.create(data);
  }

  async buscarPorId(id) {
    return Usuario.findByPk(id);
  }
}

module.exports = UsuarioRepository;
