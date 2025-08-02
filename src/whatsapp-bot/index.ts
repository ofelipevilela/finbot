import express, { Request, Response } from 'express'
import cors from 'cors'
import { Boom } from '@hapi/boom'
import { supabase } from '../integrations/supabase/client-server'
import { BOT_CONFIG } from './config'

// Função para testar conexão com Supabase
async function testSupabaseConnection() {
  try {
    console.log('🔍 Testando conexão com Supabase...')
    const { data, error } = await supabase
      .from('usuarios')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Erro na conexão com Supabase:', error)
      return false
    }
    
    console.log('✅ Conexão com Supabase OK!')
    return true
  } catch (err) {
    console.error('❌ Erro ao conectar com Supabase:', err)
    return false
  }
}

import { makeWASocket, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import qrcode from 'qrcode-terminal'

if (typeof useMultiFileAuthState !== 'function') {
  throw new Error('❌ useMultiFileAuthState não pôde ser carregado. Verifique sua versão do Baileys.')
}

// Função para categorizar automaticamente baseada em palavras-chave
function categorizeExpense(message: string): string {
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
    const category = BOT_CONFIG.CATEGORIES[categoryKey]
    if (category.keywords.some(keyword => messageLower.includes(keyword))) {
      return category.name
    }
  }
  
  return 'Outros'
}

// Função para processar mensagens financeiras (copiada do webhook do Supabase)
async function processFinancialMessage(message: string, user: any): Promise<string> {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  // RF2: Registrar despesas
  if (BOT_CONFIG.COMMANDS.EXPENSE.some(cmd => message.includes(cmd))) {
    const valueMatch = message.match(BOT_CONFIG.PATTERNS.VALUE)
    
    if (valueMatch) {
      const valor = parseFloat(valueMatch[1].replace(',', '.'))
      const categoria = categorizeExpense(message)
      
      const { error } = await supabase
        .from('transacoes')
        .insert({
          usuario_id: user.id,
          valor: valor,
          tipo: 'despesa',
          categoria: categoria,
          descricao: message,
          data_transacao: new Date().toISOString()
        })

      if (error) {
        console.error('Error inserting expense:', error)
        return 'Ops! Não consegui registrar sua despesa. Tente novamente.'
      }

      return `✅ Despesa registrada!\n💰 Valor: R$ ${valor.toFixed(2)}\n📂 Categoria: ${categoria}\n📅 Data: ${new Date().toLocaleDateString('pt-BR')}`
    }
    return 'Por favor, informe o valor da despesa. Ex: "Gastei R$50 em almoço"'
  }

  // RF3: Registrar receita
  if (BOT_CONFIG.COMMANDS.INCOME.some(cmd => message.includes(cmd))) {
    const valueMatch = message.match(BOT_CONFIG.PATTERNS.VALUE)
    const descriptionMatch = message.match(BOT_CONFIG.PATTERNS.DESCRIPTION)
    
    if (valueMatch) {
      const valor = parseFloat(valueMatch[1].replace(',', '.'))
      const descricao = descriptionMatch ? descriptionMatch[1].trim() : 'receita'
      
      const { error } = await supabase
        .from('transacoes')
        .insert({
          usuario_id: user.id,
          valor: valor,
          tipo: 'receita',
          categoria: 'receita',
          descricao: message,
          data_transacao: new Date().toISOString()
        })

      if (error) {
        console.error('Error inserting income:', error)
        return 'Ops! Não consegui registrar sua receita. Tente novamente.'
      }

      return `✅ Receita registrada!\n💰 Valor: R$ ${valor.toFixed(2)}\n📝 Descrição: ${descricao}\n📅 Data: ${new Date().toLocaleDateString('pt-BR')}`
    }
    return 'Por favor, informe o valor da receita. Ex: "Recebi meu salário de R$3000"'
  }

  // RF4: Consultar saldo
  if (BOT_CONFIG.COMMANDS.BALANCE.some(cmd => message.includes(cmd))) {
    const { data: transacoes, error } = await supabase
      .from('transacoes')
      .select('valor, tipo')
      .eq('usuario_id', user.id)
      .gte('data_transacao', `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`)
      .lt('data_transacao', `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`)

    if (error) {
      console.error('Error fetching balance:', error)
      return 'Erro ao consultar saldo. Tente novamente.'
    }

    const receitas = transacoes?.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + (t.valor || 0), 0) || 0
    const despesas = transacoes?.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + (t.valor || 0), 0) || 0
    const saldo = receitas - despesas

    return `💰 Seu saldo atual (${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}):\n\n📈 Receitas: R$ ${receitas.toFixed(2)}\n📉 Despesas: R$ ${despesas.toFixed(2)}\n💳 Saldo: R$ ${saldo.toFixed(2)}`
  }

  // RF5: Gerar relatório
  if (BOT_CONFIG.COMMANDS.REPORT.some(cmd => message.includes(cmd))) {
    const { data: transacoes, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('usuario_id', user.id)
      .gte('data_transacao', `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`)
      .lt('data_transacao', `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`)
      .order('data_transacao', { ascending: false })

    if (error) {
      console.error('Error fetching report:', error)
      return 'Erro ao gerar relatório. Tente novamente.'
    }

    const receitas = transacoes?.filter(t => t.tipo === 'receita') || []
    const despesas = transacoes?.filter(t => t.tipo === 'despesa') || []
    
    const totalReceitas = receitas.reduce((sum, t) => sum + (t.valor || 0), 0)
    const totalDespesas = despesas.reduce((sum, t) => sum + (t.valor || 0), 0)
    
    // Group expenses by category
    const despesasPorCategoria = despesas.reduce((acc: any, t) => {
      acc[t.categoria || 'outros'] = (acc[t.categoria || 'outros'] || 0) + (t.valor || 0)
      return acc
    }, {})

    let relatorio = `📊 Relatório Financeiro - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}\n\n`
    relatorio += `💰 Resumo:\n📈 Total de Receitas: R$ ${totalReceitas.toFixed(2)}\n📉 Total de Despesas: R$ ${totalDespesas.toFixed(2)}\n💳 Saldo: R$ ${(totalReceitas - totalDespesas).toFixed(2)}\n\n`
    
    if (Object.keys(despesasPorCategoria).length > 0) {
      relatorio += `📂 Gastos por Categoria:\n`
      Object.entries(despesasPorCategoria).forEach(([categoria, valor]: [string, any]) => {
        relatorio += `• ${categoria}: R$ ${valor.toFixed(2)}\n`
      })
    }

    return relatorio
  }

  // RF6: Configurar meta
  if (BOT_CONFIG.COMMANDS.GOAL.some(cmd => message.includes(cmd))) {
    const valueMatch = message.match(BOT_CONFIG.PATTERNS.VALUE)
    
    if (valueMatch) {
      const valor = parseFloat(valueMatch[1].replace(',', '.'))
      
      const { error } = await supabase
        .from('metas')
        .insert({
          usuario_id: user.id,
          valor_alvo: valor,
          descricao_meta: message,
          status: 'ativa'
        })

      if (error) {
        console.error('Error setting goal:', error)
        return 'Erro ao definir meta. Tente novamente.'
      }

      return `🎯 Meta definida com sucesso!\n💰 Valor: R$ ${valor.toFixed(2)}\n📅 Mês: ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}\n\nVou te ajudar a acompanhar seu progresso!`
    }
    return 'Por favor, informe o valor da meta. Ex: "Quero economizar R$500 este mês"'
  }

  // RF9: Consulta por categoria
  const categoriaMatch = message.match(BOT_CONFIG.PATTERNS.CATEGORY_QUERY)
  if (categoriaMatch) {
    const categoria = categoriaMatch[1].trim()
    
    const { data: despesas, error } = await supabase
      .from('transacoes')
      .select('valor')
      .eq('usuario_id', user.id)
      .eq('tipo', 'despesa')
      .ilike('categoria', `%${categoria}%`)
      .gte('data_transacao', `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`)
      .lt('data_transacao', `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`)

    if (error) {
      console.error('Error fetching category expenses:', error)
      return 'Erro ao consultar gastos por categoria. Tente novamente.'
    }

    const total = despesas?.reduce((sum, d) => sum + (d.valor || 0), 0) || 0

    return `📂 Gastos com "${categoria}" este mês:\n💰 Total: R$ ${total.toFixed(2)}\n📅 Período: ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
  }

  // RF8: Dicas financeiras (exemplo básico)
  if (BOT_CONFIG.COMMANDS.TIPS.some(cmd => message.includes(cmd))) {
    return `💡 Dica Financeira do Dia:\n\n"Registre todas suas despesas diariamente para ter controle total dos seus gastos. Pequenas despesas somam muito no final do mês!"\n\n📝 Comandos disponíveis:\n• "Gastei R$X em categoria" - registrar despesa\n• "Recebi R$X de fonte" - registrar receita\n• "Saldo" - consultar saldo atual\n• "Relatório" - ver resumo do mês\n• "Quero economizar R$X" - definir meta\n• "Quanto gastei com categoria" - gastos por categoria`
  }

  // Default response
  return `Olá ${user.nome}! 👋\n\nNão entendi sua mensagem. Aqui estão alguns comandos que você pode usar:\n\n💸 "Gastei R$50 em almoço"\n💰 "Recebi meu salário de R$3000"\n💳 "Qual meu saldo?"\n📊 "Gerar relatório"\n🎯 "Quero economizar R$500"\n📂 "Quanto gastei com alimentação?"\n💡 "Dicas"\n\nComo posso te ajudar hoje?`
}

async function iniciarBot() {
  // Testar conexão com Supabase primeiro
  const supabaseConnected = await testSupabaseConnection()
  if (!supabaseConnected) {
    console.error('❌ Não foi possível conectar com o Supabase. Verifique as credenciais.')
    return
  }

  const { state, saveCreds } = await useMultiFileAuthState(BOT_CONFIG.AUTH_FOLDER)

     const sock = makeWASocket({
     auth: state,
     printQRInTerminal: true,
     browser: ['FinBot', 'Chrome', '1.0.0'],
     connectTimeoutMs: 60000,
     keepAliveIntervalMs: 25000,
     retryRequestDelayMs: 250
   })

  sock.ev.on('creds.update', saveCreds)

  // Listener para QR Code
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update
    
    if (qr) {
      console.log('📱 QR Code gerado! Escaneie com seu WhatsApp:')
      qrcode.generate(qr, { small: true })
    }
    
         if (connection === 'close') {
       const shouldReconnect = (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut
       console.log('❌ Conexão fechada devido a:', lastDisconnect?.error, ', reconectando:', shouldReconnect)
       if (shouldReconnect) {
         console.log('🔄 Tentando reconectar em 5 segundos...')
         setTimeout(() => {
           iniciarBot()
         }, 5000)
       }
     } else if (connection === 'open') {
       console.log('✅ Conectado ao WhatsApp com sucesso!')
     }
  })

  // Listener para novas mensagens
  sock.ev.on('messages.upsert', async (m: any) => {
    console.log('🔍 Evento messages.upsert recebido:', JSON.stringify(m, null, 2))
    
    const msg = m.messages[0]
    
    // Ignorar mensagens do próprio bot
    if (msg.key.fromMe) {
      console.log('🚫 Mensagem do próprio bot, ignorando')
      return
    }

    // Extrair informações da mensagem
    const phoneNumber = msg.key.remoteJid.split('@')[0]
    const messageText = msg.message?.conversation?.toLowerCase() || 
                       msg.message?.extendedTextMessage?.text?.toLowerCase() || ''

    console.log(`📱 Processando mensagem:`)
    console.log(`   - De: ${phoneNumber}`)
    console.log(`   - Texto: ${messageText}`)
    console.log(`   - JID: ${msg.key.remoteJid}`)

    if (!messageText) {
      console.log('❌ Mensagem sem texto, ignorando')
      return
    }

    try {
             console.log('🔍 Buscando usuário no banco de dados...')
       console.log('📱 Número procurado:', phoneNumber)
       
               // Função para normalizar número de telefone (SEM código do país)
        const normalizePhone = (phone: string) => {
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

        // Normalizar o número recebido (sem código do país)
        const normalizedPhone = normalizePhone(phoneNumber)
        console.log('📱 Número original:', phoneNumber)
        console.log('📱 Número normalizado:', normalizedPhone)

        // Buscar usuário pelo número normalizado
        let { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('telefone_whatsapp', normalizedPhone)
          .single()

        console.log('🔍 Buscando usuário com número:', normalizedPhone)

               console.log('📊 Resultado da busca:', { 
          userData: userData ? { id: userData.id, nome: userData.nome, telefone: userData.telefone_whatsapp } : null, 
          userError 
        })

        if (userError || !userData) {
          console.log('❌ Usuário não encontrado para o telefone:', normalizedPhone)
          console.log('📤 Enviando mensagem de boas-vindas...')
          // Enviar mensagem de boas-vindas para usuários não cadastrados
          await sock.sendMessage(msg.key.remoteJid, { 
            text: BOT_CONFIG.WELCOME_MESSAGE
          })
          console.log('✅ Mensagem de boas-vindas enviada!')
          return
        }

      console.log('✅ Usuário encontrado:', userData.nome)

      // Processar a mensagem e gerar resposta
      console.log('🤖 Processando comando financeiro...')
      const response = await processFinancialMessage(messageText, userData)
      console.log('📝 Resposta gerada:', response)
      
      // Enviar resposta de volta via Baileys
      console.log('📤 Enviando resposta...')
      await sock.sendMessage(msg.key.remoteJid, { text: response })
      console.log('✅ Resposta enviada com sucesso!')

    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error)
      await sock.sendMessage(msg.key.remoteJid, { 
        text: BOT_CONFIG.ERROR_MESSAGE
      })
    }
  })

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/api/enviar', async (req: Request, res: Response) => {
    const { numero, mensagem } = req.body
    if (!numero || !mensagem) {
      return res.status(400).json({ erro: 'Número e mensagem são obrigatórios.' })
    }

    try {
      const jid = numero.includes('@s.whatsapp.net') ? numero : `${numero}@s.whatsapp.net`
      await sock.sendMessage(jid, { text: mensagem })
      res.json({ sucesso: true, enviadoPara: jid })
    } catch (err: any) {
      console.error('❌ Erro ao enviar mensagem:', err)
      res.status(500).json({
        erro: 'Erro ao enviar mensagem.',
        detalhes: err?.message || 'Erro desconhecido'
      })
    }
  })

     app.listen(BOT_CONFIG.PORT, () => {
     console.log(`🚀 Bot WhatsApp ativo em http://localhost:${BOT_CONFIG.PORT}`)
     console.log('📱 Bot conectado e pronto para receber mensagens!')
   }).on('error', (err: any) => {
     if (err.code === 'EADDRINUSE') {
       console.log(`⚠️ Porta ${BOT_CONFIG.PORT} em uso. Tentando porta ${BOT_CONFIG.PORT + 1}...`)
       app.listen(BOT_CONFIG.PORT + 1, () => {
         console.log(`🚀 Bot WhatsApp ativo em http://localhost:${BOT_CONFIG.PORT + 1}`)
         console.log('📱 Bot conectado e pronto para receber mensagens!')
       })
     } else {
       console.error('❌ Erro ao iniciar servidor:', err)
     }
   })
}

export { iniciarBot }