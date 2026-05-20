import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label do campo */
  label?: string
  /** Opções do select */
  options: Array<{ value: string; label: string }>
  /** Texto de erro a exibir */
  error?: string
  /** Placeholder */
  placeholder?: string
}

/**
 * Componente Select reutilizável
 * 
 * Exemplo de uso:
 * ```jsx
 * <Select
 *   label="Status"
 *   options={[
 *     { value: 'solicitado', label: 'Solicitado' },
 *     { value: 'confirmado', label: 'Confirmado' }
 *   ]}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
