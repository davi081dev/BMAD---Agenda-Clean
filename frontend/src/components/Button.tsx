import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg'
  /** Se o botão está desabilitado */
  disabled?: boolean
  /** Conteúdo do botão */
  children: React.ReactNode
  /** Função chamada ao clicar no botão */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * Componente Button reutilizável
 * 
 * Exemplo de uso:
 * ```jsx
 * <Button variant="primary" size="md">Agendar</Button>
 * <Button variant="secondary">Cancelar</Button>
 * <Button variant="danger" disabled>Deletar</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles: Record<string, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-600',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-200',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-600',
  }

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
