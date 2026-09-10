class TarefaController {
  constructor({
    listarTarefasService,
    criarTarefaService,
    atualizarTarefaService,
    excluirTarefaService,
    iniciarTarefaService,
  }) {
    this.listarTarefasService = listarTarefasService;
    this.criarTarefaService = criarTarefaService;
    this.atualizarTarefaService = atualizarTarefaService;
    this.excluirTarefaService = excluirTarefaService;
    this.iniciarTarefaService = iniciarTarefaService;
  }

  async listar(req, res) {
    try {
      const tarefas = await this.listarTarefasService.execute();
      return res.status(200).json(tarefas);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
  }

  async criar(req, res) {
    try {
      const tarefa = await this.criarTarefaService.execute(req.body);
      return res.status(201).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const tarefa = await this.atualizarTarefaService.execute(req.params.id, req.body);
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
  }

  async excluir(req, res) {
    try {
      const resposta = await this.excluirTarefaService.execute(req.params.id);
      return res.status(200).json(resposta);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
  }

  async iniciar(req, res) {
    try {
      const tarefa = await this.iniciarTarefaService.execute({
        tarefaId: req.params.id,
        usuarioId: req.body.usuarioId,
      });
      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ mensagem: error.message });
    }
  }
}

module.exports = TarefaController;
