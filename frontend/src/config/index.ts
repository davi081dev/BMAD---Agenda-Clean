/**
 * Configurações da aplicação
 * 
 * Variáveis de ambiente e configurações compartilhadas
 */

export const config = {
  // API
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',

  // Aplicação
  appName: 'agenda-clean',
  appVersion: '0.0.1',

  // Limites
  maxFileSize: 5 * 1024 * 1024, // 5MB
  sessionTimeout: 30 * 60 * 1000, // 30 minutos

  // Validações
  minPasswordLength: 8,
  maxPasswordLength: 128,
}
