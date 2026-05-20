/**
 * Tipos e interfaces de Autenticação
 */

export interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'admin'
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => Promise<void>
}

export interface AuthResponse {
  user: User
  token: string
}
