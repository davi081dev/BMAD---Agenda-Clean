import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorMessage } from '@/components/auth/ErrorMessage'

describe('ErrorMessage', () => {
  it('renderiza mensagem de erro', () => {
    render(<ErrorMessage message="Test error message" />)

    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('exibe ícone de erro', () => {
    const { container } = render(
      <ErrorMessage message="Test error" />
    )

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('tem atributo role="alert" para acessibilidade', () => {
    render(<ErrorMessage message="Test error" />)

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('tem aria-live="polite" para leitura de tela', () => {
    render(<ErrorMessage message="Test error" />)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })

  it('renderiza botão de fechar quando onDismiss é fornecido', () => {
    render(
      <ErrorMessage 
        message="Test error"
        onDismiss={vi.fn()}
      />
    )

    const dismissButton = screen.getByRole('button', { name: /fechar/i })
    expect(dismissButton).toBeInTheDocument()
  })

  it('não renderiza botão de fechar quando onDismiss não é fornecido', () => {
    render(<ErrorMessage message="Test error" />)

    const dismissButton = screen.queryByRole('button', { name: /fechar/i })
    expect(dismissButton).not.toBeInTheDocument()
  })

  it('dispara onDismiss ao clicar no botão de fechar', async () => {
    const user = userEvent.setup()
    const handleDismiss = vi.fn()

    render(
      <ErrorMessage 
        message="Test error"
        onDismiss={handleDismiss}
      />
    )

    const dismissButton = screen.getByRole('button', { name: /fechar/i })
    await user.click(dismissButton)

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('aplica cores de erro (red) do Tailwind', () => {
    const { container } = render(
      <ErrorMessage message="Test error" />
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-red-50', 'border-red-200')
  })

  it('renderiza com classes customizadas', () => {
    const { container } = render(
      <ErrorMessage 
        message="Test error"
        className="custom-class"
      />
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
  })

  it('exibe ícone X no botão de fechar', async () => {
    const { container } = render(
      <ErrorMessage 
        message="Test error"
        onDismiss={vi.fn()}
      />
    )

    // Procura por SVG no botão de fechar
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)

    // O segundo SVG deve ser o X de fechar
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(1)
  })
})
