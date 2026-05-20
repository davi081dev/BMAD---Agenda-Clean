import { useState, useEffect, useCallback } from 'react'
import { User } from '@/types/auth'
import { getAuthStatus, logout as logoutService } from '@/services/authService'

/**
 * Hook useAuth
 * 
 * Fornece acesso ao estado de autenticação do usuário
 * Verifica autenticação ao montar o componente
 * 
 * Exemplo de uso:
 * ```jsx
 * const { user, isLoading, isAuthenticated, logout } = useAuth()
 * 
 * if (isLoading) return <LoadingSpinner />
 * if (!isAuthenticated) return <LoginPage />
 * 
 * return <Dashboard user={user} />
 * ```
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Verifica status de autenticação ao montar
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const authUser = await getAuthStatus()
        setUser(authUser)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  /**
   * Faz logout do usuário
   */
  const logout = useCallback(async () => {
    try {
      await logoutService()
      setUser(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  }
}
