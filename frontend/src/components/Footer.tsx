import React from 'react'

export interface FooterProps {
  /** Conteúdo do footer */
  children?: React.ReactNode
  /** Links do footer */
  links?: Array<{ href: string; label: string }>
  /** Texto de copyright */
  copyright?: string
}

/**
 * Componente Footer para rodapé da aplicação
 * 
 * Exemplo de uso:
 * ```jsx
 * <Footer
 *   links={[
 *     { href: '/privacidade', label: 'Privacidade' },
 *     { href: '/termos', label: 'Termos' }
 *   ]}
 *   copyright="© 2026 agenda-clean"
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  children,
  links = [],
  copyright,
}) => {
  const currentYear = new Date().getFullYear()
  const defaultCopyright = `© ${currentYear} agenda-clean. Todos os direitos reservados.`

  return (
    <footer className="bg-gray-900 text-white mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children && <div className="mb-8">{children}</div>}

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-6 mb-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm">
            {copyright || defaultCopyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
