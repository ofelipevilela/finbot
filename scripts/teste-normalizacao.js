// Função para normalizar número de telefone (SEM código do país)
function normalizePhone(phone) {
  // Remove código do país se presente
  let normalized = phone.startsWith('55') ? phone.substring(2) : phone
  
  // Remove caracteres especiais
  normalized = normalized.replace(/\D/g, '')
  
  // Se tem 11 dígitos (com 9), remove o 9
  if (normalized.length === 11 && normalized.startsWith('9')) {
    normalized = normalized.substring(1)
  }
  
  // Se tem 10 dígitos (sem 9), adiciona o 9 no meio
  if (normalized.length === 10) {
    normalized = normalized.substring(0, 2) + '9' + normalized.substring(2)
  }
  
  return normalized
}

// Testar diferentes formatos
const numeros = [
  '553298103339',
  '3298103339',
  '93298103339',
  '32998103339'
]

console.log('🧪 Testando normalização de números:')
numeros.forEach(numero => {
  const normalizado = normalizePhone(numero)
  console.log(`${numero} → ${normalizado}`)
})

// Verificar qual formato está no banco
console.log('\n📊 Número no banco: 32998103339')
console.log('🔍 Bot deve procurar por: 32998103339') 