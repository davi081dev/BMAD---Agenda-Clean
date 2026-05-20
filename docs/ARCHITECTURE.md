# Arquitetura Técnica - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0  
**Status:** Ready for Implementation

---

## 1. Visão Geral da Arquitetura

O **agenda-clean** é uma aplicação web de agendamento de limpeza de sofá com arquitetura cliente-servidor clássica: frontend em React, backend em Node.js/Express, e banco de dados em PostgreSQL.

### 1.1 Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (NAVEGADOR)                       │
│                  Aplicação React (Vite) @5173                    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Pages: Login, Dashboard, Booking Form, Admin Panel      │   │
│  │  Components: Forms, Tables, Modals, Navigation           │   │
│  │  Services: API Client (axios), Local State               │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                    HTTP/HTTPS REST API
                    (JSON request/response)
                                 │
┌────────────────────────────────┼────────────────────────────────┐
│                        SERVIDOR (BACKEND)                        │
│              Express + TypeScript @3000                          │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Routes: /auth, /api/agendamentos, /api/admin/...         │ │
│  │  Controllers: Handle requests, validate inputs             │ │
│  │  Services: Business logic, Prisma queries, email sending   │ │
│  │  Middleware: Auth (JWT), CORS, Error handling              │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                        Prisma ORM
                   (Type-safe queries)
                                 │
┌────────────────────────────────┼────────────────────────────────┐
│                     BANCO DE DADOS                               │
│                    PostgreSQL v14+                               │
│                     (Supabase free tier)                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Tables: User, Agendamento                                 │ │
│  │  Relationships: 1 User → N Agendamentos                    │ │
│  │  Constraints: Unique (date, time), Foreign Keys            │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 1.2 Fluxo de Autenticação

```
1. Cliente acessa http://localhost:5173
   ↓
2. Clica "Entrar com Google"
   ↓
3. Frontend redireciona para GET /auth/google
   ↓
4. Backend redireciona para Google OAuth consent screen
   ↓
5. Cliente autoriza
   ↓
6. Google redireciona para GET /auth/google/callback?code=XXX
   ↓
7. Backend valida code com Google, obtém profile (email, name, googleId)
   ↓
8. Backend busca/cria User no database
   ↓
9. Backend gera JWT token e set cookie
   ↓
10. Backend redireciona para http://localhost:5173/dashboard
    ↓
11. Frontend carrega com JWT no localStorage/cookie
```

### 1.3 Fluxo de Agendamento

```
1. Cliente clica "Novo Agendamento"
   ↓
2. Preenche form (endereço, data, horário, observações)
   ↓
3. Frontend valida dados localmente (validação de form)
   ↓
4. Frontend faz POST /api/agendamentos com Authorization header
   ↓
5. Backend valida dados (tipos, ranges)
   ↓
6. Backend verifica conflito (unique date+time)
   ↓
7. Backend insere Agendamento com status 'solicitado'
   ↓
8. Backend retorna agendamento criado com id, timestamps
   ↓
9. Frontend mostra confirmação "Agendamento criado!"
   ↓
10. Admin recebe notificação (email ou dashboard)
    ↓
11. Admin entra no painel, vê agendamento "solicitado"
    ↓
12. Admin clica "Confirmar"
    ↓
13. Backend atualiza status para "confirmado"
    ↓
14. Backend envia email ao cliente: "Seu agendamento foi confirmado"
    ↓
15. Cliente recebe email com detalhes
```

---

## 2. Stack Técnico Completo

### 2.1 Frontend Stack

| Componente | Tecnologia | Versão | Propósito |
|------------|-----------|---------|-----------|
| **Build Tool** | Vite | 5.0.8 | Fast bundling, hot module replacement |
| **Framework** | React | 18.2.0 | UI library, functional components |
| **Linguagem** | TypeScript | 5.2.2 | Type safety, better DX |
| **Styling** | Tailwind CSS | 3.3.6 | Utility-first CSS framework |
| **HTTP Client** | axios | (custom) | HTTP requests to backend |
| **UI Components** | shadcn/ui (futuro) | - | Pre-built accessible components |
| **Form Handling** | React hooks | - | useForm, useState para formulários |
| **Routing** | React Router | (a adicionar) | Client-side routing (dashboard, booking) |

**Port:** `5173` (configurado em `vite.config.ts`)

### 2.2 Backend Stack

| Componente | Tecnologia | Versão | Propósito |
|------------|-----------|---------|-----------|
| **Runtime** | Node.js | 18.x LTS+ | JavaScript/TypeScript execution |
| **Framework** | Express | 5.2.1 | Minimal REST API framework |
| **Linguagem** | TypeScript | 6.0.3 | Type safety, better maintenance |
| **ORM** | Prisma | 5.15.0 | Type-safe database queries |
| **Auth** | JWT (jsonwebtoken) | (custom) | Stateless authentication |
| **CORS** | cors middleware | (custom) | Cross-origin requests |
| **Validation** | Zod (futuro) | - | Runtime schema validation |
| **Email** | SendGrid | (via API) | Email notifications |
| **Dev Tools** | nodemon | 3.1.14 | Auto-restart on file changes |

**Port:** `3000` (configurado em `backend/src/server.ts` via `PORT` env var)

### 2.3 Database Stack

| Componente | Tecnologia | Versão | Propósito |
|------------|-----------|---------|-----------|
| **Database** | PostgreSQL | 14+ | Relational database |
| **Provider** | Supabase (free) | - | Managed PostgreSQL (MVP) |
| **ORM** | Prisma | 5.15.0 | Migrations, queries, type generation |
| **Backup** | Supabase | - | Daily backups (free tier) |

**Acesso:**
- Local: `postgresql://localhost:5432/agenda-clean-dev`
- Supabase: `postgresql://[USER]:[PASS]@[HOST]/[DB]` (via supabase.com)

---

## 3. Estrutura de Pastas

### 3.1 Frontend (`frontend/src/`)

```
frontend/src/
├── App.tsx                      # Root component, routing setup
├── main.tsx                     # Entry point, ReactDOM render
├── vite-env.d.ts               # Vite environment type definitions
│
├── components/                  # Reusable UI components
│   ├── BookingForm.tsx          # Form para agendar
│   ├── AgendamentoList.tsx      # Lista de agendamentos do cliente
│   ├── AdminDashboard.tsx       # Painel admin
│   ├── LoginButton.tsx          # Botão "Entrar com Google"
│   └── ... (outros componentes reutilizáveis)
│
├── pages/                       # Full-page components (rotas)
│   ├── LoginPage.tsx            # Página de login (/login)
│   ├── ClientDashboard.tsx      # Dashboard do cliente (/dashboard)
│   ├── BookingPage.tsx          # Página de novo agendamento (/booking)
│   ├── AdminPage.tsx            # Painel do admin (/admin)
│   └── NotFoundPage.tsx         # 404 page
│
├── services/                    # API client e lógica de dados
│   ├── api.ts                   # Axios instance com base URL + interceptors
│   ├── authService.ts           # Login, logout, getCurrentUser
│   ├── bookingService.ts        # GET/POST agendamentos, availability
│   ├── adminService.ts          # Admin endpoints
│   └── emailService.ts          # Email-related calls (if async)
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts               # useAuth() para auth state
│   ├── useBookings.ts           # useBookings() para listar agendamentos
│   ├── useFetch.ts              # Generic data fetching hook
│   └── ... (outros custom hooks)
│
├── types/                       # TypeScript interfaces/types
│   ├── user.ts                  # interface User
│   ├── booking.ts               # interface Agendamento
│   ├── api.ts                   # API response types
│   └── index.ts                 # Central export
│
├── styles/                      # Global styles, utilities
│   ├── globals.css              # Tailwind directives, global styles
│   ├── variables.css            # CSS custom properties (colors, fonts)
│   └── utilities.css            # Custom utility classes
│
├── utils/                       # Helper functions
│   ├── formatters.ts            # Date formatting, phone formatting
│   ├── validators.ts            # Form validation logic
│   ├── storage.ts               # localStorage helpers
│   └── constants.ts             # App constants (timeSlots, statuses)
│
└── config/                      # Configuration
    ├── api.ts                   # API endpoints constants
    └── env.ts                   # Environment variables handler
```

**Key Insights:**
- Componentes são colocados em `components/` quando reutilizáveis
- Páginas (full-screen views) vão em `pages/`
- Lógica de API vai em `services/` (não em componentes)
- Custom hooks centralizam estado compartilhado
- Types em arquivos separados, exportados em `index.ts`

### 3.2 Backend (`backend/src/`)

```
backend/src/
├── index.ts                     # Entry point, inicia servidor
├── server.ts                    # Express app creation, middleware setup
│
├── routes/                      # Express routes (endpoints)
│   ├── healthRoutes.ts          # GET /health
│   ├── authRoutes.ts            # POST /auth/login, GET /auth/google, etc
│   ├── bookingRoutes.ts         # GET/POST /api/agendamentos
│   ├── adminRoutes.ts           # GET/PATCH /api/admin/agendamentos
│   └── index.ts                 # Central exports
│
├── controllers/                 # Route handlers (business logic)
│   ├── healthController.ts      # Health check logic
│   ├── authController.ts        # OAuth, JWT generation
│   ├── bookingController.ts     # Get bookings, create booking
│   ├── adminController.ts       # Admin operations
│   └── index.ts                 # Central exports
│
├── services/                    # Business logic, Prisma queries
│   ├── authService.ts           # Google OAuth, JWT, User creation
│   ├── bookingService.ts        # Agendamento CRUD, availability check
│   ├── adminService.ts          # Admin operations, status updates
│   ├── emailService.ts          # SendGrid email sending
│   ├── prismaService.ts         # Prisma client instance
│   └── index.ts                 # Central exports
│
├── middleware/                  # Express middleware
│   ├── authMiddleware.ts        # JWT validation, requireAuth
│   ├── adminMiddleware.ts       # Role-based access control (admin only)
│   ├── corsMiddleware.ts        # CORS headers
│   ├── errorHandler.ts          # Global error handling
│   ├── loggerMiddleware.ts      # Request logging
│   ├── requestValidator.ts      # Input validation
│   └── index.ts                 # Central exports
│
├── types/                       # TypeScript interfaces
│   ├── user.ts                  # User, UserRole
│   ├── booking.ts               # Agendamento, Status enums
│   ├── api.ts                   # API request/response types
│   ├── error.ts                 # Custom Error classes
│   └── index.ts                 # Central exports
│
├── utils/                       # Helper functions
│   ├── jwt.ts                   # JWT sign/verify
│   ├── dateTime.ts              # Date/time formatting, validation
│   ├── validators.ts            # Input validation helpers
│   ├── errorMessages.ts         # Standardized error messages
│   └── constants.ts             # App constants
│
└── config/                      # Configuration
    ├── database.ts              # Database connection setup
    ├── env.ts                   # Environment variables
    └── constants.ts             # API constants
```

**Key Insights:**
- Cada arquivo de rota (`routes/`) tem seu controller correspondente
- Controllers chamam services (não fazem queries diretas)
- Services contêm toda lógica de negócio (Prisma, emails, etc)
- Middleware é plugado no `server.ts` em ordem específica
- Types seguem a estrutura do Prisma schema

### 3.3 Database (`backend/prisma/`)

```
backend/prisma/
├── schema.prisma                # Definição do schema (models, enums, config)
├── seed.ts                      # Script para popular banco com dados de teste
└── migrations/                  # Histórico de migrações
    ├── migration_lock.toml      # Lock file (não editar)
    └── [timestamp]_init/        # Pastas de cada migração auto-geradas
        ├── migration.sql        # SQL gerado pelo Prisma (não editar)
        └── (subpasta vazia)
```

**Workflow de Migrações:**
1. Edite `schema.prisma`
2. Execute `npx prisma migrate dev --name "descricao"`
3. Prisma gera arquivo SQL em `migrations/[timestamp]_descricao/`
4. Prisma aplica migração ao banco
5. Prisma regenera tipos TypeScript automaticamente

---

## 4. Decisões Arquiteturais Chave

### 4.1 Por que Vite ao invés de Create React App (CRA)?

**Vite:**
- ✅ Faster HMR (Hot Module Replacement) < 100ms vs CRA ~1s
- ✅ Faster builds (modern esbuild vs Webpack)
- ✅ Smaller bundle size
- ✅ Melhor DX com TypeScript out-of-the-box
- ✅ Zero config for most cases

**CRA:**
- ❌ Deprecated (não recomendado para novos projetos)
- ❌ Slower builds
- ❌ Mais pesado e lento em dev

**Decisão:** Vite é a escolha moderna padrão para React SPA.

### 4.2 Por que Express ao invés de NestJS?

**Express:**
- ✅ Simpler learning curve (escrever rotas é trivial)
- ✅ Adequate for MVP (sem overengineering)
- ✅ Less boilerplate (NestJS é muito verboso)
- ✅ Flexível - não impõe arquitetura
- ✅ Comunidade grande, muito suporte

**NestJS:**
- ❌ Overkill para MVP com escopo limitado
- ❌ Muito boilerplate (decorators, modules, providers)
- ❌ Curva de aprendizado steep
- ❌ Opinado demais para projeto pequeno

**Decisão:** Express é suficiente e mantém código limpo e simples.

### 4.3 Por que PostgreSQL ao invés de MongoDB?

**PostgreSQL:**
- ✅ Relational data (User ↔ Agendamento)
- ✅ Constraints database-level (unique date+time)
- ✅ ACID transactions (double-booking prevention)
- ✅ Joins eficientes
- ✅ Melhor para pequena escala

**MongoDB:**
- ❌ Não é relational (duplicação de dados)
- ❌ Sem constraints nativas (validação em app)
- ❌ Complexo prevenir double-bookings atomicamente
- ❌ Overkill para dados estruturados

**Decisão:** PostgreSQL é essencial para o modelo de dados do agenda-clean.

### 4.4 Por que Prisma ao invés de Raw SQL ou Sequelize?

**Prisma:**
- ✅ Type-safe queries (nenhum SQL string)
- ✅ Migrations declarativas (versionadas, reversíveis)
- ✅ Auto-generated types (User, Agendamento tipos)
- ✅ Prisma Studio GUI para inspeccionar DB
- ✅ Excelente DX com autocompletar

**Raw SQL:**
- ❌ Sem type safety
- ❌ Sem migrations automáticas
- ❌ SQL injection risk se não cuidadoso
- ❌ Pior DX

**Sequelize:**
- ❌ Mais verboso que Prisma
- ❌ Menos moderno
- ❌ ORM tradicional com callbacks

**Decisão:** Prisma é o ORM moderno ideal para TypeScript.

### 4.5 Por que Google OAuth?

**Google OAuth:**
- ✅ Zero-friction signup (nenhum formulário de cadastro)
- ✅ Usuários confiam em Google (segurança compreendida)
- ✅ Sem gerenciar senhas
- ✅ Perfil já validado (email verificado)
- ✅ Setup simples com Passport.js

**Local Passwords:**
- ❌ Cadastro extra (friction)
- ❌ Forgot password flow
- ❌ Password validation rules
- ❌ Security burden (bcrypt, etc)

**Decisão:** OAuth elimina atrito e responsabilidade de password management.

### 4.6 Por que JWT Tokens?

**JWT:**
- ✅ Stateless (backend não precisa armazenar sessões)
- ✅ Escalável (múltiplos backend servers, sem shared session store)
- ✅ Pode ser em cookie ou localStorage
- ✅ Suporta expiration

**Session Cookies:**
- ❌ Require server-side session store
- ❌ Não escalável para múltiplos servidores
- ❌ Complexo em arquitetura distribuída

**Decisão:** JWT é padrão moderno para SPAs.

---

## 5. Fluxos Principais Detalhados

### 5.1 Login Flow (Detalhado)

```
CLIENTE                           SERVIDOR                        GOOGLE
  │                                 │                               │
  ├─ Clica "Entrar com Google" ──→  │                               │
  │                            ┌────┴─ Gera state CSRF            │
  │                            └────┐  Redireciona para Google     │
  │ ◀──────────────────────────────┘                               │
  │                                                                 │
  ├─ Navegador abre consent screen ────────────────────────────→  │
  │  (pede email, permissão)                                       │
  │                                                                 │
  │ ◀─────────────────────────────────────────────────────────── │
  │   (usuário autoriza)                                           │
  │                                                                 │
  └─ Redireciona para /auth/google/callback?code=XXX ────────→   │
                                    │                               │
                                ┌───┴─ Valida state               │
                                │   Troca code por access_token   │
                                │   Obtém profile (email, name)   │
                                │                                  │
                                │ ┌───────────────────────────→   │
                                │ │  GET /oauth2/v2/userinfo     │
                                │ ◀─ {email, name, sub:id}      │
                                │                                  │
                                │ Busca/cria User no DB          │
                                │ Gera JWT token (exp 30 dias)   │
                                │ Set cookie + localStorage      │
                                │                                  │
  ◀──────────────────────────────┤ Redireciona para /dashboard   │
  (token no localStorage/cookie)  │                                │
  │
  ├─ Carrega dashboard                                            │
  │  (incluindo token no header Authorization: Bearer <JWT>)      │
  │                                                                │
  │  → backend valida JWT                                         │
  │  → retorna dados do usuário                                   │
  │  → dashboard mostra "Bem-vindo, João!"                        │
```

**Código exemplo:**
```typescript
// Frontend: Login button
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};

// Backend: GET /auth/google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Backend: GET /auth/google/callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // req.user contém User do database
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('http://localhost:5173/dashboard');
  }
);
```

### 5.2 Booking Creation Flow (Detalhado)

```
CLIENTE FORM                     BACKEND                    DATABASE
  │                                │                           │
  ├─ Preenche form:                                             │
  │  - endereço                                                 │
  │  - data (2026-05-22)                                        │
  │  - horário (14:30)                                          │
  │  - observações                                              │
  │                                                             │
  ├─ Valida CLIENTE-SIDE:                                       │
  │  - data >= hoje                                             │
  │  - horário entre 09:00-18:00                                │
  │  - endereço não vazio                                       │
  │                                                             │
  ├─ POST /api/agendamentos ─────→                              │
  │  payload:                                                   │
  │  { date, time, address, observations }                      │
  │  header: Authorization: Bearer <JWT>                        │
  │                                                             │
  │                              ┌─ authMiddleware valida JWT   │
  │                              │                              │
  │                              ├─ Valida SERVIDOR:            │
  │                              │  - tipos (date = Date, etc)  │
  │                              │  - ranges (time 09-18)       │
  │                              │                              │
  │                              └─ Queries DB ─────────────→  │
  │                                 SELECT COUNT(*) FROM        │
  │                                 Agendamento WHERE           │
  │                                 date = '2026-05-22' AND     │
  │                                 time = '14:30' AND          │
  │                                 status != 'cancelado'       │
  │                                                             │
  │                                                 ◀──────────┤
  │                                                 Resultado:   │
  │                                                 count = 0    │
  │                                                 (slot livre) │
  │                                                             │
  │                              ├─ INSERT INTO Agendamento ─→ │
  │                              │  { id, userId, date, time,   │
  │                              │    address, observations,     │
  │                              │    status: 'solicitado' }     │
  │                                                             │
  │                                                 ◀──────────┤
  │                                                 Sucesso      │
  │                                                 INSERT ID    │
  │                                                             │
  │  ◀──────────────────────────┘ Retorna agendamento          │
  │  200 OK: {                                                  │
  │    success: true,                                           │
  │    data: {                                                  │
  │      id: "uuid-123",                                        │
  │      date: "2026-05-22",                                    │
  │      time: "14:30",                                         │
  │      address: "...",                                        │
  │      observations: "...",                                   │
  │      status: "solicitado",                                  │
  │      createdAt: "2026-05-13T14:30:00Z"                      │
  │    }                                                        │
  │  }                                                          │
  │                                                             │
  ├─ Mostra confirmação:                                        │
  │  "Agendamento criado com sucesso!"                          │
  │  "Status: Solicitado (aguardando confirmação do admin)"     │
  │                                                             │
  └─ Redireciona para dashboard
```

**Código exemplo:**
```typescript
// Frontend: Submit booking form
const handleSubmit = async (data: BookingFormData) => {
  try {
    const response = await api.post('/api/agendamentos', {
      date: data.date.toISOString().split('T')[0], // YYYY-MM-DD
      time: data.time, // HH:MM
      address: data.address,
      observations: data.observations
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    setSuccess('Agendamento criado com sucesso!');
    // redirecionar para dashboard
  } catch (error) {
    setError(error.response.data.error);
  }
};

// Backend: POST /api/agendamentos
app.post('/api/agendamentos', authMiddleware, async (req, res) => {
  const { date, time, address, observations } = req.body;
  
  // Validate
  if (!date || !time || !address) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  // Check availability
  const existing = await prisma.agendamento.count({
    where: {
      date: new Date(date),
      time,
      status: { not: 'cancelado' }
    }
  });
  
  if (existing > 0) {
    return res.status(409).json({
      error: 'Horário já agendado. Escolha outro.'
    });
  }
  
  // Create
  const agendamento = await prisma.agendamento.create({
    data: {
      userId: req.user.id,
      date: new Date(date),
      time,
      address,
      observations,
      status: 'solicitado'
    }
  });
  
  res.status(201).json({ success: true, data: agendamento });
});
```

---

## 6. Padrões de Código Estabelecidos

### 6.1 Naming Conventions

| Tipo | Convenção | Exemplos |
|------|-----------|----------|
| Variáveis | camelCase | `currentUser`, `bookingDate`, `isLoading` |
| Funções | camelCase | `getUserById()`, `validateEmail()` |
| React Components | PascalCase | `BookingForm`, `AdminDashboard`, `UserCard` |
| TypeScript Types/Interfaces | PascalCase | `User`, `Agendamento`, `BookingFormData` |
| Constants | UPPER_SNAKE_CASE | `MAX_BOOKINGS`, `API_BASE_URL` |
| Component files | kebab-case | `booking-form.tsx`, `admin-dashboard.tsx` |
| Service files | camelCase | `userService.ts`, `bookingService.ts` |
| Routes files | kebab-case | `auth-routes.ts`, `booking-routes.ts` |
| Database tables | PascalCase (Prisma) | `User`, `Agendamento` |
| Database columns | camelCase | `userId`, `createdAt`, `googleId` |
| Enums | UPPER_CASE_SNAKE_CASE | `USER_ROLE_CLIENT`, `AGENDAMENTO_STATUS_SOLICITADO` |

### 6.2 TypeScript Strict Mode

Sempre use tipos explícitos:

**✅ Bom:**
```typescript
interface User {
  id: string;
  email: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

const getUser = (id: string): Promise<User> => {
  // ...
};

let currentUser: User | null = null;
```

**❌ Ruim:**
```typescript
const user: any = getUser(id);
let something;
const getUser = (id) => { ... };
```

### 6.3 Error Handling

Backend sempre retorna status HTTP apropriado:

```typescript
// 200 - OK (sucesso)
res.status(200).json({ success: true, data: {...} });

// 201 - Created (recurso criado)
res.status(201).json({ success: true, data: newBooking });

// 400 - Bad Request (dados inválidos)
res.status(400).json({ success: false, error: 'Campo obrigatório faltando' });

// 401 - Unauthorized (não autenticado)
res.status(401).json({ success: false, error: 'Token inválido ou expirado' });

// 403 - Forbidden (autenticado mas sem permissão)
res.status(403).json({ success: false, error: 'Apenas admin pode fazer isso' });

// 404 - Not Found
res.status(404).json({ success: false, error: 'Agendamento não encontrado' });

// 409 - Conflict (violação de constraint)
res.status(409).json({ success: false, error: 'Horário já agendado' });

// 500 - Server Error
res.status(500).json({ success: false, error: 'Erro interno do servidor' });
```

Frontend trata erros gracefully:

```typescript
try {
  const response = await api.post('/api/agendamentos', data);
  setSuccess('Agendamento criado!');
} catch (error: any) {
  const message = error.response?.data?.error || 'Erro ao agendar';
  setError(message);
  // Mostrar mensagem em português para o usuário
}
```

### 6.4 API Response Format

Standardize todas as respostas API:

**Success Response:**
```json
{
  "success": true,
  "data": { /* recurso */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Mensagem de erro em português"
}
```

**List Response:**
```json
{
  "success": true,
  "data": [
    { /* item 1 */ },
    { /* item 2 */ }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10
  }
}
```

### 6.5 Component Structure (React)

```typescript
import React, { useState, useEffect } from 'react';
import { BookingFormData } from '../types/booking';
import { api } from '../services/api';
import './booking-form.css';

interface BookingFormProps {
  onSuccess?: (booking: Booking) => void;
  onError?: (error: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSuccess,
  onError
}) => {
  // 1. State declarations
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    time: '',
    address: '',
    observations: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Effects
  useEffect(() => {
    // fetch initial data if needed
  }, []);

  // 3. Handlers
  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post('/api/agendamentos', formData);
      onSuccess?.(response.data.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro desconhecido';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Render
  return (
    <form onSubmit={handleSubmit} className="booking-form">
      {error && <div className="error-message">{error}</div>}
      
      {/* form fields */}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Agendando...' : 'Agendar'}
      </button>
    </form>
  );
};
```

---

## 7. Decisões de Segurança

### 7.1 Autenticação

- **OAuth apenas** (nenhuma senha local)
- **JWT tokens** com expiration de 30 dias
- **HttpOnly cookies** (se usado, previne XSS)
- **CORS whitelist** (apenas frontend domain)

### 7.2 Autorização

- **Role-based access control (RBAC)**
  - `client`: pode criar/ver seus próprios agendamentos
  - `admin`: pode ver/atualizar qualquer agendamento
- **Middleware de autenticação** em todo endpoint protegido
- **Middleware de admin** para endpoints sensíveis

### 7.3 Database

- **Constraints** no database (unique date+time, foreign keys)
- **Prepared statements** (Prisma garante isso)
- **No SQL injection** (Prisma types)

### 7.4 API

- **HTTPS only** em produção (não HTTP)
- **Rate limiting** (futuro, se necessário)
- **Input validation** em servidor (nunca confiar no cliente)
- **CORS headers** apropriados

---

## 8. Próximos Passos

- Leia [`SETUP.md`](./SETUP.md) para configurar ambiente local
- Leia [`DEVELOPMENT.md`](./DEVELOPMENT.md) para workflow diário
- Veja [`backend/API.md`](../backend/API.md) para endpoints detalhados
- Veja [`backend/DATABASE.md`](../backend/DATABASE.md) para schema do banco

---

## Referências

- **Prisma Schema Docs:** https://www.prisma.io/docs/concepts/components/prisma-schema
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/
- **Vite Docs:** https://vitejs.dev/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **JWT Introduction:** https://jwt.io/introduction

