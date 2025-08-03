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
Copie `.env.example` para `.env` e preencha os valores conforme seu ambiente (dev/prod):

```bash
cp .env.example .env
# Edite .env com as chaves do seu Supabase e outras variáveis necessárias
```

**Frontend (Vite):**
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` são usados pelo React/Vite.

**Backend/Bot:**
- `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` são usados pelo Node.js/bot.
- `SUPABASE_SERVICE_ROLE_KEY` (opcional, para scripts/admin).

Você pode criar diferentes arquivos `.env` para cada ambiente (ex: `.env.development`, `.env.production`) e usar ferramentas como [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) para gerenciar múltiplos ambientes.

### Supabase Setup
1. Crie um projeto no Supabase
2. Execute as migrações SQL em `supabase/migrations/`
3. Configure as tabelas: `usuarios`, `transacoes`, `metas`
4. Desabilite RLS (Row Level Security) para as tabelas

## 📝 Estrutura do Projeto


```
finbot/
├── src/
│   ├── components/        # Componentes React (ui/ = componentes reutilizáveis)
│   ├── pages/             # Páginas da aplicação
│   ├── whatsapp-bot/      # Lógica do bot WhatsApp
│   ├── integrations/      # Integrações externas (ex: supabase)
│   ├── hooks/             # React hooks customizados
│   ├── lib/               # Funções utilitárias
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/              # Configuração e migrações do banco
│   └── migrations/
├── public/                # Arquivos estáticos
├── scripts/               # Scripts utilitários e testes manuais
│   ├── cadastrar-usuario.js
│   ├── test-supabase.js
│   ├── teste-categorizacao.js
│   ├── teste-normalizacao.js
│   ├── verificar-tabela.js
│   └── test-supabase-connection.js
├── .github/               # Workflows e instruções
├── .env                   # Variáveis de ambiente
├── .env.example           # Exemplo de variáveis de ambiente
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração Vite
├── ...                    # Outros arquivos de configuração
├── README.md
└── ...
```

**Boas práticas de organização:**
- Scripts utilitários e testes manuais devem ficar em `scripts/` para não poluir a raiz.
- Todo o código fonte da aplicação fica em `src/`.
- Migrações e configurações do banco ficam em `supabase/`.
- Variáveis de ambiente separadas por arquivo para facilitar dev/prod.

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

**Desenvolvido para controle financeiro inteligente!**
