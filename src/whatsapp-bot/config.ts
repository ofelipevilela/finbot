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
  }
} 