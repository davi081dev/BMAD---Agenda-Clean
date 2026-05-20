import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import * as authService from '@/services/authService'

vi.mock('@/services/authService', () => ({
  getAuthStatus: vi.fn(),
  logout: vi.fn(),
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retorna isLoading=true inicialmente', () => {
    vi.mocked(authService.getAuthStatus).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const { result } = renderHook(() => useAuth())

    expect(result.current.isLoading).toBe(true)
  })

  it('retorna usuário autenticado quando getAuthStatus resolve com user', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'client' as const,
      createdAt: '2026-05-20',
    }

    vi.mocked(authService.getAuthStatus).mockResolvedValueOnce(mockUser)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('retorna null quando não autenticado', async () => {
    vi.mocked(authService.getAuthStatus).mockResolvedValueOnce(null)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('chama logout quando logout é disparado', async () => {
    vi.mocked(authService.getAuthStatus).mockResolvedValueOnce(null)
    vi.mocked(authService.logout).mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await result.current.logout()

    expect(vi.mocked(authService.logout)).toHaveBeenCalled()
  })

  it('limpa usuário após logout', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'client' as const,
      createdAt: '2026-05-20',
    }

    vi.mocked(authService.getAuthStatus).mockResolvedValueOnce(mockUser)
    vi.mocked(authService.logout).mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser)
    })

    await result.current.logout()

    await waitFor(() => {
      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  it('trata erro ao verificar autenticação', async () => {
    vi.mocked(authService.getAuthStatus).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('chama getAuthStatus ao montar', async () => {
    vi.mocked(authService.getAuthStatus).mockResolvedValueOnce(null)

    renderHook(() => useAuth())

    await waitFor(() => {
      expect(vi.mocked(authService.getAuthStatus)).toHaveBeenCalled()
    })
  })
})
