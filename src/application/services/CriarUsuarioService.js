const Usuario = require('../../domain/entities/Usuario');
const { AppError } = require('../../domain/errors/AppError');

class CriarUsuarioService {
  constructor({ usuarioRepository }) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(dados) {
    try {
      const usuario = new Usuario(dados);

      return this.usuarioRepository.criar({
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new AppError('Já existe um usuário com este email.', 409);
      }

      throw new AppError(error.message, 400);
    }
  }
}

module.exports = CriarUsuarioService;
