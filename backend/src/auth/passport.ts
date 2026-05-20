import passport from 'passport';
import { Strategy as GoogleStrategy, StrategyOptions } from 'passport-google-oauth20';
import { Express } from 'express';
import { config } from '../config/index.js';
import { AuthService } from '../services/AuthService.js';
import { User } from '@prisma/client';

/**
 * Configurar estratégia Google OAuth 2.0 do Passport.js
 * Esta estratégia valida o código de autorização do Google
 * e extrai o perfil do usuário para criar/atualizar o registro no banco
 */
const googleStrategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.BACKEND_URL}/auth/google/callback`,
  } as StrategyOptions,
  async (
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      displayName: string;
      emails?: Array<{ value: string }>;
      photos?: Array<{ value: string }>;
    },
    done: (error: Error | null, user?: User | false) => void
  ) => {
    try {
      const googleUser = {
        googleId: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName || 'Unknown User',
        photo: profile.photos?.[0]?.value || '',
      };

      const user = await AuthService.findOrCreateUser(googleUser);
      done(null, user);
    } catch (error) {
      done(error instanceof Error ? error : new Error(String(error)));
    }
  }
);

/**
 * Serialização: Determina qual informação do usuário é armazenada na sessão
 * Armazenamos apenas o ID para reduzir tamanho da sessão
 */
passport.serializeUser((user: User | Express.User, done: (err: Error | null, id?: string) => void) => {
  if ('id' in user) {
    done(null, user.id);
  } else {
    done(new Error('Invalid user object'));
  }
});

/**
 * Desserialização: Recupera o usuário completo baseado no ID armazenado na sessão
 * Isto é executado a cada requisição com sessão válida
 */
passport.deserializeUser(async (id: string, done: (err: Error | null, user?: User | false) => void) => {
  try {
    const user = await AuthService.getUserById(id);
    done(null, user || false);
  } catch (error) {
    done(error instanceof Error ? error : new Error(String(error)));
  }
});

/**
 * Inicializar Passport no Express app
 * Deve ser chamado após bodyParser e sessão middleware
 * @param app - Instância do Express app
 */
export const initializePassport = (app: Express): void => {
  // Registrar estratégia Google
  passport.use(googleStrategy);

  // Inicializar Passport
  app.use(passport.initialize());

  // Inicializar suporte a sessão (necessário para OAuth flow)
  app.use(passport.session());
};

export default passport;
