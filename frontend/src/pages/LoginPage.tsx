import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginLayout } from '@/components/auth/LoginLayout'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'
import { ErrorMessage } from '@/components/auth/ErrorMessage'
import { redirectToGoogleAuth } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'

/**
 * LoginPage Component
 * 
 * Página principal de login para agenda-clean
 * Permite autenticação via Google OAuth
 * 
 * Fluxo:
 * 1. Verifica se usuário já está autenticado (redireciona a /dashboard)
 * 2. Exibe formulário de login com botão Google
 * 3. Detecta erros via query params (?error=...)
 * 4. Redireciona para /auth/google ao clicar
 * 5. Backend faz callback para /dashboard com JWT cookie
 */
export function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Redireciona para dashboard se já autenticado
   */
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  /**
   * Detecta erros de autenticação via query params
   * Padrão: ?error=authentication_failed
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('error')) {
      const errorParam = searchParams.get('error')
      setError('Falha ao fazer login. Por favor, tente novamente.')
      
      // Log do erro para debugging
      console.warn(`Login error detected: ${errorParam}`)
    }
  }, [])

  /**
   * Handler para clique do botão Google Login
   * Inicia redirecionamento para OAuth
   */
  const handleGoogleLogin = () => {
    setIsLoading(true)
    setError(null)
    
    try {
      redirectToGoogleAuth()
      // Redirecionamento é automático, loading state mantém até navegar
    } catch (err) {
      console.error('Erro ao redirecionar para Google:', err)
      setError('Erro ao conectar com Google. Tente novamente.')
      setIsLoading(false)
    }
  }

  /**
   * Renderiza página de login
   * Se ainda carregando autenticação, mostra placeholder vazio
   */
  if (authLoading) {
    return null
  }

  return (
    <LoginLayout>
      <div className="text-center">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Bem-vindo ao agenda-clean
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Agendamento de limpeza de sofá feito fácil
        </p>

        {/* Mensagem de Erro */}
        {error && (
          <ErrorMessage 
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {/* Botão de Login */}
        <GoogleLoginButton
          isLoading={isLoading}
          onClick={handleGoogleLogin}
        />

        {/* Texto de suporte */}
        <p className="mt-6 text-xs sm:text-sm text-gray-500">
          Você será autenticado via sua conta Google.
          <br />
          Nenhuma senha é necessária.
        </p>
      </div>
    </LoginLayout>
  )
}

export default LoginPage
