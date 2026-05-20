import React from 'react'

export interface AlertProps {
  /** Tipo de alerta */
  type: 'success' | 'error' | 'info' | 'warning'
  /** Mensagem do alerta */
  message: string
  /** Descrição adicional */
  description?: string
  /** Função chamada ao fechar o alerta */
  onClose?: () => void
}

/**
 * Componente Alert para mensagens de feedback
 * 
 * Tipos disponíveis:
 * - success: Verde (operação bem-sucedida)
 * - error: Vermelho (erro)
 * - info: Azul (informação)
 * - warning: Orange (aviso)
 * 
 * Exemplo de uso:
 * ```jsx
 * <Alert type="success" message="Agendamento confirmado!" />
 * <Alert type="error" message="Erro ao salvar" description="Tente novamente" />
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  description,
  onClose,
}) => {
  const typeConfig: Record<string, { bg: string; border: string; icon: string; text: string }> =
    {
      success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: '✓',
        text: 'text-green-800',
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: '✕',
        text: 'text-red-800',
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'ℹ',
        text: 'text-blue-800',
      },
      warning: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: '!',
        text: 'text-orange-800',
      },
    }

  const config = typeConfig[type]

  if (!config) {
    return null
  }

  return (
    <div
      className={`border rounded-lg p-4 ${config.bg} ${config.border}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 font-bold ${config.text}`}>
          {config.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`font-medium ${config.text}`}>{message}</p>
          {description && (
            <p className={`mt-1 text-sm ${config.text}`}>{description}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 text-sm ${config.text} hover:opacity-75`}
            aria-label="Fechar alerta"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
