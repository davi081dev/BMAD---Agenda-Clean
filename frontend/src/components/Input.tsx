import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label do campo */
  label?: string
  /** Texto de erro a exibir */
  error?: string
  /** Placeholder do campo */
  placeholder?: string
  /** Tipo de input */
  type?: string
}

/**
 * Componente Input reutilizável
 * 
 * Exemplo de uso:
 * ```jsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="seu@email.com"
 *   error="Email inválido"
 * />
 * <Input label="Data" type="date" />
 * <Input label="Horário" type="time" />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
