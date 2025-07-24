-- Configurar RLS para a tabela usuarios
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários criem suas próprias contas
CREATE POLICY "Users can create their own account" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir que usuários vejam apenas seus próprios dados
CREATE POLICY "Users can view their own data" 
ON public.usuarios 
FOR SELECT 
USING (id = auth.uid());

-- Política para permitir que usuários atualizem seus próprios dados
CREATE POLICY "Users can update their own data" 
ON public.usuarios 
FOR UPDATE 
USING (id = auth.uid());

-- Configurar RLS para transacoes
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Políticas para transacoes
CREATE POLICY "Users can manage their own transactions" 
ON public.transacoes 
FOR ALL 
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());

-- Configurar RLS para metas
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;

-- Políticas para metas
CREATE POLICY "Users can manage their own goals" 
ON public.metas 
FOR ALL 
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());