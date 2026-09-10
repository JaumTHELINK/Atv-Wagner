const Tarefa = require('../../../domain/entities/Tarefa');
const { AppError, NotFoundError } = require('../../../domain/errors/AppError');

class IniciarTarefaService {
  constructor({ tarefaRepository }) {
    this.tarefaRepository = tarefaRepository;
  }

  async execute({ tarefaId, usuarioId }) {
    const tarefa = await this.tarefaRepository.buscarPorId(tarefaId);
    if (!tarefa) {
      throw new NotFoundError('Tarefa não encontrada.');
    }

    if (tarefa.usuarioId !== Number(usuarioId)) {
      throw new AppError('A tarefa não pertence ao usuário informado.', 400);
    }

    const totalEmAndamento = await this.tarefaRepository.contarPorUsuarioEStatus(
      usuarioId,
      'EM_ANDAMENTO'
    );

    if (totalEmAndamento >= 5) {
      throw new AppError(
        'Limite de 5 tarefas em andamento atingido para este usuário.',
        400
      );
    }

    const tarefaEmDominio = new Tarefa({
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      usuarioId: tarefa.usuarioId,
    });

    tarefaEmDominio.iniciar();

    await this.tarefaRepository.atualizar(tarefaId, {
      status: tarefaEmDominio.status,
    });

    return this.tarefaRepository.buscarPorId(tarefaId);
  }
}

module.exports = IniciarTarefaService;
