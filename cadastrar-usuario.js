import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Variáveis de ambiente SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY não definidas.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

async function cadastrarUsuario() {
  console.log('👤 Cadastrando usuário de teste...')
  
  try {
    const usuarioTeste = {
      nome: 'Felipe Vilela',
      telefone_whatsapp: '93298103339'
    }
    
    console.log('📝 Dados do usuário:', usuarioTeste)
    
    const { data, error } = await supabase
      .from('usuarios')
      .insert([usuarioTeste])
      .select()
    
    if (error) {
      console.error('❌ Erro ao cadastrar:', error)
      return
    }
    
    console.log('✅ Usuário cadastrado com sucesso!')
    console.log('📊 Dados inseridos:', data)
    
    // Verificar se foi inserido
    const { data: verificacao, error: erroVerificacao } = await supabase
      .from('usuarios')
      .select('*')
      .eq('telefone_whatsapp', '93298103339')
      .single()
    
    if (erroVerificacao) {
      console.error('❌ Erro na verificação:', erroVerificacao)
    } else {
      console.log('✅ Usuário encontrado na verificação:', verificacao)
    }
    
  } catch (err) {
    console.error('❌ Erro geral:', err)
  }
}

cadastrarUsuario() 