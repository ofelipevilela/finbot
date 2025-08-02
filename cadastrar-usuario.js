import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hpxwusfieqrkfggdwhpi.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweHd1c2ZpZXFya2ZnZ2R3aHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzA2MjUsImV4cCI6MjA2ODk0NjYyNX0.2UfmS40imK1_GVSKh0U7LEvrOTsQ8j5i6o6ABGSB88U"

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