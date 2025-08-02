# 🤖 FinBot - Assistente Financeiro WhatsApp

Um bot inteligente de WhatsApp para controle financeiro pessoal, desenvolvido com React, TypeScript e Supabase.

## 🚀 Funcionalidades

- ✅ **Registro automático de despesas e receitas**
- ✅ **Categorização inteligente** (Alimentação, Mercado, Transporte, Carro, Saúde, etc.)
- ✅ **Consulta de saldo** em tempo real
- ✅ **Relatórios detalhados** por categoria
- ✅ **Definição de metas** financeiras
- ✅ **Dicas financeiras** personalizadas
- ✅ **Interface web** para cadastro de usuários

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn/ui
- **WhatsApp Bot**: Baileys + Node.js
- **Backend**: Supabase (PostgreSQL)
- **Deploy**: GitHub Pages

## 📱 Como Usar

### 1. Cadastro
Acesse a landing page e faça seu cadastro:
```
https://ofelipevilela.github.io/finbot/
```

### 2. Comandos do Bot
- 💸 **"Gastei R$50 no almoço"** - Registrar despesa
- 💰 **"Recebi R$3000 de salário"** - Registrar receita
- 💳 **"Saldo"** - Consultar saldo atual
- 📊 **"Relatório"** - Ver resumo do mês
- 🎯 **"Quero economizar R$500"** - Definir meta
- 📂 **"Quanto gastei com alimentação?"** - Gastos por categoria
- 💡 **"Dicas"** - Receber dicas financeiras

## 🏗️ Instalação Local

```bash
# Clone o repositório
git clone https://github.com/ofelipevilela/finbot.git
cd finbot

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase

# Execute o bot
npm run bot

# Em outro terminal, execute o frontend
npm run dev
```

## 🚀 Deploy

### GitHub Pages (Automático)
O projeto está configurado para deploy automático no GitHub Pages. A cada push para a branch `main`, o site será atualizado automaticamente.

### Deploy Manual
```bash
npm run deploy
```

## 📊 Categorias Disponíveis

- **Alimentação**: almoço, café, jantar, restaurante, etc.
- **Mercado**: supermercado, compras, feira, padaria, etc.
- **Transporte**: gasolina, uber, ônibus, passagem, etc.
- **Carro**: mecânico, oficina, manutenção, seguro, etc.
- **Saúde**: farmácia, médico, consulta, dentista, etc.
- **Educação**: escola, faculdade, curso, livros, etc.
- **Lazer**: cinema, teatro, viagem, academia, etc.
- **Serviços**: conta, luz, internet, assinaturas, etc.

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase
```

### Supabase Setup
1. Crie um projeto no Supabase
2. Execute as migrações SQL em `supabase/migrations/`
3. Configure as tabelas: `usuarios`, `transacoes`, `metas`
4. Desabilite RLS (Row Level Security) para as tabelas

## 📝 Estrutura do Projeto

```
my-fin-assistant-1/
├── src/
│   ├── components/          # Componentes React
│   ├── pages/              # Páginas da aplicação
│   ├── whatsapp-bot/       # Lógica do bot WhatsApp
│   ├── integrations/       # Integrações (Supabase)
│   └── lib/               # Utilitários
├── supabase/              # Configurações do Supabase
├── .github/workflows/     # GitHub Actions
└── public/               # Arquivos estáticos
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ para controle financeiro inteligente!**
