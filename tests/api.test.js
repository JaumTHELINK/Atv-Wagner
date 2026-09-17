process.env.DB_STORAGE = ':memory:';

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/infrastructure/database/connection');
const { Usuario } = require('../src/infrastructure/database/models/Usuario');
const { Tarefa } = require('../src/infrastructure/database/models/Tarefa');

beforeAll(async () => {
  Usuario.hasMany(Tarefa, { foreignKey: 'usuarioId', as: 'tarefas' });
  Tarefa.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

describe('API de gerenciamento de tarefas', () => {
  it('deve criar um usuário válido', async () => {
    const resposta = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'João', email: 'joao@email.com' });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome).toBe('João');
    expect(resposta.body.email).toBe('joao@email.com');
  });

  it('deve criar tarefas vinculadas a um usuário e listar todas', async () => {
    const usuario = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Maria', email: 'maria@email.com' });

    const tarefa1 = await request(app)
      .post('/api/tarefas')
      .send({ usuarioId: usuario.body.id, titulo: 'Estudar Node', descricao: 'Revisar Express' });

    const tarefa2 = await request(app)
      .post('/api/tarefas')
      .send({ usuarioId: usuario.body.id, titulo: 'Pagar contas', descricao: 'Mensalidades' });

    expect(tarefa1.status).toBe(201);
    expect(tarefa2.status).toBe(201);

    const listar = await request(app).get('/api/tarefas');

    expect(listar.status).toBe(200);
    expect(Array.isArray(listar.body)).toBe(true);
    expect(listar.body).toHaveLength(2);
  });

  it('deve iniciar tarefa e bloquear a 6ª em andamento', async () => {
    const usuario = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Pedro', email: 'pedro@email.com' });

    for (let i = 1; i <= 5; i += 1) {
      const tarefa = await request(app)
        .post('/api/tarefas')
        .send({ usuarioId: usuario.body.id, titulo: `Tarefa ${i}` });

      const iniciar = await request(app)
        .post(`/api/tarefas/${tarefa.body.id}/iniciar`)
        .send({ usuarioId: usuario.body.id });

      expect(iniciar.status).toBe(200);
      expect(iniciar.body.status).toBe('EM_ANDAMENTO');
    }

    const tarefaExtra = await request(app)
      .post('/api/tarefas')
      .send({ usuarioId: usuario.body.id, titulo: 'Tarefa 6' });

    const bloquear = await request(app)
      .post(`/api/tarefas/${tarefaExtra.body.id}/iniciar`)
      .send({ usuarioId: usuario.body.id });

    expect(bloquear.status).toBe(400);
    expect(bloquear.body.mensagem).toMatch(/Limite/i);
  });

  it('deve rejeitar usuário com email inválido', async () => {
    const resposta = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'João', email: 'email-invalido' });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('detalhes');
  });

  it('deve rejeitar tarefa com campos vazios ou sem usuário', async () => {
    const usuario = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Ana', email: 'ana@email.com' });

    const resposta = await request(app)
      .post('/api/tarefas')
      .send({ usuarioId: usuario.body.id, titulo: '', descricao: 'Tarefa incompleta' });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('detalhes');
  });

  it('deve atualizar e excluir uma tarefa', async () => {
    const usuario = await request(app)
      .post('/api/usuarios')
      .send({ nome: 'Lucas', email: 'lucas@email.com' });

    const tarefa = await request(app)
      .post('/api/tarefas')
      .send({ usuarioId: usuario.body.id, titulo: 'Tarefa antiga', descricao: 'Texto antigo' });

    const atualizar = await request(app)
      .put(`/api/tarefas/${tarefa.body.id}`)
      .send({ titulo: 'Tarefa atualizada', descricao: 'Texto novo' });

    expect(atualizar.status).toBe(200);
    expect(atualizar.body.titulo).toBe('Tarefa atualizada');
    expect(atualizar.body.descricao).toBe('Texto novo');

    const excluir = await request(app).delete(`/api/tarefas/${tarefa.body.id}`);

    expect(excluir.status).toBe(200);
    expect(excluir.body.mensagem).toMatch(/removida/i);
  });
});
