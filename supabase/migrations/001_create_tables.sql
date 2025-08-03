CREATE TABLE IF NOT EXISTS public.usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  telefone_whatsapp text UNIQUE NOT NULL,
  pin_seguranca text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.transacoes (
  id serial PRIMARY KEY,
  usuario_id uuid REFERENCES public.usuarios(id) ON DELETE CASCADE,
  valor numeric(12,2) NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('despesa', 'receita')),
  categoria text,
  descricao text,
  data_transacao timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.metas (
  id serial PRIMARY KEY,
  usuario_id uuid REFERENCES public.usuarios(id) ON DELETE CASCADE,
  valor_alvo numeric(12,2) NOT NULL,
  descricao_meta text,
  status text DEFAULT 'ativa',
  data_criacao timestamp with time zone DEFAULT now()
);
