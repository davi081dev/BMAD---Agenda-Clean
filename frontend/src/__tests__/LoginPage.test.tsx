import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'

// Mock módulos
const mockUseAuth = vi.fn()
const mockRedirectToGoogleAuth = vi.fn()

vi.mock('@/services/authService', () => ({
  redirectToGoogleAuth: mockRedirectToGoogleAuth,
  getAuthStatus: vi.fn(),
}))

vi.mock('@/hooks/useAuth', () => ({
  useAuth: mockUseAuth,
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      logout: vi.fn(),
    })
  })

  it('renderiza título, subtítulo e botão de login', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    expect(screen.getByText('Bem-vindo ao agenda-clean')).toBeInTheDocument()
    expect(screen.getByText('Agendamento de limpeza de sofá feito fácil')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar com google/i })).toBeInTheDocument()
  })

  it('exibe loading state quando isLoading=true', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      logout: vi.fn(),
    })

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    // Component retorna null enquanto carregando
    expect(screen.queryByText('Bem-vindo ao agenda-clean')).not.toBeInTheDocument()
  })

  it('detecta erro via query param e exibe mensagem', async () => {
    // Simula URL com parâmetro de erro
    window.history.pushState({}, '', '?error=authentication_failed')

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/falha ao fazer login/i)).toBeInTheDocument()
    })

    // Limpa URL
    window.history.pushState({}, '', '/')
  })

  it('dispara redirectToGoogleAuth ao clicar no botão', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )

    const button = screen.getByRole('button', { name: /entrar com google/i })
    await user.click(button)

    expect(mockRedirectToGoogleAuth).toHaveBeenCalled()
  })
})
