const { z } = require('zod');

const usuarioSchema = z
  .object({
    nome: z
      .string({
        required_error: 'Nome é obrigatório.',
        invalid_type_error: 'Nome deve ser texto.',
      })
      .trim()
      .min(3, 'Nome deve ter pelo menos 3 letras.'),
    email: z
      .string({
        required_error: 'Email é obrigatório.',
        invalid_type_error: 'Email deve ser texto.',
      })
      .trim()
      .email('Email inválido.'),
  })
  .strict();

const tarefaSchema = z
  .object({
    usuarioId: z
      .union([z.string(), z.number()], {
        required_error: 'usuarioId é obrigatório.',
        invalid_type_error: 'usuarioId deve ser numérico.',
      })
      .transform((valor) => Number(valor))
      .refine((valor) => !Number.isNaN(valor) && valor > 0, 'usuarioId deve ser um identificador válido.'),
    titulo: z
      .string({
        required_error: 'Título é obrigatório.',
        invalid_type_error: 'Título deve ser texto.',
      })
      .trim()
      .min(1, 'Título é obrigatório.')
      .max(100, 'Título deve ter no máximo 100 caracteres.'),
    descricao: z
      .string({ invalid_type_error: 'Descrição deve ser texto.' })
      .trim()
      .max(500, 'Descrição deve ter no máximo 500 caracteres.')
      .optional()
      .default(''),
  })
  .strict();

const formatarDetalhes = (resultadoErro) =>
  resultadoErro.issues.map(({ path, message }) => ({
    campo: path.length ? path.join('.') : 'payload',
    mensagem: message,
  }));

const validarSchema = (schema) => (req, _res, next) => {
  const resultado = schema.safeParse(req.body);

  if (!resultado.success) {
    const error = new Error('Dados inválidos.');
    error.statusCode = 400;
    error.detalhes = formatarDetalhes(resultado.error);
    return next(error);
  }

  req.body = resultado.data;
  return next();
};

const validarUsuario = validarSchema(usuarioSchema);
const validarTarefa = validarSchema(tarefaSchema);

module.exports = {
  usuarioSchema,
  tarefaSchema,
  validarUsuario,
  validarTarefa,
};
