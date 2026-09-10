const { Tarefa } = require('../database/models/Tarefa');

class TarefaRepository {
  async listar() {
    return Tarefa.findAll({ order: [['id', 'ASC']] });
  }

  async criar(data) {
    return Tarefa.create(data);
  }

  async buscarPorId(id) {
    return Tarefa.findByPk(id);
  }

  async atualizar(id, data) {
    const tarefa = await this.buscarPorId(id);
    if (!tarefa) {
      return null;
    }

    return tarefa.update(data);
  }

  async excluir(id) {
    const tarefa = await this.buscarPorId(id);
    if (!tarefa) {
      return false;
    }

    await tarefa.destroy();
    return true;
  }

  async contarPorUsuarioEStatus(usuarioId, status) {
    return Tarefa.count({
      where: {
        usuarioId,
        status,
      },
    });
  }

  async listarPorUsuario(usuarioId) {
    return Tarefa.findAll({
      where: { usuarioId },
      order: [['id', 'ASC']],
    });
  }
}

module.exports = TarefaRepository;
