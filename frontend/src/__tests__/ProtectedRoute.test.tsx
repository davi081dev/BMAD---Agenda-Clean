import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import * as useAuthModule from '@/hooks/useAuth'

// Mock do hook useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

const mockUseAuth = useAuthModule.useAuth as ReturnType<typeof vi.fn>

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Protected Content</div>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza LoadingSpinner quando isLoading é true', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText(/Verificando autenticação/i)).toBeInTheDocument()
  })

  it('renderiza children quando usuário está autenticado', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'John', email: 'john@example.com' },
      isLoading: false,
      isAuthenticated: true,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('não renderiza children e redireciona quando não autenticado', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      logout: vi.fn(),
    })

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    )

    // Verifica que o componente protegido não é renderizado
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()

    // Verifica que Navigate foi usado (a página vazia indica navegação)
    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('AC1: ProtectedRoute redireciona não-autenticados para /login', async () => {
    // Simula transição de loading para não-autenticado
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      logout: vi.fn(),
    })

    const { container } = render(
      <BrowserRouter initialEntries={['/dashboard']}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    )

    // O componente protegido não deve ser renderizado
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('AC2: ProtectedRoute renderiza conteúdo se autenticado', async () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@example.com',
      },
      isLoading: false,
      isAuthenticated: true,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter initialEntries={['/dashboard']}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </BrowserRouter>
    )

    // Verifica que o conteúdo protegido é renderizado
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })
})
