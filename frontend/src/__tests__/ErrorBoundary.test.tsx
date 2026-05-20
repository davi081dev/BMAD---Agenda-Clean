import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Componente que joga erro proposital
const ThrowError = () => {
  throw new Error('Test error message')
}

// Componente normal (sem erro)
const NormalComponent = () => <div>Normal content</div>

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Silencia erros de console durante testes (já esperados)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('AC6: captura erros de UI e exibe mensagem amigável', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Verifica que mensagem amigável é exibida
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument()
    expect(screen.getByText(/encontramos um erro inesperado/i)).toBeInTheDocument()
  })

  it('exibe botão para recarregar página', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByRole('button', { name: /Recarregar Página/i })).toBeInTheDocument()
  })

  it('exibe ícone de erro', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Verifica que há um SVG de erro (ícone)
    const svg = screen.getByRole('button', { name: /Recarregar Página/i })
      .closest('div')
      ?.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('não quebra UI quando componente filho não tem erro', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Normal content')).toBeInTheDocument()
    expect(screen.queryByText('Algo deu errado')).not.toBeInTheDocument()
  })

  it('loga erro no console para debugging', () => {
    const consoleSpy = vi.spyOn(console, 'error')

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Verifica que console.error foi chamado
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary capturou erro'),
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  it('permite recuperação ao clicar recarregar página', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload')
    
    // Mock window.location.reload como função
    vi.stubGlobal('location', {
      ...window.location,
      reload: vi.fn(),
    })

    const { getByRole } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Clica em recarregar
    const reloadButton = getByRole('button', { name: /Recarregar Página/i })
    reloadButton.click()

    // window.location.reload foi chamado
    expect(window.location.reload).toHaveBeenCalled()

    vi.unstubAllGlobals()
  })

  it('exibe detalhes do erro em ambiente de desenvolvimento', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Em desenvolvimento, detalhes do erro devem ser visíveis
    expect(screen.getByText(/Test error message/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('não exibe detalhes do erro em ambiente de produção', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    // Silencia erros esperados
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Em produção, detalhes específicos não são mostrados
    expect(screen.queryByText(/Test error message/)).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})
