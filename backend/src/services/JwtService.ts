import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

/**
 * Payload do JWT token
 * Contém informações essenciais do usuário para autorização
 */
export interface TokenPayload {
  userId: string;
  email: string;
  role: 'client' | 'admin';
}

/**
 * Serviço de JWT para autenticação stateless
 * Responsável por assinar e validar tokens JWT
 *
 * Padrão de uso:
 * - sign(): Criar novo token para usuário autenticado
 * - verify(): Validar token em middleware de autenticação
 * - decode(): Decodificar token sem validar assinatura (use com cuidado)
 */
export class JwtService {
  /**
   * Assinar novo JWT token com payload do usuário
   * Token expira em 7 dias
   *
   * @param payload - Dados do usuário a serem inclusos no token
   * @returns Token JWT assinado em formato string
   * @throws Error se JWT_SECRET não estiver configurado
   */
  static sign(payload: TokenPayload): string {
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured in environment');
    }

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '7d', // 7 dias em segundos
      algorithm: 'HS256',
    });
  }

  /**
   * Verificar e decodificar JWT token
   * Valida assinatura e tempo de expiração
   *
   * @param token - JWT token a ser validado
   * @returns Payload decodificado do token
   * @throws Error se token for inválido, expirado ou JWT_SECRET não configurado
   */
  static verify(token: string): TokenPayload {
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured in environment');
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET, {
        algorithms: ['HS256'],
      }) as TokenPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired', { cause: error });
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token', { cause: error });
      }
      throw error;
    }
  }

  /**
   * Decodificar token SEM validar assinatura
   * Útil para inspecionar token sem requerer a chave secreta
   * ⚠️ NUNCA use para validação de segurança!
   *
   * @param token - JWT token a ser decodificado
   * @returns Payload do token ou null se inválido
   */
  static decode(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload | null;
    } catch {
      return null;
    }
  }
}

export default JwtService;
