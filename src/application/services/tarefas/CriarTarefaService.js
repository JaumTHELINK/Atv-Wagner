const Tarefa = require('../../../domain/entities/Tarefa');
const { AppError, NotFoundError } = require('../../../domain/errors/AppError');

class CriarTarefaService {
  constructor({ tarefaRepository, usuarioRepository }) {
    this.tarefaRepository = tarefaRepository;
    this.usuarioRepository = usuarioRepository;
  }

  async execute({ usuarioId, titulo, descricao = '' }) {
    if (!usuarioId) {
      throw new AppError('O campo usuarioId é obrigatório.', 400);
    }

    const usuario = await this.usuarioRepository.buscarPorId(usuarioId);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    try {
      const tarefa = new Tarefa({
        titulo,
        descricao,
        status: 'PENDENTE',
        usuarioId,
      });

      return this.tarefaRepository.criar({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        status: tarefa.status,
        usuarioId: tarefa.usuarioId,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}

module.exports = CriarTarefaService;
