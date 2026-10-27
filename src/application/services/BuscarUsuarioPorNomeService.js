class BuscarUsuarioPorNomeService {
  constructor({ usuarioRepository }) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute({ nome } = {}) {
    if (nome !== undefined && nome !== null) {
      const nomeLimpo = String(nome).trim();
      if (nomeLimpo.length > 0) {
        return this.usuarioRepository.buscarPorNome(nomeLimpo);
      }
    }

    return this.usuarioRepository.listarTodos();
  }
}

module.exports = BuscarUsuarioPorNomeService;
