import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/LoadingSpinner'

/**
 * ProtectedRoute
 * 
 * HOC que protege rotas, garantindo que apenas usuários autenticados possam acessá-las.
 * 
 * Fluxo:
 * 1. Se isLoading=true: renderiza LoadingSpinner
 * 2. Se isLoading=false e não autenticado: redireciona para /login
 * 3. Se autenticado: renderiza children
 * 
 * Exemplo de uso:
 * ```jsx
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <PrivateLayout>
 *         <DashboardPage />
 *       </PrivateLayout>
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */
interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth()

  // Enquanto verifica autenticação, mostra spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" label="Verificando autenticação..." />
      </div>
    )
  }

  // Se não autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se autenticado, renderiza o componente protegido
  return <>{children}</>
}

export default ProtectedRoute
