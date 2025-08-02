-- Script SQL para inserir usuário de teste
-- Execute este script no SQL Editor do Supabase

INSERT INTO usuarios (nome, telefone_whatsapp) 
VALUES ('Felipe Vilela', '93298103339');

-- Verificar se foi inserido
SELECT * FROM usuarios WHERE telefone_whatsapp = '93298103339'; 