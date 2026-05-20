import { prisma } from '../index.js';
import { config } from '../config/index.js';
import { User } from '@prisma/client';
import { JwtService, TokenPayload } from './JwtService.js';

/**
 * Perfil do usuário recebido do Google OAuth
 * Extraído pela estratégia Passport Google após autenticação bem-sucedida
 */
export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name: string;
  photo?: string;
}

/**
 * Serviço de autenticação
 * Responsável pela lógica de negócio de autenticação:
 * - Criar/buscar usuário via Google OAuth
 * - Gerar e validar JWT tokens
 * - Gerenciar sessões de usuário
 */
export class AuthService {
  /**
   * Encontrar usuário existente ou criar novo baseado em perfil do Google
   * Implementação idempotent: múltiplas chamadas com mesmo googleId retornam mesmo usuário
   *
   * Lógica:
   * 1. Procurar usuário por googleId (identificador único do Google)
   * 2. Se não existe:
   *    - Criar novo usuário com role='client' (padrão)
   *    - Se email == ADMIN_EMAIL: role='admin' (promoção automática)
   * 3. Retornar usuário (novo ou existente)
   *
   * @param googleProfile - Perfil do usuário recebido do Google
   * @returns Usuário criado ou encontrado no banco de dados
   * @throws Error se banco de dados falhar
   */
  static async findOrCreateUser(googleProfile: GoogleUserProfile): Promise<User> {
    // 1. Procurar usuário existente
    let user = await prisma.user.findUnique({
      where: { googleId: googleProfile.googleId },
    });

    // 2. Se não existe, criar novo
    if (!user) {
      // Determinar role baseado no email
      const isAdmin = googleProfile.email === config.ADMIN_EMAIL;

      user = await prisma.user.create({
        data: {
          googleId: googleProfile.googleId,
          email: googleProfile.email,
          name: googleProfile.name,
          role: isAdmin ? 'admin' : 'client',
        },
      });

      console.log(`✅ New user created: ${user.email} (role: ${user.role})`);
    } else {
      console.log(`✅ User authenticated: ${user.email} (role: ${user.role})`);
    }

    return user;
  }

  /**
   * Buscar usuário por ID (usado na desserialização da sessão)
   *
   * @param id - UUID do usuário
   * @returns Usuário encontrado ou null se não existe
   * @throws Error se banco de dados falhar
   */
  static async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Gerar JWT token para usuário autenticado
   * Token contém informações essenciais e expira em 7 dias
   *
   * @param user - Usuário para gerar token
   * @returns JWT token assinado
   */
  static generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as 'client' | 'admin',
    };

    return JwtService.sign(payload);
  }

  /**
   * Verificar e decodificar JWT token
   * Usado em middleware de autenticação para validar requests
   *
   * @param token - JWT token a ser validado
   * @returns Payload decodificado
   * @throws Error se token for inválido ou expirado
   */
  static verifyToken(token: string): TokenPayload {
    return JwtService.verify(token);
  }

  /**
   * Validar se token é válido sem lançar exceção
   * Útil para validações silenciosas
   *
   * @param token - JWT token a ser validado
   * @returns true se token é válido, false caso contrário
   */
  static isTokenValid(token: string): boolean {
    try {
      JwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}

export default AuthService;
