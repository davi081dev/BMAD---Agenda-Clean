import React from 'react'

export interface LoadingSpinnerProps {
  /** Tamanho do spinner */
  size?: 'sm' | 'md' | 'lg'
  /** Label para acessibilidade */
  label?: string
}

/**
 * Componente LoadingSpinner para feedback visual de carregamento
 * 
 * Exemplo de uso:
 * ```jsx
 * <LoadingSpinner size="md" label="Carregando agendamentos..." />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Carregando...',
}) => {
  const sizeConfig: Record<string, string> = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center" role="status">
      <svg
        className={`${sizeConfig[size]} animate-spin text-blue-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <span className="mt-2 text-sm text-gray-600">{label}</span>}
    </div>
  )
}
