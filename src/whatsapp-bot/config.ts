// Configurações do Bot de WhatsApp
export const BOT_CONFIG = {
  // Configurações do servidor
  PORT: 3001,
  
  // Configurações do WhatsApp
  AUTH_FOLDER: './auth',
  
  // Configurações de mensagens
  WELCOME_MESSAGE: `👋 Olá! Parece que você ainda não está cadastrado no nosso sistema financeiro.

Para começar a usar o bot, acesse nosso site e faça seu cadastro:
https://finbot.tiiny.site

Após o cadastro, você poderá usar todos os recursos do bot! 🤖💰`,

  ERROR_MESSAGE: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.",

  // Comandos disponíveis
  COMMANDS: {
    EXPENSE: ['gastei', 'gasto'],
    INCOME: ['recebi', 'receita', 'salário', 'salario'],
    BALANCE: ['saldo', 'quanto tenho'],
    REPORT: ['relatório', 'relatorio', 'resumo'],
    GOAL: ['meta', 'economizar', 'poupar'],
    TIPS: ['dica', 'ajuda', 'conselho']
  },

  // Padrões de regex para extração de valores
  PATTERNS: {
    VALUE: /(\d+(?:,\d{2})?|\d+(?:\.\d{2})?)/,
    CATEGORY: /(?:em|com|de)\s+(.+)$/,
    DESCRIPTION: /(?:de|meu|minha)\s+(.+)$/,
    CATEGORY_QUERY: /quanto gastei (?:com|em|de)\s+(.+)/
  },

  // Categorias inteligentes baseadas em palavras-chave
  CATEGORIES: {
    ALIMENTACAO: {
      name: 'Alimentação',
      keywords: ['almoço', 'almoco', 'café', 'cafe', 'lanche', 'jantar', 'café da manhã', 'cafe da manha', 'breakfast', 'lunch', 'dinner', 'snack', 'restaurante', 'pizza', 'hambúrguer', 'hamburger', 'sorvete', 'doces', 'sobremesa']
    },
    MERCADO: {
      name: 'Mercado',
      keywords: ['mercado', 'supermercado', 'compras', 'feira', 'hortifruti', 'hortifrúti', 'padaria', 'açougue', 'acougue', 'quitanda', 'sacolão', 'sacolao', 'grocery', 'supermarket']
    },
    TRANSPORTE: {
      name: 'Transporte',
      keywords: ['gasolina', 'combustível', 'combustivel', 'abastecimento', 'uber', '99', 'taxi', 'táxi', 'ônibus', 'onibus', 'metrô', 'metro', 'passagem', 'estacionamento', 'pedágio', 'pedagio', 'fuel', 'gas', 'transport']
    },
    CARRO: {
      name: 'Carro',
      keywords: ['carro', 'automóvel', 'automovel', 'veículo', 'veiculo', 'manutenção', 'manutencao', 'óleo', 'oleo', 'pneu', 'seguro', 'ipva', 'licenciamento', 'lavagem', 'car wash', 'auto', 'vehicle', 'mecânico', 'mecanico', 'oficina']
    },
    SAUDE: {
      name: 'Saúde',
      keywords: ['farmácia', 'farmacia', 'remédio', 'remedio', 'médico', 'medico', 'consulta', 'exame', 'hospital', 'clínica', 'clinica', 'dentista', 'fisioterapia', 'pharmacy', 'medicine', 'health']
    },
    EDUCACAO: {
      name: 'Educação',
      keywords: ['escola', 'faculdade', 'universidade', 'curso', 'livro', 'material escolar', 'mensalidade', 'matrícula', 'matricula', 'school', 'college', 'university', 'education']
    },
    LAZER: {
      name: 'Lazer',
      keywords: ['cinema', 'teatro', 'show', 'festival', 'parque', 'viagem', 'hotel', 'passeio', 'jogos', 'hobby', 'esporte', 'academia', 'gym', 'movie', 'travel', 'leisure']
    },
    SERVICOS: {
      name: 'Serviços',
      keywords: ['conta', 'luz', 'água', 'agua', 'internet', 'telefone', 'celular', 'tv', 'assinatura', 'netflix', 'spotify', 'youtube', 'bill', 'service', 'utility']
    },
    OUTROS: {
      name: 'Outros',
      keywords: ['outros', 'diversos', 'misc', 'other']
    }
  }
} 