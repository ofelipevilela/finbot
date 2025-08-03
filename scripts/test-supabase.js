import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hpxwusfieqrkfggdwhpi.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweHd1c2ZpZXFya2ZnZ2R3aHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzA2MjUsImV4cCI6MjA2ODk0NjYyNX0.2UfmS40imK1_GVSKh0U7LEvrOTsQ8j5i6o6ABGSB88U"

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})

async function testSupabase() {
  console.log('🔍 Testando conexão com Supabase...')
  
  try {
    // Testar conexão
    const { data: testData, error: testError } = await supabase
      .from('usuarios')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Erro na conexão:', testError)
      return
    }
    
    console.log('✅ Conexão OK!')
    
    // Listar todos os usuários
    const { data: usuarios, error: usuariosError } = await supabase
      .from('usuarios')
      .select('*')
    
    if (usuariosError) {
      console.error('❌ Erro ao buscar usuários:', usuariosError)
      return
    }
    
    console.log('📊 Usuários cadastrados:')
    console.log('Total:', usuarios?.length || 0)
    
    if (usuarios && usuarios.length > 0) {
      usuarios.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}, Nome: ${user.nome}, Telefone: ${user.telefone_whatsapp}`)
      })
    } else {
      console.log('❌ Nenhum usuário cadastrado!')
    }
    
    // Testar busca específica
    const numeroTeste = '93298103339'
    console.log(`\n🔍 Testando busca por: ${numeroTeste}`)
    
    const { data: userTest, error: userTestError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('telefone_whatsapp', numeroTeste)
      .single()
    
    if (userTestError) {
      console.log('❌ Usuário não encontrado:', userTestError.message)
    } else {
      console.log('✅ Usuário encontrado:', userTest)
    }
    
  } catch (err) {
    console.error('❌ Erro geral:', err)
  }
}

testSupabase() 