import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'

describe('GoogleLoginButton', () => {
  it('renderiza texto "Entrar com Google" quando não está carregando', () => {
    render(<GoogleLoginButton isLoading={false} />)

    expect(screen.getByText('Entrar com Google')).toBeInTheDocument()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('exibe spinner e "Processando..." quando isLoading=true', () => {
    render(<GoogleLoginButton isLoading={true} />)

    expect(screen.getByText('Processando...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('dispara onClick ao clicar', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<GoogleLoginButton isLoading={false} onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('não dispara onClick quando isLoading=true', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<GoogleLoginButton isLoading={true} onClick={handleClick} />)

    const button = screen.getByRole('button')
    // Button está disabled, então não pode clicar
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('possui aria-label descritivo', () => {
    render(<GoogleLoginButton />)

    const button = screen.getByRole('button', { name: /fazer login com google/i })
    expect(button).toBeInTheDocument()
  })

  it('tem aria-busy=true quando carregando', () => {
    render(<GoogleLoginButton isLoading={true} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('tem aria-busy=false quando não carregando', () => {
    render(<GoogleLoginButton isLoading={false} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'false')
  })

  it('renderiza com classes customizadas via className prop', () => {
    const { container } = render(
      <GoogleLoginButton className="custom-class" />
    )

    const button = container.querySelector('.custom-class')
    expect(button).toBeInTheDocument()
  })

  it('renderiza ícone Google', () => {
    const { container } = render(<GoogleLoginButton />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
