class Tarefa {
  constructor({ id = null, titulo, descricao = '', status = 'PENDENTE', usuarioId = null }) {
    if (!titulo || !titulo.trim()) {
      throw new Error('Título é obrigatório.');
    }

    const statusPermitidos = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'];
    if (!statusPermitidos.includes(status)) {
      throw new Error('Status inválido.');
    }

    this.id = id;
    this.titulo = titulo.trim();
    this.descricao = descricao ? descricao.trim() : '';
    this.status = status;
    this.usuarioId = usuarioId;
  }

  iniciar() {
    if (this.status === 'CONCLUIDA') {
      throw new Error('Não é possível iniciar uma tarefa concluída.');
    }

    if (this.status === 'EM_ANDAMENTO') {
      return this;
    }

    this.status = 'EM_ANDAMENTO';
    return this;
  }

  concluir() {
    if (this.status !== 'EM_ANDAMENTO') {
      throw new Error('Só é possível concluir uma tarefa em andamento.');
    }

    this.status = 'CONCLUIDA';
    return this;
  }
}

module.exports = Tarefa;
