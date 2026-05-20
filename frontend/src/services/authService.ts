import { User } from '@/types/auth'

/**
 * Serviço de Autenticação
 * 
 * Funções utilitárias para gerenciar autenticação via OAuth
 * Não armazena tokens em localStorage (usa httpOnly cookies do backend)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Redireciona para o fluxo de autenticação Google
 * O backend retorna 302 redirect para Google OAuth
 */
export function redirectToGoogleAuth(): void {
  window.location.href = `${API_URL}/auth/google`
}

/**
 * Verifica se o usuário está autenticado
 * Faz uma chamada ao backend para verificar sesão via cookie httpOnly
 * 
 * @returns Objeto de usuário se autenticado, null caso contrário
 */
export async function getAuthStatus(): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/status`, {
      method: 'GET',
      credentials: 'include', // Importante: envia cookies httpOnly
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.user || null
  } catch (error) {
    console.error('Erro ao verificar status de autenticação:', error)
    return null
  }
}

/**
 * Faz logout do usuário
 * Invalida a sessão no backend
 */
export async function logout(): Promise<void> {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}

/**
 * Obtém a URL base da API
 * Útil para debug e logging
 */
export function getApiUrl(): string {
  return API_URL
}

/**
 * Valida se a URL de API está configurada
 */
export function isApiConfigured(): boolean {
  return !!import.meta.env.VITE_API_URL
}
