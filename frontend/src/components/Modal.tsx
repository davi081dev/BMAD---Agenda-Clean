import React, { useEffect } from 'react'

export interface ModalProps {
  /** Título do modal */
  title: string
  /** Conteúdo do modal */
  children: React.ReactNode
  /** Se o modal está aberto */
  isOpen: boolean
  /** Função chamada para fechar o modal */
  onClose: () => void
  /** Label para o botão de fechar (acessibilidade) */
  closeLabel?: string
}

/**
 * Componente Modal reutilizável com focus management
 * 
 * Exemplo de uso:
 * ```jsx
 * <Modal
 *   title="Confirmar ação"
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <p>Tem certeza?</p>
 *   <button onClick={() => setIsOpen(false)}>Cancelar</button>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  onClose,
  closeLabel = 'Fechar',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
