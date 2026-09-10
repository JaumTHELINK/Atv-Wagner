const { NotFoundError } = require('../../../domain/errors/AppError');

class ExcluirTarefaService {
  constructor({ tarefaRepository }) {
    this.tarefaRepository = tarefaRepository;
  }

  async execute(id) {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    if (!tarefa) {
      throw new NotFoundError('Tarefa não encontrada.');
    }

    await this.tarefaRepository.excluir(id);
    return { mensagem: 'Tarefa removida com sucesso.', id };
  }
}

module.exports = ExcluirTarefaService;
