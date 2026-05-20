import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'

/**
 * PrivateLayout
 * 
 * Layout compartilhado para páginas autenticadas.
 * Renderiza header com informações do usuário, navegação e footer.
 * 
 * Características:
 * - Header com logo e informações do usuário (name, email)
 * - Menu de navegação (Dashboard, Perfil, etc)
 * - Botão de logout com confirmação modal
 * - Breadcrumb mostrando página atual
 * - Responsivo (desktop + mobile)
 * 
 * Exemplo de uso:
 * ```jsx
 * <PrivateLayout>
 *   <DashboardPage />
 * </PrivateLayout>
 * ```
 */
interface PrivateLayoutProps {
  children: React.ReactNode
  title?: string
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Handler para logout com confirmação
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false)
    await logout()
    navigate('/login', { replace: true })
  }

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  // Função auxiliar para obter o breadcrumb baseado na rota atual
  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    if (pathSegments.length === 0) return 'Dashboard'
    
    const lastSegment = pathSegments[pathSegments.length - 1]
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Get the initials for avatar
  const getInitials = (name: string | undefined): string => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-2xl font-bold text-blue-600">📅 agenda-clean</h1>
          </div>

          {/* User Info + Logout Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">{user?.email}</span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              {getInitials(user?.name)}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Logout"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Mobile User Info (shown when sidebar is open) */}
        {isSidebarOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 bg-gray-50">
            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
            <div className="text-xs text-gray-500 mt-1">{user?.email}</div>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink 
              href="/dashboard" 
              icon="📊"
              label="Dashboard"
              isActive={location.pathname === '/dashboard'}
              onClick={() => navigate('/dashboard')}
            />
            <NavLink 
              href="/perfil" 
              icon="👤"
              label="Perfil"
              isActive={location.pathname === '/perfil'}
              onClick={() => navigate('/perfil')}
            />
            <NavLink 
              href="/agendamentos" 
              icon="📅"
              label="Meus Agendamentos"
              isActive={location.pathname === '/agendamentos'}
              onClick={() => navigate('/agendamentos')}
            />
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogoutClick}
              className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar - Overlay */}
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Mobile Sidebar */}
            <aside className="md:hidden fixed left-0 top-0 h-full w-64 bg-white z-40 pt-20 border-r border-gray-200 overflow-y-auto">
              <nav className="px-4 py-6 space-y-2">
                <NavLink 
                  href="/dashboard" 
                  icon="📊"
                  label="Dashboard"
                  isActive={location.pathname === '/dashboard'}
                  onClick={() => {
                    navigate('/dashboard')
                    setIsSidebarOpen(false)
                  }}
                />
                <NavLink 
                  href="/perfil" 
                  icon="👤"
                  label="Perfil"
                  isActive={location.pathname === '/perfil'}
                  onClick={() => {
                    navigate('/perfil')
                    setIsSidebarOpen(false)
                  }}
                />
                <NavLink 
                  href="/agendamentos" 
                  icon="📅"
                  label="Meus Agendamentos"
                  isActive={location.pathname === '/agendamentos'}
                  onClick={() => {
                    navigate('/agendamentos')
                    setIsSidebarOpen(false)
                  }}
                />
              </nav>

              <div className="px-4 py-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false)
                    handleLogoutClick()
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Sair
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
            <div className="text-sm text-gray-600">
              <span className="hover:text-gray-900 cursor-pointer" onClick={() => navigate('/dashboard')}>
                Dashboard
              </span>
              {location.pathname !== '/dashboard' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">{title || getBreadcrumb()}</span>
                </>
              )}
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2026 agenda-clean. Todos os direitos reservados.</p>
            <p className="mt-2">
              <a href="#" className="text-blue-600 hover:text-blue-700">Privacidade</a>
              {' '} • {' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Termos</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        title="Confirmar Saída"
        onClose={handleCancelLogout}
      >
        <div className="mb-6">
          <p className="text-gray-700">
            Tem certeza que deseja sair da sua conta?
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={handleCancelLogout}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmLogout}
          >
            Confirmar Saída
          </Button>
        </div>
      </Modal>
    </div>
  )
}

/**
 * Componente auxiliar para links de navegação
 */
interface NavLinkProps {
  href: string
  icon: string
  label: string
  isActive: boolean
  onClick: () => void
}

function NavLink({ href, icon, label, isActive, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default PrivateLayout
