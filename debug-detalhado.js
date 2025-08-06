// Debug mais detalhado
const message = "gastei 100";
const messageLower = message.toLowerCase();

console.log(`Mensagem original: "${message}"`);
console.log(`Mensagem lowercase: "${messageLower}"`);

// Keywords de transporte
const transporteKeywords = ['gasolina', 'combustível', 'combustivel', 'abastecimento', 'uber', '99', 'taxi', 'táxi', 'ônibus', 'onibus', 'metrô', 'metro', 'passagem', 'estacionamento', 'pedágio', 'pedagio', 'fuel', 'transport'];

console.log('\n🔍 Verificando cada keyword de transporte:');
transporteKeywords.forEach(keyword => {
  const found = messageLower.includes(keyword);
  console.log(`"${keyword}" → ${found ? '✅ MATCH!' : '❌ não'}`);
});

// Vamos verificar se alguma substring está causando o problema
console.log('\n🧩 Verificando substrings da mensagem:');
for (let i = 0; i < messageLower.length; i++) {
  for (let j = i + 1; j <= messageLower.length; j++) {
    const substring = messageLower.substring(i, j);
    if (substring.length >= 2) {
      const isInTransporte = transporteKeywords.some(keyword => keyword.includes(substring));
      if (isInTransporte) {
        console.log(`Substring "${substring}" encontrada em keywords de transporte!`);
      }
    }
  }
}
