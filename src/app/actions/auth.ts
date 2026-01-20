'use server';

import { supabase } from '@/lib/supabase';

/**
 * Server Actions para autenticação
 * Integrado com Supabase
 */

export interface RegisterResult {
  success: boolean;
  message: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
}

/**
 * Registra um novo usuário
 * @param formData - Dados do formulário de registro
 */
export async function registerUser(
  formData: FormData
): Promise<RegisterResult> {
  // Normaliza e limpa os campos vindos do formulário
  const name = (formData.get('name') as string | null)?.trim() || '';
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() || '';
  const nick = (formData.get('nick') as string | null)?.trim() || '';
  const password = (formData.get('password') as string | null) || '';

  // Validação básica
  if (!name || !email || !nick || !password) {
    return {
      success: false,
      message: 'Todos os campos são obrigatórios.',
    };
  }

  // Validação simples de formato de email antes de chamar o Supabase
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Formato de email inválido.',
    };
  }

  // Validação de senha
  if (password.length < 6) {
    return {
      success: false,
      message: 'A senha deve ter pelo menos 6 caracteres.',
    };
  }

  try {
    // Registra o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          nick,
        },
      },
    });

    if (authError) {
      console.error('Erro no registro (Auth):', authError);
      
      // Mensagens de erro mais específicas
      if (authError.message.includes('already registered')) {
        return {
          success: false,
          message: 'Este email já está cadastrado.',
        };
      }
      
      return {
        success: false,
        message: authError.message || 'Erro ao registrar usuário.',
      };
    }

    // Se o registro foi bem-sucedido, também podemos salvar dados adicionais na tabela users
    // (se você tiver uma tabela personalizada no Supabase)
    if (authData.user) {
      // Opcional: Inserir dados adicionais na tabela users do Supabase
      // Descomente e ajuste conforme sua estrutura de banco:
      /*
      const { error: dbError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            name,
            email,
            nick,
          },
        ]);

      if (dbError) {
        console.error('Erro ao salvar dados do usuário:', dbError);
        // Não retornamos erro aqui, pois o usuário já foi criado no Auth
      }
      */
    }

    return {
      success: true,
      message: 'Registro efetuado com sucesso! Verifique seu email para confirmar a conta.',
    };
  } catch (error) {
    console.error('Erro no registro:', error);
    return {
      success: false,
      message: 'Erro interno do servidor.',
    };
  }
}

/**
 * Autentica um usuário existente
 * @param formData - Dados do formulário de login
 */
export async function loginUser(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validação básica
  if (!email || !password) {
    return {
      success: false,
      message: 'Email e senha são obrigatórios.',
    };
  }

  try {
    // Autentica o usuário no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro no login:', error);
      
      // Mensagens de erro mais específicas
      if (error.message.includes('Invalid login credentials')) {
        return {
          success: false,
          message: 'Email ou senha incorretos.',
        };
      }
      
      if (error.message.includes('Email not confirmed')) {
        return {
          success: false,
          message: 'Por favor, confirme seu email antes de fazer login.',
        };
      }
      
      return {
        success: false,
        message: error.message || 'Erro ao fazer login.',
      };
    }

    if (data.user) {
      return {
        success: true,
        message: 'Login efetuado com sucesso!',
      };
    }

    return {
      success: false,
      message: 'Erro ao fazer login.',
    };
  } catch (error) {
    console.error('Erro no login:', error);
    return {
      success: false,
      message: 'Erro interno do servidor.',
    };
  }
}
