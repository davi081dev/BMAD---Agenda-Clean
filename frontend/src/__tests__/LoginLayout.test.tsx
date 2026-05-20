import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginLayout } from '@/components/auth/LoginLayout'

describe('LoginLayout', () => {
  it('renderiza children corretamente', () => {
    render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('exibe header com logo e branding', () => {
    render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    expect(screen.getByText('agenda-clean')).toBeInTheDocument()
  })

  it('exibe footer com copyright', () => {
    render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    expect(screen.getByText(/© 2026 agenda-clean/i)).toBeInTheDocument()
  })

  it('aplica classes Tailwind para responsividade', () => {
    const { container } = render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    // Verifica se há classes Tailwind no container
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('min-h-screen', 'flex', 'flex-col')
  })

  it('renderiza main como elemento semântico', () => {
    const { container } = render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('renderiza header semântico', () => {
    const { container } = render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('renderiza footer semântico', () => {
    const { container } = render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('aceita className prop customizada', () => {
    const { container } = render(
      <LoginLayout className="custom-class">
        <div>Test</div>
      </LoginLayout>
    )

    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('custom-class')
  })

  it('centraliza conteúdo na tela', () => {
    const { container } = render(
      <LoginLayout>
        <div>Test</div>
      </LoginLayout>
    )

    const main = container.querySelector('main')
    expect(main).toHaveClass('items-center', 'justify-center')
  })
})
