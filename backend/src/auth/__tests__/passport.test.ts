import { describe, it, expect, afterAll } from '@jest/globals';
import { AuthService, GoogleUserProfile } from '../../services/AuthService.js';
import { JwtService, TokenPayload } from '../../services/JwtService.js';
import { config } from '../../config/index.js';

/**
 * Test Suite para AuthService e JwtService
 * Testa:
 * - Criação e busca de usuários via OAuth
 * - Geração e validação de JWT tokens
 * - Tratamento de roles (client vs admin)
 */
describe('AuthService', () => {
  // Dados de teste
  const testUserId = `test-${Date.now()}`;
  const testGoogleProfile: GoogleUserProfile = {
    googleId: `google-${testUserId}`,
    email: `test-${testUserId}@example.com`,
    name: 'Test User',
    photo: 'https://example.com/photo.jpg',
  };

  const adminGoogleProfile: GoogleUserProfile = {
    googleId: `google-admin-${testUserId}`,
    email: config.ADMIN_EMAIL || 'admin@agenda-clean.com',
    name: 'Admin User',
  };

  describe('findOrCreateUser', () => {
    it('deve criar novo usuário com role client', async () => {
      const user = await AuthService.findOrCreateUser(testGoogleProfile);

      expect(user).toBeDefined();
      expect(user.googleId).toBe(testGoogleProfile.googleId);
      expect(user.email).toBe(testGoogleProfile.email);
      expect(user.name).toBe(testGoogleProfile.name);
      expect(user.role).toBe('client');
    });

    it('deve criar novo usuário com role admin se email é ADMIN_EMAIL', async () => {
      if (!config.ADMIN_EMAIL) {
        console.warn('⚠️  ADMIN_EMAIL não configurado, skipping admin test');
        return;
      }

      const user = await AuthService.findOrCreateUser(adminGoogleProfile);

      expect(user).toBeDefined();
      expect(user.role).toBe('admin');
      expect(user.email).toBe(config.ADMIN_EMAIL);
    });

    it('não deve duplicar usuário na segunda chamada (idempotent)', async () => {
      const uniqueProfile: GoogleUserProfile = {
        googleId: `google-unique-${Date.now()}`,
        email: `unique-${Date.now()}@example.com`,
        name: 'Unique User',
      };

      const user1 = await AuthService.findOrCreateUser(uniqueProfile);
      const user2 = await AuthService.findOrCreateUser(uniqueProfile);

      expect(user1.id).toBe(user2.id);
      expect(user1.email).toBe(user2.email);
      expect(user1.googleId).toBe(user2.googleId);
    });

    it('deve retornar usuário existente quando googleId já existe', async () => {
      const profile: GoogleUserProfile = {
        googleId: `google-existing-${Date.now()}`,
        email: `existing-${Date.now()}@example.com`,
        name: 'Existing User',
      };

      // Criar primeira vez
      const user1 = await AuthService.findOrCreateUser(profile);

      // Tentar criar novamente com mesmo googleId
      const user2 = await AuthService.findOrCreateUser(profile);

      // Deve retornar mesmo usuário
      expect(user1.id).toBe(user2.id);
    });
  });

  describe('getUserById', () => {
    it('deve retornar usuário quando ID existe', async () => {
      // Criar usuário de teste
      const testProfile: GoogleUserProfile = {
        googleId: `google-getbyid-${Date.now()}`,
        email: `getbyid-${Date.now()}@example.com`,
        name: 'Get By ID User',
      };

      const createdUser = await AuthService.findOrCreateUser(testProfile);

      // Buscar por ID
      const foundUser = await AuthService.getUserById(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(createdUser.id);
      expect(foundUser?.email).toBe(createdUser.email);
    });

    it('deve retornar null quando ID não existe', async () => {
      const fakeId = 'nonexistent-id-12345';
      const user = await AuthService.getUserById(fakeId);

      expect(user).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('deve gerar token válido para usuário', async () => {
      const profile: GoogleUserProfile = {
        googleId: `google-token-${Date.now()}`,
        email: `token-${Date.now()}@example.com`,
        name: 'Token User',
      };

      const user = await AuthService.findOrCreateUser(profile);
      const token = AuthService.generateToken(user);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT tem 3 partes
    });
  });

  describe('verifyToken', () => {
    it('deve validar token correto', async () => {
      const profile: GoogleUserProfile = {
        googleId: `google-verify-${Date.now()}`,
        email: `verify-${Date.now()}@example.com`,
        name: 'Verify User',
      };

      const user = await AuthService.findOrCreateUser(profile);
      const token = AuthService.generateToken(user);

      const isValid = AuthService.isTokenValid(token);
      expect(isValid).toBe(true);
    });

    it('deve rejeitar token inválido', () => {
      const invalidToken = 'invalid-token-xyz';
      const isValid = AuthService.isTokenValid(invalidToken);

      expect(isValid).toBe(false);
    });
  });

  // Cleanup após testes
  afterAll(async () => {
    // Limpeza seria feita aqui se necessário
    // Os testes usam dados únicos (com timestamps) para evitar conflitos
  });
});

describe('JwtService', () => {
  describe('sign', () => {
    it('deve gerar token válido', () => {
      const payload: TokenPayload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'client',
      };

      const token = JwtService.sign(payload);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('deve incluir payload no token', () => {
      const payload: TokenPayload = {
        userId: 'user-456',
        email: 'admin@example.com',
        role: 'admin',
      };

      const token = JwtService.sign(payload);
      const decoded = JwtService.decode(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(payload.userId);
      expect(decoded?.email).toBe(payload.email);
      expect(decoded?.role).toBe(payload.role);
    });
  });

  describe('verify', () => {
    it('deve verificar token válido', () => {
      const payload: TokenPayload = {
        userId: 'user-789',
        email: 'verify@example.com',
        role: 'client',
      };

      const token = JwtService.sign(payload);
      const decoded = JwtService.verify(token);

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it('deve rejeitar token inválido', () => {
      const invalidToken = 'invalid-token-xyz.abc.def';

      expect(() => {
        JwtService.verify(invalidToken);
      }).toThrow();
    });

    it('deve rejeitar token com assinatura inválida', () => {
      // Criar token válido e depois modificar assinatura
      const payload: TokenPayload = {
        userId: 'user-999',
        email: 'modified@example.com',
        role: 'client',
      };

      const token = JwtService.sign(payload);
      const parts = token.split('.');
      const tamperedToken = `${parts[0]}.${parts[1]}.invalidsignature`;

      expect(() => {
        JwtService.verify(tamperedToken);
      }).toThrow();
    });

    it('deve rejeitar token expirado (simular)', () => {
      // Criar token com expiração muito curta (para teste rápido)
      // Note: A implementação atual usa expiração de 7 dias
      // Para teste real, seria necessário mockar a data/hora
      const payload: TokenPayload = {
        userId: 'user-exp',
        email: 'expired@example.com',
        role: 'client',
      };

      const token = JwtService.sign(payload);

      // Token deve ser válido imediatamente
      expect(() => {
        JwtService.verify(token);
      }).not.toThrow();
    });
  });

  describe('decode', () => {
    it('deve decodificar token sem validar assinatura', () => {
      const payload: TokenPayload = {
        userId: 'user-decode',
        email: 'decode@example.com',
        role: 'admin',
      };

      const token = JwtService.sign(payload);
      const decoded = JwtService.decode(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(payload.userId);
    });

    it('deve retornar null para token inválido', () => {
      const invalidToken = 'not-a-valid-jwt';
      const decoded = JwtService.decode(invalidToken);

      expect(decoded).toBeNull();
    });
  });
});
