// Verificar quais keywords de transporte contêm as substrings problemáticas
const transporteKeywords = ['gasolina', 'combustível', 'combustivel', 'abastecimento', 'uber', '99', 'taxi', 'táxi', 'ônibus', 'onibus', 'metrô', 'metro', 'passagem', 'estacionamento', 'pedágio', 'pedagio', 'fuel', 'transport'];

const substringsProblematicas = ['ga', 'gas', 'as', 'ast', 'aste', 'st', 'ste', 'te'];

console.log('🔍 Palavras de transporte que contêm substrings problemáticas:');

substringsProblematicas.forEach(substring => {
  console.log(`\n"${substring}" encontrada em:`);
  transporteKeywords.forEach(keyword => {
    if (keyword.includes(substring)) {
      console.log(`  → ${keyword}`);
    }
  });
});

// A palavra "gastei" contém "ga", "gas", "as", "ast", "aste", "st", "ste", "te"
// Vamos ver qual dessas está causando o problema no código real
