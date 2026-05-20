---
storyId: "2.1"
storyKey: "2-1-google-oauth-setup-backend"
epicId: "2"
epicName: "Authentication & User Management"
title: "Google OAuth Setup (Backend)"
priority: "critical"
status: "ready-for-dev"
estimatedHours: 4
createdDate: "20 de maio de 2026"
projectName: "agenda-clean"
language: "pt-br"
---

# Story 2.1: Google OAuth Setup (Backend)

## 📋 Contexto & Visão Geral

Esta é a **primeira e crítica story** do Epic 2 (Authentication & User Management), bloqueadora para todas as stories subsequentes de autenticação (2.2, 2.3, 2.4, 2.5, 2.6). 

Seu objetivo: implementar a **estratégia Passport.js Google OAuth 2.0** no backend, criando as rotas `/auth/google` e `/auth/google/callback` que orquestram o fluxo completo de autenticação via Google, desde o redirecionamento até a geração de JWT tokens para sessão segura.

**Valor de Negócio:**
- Habilita clientes (Ana) e admin (João) a fazer login zero-friction via Google
- Elimina necessidade de cadastro manual (problema resolvido: friction do signup)
- Estabelece padrão de autenticação OAuth que será reusado em stories posteriores
- Fornece token JWT seguro (httpOnly cookie) que protege todas as APIs subsequentes

**Impacto na Implementação:**
- ✅ **Bloqueador Direto:** Stories 2.2, 2.3, 2.4, 2.5, 2.6 dependem desta
- ✅ **Bloqueador Indireto:** Epics 3 (Client Booking) e 4 (Admin Dashboard) só funcionam após auth
- ✅ **Habilitador:** Após 2.1, desenvolvimento paralelo de stories 2.2-2.6 é possível

**Dependências:**
- ✅ **Completada:** Epic 1 (Foundation & Setup) — todas stories 1.1-1.5
- ✅ **Requer:** Story 1.4 (Env config) — variáveis GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET já existem
- ✅ **Requer:** Story 1.3 (Database) — Prisma schema já preparado com User table

**Sprint Assignment:**
- Sprint: 1 (Week 1-2)
- Sequência: Primeira story do Epic 2 (começa logo após Epic 1 completo)
- Paralelizável com: Nenhuma (bloqueadora)

---

## 👤 User Story

```
Como desenvolvedor do projeto agenda-clean,
Quero implementar autenticação via Google OAuth 2.0 usando Passport.js,
Para que usuários (clientes e admin) possam fazer login com segurança,
receber JWT tokens (httpOnly cookie), e manter sessão autenticada em todas as APIs.
```

---

## 🎯 Objetivo & Requisitos Funcionais

**Objetivo Principal:**
Implementar a camada de autenticação OAuth (backend) que permite:
1. Usuários iniciarem login clicando "Login com Google" (frontend)
2. Backend orquestrar fluxo OAuth com Google (Passport.js)
3. Criar/atualizar usuário no banco de dados automaticamente
4. Gerar JWT token seguro em httpOnly cookie
5. Frontend usar cookie automaticamente em requisições subsequentes

**Escopo Específico desta Story:**

1. ✅ Instalar dependências OAuth (passport, passport-google-oauth20, jsonwebtoken)
2. ✅ Configurar Passport.js com estratégia Google OAuth 2.0
3. ✅ Implementar rota `GET /auth/google` (inicia fluxo OAuth)
4. ✅ Implementar rota `GET /auth/google/callback` (recebe callback Google)
5. ✅ Criar serviço de autenticação (findOrCreateUser logic)
6. ✅ Implementar geração de JWT tokens (sign/verify)
7. ✅ Configurar httpOnly cookie para armazenar JWT (seguro contra XSS)
8. ✅ Adicionar validação de ambiente (GOOGLE_CLIENT_ID, etc)
9. ✅ Criar testes unitários para OAuth flow
10. ✅ Documentar fluxo OAuth e instruções de setup Google Console

---

## ✅ Acceptance Criteria (BDD)

### AC1: Dependências OAuth instaladas com sucesso

```gherkin
GIVEN que preciso de bibliotecas OAuth no backend
WHEN executo npm install passport passport-google-oauth20 jsonwebtoken express-session
THEN:
  - package.json lista: passport@^0.6, passport-google-oauth20@^2.0, jsonwebtoken@^9.0, express-session@^1.17
  - node_modules/ contém todas as bibliotecas
  - npm run validate não retorna erros (lint, type-check, build)
  - Tipagem para Passport está disponível: @types/passport, @types/jsonwebtoken
```

### AC2: Passport.js Google Strategy configurada

```gherkin
GIVEN que preciso setup Passport com Google
WHEN crio arquivo src/auth/passport.ts
THEN:
  - Arquivo exporta função initializePassport(app: Express): void
  - Estratégia GoogleStrategy recebe:
    - clientID = process.env.GOOGLE_CLIENT_ID
    - clientSecret = process.env.GOOGLE_CLIENT_SECRET
    - callbackURL = "http://localhost:3000/auth/google/callback"
  - verifyCallback função extrai: googleId, email, displayName, photos
  - PassportSession é inicializada: app.use(passport.initialize()), app.use(passport.session())
AND nenhum erro ao iniciar servidor
```

### AC3: Rota GET /auth/google implementada

```gherkin
GIVEN que quero iniciar login OAuth no frontend
WHEN cliente faz GET /auth/google
THEN:
  - Middleware authenticateGoogle() é chamado
  - User é redirecionado ao Google OAuth consent screen
  - Nenhuma conta é criada nesta etapa (isso acontece no callback)
  - URL da resposta contém: scope=['profile', 'email'], prompt='select_account'
AND esta rota aceita requisições de qualquer origem (frontend pode chamar)
```

### AC4: Rota GET /auth/google/callback implementada

```gherkin
GIVEN que Google callback retorna user profile com código
WHEN GET /auth/google/callback?code=... é chamado por Google
THEN:
  - Passport executa verifyCallback (estratégia Google)
  - Sistema verifica se usuário já existe (findUnique by googleId)
  - Se NÃO existe:
    - Cria novo User com: googleId, email, name, role='client'
    - Usuario com email = ADMIN_EMAIL recebe role='admin'
  - Se já existe: retorna usuário existente (sem duplicar)
  - JWT token é gerado com payload: { userId, email, role }
  - Token é assinado com JWT_SECRET e expira em 7 dias
  - Token é armazenado em httpOnly cookie: authToken
  - Resposta redireciona para frontend: ${FRONTEND_URL}/dashboard com sucesso
AND nenhuma informação sensível vaza em logs ou resposta
```

### AC5: JWT Token gerado e validado corretamente

```gherkin
GIVEN que preciso de tokens seguros para autenticação
WHEN /auth/google/callback cria JWT
THEN token contém:
  - userId: UUID do usuário
  - email: email do usuário
  - role: 'client' ou 'admin'
  - expiresIn: 7 dias (604800 segundos)
  - assinado com JWT_SECRET (nunca exposto)
AND quando um request recebe este token:
  - Middleware verifyToken() decodifica e valida assinatura
  - Se válido e não expirado: continua com req.user = { userId, email, role }
  - Se inválido ou expirado: retorna 401 Unauthorized
```

### AC6: httpOnly Cookie configurado com segurança

```gherkin
GIVEN que preciso armazenar JWT de forma segura
WHEN /auth/google/callback seta cookie
THEN cookie tem propriedades:
  - name: 'authToken'
  - httpOnly: true (JavaScript não consegue acessar = XSS protection)
  - secure: true (apenas em HTTPS em produção)
  - sameSite: 'strict' (CSRF protection)
  - maxAge: 7 * 24 * 60 * 60 * 1000 (7 dias em millisegundos)
AND browser automaticamente inclui cookie em requisições ao mesmo domínio
AND cookie é silenciosamente descartado após 7 dias de inatividade
```

### AC7: Variáveis de ambiente validadas

```gherkin
GIVEN que preciso de credenciais Google e JWT_SECRET
WHEN app inicia
THEN src/config/env.ts valida presença de:
  - GOOGLE_CLIENT_ID (não vazio)
  - GOOGLE_CLIENT_SECRET (não vazio)
  - JWT_SECRET (não vazio)
  - ADMIN_EMAIL (opcional, mas se presente é validado)
AND se alguma variável obrigatória está missing:
  - Console exibe aviso claro: "❌ Missing environment variable: GOOGLE_CLIENT_ID"
  - App ainda inicia (para desenvolvimento) mas aviso permanece visível
AND .env.example contém template com todas as variáveis
```

### AC8: Testes unitários para OAuth flow

```gherkin
GIVEN que preciso testar autenticação
WHEN executo npm test
THEN arquivo src/auth/__tests__/passport.test.ts contém:
  - Teste de GoogleStrategy com mock de profile
  - Teste de findOrCreateUser: usuário novo criado com role='client'
  - Teste de findOrCreateUser: usuário novo com email ADMIN_EMAIL recebe role='admin'
  - Teste de findOrCreateUser: usuário existente não duplicado
  - Teste de JWT generation com userId, email, role
  - Teste de JWT verification: token válido decodifica corretamente
  - Teste de JWT verification: token expirado retorna erro
  - Teste de JWT verification: token inválido retorna erro
AND todos os testes passam (100% pass rate)
```

### AC9: Erros OAuth tratados com graceful fallback

```gherkin
GIVEN que OAuth pode falhar por vários motivos
WHEN uma das seguintes situações ocorre:
  - Google credentials incorretas (clientID/clientSecret errados)
  - Google API indisponível (timeout)
  - Banco de dados indisponível (create user fail)
  - JWT_SECRET não configurado
THEN:
  - Erro é logado em console com contexto claro
  - Usuário recebe resposta HTTP apropriada:
    - 400 Bad Request (credenciais Google inválidas)
    - 500 Internal Server Error (database/server error)
  - Mensagem de erro é user-friendly (não expõe stack trace)
  - Sistema continua rodando (não crasha)
AND não há vazamento de informações sensíveis em logs ou responses
```

### AC10: Rota /auth/logout implementada (cleanup)

```gherkin
GIVEN que usuário quer fazer logout
WHEN faz GET ou POST /auth/logout
THEN:
  - httpOnly cookie 'authToken' é deletado (maxAge = 0)
  - Sessão Passport é limpada
  - User é redirecionado para frontend login page
  - Requisições subsequentes sem token recebem 401 (não autenticadas)
AND logout é seguro (não vaza informações)
```

---

## 🏗️ Contexto Técnico & Decisões

### Stack Tecnológico

| Componente | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| **OAuth Framework** | Passport.js | ^0.6 | Industry standard para Node.js, suporta 300+ estratégias |
| **Google Strategy** | passport-google-oauth20 | ^2.0 | Official Google OAuth strategy, mantida por comunidade |
| **JWT Tokens** | jsonwebtoken | ^9.0 | Standard para token-based auth, sem estado no servidor |
| **Session** | express-session | ^1.17 | Gerencia sessão Passport, compatível com cookies |
| **Cookie Parser** | cookie-parser | ^1.4 | Parseia cookies de forma segura, pré-instalado em Express |
| **CORS** | Já configurado em Story 1.2 | — | Passport reusa middleware CORS existente |

### Padrão de Autenticação: OAuth 2.0 + JWT

**Por que OAuth 2.0 (não Basic Auth ou Custom):**
- ✅ Zero-friction login para usuários (Google é familiar)
- ✅ Não armazenamos senhas (delegamos ao Google)
- ✅ Seguro contra ataques comuns (PKCE, state parameter)
- ✅ Suporte para múltiplos provedores futuros (Facebook, GitHub, etc)
- ❌ Requisita credenciais do Google Console (setup manual)

**Por que JWT (não Server Sessions):**
- ✅ Stateless: servidor não precisa lembrar do usuário (escalável)
- ✅ Seguro quando armazenado em httpOnly cookie (XSS-safe)
- ✅ Pode ser verificado em qualquer servidor (se chave compartilhada)
- ✅ Menor overhead que server sessions (sem DB lookup em cada request)
- ❌ Token não pode ser revogado instantaneamente (apenas expira)

**Por que httpOnly Cookie (não localStorage):**
- ✅ Protegido contra XSS (JavaScript não consegue acessar)
- ✅ Browser envia automaticamente (sem código manual)
- ✅ Suporta CSRF protection (sameSite attribute)
- ❌ Requer HTTPS em produção (secure flag)

### Fluxo de Autenticação (Sequência Completa)

```
┌─ FRONTEND ──────────────────┐      ┌─ BACKEND ─────────────────┐      ┌─ GOOGLE ───────────────┐
│                             │      │                           │      │                       │
│ 1. User clicks              │      │                           │      │                       │
│    "Entrar com Google"      │      │                           │      │                       │
│                             │      │                           │      │                       │
│ 2. Redirects to:            │      │                           │      │                       │
│    GET /auth/google  ──────────────> 3. Passport redirects    │      │                       │
│                             │      │    to Google consent      │      │                       │
│                             │      │    screen ──────────────────────> 4. Google shows       │
│                             │      │                           │      │    login & consent   │
│                             │      │                           │      │                       │
│                             │      │                           │      │ 5. User authorizes  │
│                             │      │                           │      │                       │
│ 6. Google redirects to:     │      │                           │      │                       │
│    /auth/google/callback    <──────────────────────────────────────────  authCode=...       │
│    ?code=...                │      │                           │      │                       │
│                             │      │                           │      │                       │
│                             │ 7. Backend verifies code with Google:   │                       │
│                             │    - Exchange code for profile          │                       │
│ 8. Backend logic:           │ <─────────────────────────────────────────> Google returns       │
│    - findOrCreateUser       │      │      { googleId, email,  │      │   profile            │
│    - Set JWT cookie         │      │        name, photo }      │      │                       │
│    - Redirect to /dashboard │ 9. Redirect to /dashboard      │      │                       │
│                             │      │    with authToken cookie  │      │                       │
│ ◄────────────────────────────────────────────────────────────┤      │                       │
│                             │      │                           │      │                       │
│ 10. Store redirected URL   │      │                           │      │                       │
│     (browser has cookie)    │      │                           │      │                       │
│                             │      │                           │      │                       │
└─────────────────────────────┘      └───────────────────────────┘      └───────────────────────┘
```

### Estrutura de Pastas (Nova)

```
backend/
├── src/
│   ├── auth/                           # ← Nova pasta para OAuth
│   │   ├── passport.ts                 # ← Configuração Passport.js
│   │   ├── strategies/
│   │   │   └── googleStrategy.ts       # ← Estratégia Google
│   │   └── __tests__/
│   │       └── passport.test.ts        # ← Testes unitários
│   ├── services/
│   │   ├── AuthService.ts              # ← Lógica de autenticação
│   │   └── JwtService.ts               # ← Geração/validação JWT
│   ├── middleware/
│   │   ├── authMiddleware.ts           # ← Validar JWT em requests
│   │   └── ... (existentes)
│   ├── routes/
│   │   ├── authRoutes.ts               # ← Modificar: adicionar /auth/google
│   │   └── ... (existentes)
│   ├── controllers/
│   │   ├── authController.ts           # ← Modificar: adicionar OAuth handlers
│   │   └── ... (existentes)
│   ├── types/
│   │   ├── Auth.ts                     # ← DTO para OAuth/JWT
│   │   └── ... (existentes)
│   └── ... (pastas existentes)
└── ...
```

### Implementação: Código-Base Esperado

#### 1️⃣ Instalar Dependências

```bash
npm install passport passport-google-oauth20 jsonwebtoken express-session cookie-parser
npm install --save-dev @types/passport @types/jsonwebtoken @types/express-session
```

**package.json adiciona:**
```json
{
  "dependencies": {
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "jsonwebtoken": "^9.0.2",
    "express-session": "^1.17.3",
    "cookie-parser": "^1.4.6"
  },
  "devDependencies": {
    "@types/passport": "^1.0.15",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/express-session": "^1.17.10"
  }
}
```

#### 2️⃣ Arquivo: src/auth/passport.ts

```typescript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Express } from 'express';
import { config } from '../config/env.js';
import { AuthService } from '../services/AuthService.js';

// Estratégia Google OAuth 2.0
const googleStrategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.BACKEND_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const googleUser = {
        googleId: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName,
        photo: profile.photos?.[0]?.value || '',
      };

      const user = await AuthService.findOrCreateUser(googleUser);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

// Serialização de usuário para sessão
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Desserialização de usuário
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await AuthService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Inicializar Passport no app
export const initializePassport = (app: Express): void => {
  passport.use(googleStrategy);
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passport;
```

#### 3️⃣ Arquivo: src/services/AuthService.ts

```typescript
import { prisma } from '../index.js';
import { config } from '../config/env.js';
import { User } from '@prisma/client';
import { JwtService } from './JwtService.js';

export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name: string;
  photo?: string;
}

export class AuthService {
  // Encontrar ou criar usuário (idempotent)
  static async findOrCreateUser(
    googleProfile: GoogleUserProfile
  ): Promise<User> {
    // 1. Procurar usuário existente
    let user = await prisma.user.findUnique({
      where: { googleId: googleProfile.googleId },
    });

    // 2. Se não existe, criar novo
    if (!user) {
      const isAdmin = googleProfile.email === config.ADMIN_EMAIL;
      user = await prisma.user.create({
        data: {
          googleId: googleProfile.googleId,
          email: googleProfile.email,
          name: googleProfile.name,
          role: isAdmin ? 'admin' : 'client',
        },
      });
    }

    return user;
  }

  // Buscar usuário por ID
  static async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  // Gerar JWT token
  static generateToken(user: User): string {
    return JwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  }

  // Verificar token
  static verifyToken(token: string) {
    return JwtService.verify(token);
  }
}
```

#### 4️⃣ Arquivo: src/services/JwtService.ts

```typescript
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'client' | 'admin';
}

export class JwtService {
  static sign(payload: TokenPayload): string {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '7d', // 7 dias
    });
  }

  static verify(token: string): TokenPayload {
    return jwt.verify(token, config.JWT_SECRET) as TokenPayload;
  }

  static decode(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload | null;
    } catch {
      return null;
    }
  }
}
```

#### 5️⃣ Arquivo: src/middleware/authMiddleware.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import { JwtService, TokenPayload } from '../services/JwtService.js';

// Estender tipo Request com user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Ler token do cookie
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
      return;
    }

    // Validar e decodificar token
    const payload = JwtService.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }
};

// Middleware opcional: não falha se sem token
export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const payload = JwtService.verify(token);
      req.user = payload;
    }
  } catch {
    // Ignora erro, continua sem autenticação
  }
  next();
};

// Middleware: validar role específica (ex: admin)
export const requireRole = (requiredRole: 'client' | 'admin') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
      return;
    }

    if (req.user.role !== requiredRole) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `This action requires ${requiredRole} role`,
        },
      });
      return;
    }

    next();
  };
};
```

#### 6️⃣ Arquivo: src/controllers/authController.ts

```typescript
import { Request, Response } from 'express';
import { config } from '../config/env.js';
import { AuthService } from '../services/AuthService.js';
import passport from 'passport';

// GET /auth/google - Iniciar fluxo OAuth
export const handleGoogleAuth = (
  req: Request,
  res: Response
): void => {
  // Passport intercepta e redireciona para Google
};

// GET /auth/google/callback - Google retorna com code
export const handleGoogleAuthCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'AUTH_FAILED',
          message: 'Google authentication failed',
        },
      });
    }

    const user = req.user as any;
    const token = AuthService.generateToken(user);

    // Set httpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    // Redirecionar para frontend dashboard
    const redirectUrl = `${config.FRONTEND_URL}/dashboard`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(
      `${config.FRONTEND_URL}/login?error=authentication_failed`
    );
  }
};

// GET /auth/logout - Fazer logout
export const handleLogout = (req: Request, res: Response): void => {
  res.clearCookie('authToken');
  res.json({
    success: true,
    message: 'Logout successful',
  });
};

// GET /auth/me - Retornar usuário autenticado
export const handleGetMe = (req: Request, res: Response): void => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      },
    });
  }

  res.json({
    success: true,
    data: req.user,
  });
};
```

#### 7️⃣ Arquivo: src/routes/authRoutes.ts

```typescript
import { Router, Request, Response } from 'express';
import passport from 'passport';
import {
  handleGoogleAuth,
  handleGoogleAuthCallback,
  handleLogout,
  handleGetMe,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const authRoutes = (): Router => {
  const router = Router();

  // Google OAuth routes
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login?error=auth_failed',
    }),
    handleGoogleAuthCallback
  );

  // Logout
  router.post('/logout', authMiddleware, handleLogout);

  // Get authenticated user
  router.get('/me', authMiddleware, handleGetMe);

  return router;
};

export default authRoutes;
```

#### 8️⃣ Arquivo: src/config/env.ts (Modificado)

```typescript
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
];

export const validateEnv = (): void => {
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missingVars.join(', ')}`
    );
    console.warn('   Autenticação OAuth não funcionará sem elas.');
    console.warn('   Veja .env.example para template.');
  }
};

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/agenda_clean',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || 'no-reply@agenda-clean.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
};

export default config;
```

#### 9️⃣ Arquivo: src/server.ts (Adicionar Passport e cookieParser)

```typescript
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestValidator } from './middleware/requestValidator.js';
import { initializePassport } from './auth/passport.js';
import { healthRoutes } from './routes/healthRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { bookingRoutes } from './routes/bookingRoutes.js';

export const createApp = (): Express => {
  const app = express();

  // CORS middleware
  app.use(corsMiddleware());

  // Request logging middleware
  app.use(loggerMiddleware());

  // Body parser middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Cookie parser - DEVE vir antes de session
  app.use(cookieParser());

  // Express session - requerido por Passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
      },
    })
  );

  // Initialize Passport
  initializePassport(app);

  // Request validation middleware
  app.use(requestValidator());

  // ROUTES
  app.use('/health', healthRoutes());
  app.use('/auth', authRoutes()); // ← Adicionar este
  app.use('/api/bookings', bookingRoutes());

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Route ${req.method} ${req.originalUrl} not found`,
      },
    });
  });

  // Error handler
  app.use(errorHandler());

  return app;
};

export default createApp;
```

#### 🔟 Testes Unitários: src/auth/__tests__/passport.test.ts

```typescript
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { AuthService } from '../../services/AuthService.js';
import { JwtService } from '../../services/JwtService.js';

describe('AuthService', () => {
  describe('findOrCreateUser', () => {
    it('deve criar novo usuário com role client', async () => {
      const googleProfile = {
        googleId: 'google-123',
        email: 'ana@example.com',
        name: 'Ana Silva',
      };

      const user = await AuthService.findOrCreateUser(googleProfile);

      expect(user.googleId).toBe('google-123');
      expect(user.email).toBe('ana@example.com');
      expect(user.role).toBe('client');
    });

    it('deve criar novo usuário com role admin se email é ADMIN_EMAIL', async () => {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@agenda-clean.com';
      const googleProfile = {
        googleId: 'google-admin-123',
        email: adminEmail,
        name: 'Admin João',
      };

      const user = await AuthService.findOrCreateUser(googleProfile);

      expect(user.role).toBe('admin');
    });

    it('não deve duplicar usuário na segunda chamada', async () => {
      const googleProfile = {
        googleId: 'google-456',
        email: 'teste@example.com',
        name: 'Teste User',
      };

      const user1 = await AuthService.findOrCreateUser(googleProfile);
      const user2 = await AuthService.findOrCreateUser(googleProfile);

      expect(user1.id).toBe(user2.id);
    });
  });

  describe('JwtService', () => {
    it('deve gerar token válido', () => {
      const token = JwtService.sign({
        userId: 'user-123',
        email: 'test@example.com',
        role: 'client',
      });

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('deve verificar token válido', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'client' as const,
      };

      const token = JwtService.sign(payload);
      const decoded = JwtService.verify(token);

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it('deve rejeitar token inválido', () => {
      const invalidToken = 'invalid-token-xyz';

      expect(() => {
        JwtService.verify(invalidToken);
      }).toThrow();
    });
  });
});
```

---

## 📋 Implementação Checklist

- [ ] Instalar dependências OAuth (passport, passport-google-oauth20, jsonwebtoken, etc)
- [ ] Criar arquivo src/auth/passport.ts com Passport.js configuration
- [ ] Criar arquivo src/services/AuthService.ts com findOrCreateUser logic
- [ ] Criar arquivo src/services/JwtService.ts com sign/verify JWT
- [ ] Criar arquivo src/middleware/authMiddleware.ts para validar JWT
- [ ] Implementar rota GET /auth/google (iniciar OAuth)
- [ ] Implementar rota GET /auth/google/callback (receber callback)
- [ ] Implementar rota POST /auth/logout (cleanup cookie)
- [ ] Implementar rota GET /auth/me (retornar usuário autenticado)
- [ ] Atualizar src/server.ts: adicionar cookieParser e session middleware
- [ ] Atualizar src/config/env.ts: validar variáveis Google OAuth
- [ ] Criar arquivo .env.example com template de variáveis
- [ ] Escrever testes unitários em src/auth/__tests__/passport.test.ts
- [ ] Testar fluxo completo: /auth/google → Google → /auth/google/callback
- [ ] Testar JWT token em httpOnly cookie
- [ ] Testar logout (cookie deleted)
- [ ] Testar rota protegida /auth/me sem token (deve retornar 401)
- [ ] Testar rota protegida /auth/me com token válido (deve retornar user)
- [ ] Verificar que JWT expira após 7 dias
- [ ] Documentar setup Google OAuth Console no README.md

---

## 🔗 Dependências & Referências

### Documentação Externa
- **Passport.js Documentation:** https://www.passportjs.org/
- **Google OAuth 2.0:** https://developers.google.com/identity/protocols/oauth2
- **JWT (jsonwebtoken):** https://github.com/auth0/node-jsonwebtoken
- **express-session:** https://github.com/expressjs/session

### Documentação Projeto
- **PRD:** /home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/prd.md
- **Architecture:** /home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/architecture.md
- **Epic 2 Requirements:** /home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/epics-and-stories.md

### Stories Relacionadas
- **Previous (Blocker):** Story 1.4 (Environment Configuration) ✅ Completa
- **Next (Depends):** Story 2.2 (Automatic User Account Creation)
- **Next (Depends):** Story 2.4 (JWT Session Tokens & Session Management)
- **Parallel After Auth:** Epics 3 & 4 (Client Booking, Admin Dashboard)

### Variáveis de Ambiente Requeridas

```env
# Google OAuth (obtém no Google Cloud Console)
GOOGLE_CLIENT_ID=<sua-client-id-do-google>
GOOGLE_CLIENT_SECRET=<seu-client-secret-do-google>

# JWT Token Signing
JWT_SECRET=<sua-chave-secreta-aleatória-de-32-caracteres>

# Backend URLs
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Admin Configuration
ADMIN_EMAIL=admin@email.com

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/agenda_clean
```

---

## 🎓 Dev Notes & Learning Context

### Lições de Stories Anteriores

**De Story 1.2 (Backend Init):**
- ✅ Estrutura Express com middleware funcionando bem
- ✅ Padrão de tipos explícitos em Controllers/Services consolidado
- ✅ Middleware base (CORS, logging, errorHandler) já em lugar

**Padrões Reutilizáveis:**
- ✅ Controllers recebem (req, res) tipado com Express types
- ✅ Services contêm lógica de negócio separada de HTTP
- ✅ Middleware usa next() para chain corretamente
- ✅ Responses seguem padrão { success, data/error, timestamp }

### Armadilhas Comuns (EVITAR)

❌ **Não armazene JWT em localStorage** - Vulnerável a XSS
❌ **Não use 'any' type** - TypeScript strict mode obrigatório
❌ **Não exponha JWT_SECRET em logs** - Pode vazar em produção
❌ **Não reutilize sessions de um usuário para outro** - Risco de segurança
❌ **Não confunda Passport.session() com express-session** - São complementares

### Configuração Google Cloud Console (Manual, não automático)

Para testar localmente:
1. Ir para Google Cloud Console: https://console.cloud.google.com
2. Criar novo projeto: "agenda-clean"
3. Habilitar API: Google+ API
4. Criar OAuth 2.0 credentials (tipo: Web application)
5. Adicionar Authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://seu-dominio.com/auth/google/callback` (production)
6. Copiar Client ID e Client Secret
7. Colar em .env.local como GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET

---

## ✨ Sucesso Esperado

Ao completar esta story:

✅ **OAuth Flow Testado:**
- [ ] Clicar "Entrar com Google" redireciona para Google login
- [ ] Google redireciona de volta com authToken cookie
- [ ] Frontend agora tem acesso a /dashboard (autenticado)
- [ ] POST /auth/logout deleta cookie e logout funciona

✅ **Testes Passando:**
- [ ] npm test retorna 100% pass rate (8+ testes)
- [ ] npm run validate (lint + type-check + build) sem erros

✅ **Segurança:**
- [ ] JWT_SECRET não aparece em logs ou responses
- [ ] httpOnly cookie protege contra XSS
- [ ] sameSite=strict protege contra CSRF

✅ **Pronto para Next Stories:**
- [ ] Story 2.2 pode começar (user creation já funciona)
- [ ] Story 2.4 pode começar (JWT validation pronta)
- [ ] Epics 3 & 4 podem usar authMiddleware para proteger rotas

---

## 📝 Status

- **Created:** 20 de maio de 2026
- **Status:** ready-for-dev
- **Last Updated:** 20 de maio de 2026
- **Developer:** (Aguardando Dev Agent)

---

*Story criada pelo Ultimate BMad Method - Context Engine*
*Documentação completa para implementação flawless*
