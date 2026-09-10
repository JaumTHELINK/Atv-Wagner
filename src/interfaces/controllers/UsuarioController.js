class UsuarioController {
  constructor({ criarUsuarioService }) {
    this.criarUsuarioService = criarUsuarioService;
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
}

module.exports = UsuarioController;
