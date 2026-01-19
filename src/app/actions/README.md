# Server Actions - Autenticação

Este diretório contém os Server Actions para autenticação do sistema.

## Arquivos

- `auth.ts` - Server Actions para registro e login de usuários

## Integração com Supabase

Para integrar com Supabase, siga estes passos:

1. Instale o cliente do Supabase:
```bash
npm install @supabase/supabase-js
```

2. Crie um arquivo `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

3. Atualize as funções em `auth.ts`:

### Para registro:
```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name, nick }
  }
});
```

### Para login:
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

4. Adicione as variáveis de ambiente no `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Estrutura Atual

Atualmente, os Server Actions estão preparados para integração futura com Supabase, mas retornam respostas simuladas para desenvolvimento e testes.
