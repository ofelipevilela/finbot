// Simular as categorias do bot
const CATEGORIES = {
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
    keywords: ['carro', 'automóvel', 'automovel', 'veículo', 'veiculo', 'manutenção', 'manutencao', 'óleo', 'oleo', 'pneu', 'seguro', 'ipva', 'licenciamento', 'lavagem', 'car wash', 'auto', 'vehicle']
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

// Função de categorização
function categorizeExpense(message) {
  const messageLower = message.toLowerCase()
  
  // Ordem de prioridade das categorias (mais específicas primeiro)
  const priorityCategories = [
    'CARRO',
    'SAUDE', 
    'EDUCACAO',
    'LAZER',
    'SERVICOS',
    'ALIMENTACAO',
    'MERCADO',
    'TRANSPORTE',
    'OUTROS'
  ]
  
  // Verificar cada categoria na ordem de prioridade
  for (const categoryKey of priorityCategories) {
    const category = CATEGORIES[categoryKey]
    if (category.keywords.some(keyword => messageLower.includes(keyword))) {
      return category.name
    }
  }
  
  return 'Outros'
}

// Testar diferentes mensagens
const mensagens = [
  'gastei 50 reais no almoço',
  'gastei 1000 no mercado',
  'gastei 200 em gasolina',
  'gastei 500 no carro',
  'gastei 150 na farmácia',
  'gastei 80 no cinema',
  'gastei 200 na conta de luz',
  'gastei 300 em compras',
  'gastei 100 em uber',
  'gastei 50 em café'
]

console.log('🧪 Testando categorização inteligente:')
console.log('=' * 50)

mensagens.forEach(mensagem => {
  const categoria = categorizeExpense(mensagem)
  console.log(`"${mensagem}" → ${categoria}`)
})

console.log('\n📊 Categorias disponíveis:')
Object.values(CATEGORIES).forEach(cat => {
  console.log(`• ${cat.name}: ${cat.keywords.slice(0, 3).join(', ')}...`)
}) 