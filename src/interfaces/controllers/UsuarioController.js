class UsuarioController {
  constructor({ criarUsuarioService, buscarUsuarioPorNomeService }) {
    this.criarUsuarioService = criarUsuarioService;
    this.buscarUsuarioPorNomeService = buscarUsuarioPorNomeService;
  }

  async criar(req, res) {
    try {
      const usuario = await this.criarUsuarioService.execute(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(error.statusCode || 400).json({
        mensagem: error.message,
      });
    }
  }

  async buscarPorNome(req, res) {
    try {
      const nome = req.query.nome || req.params.nome;
      const usuarios = await this.buscarUsuarioPorNomeService.execute({ nome });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        mensagem: error.message,
      });
    }
  }
}

module.exports = UsuarioController;
