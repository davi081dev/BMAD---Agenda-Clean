import React from 'react'

export interface CardProps {
  /** Conteúdo do card */
  children: React.ReactNode
  /** Classes CSS adicionais */
  className?: string
  /** Função chamada ao clicar no card */
  onClick?: () => void
}

/**
 * Componente Card reutilizável
 * 
 * Exemplo de uso:
 * ```jsx
 * <Card>
 *   <h2>Título</h2>
 *   <p>Conteúdo do card</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
