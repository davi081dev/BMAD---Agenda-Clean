import React from 'react'

export interface BadgeProps {
  /** Status do agendamento */
  status: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado'
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Componente Badge para status de agendamentos
 * 
 * Estados e cores:
 * - solicitado: orange (pendente)
 * - confirmado: blue (confirmado)
 * - em_atendimento: purple/violet (em progresso)
 * - concluído: green (completo)
 * - cancelado: red (cancelado)
 * 
 * Exemplo de uso:
 * ```jsx
 * <Badge status="confirmado" />
 * <Badge status="em_atendimento" />
 * <Badge status="cancelado" />
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> =
    {
      solicitado: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Solicitado',
      },
      confirmado: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Confirmado',
      },
      em_atendimento: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Em Atendimento',
      },
      concluído: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Concluído',
      },
      cancelado: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Cancelado',
      },
    }

  const config = statusConfig[status]

  if (!config) {
    return null
  }

  const { bg, text, label } = config

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${text} ${className}`}
    >
      {label}
    </span>
  )
}
