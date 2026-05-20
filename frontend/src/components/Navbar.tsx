import React from 'react'

export interface NavbarProps {
  /** Logo ou brand */
  brand?: string | React.ReactNode
  /** Links da navbar */
  items?: Array<{ href: string; label: string }>
  /** Ações à direita (login, menu, etc) */
  actions?: React.ReactNode
}

/**
 * Componente Navbar para navegação principal
 * 
 * Exemplo de uso:
 * ```jsx
 * <Navbar
 *   brand="agenda-clean"
 *   items={[
 *     { href: '/', label: 'Home' },
 *     { href: '/agendamentos', label: 'Agendamentos' }
 *   ]}
 *   actions={<button>Login</button>}
 * />
 * ```
 */
export const Navbar: React.FC<NavbarProps> = ({ brand, items = [], actions }) => {
  return (
    <nav
      className="bg-white shadow-sm border-b border-gray-200"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            {typeof brand === 'string' ? (
              <a href="/" className="text-xl font-bold text-blue-600">
                {brand}
              </a>
            ) : (
              brand
            )}
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex space-x-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {actions}
          </div>
        </div>
      </div>
    </nav>
  )
}
