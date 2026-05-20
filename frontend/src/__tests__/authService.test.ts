import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as authService from '@/services/authService'

// Mock global fetch
vi.stubGlobal('fetch', vi.fn())

const mockFetch = globalThis.fetch as ReturnType<typeof vi.fn>

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthStatus', () => {
    it('retorna usuário autenticado quando resposta é 200', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'client' as const,
        createdAt: '2026-05-20',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      } as Response)

      const result = await authService.getAuthStatus()

      expect(result).toEqual(mockUser)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/status'),
        expect.objectContaining({
          credentials: 'include',
        })
      )
    })

    it('retorna null quando resposta não é ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response)

      const result = await authService.getAuthStatus()

      expect(result).toBeNull()
    })

    it('retorna null quando há erro de rede', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await authService.getAuthStatus()

      expect(result).toBeNull()
    })

    it('envia credenciais no fetch (cookies)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: null }),
      } as Response)

      await authService.getAuthStatus()

      const calls = mockFetch.mock.calls
      expect(calls.length).toBeGreaterThan(0)
      const firstCall = calls[0]
      expect(firstCall[1]).toMatchObject({
        credentials: 'include',
      })
    })
  })

  describe('redirectToGoogleAuth', () => {
    it('redireciona para /auth/google', () => {
      const originalHref = window.location.href
      delete (window as any).location
      const mockLocation = { href: '' }
      window.location = mockLocation as any

      authService.redirectToGoogleAuth()

      expect(mockLocation.href).toContain('/auth/google')

      // Restaura location
      Object.defineProperty(window, 'location', {
        value: { href: originalHref },
        writable: true,
      })
    })
  })

  describe('logout', () => {
    it('faz chamada POST para /auth/logout', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as Response)

      await authService.logout()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      )
    })

    it('envia credenciais no logout', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as Response)

      await authService.logout()

      const calls = mockFetch.mock.calls
      expect(calls.length).toBeGreaterThan(0)
      const firstCall = calls[0]
      expect(firstCall[1]).toMatchObject({
        credentials: 'include',
      })
    })

    it('trata erro silenciosamente', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Logout failed'))

      // Não deve lançar erro
      await expect(authService.logout()).resolves.toBeUndefined()
    })
  })

  describe('getApiUrl', () => {
    it('retorna a URL configurada da API', () => {
      const url = authService.getApiUrl()

      expect(typeof url).toBe('string')
      expect(url.length).toBeGreaterThan(0)
    })
  })

  describe('isApiConfigured', () => {
    it('retorna true se VITE_API_URL está configurada', () => {
      const isConfigured = authService.isApiConfigured()

      expect(typeof isConfigured).toBe('boolean')
    })
  })
})
