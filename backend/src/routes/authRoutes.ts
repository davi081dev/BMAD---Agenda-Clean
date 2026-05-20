import { Router } from 'express';
import passport from 'passport';
import {
  handleGoogleAuthCallback,
  handleLogout,
  handleGetMe,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

/**
 * Rotas de autenticação OAuth e gerenciamento de sessão
 *
 * GET  /auth/google - Iniciar fluxo OAuth com Google
 * GET  /auth/google/callback - Callback do Google (redirecionado automaticamente)
 * POST /auth/logout - Fazer logout e limpar cookie
 * GET  /auth/me - Retornar usuário autenticado
 */
export const authRoutes = (): Router => {
  const router = Router();

  /**
   * GET /auth/google
   * Iniciar fluxo de autenticação OAuth com Google
   * Redireciona o usuário para a tela de consentimento do Google
   * Após autorização, Google redireciona para /auth/google/callback
   */
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  /**
   * GET /auth/google/callback
   * Receber callback do Google após autorização do usuário
   * Google redireciona aqui com código de autorização
   * Passport valida o código e popula req.user
   * Handler gera JWT token e redireciona para dashboard
   */
  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login?error=auth_failed', // Redirect em caso de falha
      session: true,
    }),
    handleGoogleAuthCallback
  );

  /**
   * POST /auth/logout
   * Fazer logout: limpar cookie de autenticação e encerrar sessão
   * Requer autenticação (authMiddleware)
   */
  router.post('/logout', authMiddleware, handleLogout);

  /**
   * GET /auth/me
   * Retornar dados do usuário autenticado (userId, email, role)
   * Requer autenticação (authMiddleware)
   * Útil para validar sessão no frontend
   */
  router.get('/me', authMiddleware, handleGetMe);

  return router;
};

export default authRoutes;
