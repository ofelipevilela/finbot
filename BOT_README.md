# 🤖 Bot de WhatsApp - FinBot

Este é o bot de WhatsApp integrado ao sistema financeiro FinBot, utilizando a biblioteca Baileys para conexão com o WhatsApp.

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Bot
```bash
npm run bot
```

### 3. Conectar ao WhatsApp
- Quando executar o comando, um QR Code será exibido no terminal
- Abra o WhatsApp no seu celular
- Vá em **Configurações > Dispositivos Vinculados > Vincular um Dispositivo**
- Escaneie o QR Code exibido no terminal
- O bot estará conectado e pronto para receber mensagens!

## 📱 Funcionalidades do Bot

### Comandos Disponíveis:

#### 💸 Registrar Despesas
```
"Gastei R$50 em almoço"
"Gastei R$25,50 com transporte"
```

#### 💰 Registrar Receitas
```
"Recebi meu salário de R$3000"
"Recebi R$500 de freela"
```

#### 💳 Consultar Saldo
```
"Saldo"
"Quanto tenho?"
```

#### 📊 Gerar Relatório
```
"Relatório"
"Resumo do mês"
```

#### 🎯 Definir Metas
```
"Quero economizar R$500"
"Meta de poupar R$1000"
```

#### 📂 Consultar por Categoria
```
"Quanto gastei com alimentação?"
"Quanto gastei em transporte?"
```

#### 💡 Dicas Financeiras
```
"Dicas"
"Ajuda"
"Conselhos"
```

## 🔧 Configuração

### Estrutura de Arquivos:
- `src/whatsapp-bot/index.ts` - Lógica principal do bot
- `src/bot-server.ts` - Arquivo de inicialização
- `src/integrations/supabase/client.ts` - Cliente do Supabase

### Banco de Dados:
O bot utiliza as seguintes tabelas do Supabase:
- `usuarios` - Dados dos usuários cadastrados
- `transacoes` - Registro de receitas e despesas
- `metas` - Metas financeiras dos usuários

### Autenticação:
- Os arquivos de autenticação são salvos na pasta `./auth`
- Após a primeira conexão, o bot mantém a sessão ativa

## 🌐 API REST

O bot também expõe uma API REST na porta 3001:

### Enviar Mensagem
```
POST http://localhost:3001/api/enviar
Content-Type: application/json

{
  "numero": "5511999999999",
  "mensagem": "Olá! Esta é uma mensagem de teste."
}
```

## 🛠️ Desenvolvimento

### Estrutura do Código:
1. **Listener de Mensagens**: Captura mensagens recebidas via Baileys
2. **Processamento**: Analisa o texto e identifica comandos
3. **Integração Supabase**: Busca dados do usuário e salva transações
4. **Resposta**: Envia resposta formatada de volta via Baileys

### Logs:
- O bot exibe logs detalhados no console
- Mensagens recebidas são logadas com número e conteúdo
- Erros são exibidos com detalhes para debug

## 🔒 Segurança

- Apenas usuários cadastrados no sistema podem usar o bot
- Usuários não cadastrados recebem mensagem de boas-vindas
- Todas as transações são validadas antes de salvar

## 📝 Notas Importantes

1. **Primeira Execução**: Será necessário escanear o QR Code
2. **Reconexão**: O bot reconecta automaticamente em caso de desconexão
3. **Usuários**: Apenas usuários com `telefone_whatsapp` cadastrado podem usar
4. **Porta**: O servidor roda na porta 3001 por padrão

## 🐛 Troubleshooting

### Bot não conecta:
- Verifique se o WhatsApp está atualizado
- Tente deletar a pasta `./auth` e reconectar
- Verifique se não há outro dispositivo conectado

### Mensagens não são processadas:
- Verifique se o usuário está cadastrado no sistema
- Confirme se o número de telefone está correto no banco
- Verifique os logs do console para erros

### Erro de banco de dados:
- Verifique a conexão com o Supabase
- Confirme se as tabelas existem
- Verifique as permissões do usuário no banco 