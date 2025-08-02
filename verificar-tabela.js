import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hpxwusfieqrkfggdwhpi.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweHd1c2ZpZXFya2ZnZ2R3aHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzA2MjUsImV4cCI6MjA2ODk0NjYyNX0.2UfmS40imK1_GVSKh0U7LEvrOTsQ8j5i6o6ABGSB88U"

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

async function verificarTabela() {
  console.log('🔍 Verificando estrutura da tabela usuarios...')
  
  try {
    // Tentar inserir um registro simples
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{
        nome: 'Teste',
        telefone_whatsapp: '99999999999'
      }])
      .select()
    
    if (error) {
      console.error('❌ Erro ao inserir:', error)
      
      // Tentar buscar estrutura
      const { data: estrutura, error: erroEstrutura } = await supabase
        .from('usuarios')
        .select('*')
        .limit(1)
      
      if (erroEstrutura) {
        console.error('❌ Erro ao buscar estrutura:', erroEstrutura)
      } else {
        console.log('📊 Estrutura da tabela:', estrutura)
      }
    } else {
      console.log('✅ Inserção bem-sucedida:', data)
    }
    
  } catch (err) {
    console.error('❌ Erro geral:', err)
  }
}

verificarTabela() 