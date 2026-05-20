---
storyId: "1.2"
storyKey: "1-2-initialize-backend-project"
epicId: "1"
epicName: "Foundation & Setup"
title: "Inicializar Projeto Backend"
priority: "critical"
status: "ready-to-implement"
estimatedHours: 3
createdDate: "13 de maio de 2026"
projectName: "agenda-clean"
language: "pt-br"
---

# Story 1.2: Inicializar Projeto Backend

## 📋 Contexto & Visão Geral

Este é o **segundo story crítico** do epic de Foundation & Setup, **executado em paralelo com Story 1.1**. Não há dependências que o bloqueiem (ambas stories 1.1 e 1.2 são paralelas). O objetivo é configurar a arquitetura backend completa (Node.js + Express + TypeScript + Prisma) com a estrutura de pastas, middleware base, e padrões de codificação que todos os stories subsequentes de API utilizarão.

**Valor de Negócio:**
- Habilita desenvolvimento paralelo da API e frontend simultaneamente
- Estabelece padrões de API que serão reusados em 8+ endpoints posteriores
- Configura type-safety end-to-end (TypeScript + Prisma tipos gerados)
- Define pipeline de desenvolvimento (auto-reload com nodemon, type checking, linting)

**Dependências:**
- ❌ Nenhuma (paralelo com Story 1.1)
- ⬜ Bloqueador para: Stories 1.3 (Database Schema), 2.1 (OAuth), 3.x (Booking APIs)

**Sprint Assignment:**
- Sprint: 0 (Semana 1)
- Sequência: Segunda story (paralelo com Story 1.1 Frontend)

---

## 👤 User Story

```
Como desenvolvedor do projeto agenda-clean,
Quero ter um servidor Node.js/Express moderno, type-safe e bem-estruturado,
Para que eu possa construir APIs de autenticação, agendamentos e admin
com produtividade, confiança e padrões REST consistentes.
```

---

## 🎯 Objetivo & Requisitos Funcionais

**Objetivo Principal:**
Criar a base sólida do projeto backend que será mantida durante toda a implementação. Cada decisão aqui impacta a produtividade nos próximos 24 stories de API.

**Escopo Específico desta Story:**

1. ✅ Criar novo projeto Node.js com npm/pnpm
2. ✅ Instalar Express.js (web framework)
3. ✅ Configurar TypeScript com strict mode habilitado
4. ✅ Instalar e configurar Prisma ORM
5. ✅ Estruturar pastas base (src/routes, src/controllers, src/services, src/middleware, src/types, src/utils)
6. ✅ Criar middleware base (CORS, logging, error handling, request validation)
7. ✅ Implementar estrutura de arquivo .env para configuração
8. ✅ Configurar scripts npm (dev, build, start, lint, type-check)
9. ✅ Criar projeto Git com .gitignore apropriado
10. ✅ Documentar setup local, padrões de API e guia de implementação no README.md

---

## ✅ Acceptance Criteria (BDD)

### AC1: Projeto Node.js + Express criado com sucesso

```gherkin
GIVEN eu quero criar um novo projeto backend
WHEN executo npm init -y && npm install express
THEN o projeto está criado com todas as dependências instaladas
AND npm run dev funciona sem erros
AND o servidor inicia em http://localhost:3000 automaticamente
AND a rota GET /health retorna status 200 com {"status": "ok"}
```

### AC2: TypeScript configurado em strict mode

```gherkin
GIVEN que o projeto foi criado
WHEN executo npm run type-check
THEN não há erros de tipo
AND tsconfig.json tem: strict: true, resolveJsonModule: true
AND todos os arquivos .ts têm tipos explícitos
AND nenhum arquivo usa type 'any' (exceto casos documentados)
```

### AC3: Express servidor rodando com tipos

```gherkin
GIVEN que Express está instalado e configurado
WHEN crio src/server.ts com configuração base
THEN:
  - A aplicação inicia na porta 3000
  - CORS está habilitado para http://localhost:5173 (frontend)
  - Request body parser está configurado (JSON, limit 10mb)
  - Health check endpoint (GET /health) funciona
  - Servidor pode ser parado com nodemon sem erros
AND o arquivo src/server.ts exporta a aplicação Express com tipos corretos
```

### AC4: Estrutura de pastas implementada

```gherkin
GIVEN que quero organizar o código da API
WHEN navego a src/
THEN encontro estrutura:
  src/
  ├── server.ts            # Express app initialization
  ├── index.ts             # Entry point (start server)
  ├── routes/              # API routes (auth, bookings, admin)
  ├── controllers/         # Route handlers
  ├── services/            # Business logic, database queries
  ├── middleware/          # CORS, logging, auth, validation
  ├── types/               # TypeScript interfaces (global types)
  ├── utils/               # Helper functions
  └── config/              # Configuration (constants, env vars)

AND cada pasta tem index.ts para exports centralizados
```

### AC5: Middleware base implementado

```gherkin
GIVEN que preciso de middleware reutilizável
WHEN navego a src/middleware/
THEN encontro implementados:
  - corsMiddleware.ts (CORS setup para frontend em localhost:5173)
  - loggerMiddleware.ts (console.log de requests/responses)
  - errorHandler.ts (centralized error handling com proper HTTP status)
  - requestValidator.ts (validação de request body com mensagens de erro)
AND cada middleware:
  - Tem tipos explícitos (Request, Response, NextFunction from express)
  - Chama next() corretamente em handlers
  - Retorna respostas com status codes apropriados (200, 400, 401, 500)
  - Registra erros em console ou arquivo de log
```

### AC6: Prisma ORM inicializado

```gherkin
GIVEN que preciso de ORM para database access
WHEN executo npx prisma init
THEN:
  - arquivo .env criado com DATABASE_URL placeholder
  - pasta prisma/schema.prisma existe (vazio, será preenchido em Story 1.3)
  - arquivo .env está em .gitignore
  - npx prisma generate funciona sem erros
AND @prisma/client está instalado como dependency
AND prisma CLI commands funcionam (generate, migrate, studio)
```

### AC7: Variáveis de ambiente configuradas

```gherkin
GIVEN que preciso de configuração por ambiente
WHEN crio arquivo .env.local
THEN posso definir:
  NODE_ENV=development
  DATABASE_URL=postgresql://user:password@localhost:5432/agenda_clean
  PORT=3000
  CORS_ORIGIN=http://localhost:5173
  GOOGLE_CLIENT_ID=your-client-id-here
  GOOGLE_CLIENT_SECRET=your-client-secret-here
  JWT_SECRET=your-jwt-secret-here
  SENDGRID_API_KEY=your-sendgrid-key-here
AND arquivo .env.example contém os mesmos keys (com valores placeholder)
AND .env.local está em .gitignore
AND app está configurado para ler dessas variáveis via process.env
```

### AC8: Scripts npm funcionam corretamente

```gherkin
GIVEN que preciso rodar aplicação em diferentes contextos
WHEN consulto package.json scripts
THEN encontro configurados:
  - npm run dev → inicia servidor com nodemon e ts-node (auto-reload)
  - npm run build → compila TypeScript para dist/
  - npm run start → inicia servidor compilado (para produção)
  - npm run lint → roda ESLint em src/
  - npm run type-check → verifica tipos sem compilar
AND todos os scripts funcionam sem erros
AND npm run dev recarrega automaticamente ao editar arquivos .ts
```

---

## 🏗️ Contexto Técnico & Decisões

### Stack Tecnológico

| Componente | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| **Runtime** | Node.js | ^20.0 | LTS, suporte long-term, performance sólida |
| **Framework** | Express.js | ^4.18 | Lightweight, universal, industry standard |
| **Type Safety** | TypeScript | ^5.2 | Strict mode, excellent DX, type-safe database queries |
| **ORM** | Prisma | ^5.0 | Type-safe database access, migrations, studio UI |
| **Database** | PostgreSQL | 14+ | Relational, ACID transactions, concurrent access |
| **Development** | ts-node | ^10.0 | Execute TypeScript directly without compilation |
| **Auto Reload** | nodemon | ^3.0 | Watch files, auto-restart on changes |
| **Linting** | ESLint | ^8.0 | Code quality, consistency, catches mistakes |
| **Code Format** | Prettier | ^3.0 | Automatic formatting, zero config |
| **HTTP Client** | axios | ^1.6 | For Google OAuth, SendGrid, external APIs |
| **Email** | SendGrid | ^6.10 | Reliable email delivery service |
| **JWT** | jsonwebtoken | ^9.0 | Token-based authentication |
| **Password Hash** | bcrypt | ^5.0 | Secure password hashing (OAuth only - not used) |

### Padrões Arquiteturais

**1. MVC (Model-View-Controller) Adaptado**
- **Models** → Prisma schema (database structure)
- **Controllers** → Route handlers (request/response logic)
- **Services** → Business logic, database queries, validation
- **Routes** → API endpoints (HTTP methods)
- **Middleware** → Cross-cutting concerns (auth, logging, validation)

```
Request → Router → Controller → Service → Prisma/Database
Response ← Controller ← Service ← Prisma/Database
```

**2. Tipos Explícitos Obrigatórios**
- ✅ Todos os parâmetros de função têm tipos
- ✅ Todos os retornos de função têm tipos
- ✅ Interfaces para todos os DTOs (Data Transfer Objects)
- ✅ Tipos para requests/responses HTTP
- ✅ Nenhum use de `any` (exceto casos raros documentados)

Exemplo:
```typescript
// src/types/User.ts
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

// src/services/UserService.ts
export class UserService {
  async getUserById(id: string): Promise<UserDTO | null> {
    return prisma.user.findUnique({ where: { id } });
  }
}

// src/controllers/UserController.ts
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<UserDTO>
): Promise<void> => {
  const user = await UserService.getUserById(req.params.id);
  res.json(user);
};
```

**3. Separação de Responsabilidades**
- `src/routes/` → Define endpoints (GET /api/users, POST /api/bookings)
- `src/controllers/` → Trata requests HTTP, valida input, chama services
- `src/services/` → Lógica de negócio, queries database, processamento
- `src/middleware/` → Autenticação, logging, validação, tratamento de erros
- `src/utils/` → Funções utilitárias (formatters, validators, helpers)
- `src/types/` → TypeScript interfaces e tipos (DTOs, models)
- `src/config/` → Configuração global (constants, env vars)

**4. Nomeação de Arquivos**
- Controllers: PascalCase `UserController.ts`
- Services: PascalCase `UserService.ts`
- Routes: camelCase `userRoutes.ts`
- Middleware: camelCase `authMiddleware.ts`
- Types: PascalCase `User.ts`, `Booking.ts`
- Utils: camelCase `formatDate.ts`, `validateEmail.ts`

**5. HTTP Status Codes Consistentes**
- `200 OK` → Sucesso (GET, PUT, DELETE)
- `201 Created` → Recurso criado (POST)
- `204 No Content` → Sucesso sem body (DELETE, alguns PUTs)
- `400 Bad Request` → Validação falhou
- `401 Unauthorized` → Autenticação requerida
- `403 Forbidden` → Autorização insuficiente
- `404 Not Found` → Recurso não existe
- `409 Conflict` → Conflito (ex: double-booking)
- `500 Internal Server Error` → Erro do servidor

**6. API Response Envelope (Padrão Consistente)**
```typescript
// Success response
{
  success: true,
  data: { /* resultado */ },
  timestamp: "2026-05-13T10:30:00Z"
}

// Error response
{
  success: false,
  error: {
    code: "VALIDATION_ERROR" | "NOT_FOUND" | "UNAUTHORIZED",
    message: "Descrição do erro",
    details: [ /* array de erros específicos */ ]
  },
  timestamp: "2026-05-13T10:30:00Z"
}
```

**7. Async/Await Sempre (Não Callbacks)**
```typescript
// ✅ Bom
export const handleRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await service.getData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ❌ Evitar
app.get('/route', (req, res) => {
  service.getData((err, data) => {
    if (err) res.status(500).json({ error });
    else res.json(data);
  });
});
```

---

## 📦 Entregáveis Específicos

### Estrutura de Pastas Completa

```
backend/
├── src/
│   ├── index.ts                 # Entry point - start server
│   ├── server.ts                # Express app setup
│   ├── routes/
│   │   ├── index.ts             # Register all routes
│   │   ├── healthRoutes.ts      # GET /health
│   │   ├── authRoutes.ts        # Auth endpoints (empty, Story 2.1)
│   │   ├── bookingRoutes.ts     # Booking endpoints (empty, Story 3.x)
│   │   └── adminRoutes.ts       # Admin endpoints (empty, Story 4.x)
│   ├── controllers/
│   │   ├── index.ts             # Export all controllers
│   │   ├── healthController.ts  # /health handler
│   │   ├── authController.ts    # Auth handlers (empty, Story 2.1)
│   │   ├── bookingController.ts # Booking handlers (empty, Story 3.x)
│   │   └── adminController.ts   # Admin handlers (empty, Story 4.x)
│   ├── services/
│   │   ├── index.ts             # Export all services
│   │   ├── UserService.ts       # User queries (empty, Story 1.3)
│   │   ├── BookingService.ts    # Booking queries (empty, Story 1.3)
│   │   └── AuthService.ts       # Auth logic (empty, Story 2.1)
│   ├── middleware/
│   │   ├── index.ts             # Export all middleware
│   │   ├── corsMiddleware.ts    # CORS setup
│   │   ├── loggerMiddleware.ts  # Request/response logging
│   │   ├── errorHandler.ts      # Centralized error handling
│   │   ├── requestValidator.ts  # Body validation (optional in 1.2)
│   │   └── authMiddleware.ts    # Protected routes (empty, Story 2.4)
│   ├── types/
│   │   ├── index.ts             # Export all types
│   │   ├── User.ts              # User interfaces (empty, Story 1.3)
│   │   ├── Booking.ts           # Booking interfaces (empty, Story 1.3)
│   │   ├── ApiResponse.ts       # Standard response envelope
│   │   └── express.d.ts         # Express type augmentation (optional)
│   ├── utils/
│   │   ├── index.ts             # Export all utils
│   │   ├── formatDate.ts        # Date formatting helpers
│   │   ├── validateEmail.ts     # Email validation
│   │   └── logger.ts            # Logging utility
│   └── config/
│       ├── index.ts             # Export all config
│       ├── env.ts               # Environment variables validation
│       └── constants.ts         # Global constants
├── prisma/
│   ├── schema.prisma            # Database schema (empty, Story 1.3)
│   └── migrations/              # Database migrations (created by Story 1.3)
├── .env.example                 # Template for .env
├── .env.local                   # Local environment (ignored in git)
├── .gitignore                   # Git exclusions
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.build.json          # TypeScript build configuration
├── README.md                    # Project documentation
└── nodemon.json                 # Nodemon configuration (optional)
```

### Arquivos de Configuração Essenciais

**1. `package.json` (dependências iniciais)**

```json
{
  "name": "agenda-clean-api",
  "version": "1.0.0",
  "description": "Backend API for agenda-clean - Sofa cleaning scheduler",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext ts",
    "type-check": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0",
    "typescript": "^5.2.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.1",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "prisma": "^5.0.0"
  }
}
```

**2. `tsconfig.json` (strict mode)**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@routes/*": ["./routes/*"],
      "@controllers/*": ["./controllers/*"],
      "@services/*": ["./services/*"],
      "@middleware/*": ["./middleware/*"],
      "@types/*": ["./types/*"],
      "@utils/*": ["./utils/*"],
      "@config/*": ["./config/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**3. `.eslintrc.js` (code quality)**

```javascript
export default {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-types': 'warn',
  },
  env: {
    node: true,
    es2020: true,
  },
};
```

**4. `.prettierrc` (code formatting)**

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

**5. `nodemon.json` (development auto-reload)**

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node",
  "execMap": {
    "ts": "ts-node --esm"
  },
  "env": {
    "NODE_ENV": "development"
  }
}
```

**6. `.env.example` (template)**

```bash
# Server Configuration
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/agenda_clean

# Authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=no-reply@agenda-clean.com

# Admin Configuration
ADMIN_EMAIL=admin@agenda-clean.com
```

**7. `src/server.ts` (Express app)**

```typescript
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { healthRoutes } from './routes/healthRoutes.js';

export const createApp = (): Express => {
  const app = express();

  // Middleware de CORS
  app.use(corsMiddleware());

  // Middleware de logging
  app.use(loggerMiddleware());

  // Parser de JSON
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Health check route
  app.use('/health', healthRoutes());

  // Future routes (TODO em stories posteriores)
  // app.use('/api/auth', authRoutes());
  // app.use('/api/bookings', bookingRoutes());
  // app.use('/api/admin', adminRoutes());

  // Error handler (deve ser último middleware)
  app.use(errorHandler());

  return app;
};

export default createApp;
```

**8. `src/index.ts` (entry point)**

```typescript
import { createApp } from './server.js';
import { config } from './config/index.js';

const port = config.PORT || 3000;
const app = createApp();

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check: GET http://localhost:${port}/health`);
  console.log(`🔌 CORS enabled for: ${config.CORS_ORIGIN}`);
});
```

**9. `src/middleware/corsMiddleware.ts`**

```typescript
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export const corsMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', config.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }

    next();
  };
};
```

**10. `src/middleware/loggerMiddleware.ts`**

```typescript
import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
      );
    });

    next();
  };
};
```

**11. `src/middleware/errorHandler.ts`**

```typescript
import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any[];
}

export const errorHandler = () => {
  return (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const statusCode = error.statusCode || 500;
    const code = error.code || 'INTERNAL_ERROR';

    console.error(`[ERROR] ${code}:`, error.message);

    res.status(statusCode).json({
      success: false,
      error: {
        code,
        message: error.message,
        details: error.details || [],
      },
      timestamp: new Date().toISOString(),
    });
  };
};
```

**12. `src/routes/healthRoutes.ts`**

```typescript
import { Router, Request, Response } from 'express';

export const healthRoutes = (): Router => {
  const router = Router();

  router.get('/', (req: Request, res: Response): void => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  return router;
};

export default healthRoutes;
```

**13. `src/config/env.ts`**

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
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL!,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || 'no-reply@agenda-clean.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
};

export default config;
```

**14. `src/config/index.ts`**

```typescript
import { validateEnv } from './env.js';

// Validate environment on startup
if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}

export { config as default } from './env.js';
export * from './env.js';
```

---

## 🔗 Links para Requisitos Relacionados

**PRD:**
- [Technical Stack Requirements](../../planning-artifacts/prd.md#project-classification)
- [API Performance Requirements](../../planning-artifacts/prd.md#non-functional-requirements-20-total) - NFR1-NFR6
- [Security Requirements](../../planning-artifacts/prd.md#non-functional-requirements-20-total) - NFR7-NFR13

**Arquitetura:**
- [Backend Stack Decisions](../../planning-artifacts/architecture.md#technical-stack-decisions)
- [API Design Patterns](../../planning-artifacts/architecture.md#api-design--implementation-strategy)
- [Database Structure](../../planning-artifacts/architecture.md#database-schema-design)
- [Error Handling Strategy](../../planning-artifacts/architecture.md#error-handling--recovery)

**Epics:**
- [Epic 1 Overview](../../planning-artifacts/epics-and-stories.md#epic-1-foundation--setup)
- [Story 1.2 Requirements](../../planning-artifacts/epics-and-stories.md#story-12-initialize-backend-project)
- [Story Dependencies](../../planning-artifacts/epics-and-stories.md#story-structure)

---

## 🎨 Padrões & Convenções a Usar

### Padrão de Rota
```typescript
// src/routes/exampleRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { exampleController } from '../controllers/exampleController.js';

export const exampleRoutes = (): Router => {
  const router = Router();

  router.get('/:id', exampleController.getById);
  router.post('/', exampleController.create);
  router.put('/:id', exampleController.update);
  router.delete('/:id', exampleController.delete);

  return router;
};

export default exampleRoutes;
```

### Padrão de Controller
```typescript
// src/controllers/exampleController.ts
import { Request, Response, NextFunction } from 'express';
import { ExampleService } from '../services/ExampleService.js';
import { ApiError } from '../middleware/errorHandler.js';

interface GetByIdParams {
  id: string;
}

interface CreateBody {
  name: string;
  email: string;
}

export const exampleController = {
  getById: async (
    req: Request<GetByIdParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await ExampleService.getById(id);

      if (!result) {
        const error: ApiError = new Error('Not found');
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (
    req: Request<{}, {}, CreateBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, email } = req.body;

      // Validação básica
      if (!name || !email) {
        const error: ApiError = new Error('Missing required fields');
        error.statusCode = 400;
        error.code = 'VALIDATION_ERROR';
        throw error;
      }

      const result = await ExampleService.create({ name, email });

      res.status(201).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  },
};

export default exampleController;
```

### Padrão de Service
```typescript
// src/services/ExampleService.ts
import { prisma } from '../config/database.js';

interface CreateInput {
  name: string;
  email: string;
}

export class ExampleService {
  static async getById(id: string) {
    return prisma.example.findUnique({
      where: { id },
    });
  }

  static async create(data: CreateInput) {
    return prisma.example.create({
      data,
    });
  }

  static async update(id: string, data: Partial<CreateInput>) {
    return prisma.example.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.example.delete({
      where: { id },
    });
  }
}

export default ExampleService;
```

### Padrão de Type Definition
```typescript
// src/types/Example.ts
export interface ExampleDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExampleInput {
  name: string;
  email: string;
}

export interface UpdateExampleInput {
  name?: string;
  email?: string;
}

export interface ExampleApiResponse {
  success: boolean;
  data?: ExampleDTO | ExampleDTO[];
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
  timestamp: string;
}
```

### Padrão de Utility Function
```typescript
// src/utils/exampleUtil.ts
export const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default {
  formatUserName,
  isValidEmail,
};
```

---

## 📊 Estimativa & Timeline

| Tarefa | Duração | Notas |
|--------|---------|-------|
| Criar projeto Node.js com npm init | 10 min | npm init -y + git init |
| Instalar Express + TypeScript + deps | 20 min | npm install da lista de dependências |
| Configurar TypeScript (tsconfig.json) | 15 min | Strict mode, paths, build output |
| Configurar Prisma (init + schema placeholder) | 15 min | npx prisma init, criar .env template |
| Criar estrutura base de pastas | 10 min | mkdir e criar __index.ts files |
| Implementar middleware base (CORS, logger, error handler) | 30 min | 3 middlewares funcionais |
| Criar health check route + controller | 15 min | GET /health endpoint |
| Configurar scripts npm (dev, build, start) | 10 min | package.json + nodemon.json |
| Configurar ESLint + Prettier | 15 min | .eslintrc.js + .prettierrc |
| Documentar README + setup guide | 20 min | Instruções de setup local, padrões de API |
| Testar tudo + documentar issues | 20 min | npm run dev, type-check, lint |
| **TOTAL** | **180 min (~3h)** | Pronto para Story 1.3 |

---

## 🚀 Próximos Passos

Após completar esta story:

1. **Story 1.3** (sequencial) → Database schema + Prisma migrations
   - Define User e Booking tables
   - Cria migrations
   - Valida schema

2. **Story 1.4** (sequencial) → Environment configuration completa
   - Valida env vars no startup
   - Documenta processo de setup

3. **Story 1.5** (sequencial) → Project documentation
   - Architecture README
   - API documentation
   - Development guide

4. **Story 2.1** (blocker) → Google OAuth Setup
   - Usa middleware + services criados aqui
   - Usa database schema de 1.3

---

## 📝 Notas Importantes

⚠️ **TypeScript Strict Mode é Crítico**
- `strict: true` em tsconfig.json é obrigatório
- Todos os arquivos .ts devem ter tipos explícitos
- Se ignorar strict agora, Stories 2.x+ terão problemas de tipo com integração frontend
- Zero `any` types (com exceção de casos raros documentados)

⚠️ **CORS Configurado Apenas para Localhost**
- Frontend roda em `http://localhost:5173`
- Backend responde apenas para essa origem em development
- Em production, mudar para domínio real

⚠️ **Environment Variables são Críticos**
- Nunca commitar .env.local no git
- Sempre usar .env.example como template
- Validar variáveis obrigatórias no startup

⚠️ **Auto-reload com Nodemon**
- Essencial para experiência de desenvolvimento
- Se nodemon não funciona, problemas em 20+ stories posteriores
- Testar: editar arquivo, salvar, verificar auto-reload

⚠️ **Prisma Precisa de PostgreSQL Rodando**
- Story 1.2 não cria banco de dados (apenas schema)
- Story 1.3 vai rodar migrations (precisa de DB)
- Documentar instruções de setup PostgreSQL local

⚠️ **Error Handling Centralizado**
- Todos os controllers usam try/catch + next(error)
- Middleware errorHandler trata todas as exceções
- Respostas de erro devem seguir padrão ApiResponse

⚠️ **Não Há Testes Nesta Story**
- Testes de API virão em Story posterior
- Apenas testar manualmente via curl/Postman
- GET http://localhost:3000/health deve retornar 200
