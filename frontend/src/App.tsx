import '@/styles/globals.css'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LoadingSpinner } from '@/components/LoadingSpinner'

/**
 * Lazy load das páginas para code splitting e otimização de bundle
 */
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const BookingsPage = lazy(() => import('@/pages/BookingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

/**
 * Fallback spinner para Suspense boundaries
 */
const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" label="Carregando página..." />
  </div>
)

/**
 * Componente App - Raiz da aplicação
 * 
 * Estrutura de rotas com proteção e lazy loading:
 * - /login: Página pública de autenticação
 * - /dashboard: Página protegida (requer autenticação)
 * - /perfil: Página protegida do perfil do usuário
 * - /agendamentos: Página protegida de agendamentos
 * - /: Redireciona para /login
 * - *: Rotas inválidas mostram 404 page
 * 
 * Padrão de proteção:
 * <ProtectedRoute>
 *   <PrivateLayout>
 *     <Suspense>
 *       <PageComponent />
 *     </Suspense>
 *   </PrivateLayout>
 * </ProtectedRoute>
 */
export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* ========== ROTAS PÚBLICAS ========== */}

          {/* Rota de Login - Sem proteção */}
          <Route path="/login" element={<LoginPage />} />

          {/* ========== ROTAS PROTEGIDAS ========== */}

          {/* Dashboard - Rota principal protegida */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <Suspense fallback={<SuspenseFallback />}>
                    <DashboardPage />
                  </Suspense>
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* Perfil do Usuário - Rota protegida */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <PrivateLayout title="Meu Perfil">
                  <Suspense fallback={<SuspenseFallback />}>
                    <ProfilePage />
                  </Suspense>
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* Agendamentos - Rota protegida */}
          <Route
            path="/agendamentos"
            element={
              <ProtectedRoute>
                <PrivateLayout title="Meus Agendamentos">
                  <Suspense fallback={<SuspenseFallback />}>
                    <BookingsPage />
                  </Suspense>
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* ========== ROTAS DE FALLBACK ========== */}

          {/* Rota raiz - Redireciona para /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rota 404 - Página não encontrada */}
          <Route
            path="*"
            element={
              <Suspense fallback={<SuspenseFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
