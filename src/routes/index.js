const express = require('express');

const UsuarioRepository = require('../infrastructure/repositories/UsuarioRepository');
const TarefaRepository = require('../infrastructure/repositories/TarefaRepository');

const CriarUsuarioService = require('../application/services/CriarUsuarioService');
const ListarTarefasService = require('../application/services/tarefas/ListarTarefasService');
const CriarTarefaService = require('../application/services/tarefas/CriarTarefaService');
const AtualizarTarefaService = require('../application/services/tarefas/AtualizarTarefaService');
const ExcluirTarefaService = require('../application/services/tarefas/ExcluirTarefaService');
const IniciarTarefaService = require('../application/services/tarefas/IniciarTarefaService');

const UsuarioController = require('../interfaces/controllers/UsuarioController');
const TarefaController = require('../interfaces/controllers/TarefaController');

const usuarioRepository = new UsuarioRepository();
const tarefaRepository = new TarefaRepository();

const criarUsuarioService = new CriarUsuarioService({ usuarioRepository });
const listarTarefasService = new ListarTarefasService({ tarefaRepository });
const criarTarefaService = new CriarTarefaService({ tarefaRepository, usuarioRepository });
const atualizarTarefaService = new AtualizarTarefaService({ tarefaRepository });
const excluirTarefaService = new ExcluirTarefaService({ tarefaRepository });
const iniciarTarefaService = new IniciarTarefaService({ tarefaRepository });

const usuarioController = new UsuarioController({ criarUsuarioService });
const tarefaController = new TarefaController({
  listarTarefasService,
  criarTarefaService,
  atualizarTarefaService,
  excluirTarefaService,
  iniciarTarefaService,
});

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.post('/usuarios', usuarioController.criar.bind(usuarioController));
router.get('/tarefas', tarefaController.listar.bind(tarefaController));
router.post('/tarefas', tarefaController.criar.bind(tarefaController));
router.post('/tarefas/:id/iniciar', tarefaController.iniciar.bind(tarefaController));
router.put('/tarefas/:id', tarefaController.atualizar.bind(tarefaController));
router.delete('/tarefas/:id', tarefaController.excluir.bind(tarefaController));

module.exports = router;
