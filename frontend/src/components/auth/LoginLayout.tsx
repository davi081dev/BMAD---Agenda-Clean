import React from 'react'

export interface LoginLayoutProps {
  /** Conteúdo a ser exibido no layout */
  children: React.ReactNode
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Componente LoginLayout
 * 
 * Layout dedicado para página de login
 * Fornece estrutura responsiva com header, main e footer
 * Mobile-first (320px+) até desktop (1024px+)
 * 
 * Exemplo de uso:
 * ```jsx
 * <LoginLayout>
 *   <h1>Bem-vindo</h1>
 *   <GoogleLoginButton />
 * </LoginLayout>
 * ```
 */
export const LoginLayout: React.FC<LoginLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              agenda-clean
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2026 agenda-clean. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
