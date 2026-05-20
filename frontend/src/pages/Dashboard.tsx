import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/LoadingSpinner'

/**
 * Dashboard Page
 * 
 * Página protegida para usuários autenticados
 * Exemplo básico para validar o fluxo de login
 */
export function Dashboard() {
  const navigate = useNavigate()
  const { user, isLoading, isAuthenticated, logout } = useAuth()

  // Se ainda carregando, mostra spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" label="Carregando dashboard..." />
      </div>
    )
  }

  // Se não autenticado, redireciona para login
  if (!isAuthenticated) {
    React.useEffect(() => {
      navigate('/login', { replace: true })
    }, [navigate])
    return null
  }

  // Handler para logout
  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">agenda-clean</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Bem-vindo, <strong>{user?.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Dashboard
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Papel
              </label>
              <p className="mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID do Usuário
              </label>
              <p className="mt-1 text-sm text-gray-600 font-mono">{user?.id}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              ✅ Você está autenticado e logado com sucesso!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
