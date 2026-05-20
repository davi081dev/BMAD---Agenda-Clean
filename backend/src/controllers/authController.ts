import { Request, Response } from 'express';
import { config } from '../config/index.js';
import { AuthService } from '../services/AuthService.js';

/**
 * Controlador de autenticação
 * Gerencia fluxo OAuth e operações de sessão/token
 *
 * Rotas:
 * - GET /auth/google - Inicia fluxo OAuth com Google
 * - GET /auth/google/callback - Recebe callback do Google (Passport handling)
 * - POST /auth/logout - Fazer logout e limpar cookie
 * - GET /auth/me - Retornar usuário autenticado
 */

/**
 * GET /auth/google
 * Iniciar fluxo de autenticação OAuth com Google
 * Esta função é interceptada pelo Passport middleware,
 * que redireciona para Google OAuth consent screen
 *
 * Não deve ser chamada diretamente - Passport intercepta a requisição
 */
export const handleGoogleAuth = (req: Request, res: Response): void => {
  // Passport intercepta esta rota e redireciona para Google
  // Código aqui nunca é executado
  res.status(400).json({
    success: false,
    error: {
      code: 'INVALID_REQUEST',
      message: 'This route should be intercepted by Passport',
    },
  });
};

/**
 * GET /auth/google/callback
 * Receber callback do Google após usuário autorizar
 * Google redireciona para esta rota com código de autorização
 * Passport valida o código e popula req.user com dados do usuário
 *
 * Fluxo:
 * 1. Google envia código na query string
 * 2. Passport valida código com Google
 * 3. Passport executa verify callback (findOrCreateUser)
 * 4. req.user é populado com usuário autenticado
 * 5. Este handler gera JWT e seta cookie
 * 6. Redireciona para frontend dashboard
 */
export const handleGoogleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar se Passport conseguiu autenticar
    if (!req.user) {
      console.error('❌ OAuth callback: req.user is null or undefined');
      res.redirect(`${config.FRONTEND_URL}/login?error=authentication_failed`);
      return;
    }

    // No callback, req.user é o User retornado pela estratégia Google
    // (após passar por serializeUser/deserializeUser)
    const user = req.user as unknown as { id: string; email: string; role: string };

    // Gerar JWT token usando dados do usuário autenticado
    const token = AuthService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'client' | 'admin',
    });

    // Definir cookie httpOnly com token
    // httpOnly: JavaScript não consegue acessar (proteção XSS)
    // secure: Apenas HTTPS em produção
    // sameSite: Proteção contra CSRF
    // maxAge: 7 dias em milissegundos
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      path: '/', // Cookie disponível em todos os paths
    });

    console.log(`✅ OAuth callback successful: ${user.email} authenticated`);

    // Redirecionar para frontend dashboard
    const redirectUrl = `${config.FRONTEND_URL}/dashboard`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('❌ OAuth callback error:', error instanceof Error ? error.message : error);
    res.redirect(`${config.FRONTEND_URL}/login?error=authentication_failed`);
  }
};

/**
 * POST /auth/logout
 * Fazer logout: limpar cookie e encerrar sessão
 * Requer autenticação (authMiddleware)
 */
export const handleLogout = (req: Request, res: Response): void => {
  try {
    // Limpar cookie de autenticação
    res.clearCookie('authToken', { path: '/' });

    // Fazer logout da sessão Passport (se houver)
    if (req.user) {
      req.logout((err) => {
        if (err) {
          console.error('Logout error:', err);
        }
      });
    }

    console.log(`✅ User logged out`);

    res.json({
      success: true,
      message: 'Logout successful',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Logout error:', error instanceof Error ? error.message : error);

    res.status(500).json({
      success: false,
      error: {
        code: 'LOGOUT_ERROR',
        message: 'Failed to logout',
        details: [error instanceof Error ? error.message : 'Unknown error'],
      },
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * GET /auth/me
 * Retornar dados do usuário autenticado
 * Requer autenticação (authMiddleware)
 *
 * Resposta inclui: userId, email, role
 * Útil para verificar se usuário está autenticado no frontend
 */
export const handleGetMe = (req: Request, res: Response): void => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
          details: [],
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.json({
      success: true,
      data: {
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Get user error:', error instanceof Error ? error.message : error);

    res.status(500).json({
      success: false,
      error: {
        code: 'GET_USER_ERROR',
        message: 'Failed to fetch user info',
        details: [error instanceof Error ? error.message : 'Unknown error'],
      },
      timestamp: new Date().toISOString(),
    });
  }
};

export const authController = {
  handleGoogleAuth,
  handleGoogleAuthCallback,
  handleLogout,
  handleGetMe,
};

export default authController;
