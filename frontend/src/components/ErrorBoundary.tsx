import React, { ReactNode } from 'react'
import { Button } from '@/components/Button'

/**
 * ErrorBoundary
 * 
 * Componente que captura erros não-capturados em componentes filhos
 * durante o render, evitando que a aplicação inteira quebre.
 * 
 * Características:
 * - Captura erros durante render de componentes filhos
 * - Exibe mensagem amigável ao usuário
 * - Loga erro no console para debugging
 * - Oferece botão para recarregar a página
 * - Integra com Sentry se disponível
 * 
 * Exemplo de uso:
 * ```jsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 * 
 * NOTA: Não captura erros em:
 * - Event handlers (use try-catch)
 * - Operações assíncronas (use try-catch)
 * - Server-side rendering
 * - Erros no próprio ErrorBoundary
 */
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Atualiza state para próximo render mostrar fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log do erro para debugging
    console.error('ErrorBoundary capturou erro:', error)
    console.error('Error Info:', errorInfo)

    // Armazena informações do erro para exibição
    this.setState({
      error,
      errorInfo,
    })

    // Opcional: Integração com Sentry ou outro serviço de erro
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, { contexts: { react: errorInfo } })
    // }
  }

  handleReload = () => {
    // Recarrega a página
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2m0-16a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              Algo deu errado
            </h1>

            {/* Error Message */}
            <p className="text-red-700 mb-6">
              Desculpe, encontramos um erro inesperado. Por favor, tente novamente.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-gray-700 mb-2">
                  <strong>Erro:</strong> {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-gray-600">
                    <summary className="cursor-pointer font-semibold mb-2">
                      Detalhes da Stack
                    </summary>
                    <pre className="whitespace-pre-wrap break-words font-mono">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Reload Button */}
            <Button
              onClick={this.handleReload}
              variant="primary"
              className="w-full"
            >
              Recarregar Página
            </Button>

            {/* Help Text */}
            <p className="text-sm text-gray-500 mt-4">
              Se o problema persistir, entre em contato com o suporte.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
