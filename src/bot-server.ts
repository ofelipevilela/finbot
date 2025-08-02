import { iniciarBot } from './whatsapp-bot'

// Inicializar o bot quando este arquivo for executado
console.log('🤖 Iniciando bot de WhatsApp...')
iniciarBot().catch((error) => {
  console.error('❌ Erro ao iniciar o bot:', error)
  process.exit(1)
}) 