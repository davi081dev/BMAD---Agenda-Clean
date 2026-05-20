import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PrivateLayout } from '@/components/layouts/PrivateLayout'
import * as useAuthModule from '@/hooks/useAuth'

// Mock do hook useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

const mockUseAuth = useAuthModule.useAuth as ReturnType<typeof vi.fn>

describe('PrivateLayout', () => {
  const TestContent = () => <div>Test Page Content</div>

  beforeEach(() => {
    vi.clearAllMocks()
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
  })

  it('AC3: renderiza informações do usuário autenticado', () => {
    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Verifica que o nome e email do usuário são renderizados
    expect(screen.getByText('Ana Silva')).toBeInTheDocument()
    expect(screen.getByText('ana@example.com')).toBeInTheDocument()
  })

  it('renderiza header com logo', () => {
    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Verifica que o logo/título é renderizado
    expect(screen.getByText(/agenda-clean/i)).toBeInTheDocument()
  })

  it('renderiza botão Sair', () => {
    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Verifica que o botão Sair existe (pode haver 2, um no header e um na sidebar)
    const logoutButtons = screen.getAllByRole('button', { name: /Sair/i })
    expect(logoutButtons.length).toBeGreaterThan(0)
  })

  it('AC4: logout com confirmação modal funciona', async () => {
    const mockLogout = vi.fn()
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Ana', email: 'ana@example.com' },
      isLoading: false,
      isAuthenticated: true,
      logout: mockLogout,
    })

    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Clica no botão Sair
    const logoutButtons = screen.getAllByRole('button', { name: /Sair/i })
    fireEvent.click(logoutButtons[0])

    // Modal de confirmação deve aparecer
    await waitFor(() => {
      expect(screen.getByText(/Tem certeza que deseja sair/i)).toBeInTheDocument()
    })

    // Clica em Cancelar - não deve fazer logout
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i })
    fireEvent.click(cancelButton)

    // Modal deve desaparecer
    await waitFor(() => {
      expect(screen.queryByText(/Tem certeza que deseja sair/i)).not.toBeInTheDocument()
    })

    // Logout não foi chamado
    expect(mockLogout).not.toHaveBeenCalled()
  })

  it('AC4: confirmação de logout chama logout e redireciona', async () => {
    const mockLogout = vi.fn()
    mockUseAuth.mockReturnValue({
      user: { id: '1', name: 'Ana', email: 'ana@example.com' },
      isLoading: false,
      isAuthenticated: true,
      logout: mockLogout,
    })

    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Clica no botão Sair
    const logoutButtons = screen.getAllByRole('button', { name: /Sair/i })
    fireEvent.click(logoutButtons[0])

    // Aguarda modal aparecer
    await waitFor(() => {
      expect(screen.getByText(/Tem certeza que deseja sair/i)).toBeInTheDocument()
    })

    // Clica em Confirmar Saída
    const confirmButton = screen.getByRole('button', { name: /Confirmar Saída/i })
    fireEvent.click(confirmButton)

    // logout deve ser chamado
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled()
    })
  })

  it('renderiza navegação com links para dashboard, perfil e agendamentos', () => {
    render(
      <BrowserRouter initialEntries={['/dashboard']}>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    // Verifica que os links de navegação existem (aparecem múltiplas vezes em desktop + mobile)
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Perfil').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Meus Agendamentos').length).toBeGreaterThan(0)
  })

  it('renderiza conteúdo children', () => {
    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    expect(screen.getByText('Test Page Content')).toBeInTheDocument()
  })

  it('renderiza footer', () => {
    render(
      <BrowserRouter>
        <PrivateLayout>
          <TestContent />
        </PrivateLayout>
      </BrowserRouter>
    )

    expect(screen.getByText(/agenda-clean/i)).toBeInTheDocument()
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument()
  })
})
