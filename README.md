# API RESTful de Gerenciamento de Tarefas

## Alunos
- João Victor do Nascimento Silva (JaumThelink o Grande)
- Igor Holanda Costa

## Descrição do Projeto
Este projeto foi desenvolvido como parte de uma atividade prática de construção de uma API RESTful utilizando a arquitetura Clean Architecture. A aplicação tem como objetivo gerenciar tarefas associadas a usuários, com persistência em banco SQLite usando Sequelize.

A estrutura do projeto foi organizada para respeitar a separação de responsabilidades entre domínio, aplicação, infraestrutura e interfaces, seguindo os princípios da Clean Architecture e da regra de dependência.

## Objetivos
- Criar uma API RESTful para gerenciamento de tarefas;
- Separar regras de negócio, persistência e interface HTTP;
- Aplicar boas práticas de organização e manutenção de código;
- Validar a lógica da aplicação com testes automatizados.

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize
- SQLite
- Jest
- Supertest
- ESLint
- Prettier
- Nodemon

## Estrutura do Projeto
```text
src/
├── app.js
├── server.js
├── domain/
│   ├── entities/
│   │   ├── Tarefa.js
│   │   └── Usuario.js
│   └── errors/
│       └── AppError.js
├── application/
│   └── services/
│       ├── CriarUsuarioService.js
│       └── tarefas/
│           ├── ListarTarefasService.js
│           ├── CriarTarefaService.js
│           ├── AtualizarTarefaService.js
│           ├── ExcluirTarefaService.js
│           └── IniciarTarefaService.js
├── infrastructure/
│   ├── database/
│   │   ├── connection.js
│   │   └── models/
│   │       ├── Usuario.js
│   │       └── Tarefa.js
│   └── repositories/
│       ├── UsuarioRepository.js
│       └── TarefaRepository.js
├── interfaces/
│   └── controllers/
│       ├── UsuarioController.js
│       └── TarefaController.js
└── routes/
    └── index.js
```

## Funcionalidades
- Cadastro de usuários;
- Criação de tarefas vinculadas a usuários;
- Listagem de todas as tarefas;
- Atualização de tarefas;
- Exclusão de tarefas;
- Início de tarefa com regra de negócio;
- Bloqueio de novas tarefas em andamento quando o usuário atingiu o limite de 5;
- Persistência em banco SQLite.

## Regras de Negócio
- O título da tarefa é obrigatório;
- O status inicial da tarefa é `PENDENTE`;
- A tarefa só pode ser iniciada se não houver limite de 5 tarefas em andamento para o usuário;
- Apenas tarefas em andamento podem ser concluídas;
- Atualização e exclusão exigem que a tarefa exista;
- Usuários devem ter nome e e-mail válidos.

## Como Executar
1. Abra o terminal na pasta do projeto.
2. Instale as dependências:
```bash
npm install
```
3. Inicie a aplicação:
```bash
npm start
```
4. A API ficará disponível em:
```text
http://localhost:3000
```

## Endpoints
### Usuários
- `POST /api/usuarios`

### Tarefas
- `GET /api/tarefas`
- `POST /api/tarefas`
- `PUT /api/tarefas/:id`
- `DELETE /api/tarefas/:id`
- `POST /api/tarefas/:id/iniciar`

## Como Testar
```bash
npm test
```

## Checklist de Apresentação para o Professor
- [ ] Projeto inicializado com `npm init -y`;
- [ ] Repositório Git inicializado com `git init`;
- [ ] Dependências de produção instaladas corretamente;
- [ ] Dependências de desenvolvimento instaladas corretamente;
- [ ] `package.json` configurado com scripts de execução e testes;
- [ ] Estrutura de pastas em `src` criada conforme a arquitetura limpa;
- [ ] Domínio isolado sem dependências de framework;
- [ ] Camada de aplicação responsável pelas regras de negócio;
- [ ] Infraestrutura com conexão SQLite e models do Sequelize;
- [ ] Repositórios implementados para acesso aos dados;
- [ ] Controllers responsáveis pela comunicação HTTP;
- [ ] Rotas configuradas corretamente;
- [ ] Entidade `Tarefa` validando título e status;
- [ ] Método `iniciar()` implementado e funcionando;
- [ ] Limite de 5 tarefas em andamento aplicado;
- [ ] CRUD completo de tarefas funcionando;
- [ ] Validação de existência de tarefa antes de atualizar/excluir;
- [ ] Testes automatizados implementados e executados com sucesso;
- [ ] API respondendo corretamente em localhost;
- [ ] Estrutura e organização do código explicadas durante a apresentação;
- [ ] Projeto foi versionado e está pronto para entrega.

## Observações
Este projeto foi desenvolvido para atender ao requisito da atividade acadêmica, com foco em organização, separação de responsabilidades e validação funcional por testes.

## Conclusão
A API está estruturada de forma modular e escalável, respeitando os princípios da Clean Architecture e demonstrando o uso prático de ORM, casos de uso e controllers no desenvolvimento de uma solução RESTful.
