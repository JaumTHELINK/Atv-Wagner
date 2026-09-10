const Tarefa = require('../../../domain/entities/Tarefa');
const { AppError, NotFoundError } = require('../../../domain/errors/AppError');

class AtualizarTarefaService {
  constructor({ tarefaRepository }) {
    this.tarefaRepository = tarefaRepository;
  }

  async execute(id, dados) {
    const tarefaExistente = await this.tarefaRepository.buscarPorId(id);
    if (!tarefaExistente) {
      throw new NotFoundError('Tarefa não encontrada.');
    }

    const dadosAtualizados = {
      titulo: dados.titulo ?? tarefaExistente.titulo,
      descricao: dados.descricao ?? tarefaExistente.descricao,
      status: tarefaExistente.status,
      usuarioId: tarefaExistente.usuarioId,
    };

    try {
      const entidade = new Tarefa(dadosAtualizados);
      await this.tarefaRepository.atualizar(id, {
        titulo: entidade.titulo,
        descricao: entidade.descricao,
      });

      return this.tarefaRepository.buscarPorId(id);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}

module.exports = AtualizarTarefaService;
