import { createClient } from '@supabase/supabase-js';

// Obtém as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique o arquivo .env.local'
  );
}

// Cria e exporta o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
