// Teste da nova lógica com word boundary
function testNewLogic(message, keywords) {
  const messageLower = message.toLowerCase();
  console.log(`\nTeste: "${message}"`);
  
  const found = keywords.some((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    const match = regex.test(messageLower);
    console.log(`  "${keyword}" → ${match ? '✅ MATCH' : '❌ não'}`);
    return match;
  });
  
  console.log(`Resultado: ${found ? 'ENCONTRADO' : 'NÃO ENCONTRADO'}`);
  return found;
}

const transporteKeywords = ['gasolina', 'combustível', 'combustivel', 'abastecimento', 'uber', '99', 'taxi', 'táxi', 'ônibus', 'onibus', 'metrô', 'metro', 'passagem', 'estacionamento', 'pedágio', 'pedagio', 'fuel', 'transport'];

// Testes
testNewLogic("gastei 100", transporteKeywords);
testNewLogic("gastei em gasolina", transporteKeywords);
testNewLogic("abastecimento do carro", transporteKeywords);
