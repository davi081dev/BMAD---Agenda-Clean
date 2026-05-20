import React from 'react'

export interface ErrorMessageProps {
  /** Mensagem de erro a exibir */
  message: string
  /** Função chamada ao clicar no botão de fechar */
  onDismiss?: () => void
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Componente ErrorMessage
 * 
 * Exibe mensagens de erro de forma clara e acionável
 * Com ícone de erro, cor vermelha e botão de fechar
 * 
 * Exemplo de uso:
 * ```jsx
 * <ErrorMessage 
 *   message="Falha ao fazer login. Por favor, tente novamente."
 *   onDismiss={() => setError(null)}
 * />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  className = '',
}) => {
  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3 ${className}`}
      role="alert"
      aria-live="polite"
    >
      {/* Error Icon */}
      <svg
        className="flex-shrink-0 w-5 h-5 text-red-600 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>

      {/* Error Message */}
      <div className="flex-1">
        <p className="text-sm font-medium text-red-800">{message}</p>
      </div>

      {/* Dismiss Button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded p-1"
          aria-label="Fechar mensagem de erro"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
