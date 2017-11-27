/**
 * @type {Object}
 */
export const date = {
  days: {
    week: [
      'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'
    ]
  },
  months: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
    'Dezembro'
  ]
}

/**
 * @type {Object}
 */
export const events = {
  modified: {
    title: 'Modificações pendentes',
    message: 'Você possui modificações pendentes.<br>Deseja descartar estas modificações?'
  }
}

/**
 * @type {Object}
 */
export const validation = {
  required: 'Campo obrigatório',
  minLength: 'Informe pelo menos {min} caracteres',
  email: 'Informe um e-mail válido',
  time: 'Informe uma hora entre 00:00 e 23:59'
}

/**
 * @type {Object}
 */
export const crud = {
  save: {
    success: 'Registro salvo com sucesso',
    error: 'Houve um problema ao salvar o registro',
    cancel: {
      title: 'Cancelar',
      message: 'Deseja descartar as alterações?'
    }
  },
  fetch: {
    error: 'Houve um problema ao recuperar o registro'
  },
  run: {
    error: 'Erro ao processar a solicitação',
    success: 'Operação realizada com sucesso'
  }
}

/**
 * @type {Array}
 * @default httpStatus
 */
export const httpErrors = [
  {200: 'Ok'},
  {201: 'Criado'},
  {202: 'Aceito'},
  {203: 'Não autorizado'},
  {204: 'Nenhum conteúdo'},
  {205: 'Reset'},
  {206: 'Conteúdo parcial'},
  {207: 'Status Multi'},
  {300: 'Múltipla escolha'},
  {301: 'Movido'},
  {302: 'Movido Temporariamente'},
  {304: 'Não modificado'},
  {305: 'Use Proxy'},
  {306: 'Proxy Switch'},
  {307: 'Redirecionamento temporário'},
  {400: 'Requisição inválida'},
  {401: 'Não autorizado'},
  {402: 'Pagamento necessário'},
  {403: 'Proibido'},
  {404: 'Não encontrado'},
  {405: 'Método não permitido'},
  {406: 'Não Aceitável'},
  {407: 'Autenticação de proxy necessária'},
  {408: 'Tempo de requisição esgotou (Timeout)'},
  {409: 'Conflito'},
  {410: 'Gone'},
  {411: 'Comprimento necessário'},
  {412: 'Pré-condição falhou'},
  {413: 'Entidade de solicitação muito grande'},
  {414: 'Pedido-URI Too Long'},
  {415: 'Tipo de mídia não suportado'},
  {416: 'Solicitada de Faixa Não Satisfatória'},
  {417: 'Falha na expectativa'},
  {418: 'Eu sou um bule de chá'},
  {422: 'Entidade improcessável'},
  {423: 'Fechado'},
  {424: 'Falha de Dependência'},
  {425: 'Coleção não ordenada'},
  {426: 'Upgrade Obrigatório'},
  {450: 'Bloqueados pelo Controle de Pais do Windows'},
  {499: 'Cliente fechou Pedido'},
  {500: 'Erro interno do servidor'},
  {501: 'Não implementado'},
  {502: 'Bad Gateway'},
  {503: 'Serviço indisponível'},
  {504: 'Gateway Time-Out'},
  {505: 'HTTP Version not supported'}
]

/**
 * @type {Object}
 */
export const locales = {
  date, events, validation, crud
}

/**
 * @type {Object}
 */
export default {
  // process.env.LOCALE
  pt_BR: locales
}
