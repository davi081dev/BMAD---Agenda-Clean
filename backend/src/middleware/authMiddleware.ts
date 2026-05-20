import { Request, Response, NextFunction } from 'express';
import { JwtService, TokenPayload } from '../services/JwtService.js';

/**
 * Estender tipo Request do Express para incluir dados do usuário autenticado
 * Isto permite que middlewares e controllers acessem req.user de forma tipada
 */
declare module 'express' {
  interface Request {
    user?: TokenPayload;
  }
}

/**
 * Middleware de autenticação obrigatória
 * Valida JWT token no cookie 'authToken'
 * Se token inválido/ausente: retorna 401 Unauthorized
 * Se token válido: continua com req.user preenchido
 *
 * Uso: app.get('/api/protegido', authMiddleware, controller)
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Ler token do cookie
    const token = req.cookies?.authToken;

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
          details: ['Missing authentication token'],
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Validar e decodificar token
    const payload = JwtService.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
        details: [message],
      },
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Middleware de autenticação opcional
 * Valida JWT token se presente, mas não falha se ausente
 * Útil para rotas que têm comportamento diferente se autenticado vs não-autenticado
 *
 * Uso: app.get('/api/opcional', optionalAuthMiddleware, controller)
 */
export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.authToken;

    if (token) {
      const payload = JwtService.verify(token);
      req.user = payload;
    }
  } catch {
    // Ignora erro, continua sem autenticação
    // Validação de auth opcional falhou silenciosamente
  }

  next();
};

/**
 * Middleware para validar role específica (ex: apenas admin)
 * Deve ser usado APÓS authMiddleware
 * Se usuário não tem role necessário: retorna 403 Forbidden
 *
 * Uso: app.delete('/api/admin/user/:id', authMiddleware, requireRole('admin'), controller)
 */
export const requireRole = (requiredRole: 'client' | 'admin') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar se usuário está autenticado (deve vir após authMiddleware)
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
          details: ['Missing authentication token'],
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Verificar se role é suficiente
    if (req.user.role !== requiredRole) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Insufficient permissions`,
          details: [`This action requires ${requiredRole} role`],
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  };
};

export default authMiddleware;
