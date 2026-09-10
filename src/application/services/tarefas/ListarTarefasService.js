class ListarTarefasService {
  constructor({ tarefaRepository }) {
    this.tarefaRepository = tarefaRepository;
  }

  async execute() {
    return this.tarefaRepository.listar();
  }
}

module.exports = ListarTarefasService;
