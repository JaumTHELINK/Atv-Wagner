class Usuario {
  constructor({ id = null, nome, email }) {
    if (!nome || !nome.trim()) {
      throw new Error('Nome é obrigatório.');
    }

    if (!email || !email.trim()) {
      throw new Error('Email é obrigatório.');
    }

    this.id = id;
    this.nome = nome.trim();
    this.email = email.trim().toLowerCase();
  }
}

module.exports = Usuario;
