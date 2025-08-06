// Debug da categorização
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

function categorizeExpense(message) {
  const messageLower = message.toLowerCase()
  
  console.log(`\n🔍 Analisando: "${message}"`)
  console.log(`📝 Lowercase: "${messageLower}"`)
  
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
  
  for (const categoryKey of priorityCategories) {
    const category = CATEGORIES[categoryKey]
    const foundKeywords = category.keywords.filter(keyword => messageLower.includes(keyword))
    
    if (foundKeywords.length > 0) {
      console.log(`✅ Match em ${category.name}: [${foundKeywords.join(', ')}]`)
      return category.name
    } else {
      console.log(`❌ Não match em ${category.name}`)
    }
  }
  
  console.log(`⚠️ Nenhuma categoria encontrada, retornando: Outros`)
  return 'Outros'
}

// Teste com mensagens que deveriam cair em "Outros"
const mensagensTeste = [
  'gastei 100 em algo',
  'gastei 50 reais',
  'comprei uma coisa',
  'gastei 200',
  'paguei 300 por algo estranho'
]

mensagensTeste.forEach(mensagem => {
  const resultado = categorizeExpense(mensagem)
  console.log(`\n🎯 RESULTADO: "${mensagem}" → ${resultado}`)
  console.log('=' * 60)
})
