const express = require('express');

const UsuarioRepository = require('../infrastructure/repositories/UsuarioRepository');
const TarefaRepository = require('../infrastructure/repositories/TarefaRepository');

const CriarUsuarioService = require('../application/services/CriarUsuarioService');
const BuscarUsuarioPorNomeService = require('../application/services/BuscarUsuarioPorNomeService');
const ListarTarefasService = require('../application/services/tarefas/ListarTarefasService');
const CriarTarefaService = require('../application/services/tarefas/CriarTarefaService');
const AtualizarTarefaService = require('../application/services/tarefas/AtualizarTarefaService');
const ExcluirTarefaService = require('../application/services/tarefas/ExcluirTarefaService');
const IniciarTarefaService = require('../application/services/tarefas/IniciarTarefaService');

const UsuarioController = require('../interfaces/controllers/UsuarioController');
const TarefaController = require('../interfaces/controllers/TarefaController');
const {
  validarUsuario,
  validarTarefa,
} = require('../interfaces/middlewares/validarSchema');

const usuarioRepository = new UsuarioRepository();
const tarefaRepository = new TarefaRepository();

const criarUsuarioService = new CriarUsuarioService({ usuarioRepository });
const buscarUsuarioPorNomeService = new BuscarUsuarioPorNomeService({
  usuarioRepository,
});
const listarTarefasService = new ListarTarefasService({ tarefaRepository });
const criarTarefaService = new CriarTarefaService({
  tarefaRepository,
  usuarioRepository,
});
const atualizarTarefaService = new AtualizarTarefaService({ tarefaRepository });
const excluirTarefaService = new ExcluirTarefaService({ tarefaRepository });
const iniciarTarefaService = new IniciarTarefaService({ tarefaRepository });

const usuarioController = new UsuarioController({
  criarUsuarioService,
  buscarUsuarioPorNomeService,
});
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

router.post(
  '/usuarios',
  /*
   #swagger.tags = ['Usuários']
   #swagger.summary = 'Cria um usuário'
   #swagger.description = 'Cria um usuário com nome e email válidos conforme as regras do domínio.'
   #swagger.parameters['usuario'] = {
     in: 'body',
     description: 'Dados do usuário',
     required: true,
     schema: { $ref: '#/definitions/UsuarioInput' }
   }
   #swagger.responses[201] = { description: 'Usuário criado com sucesso.' }
   #swagger.responses[400] = { description: 'Bad Request por falha de validação estrutural.' }
  */
  validarUsuario,
  usuarioController.criar.bind(usuarioController)
);

router.get(
  '/usuarios',
  /*
   #swagger.tags = ['Usuários']
   #swagger.summary = 'Busca usuários por nome ou lista todos'
   #swagger.description = 'Retorna a lista de usuários filtrados pelo parâmetro "nome" na query string, ou todos se omitido.'
   #swagger.parameters['nome'] = {
     in: 'query',
     description: 'Nome do usuário para busca (opcional)',
     required: false,
     type: 'string'
   }
   #swagger.responses[200] = { description: 'Lista de usuários retornada com sucesso.' }
  */
  usuarioController.buscarPorNome.bind(usuarioController)
);

router.get(
  '/usuarios/nome/:nome',
  /*
   #swagger.tags = ['Usuários']
   #swagger.summary = 'Busca usuários por nome via parâmetro de rota'
   #swagger.description = 'Retorna usuários cujo nome contenha o valor informado.'
   #swagger.parameters['nome'] = {
     in: 'path',
     name: 'nome',
     description: 'Nome do usuário',
     required: true,
     type: 'string'
   }
   #swagger.responses[200] = { description: 'Lista de usuários retornada com sucesso.' }
  */
  usuarioController.buscarPorNome.bind(usuarioController)
);

router.get(
  '/tarefas',
  /*
   #swagger.tags = ['Tarefas']
   #swagger.summary = 'Lista todas as tarefas'
   #swagger.responses[200] = { description: 'Lista de tarefas retornada com sucesso.' }
  */
  tarefaController.listar.bind(tarefaController)
);

router.post(
  '/tarefas',
  /*
   #swagger.tags = ['Tarefas']
   #swagger.summary = 'Cria uma tarefa'
   #swagger.description = 'Cria uma tarefa vinculada a um usuário, validando o título e o usuário responsável.'
   #swagger.parameters['tarefa'] = {
     in: 'body',
     description: 'Dados da tarefa',
     required: true,
     schema: { $ref: '#/definitions/TarefaInput' }
   }
   #swagger.responses[201] = { description: 'Tarefa criada com sucesso.' }
   #swagger.responses[400] = { description: 'Bad Request por falha de validação estrutural.' }
  */
  validarTarefa,
  tarefaController.criar.bind(tarefaController)
);

router.post(
  '/tarefas/:id/iniciar',
  /*
   #swagger.tags = ['Tarefas']
   #swagger.summary = 'Inicia uma tarefa'
   #swagger.description = 'Inicia uma tarefa pendente e aplica a regra de negócio que limita a 5 tarefas em andamento por usuário.'
   #swagger.parameters['id'] = {
     in: 'path',
     name: 'id',
     required: true,
     type: 'string',
     description: 'Identificador da tarefa'
   }
   #swagger.responses[200] = { description: 'Tarefa iniciada com sucesso.' }
   #swagger.responses[400] = { description: 'Retornado quando o usuário atinge o limite máximo de 5 tarefas com status EM_ANDAMENTO.' }
  */
  tarefaController.iniciar.bind(tarefaController)
);

router.put('/tarefas/:id', tarefaController.atualizar.bind(tarefaController));
router.delete('/tarefas/:id', tarefaController.excluir.bind(tarefaController));

module.exports = router;
