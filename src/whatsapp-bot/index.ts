import express, { Request, Response } from 'express'
import cors from 'cors'
import { Boom } from '@hapi/boom'

const baileys = require('@whiskeysockets/baileys')
const makeWASocket = baileys.makeWASocket
const DisconnectReason = baileys.DisconnectReason
const useMultiFileAuthState = baileys.useMultiFileAuthState || baileys.default?.useMultiFileAuthState

if (typeof useMultiFileAuthState !== 'function') {
  throw new Error('❌ useMultiFileAuthState não pôde ser carregado. Verifique sua versão do Baileys.')
}

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveCreds)

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

  app.listen(3001, () => {
    console.log('🚀 Bot WhatsApp ativo em http://localhost:3001')
  })
}

iniciarBot()