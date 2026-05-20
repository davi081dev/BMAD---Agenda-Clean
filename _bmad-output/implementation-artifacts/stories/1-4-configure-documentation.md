---
storyId: '1.4'
storyKey: '1-4-configure-documentation'
epicId: '1'
epicName: 'Foundation & Setup'
storyTitle: 'Configure Project Documentation'
storyStatus: 'backlog'
estimatedEffort: '3-4 horas'
priority: 'high'
dependencies:
  - '1-3-setup-database'
createdAt: '13 de maio de 2026'
author: 'Davi'
language: 'pt-br'
---

# Story 1.4: Configure Project Documentation

**Sequência:** Epic 1 - Foundation & Setup → Depende de Story 1.3 (Setup Database)  
**Estimativa:** 3-4 horas  
**Status:** Backlog  
**Prioridade:** Alta

---

## Contexto

Este é o quarto passo na implementação do **agenda-clean**, um sistema de agendamento de limpeza de sofás. As stories anteriores estabeleceram a infraestrutura técnica:
- ✅ **1.1:** Frontend setup (Vite + React + Tailwind)
- ✅ **1.2:** Backend setup (Node.js + Express + TypeScript)
- ✅ **1.3:** Database setup (Prisma + PostgreSQL)
- 🔄 **1.4:** Project Documentation ← **VOCÊ ESTÁ AQUI**

A Story 1.4 documenta a arquitetura do projeto, guias de setup local, padrões de desenvolvimento e contribuição. Esta documentação é **crítica** para onboarding eficiente, manutenção futura e comunicação clara da solução técnica com stakeholders.

Referências:
- **PRD:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/prd.md](prd.md)
- **Arquitetura:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/architecture.md](architecture.md)
- **Epics & Stories:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/epics-and-stories.md](epics-and-stories.md)

---

## User Story Statement

**Como** desenvolvedor ou novo membro da equipe,  
**Quero** documentação completa e clara sobre a arquitetura do projeto, setup local, padrões de desenvolvimento e contribuição,  
**Para que** eu consiga onboardar rapidamente, entender decisões arquiteturais e contribuir seguindo os padrões estabelecidos.

---

## Objetivos da Story

1. **Criar documentação de setup local** com instruções claras para environment, banco de dados e servidores
2. **Documentar a arquitetura** explicando decisões técnicas, estrutura de pastas e fluxos principais
3. **Documentar endpoints da API** com exemplos de requisição/resposta
4. **Documentar o schema do database** com relacionamentos e constraints
5. **Criar guia de contribuição** com padrões de code, commits e pull requests
6. **Criar guia de workflow de desenvolvimento** com processos para features, bugfixes e deployment
7. **Garantir documentação está atualizada** com a implementação de Stories 1.1-1.3

---

## Acceptance Criteria

### AC1: SETUP.md - Instruções de Setup Local

**Dado** que sou um novo desenvolvedor no projeto  
**Quando** eu leio o arquivo `SETUP.md` na raiz do projeto  
**Então** ele contém as seguintes seções:

#### 1.1 Pré-requisitos
- ✅ Node.js versão recomendada (ex: v18.x LTS)
- ✅ npm versão recomendada (ex: v9.x)
- ✅ PostgreSQL versão recomendada (ex: v14+) ou Supabase free tier alternativa
- ✅ Git configurado
- ✅ Editor recomendado: VS Code com extensões sugeridas (Prettier, ESLint, Tailwind CSS IntelliSense)

#### 1.2 Instalação Local (Step-by-Step)
- ✅ Clone do repositório: `git clone ...`
- ✅ Instalação de dependências: `npm install`
- ✅ Configuração de variáveis de ambiente (instruções para copiar `.env.template` para `.env.local`)
- ✅ Setup do banco de dados:
  - Opção A: PostgreSQL local (`createdb agenda-clean-dev`)
  - Opção B: Supabase (com link de free tier)
- ✅ Execução de migrações: `npm run db:migrate`
- ✅ (Opcional) Seed data para testes: `npm run db:seed`

#### 1.3 Executando os Servidores de Desenvolvimento
- ✅ Iniciar frontend: `cd frontend && npm run dev`
- ✅ Iniciar backend: `cd backend && npm run dev`
- ✅ Prisma Studio (visualização do DB): `npx prisma studio`
- ✅ URLs dos servidores:
  - Frontend: `http://localhost:5173`
  - Backend API: `http://localhost:3000`
  - Prisma Studio: `http://localhost:5555`

#### 1.4 Troubleshooting Comum
- ✅ Problemas de instalação de dependências (cache limpo, etc)
- ✅ Conexão ao database (DATABASE_URL incorreta, PostgreSQL não rodando)
- ✅ Variáveis de ambiente faltando
- ✅ Porta já em uso (como matar processos)

#### 1.5 Verificação de Setup Correto
- ✅ Checklist visual de como saber que tudo está funcionando:
  - Frontend carrega em localhost:5173
  - Backend API responde em localhost:3000/health
  - Banco de dados está conectado e migrações rodaram
  - Seed data foi inserido (verificar no Prisma Studio)

---

### AC2: ARCHITECTURE.md - Visão Geral da Arquitetura

**Dado** que sou um desenvolvedor que precisa entender as decisões arquiteturais  
**Quando** eu leio o arquivo `ARCHITECTURE.md`  
**Então** ele contém as seguintes seções:

#### 2.1 Visão Geral (High-Level Diagram)
- ✅ Diagrama da arquitetura: Frontend (Vite+React) ↔ Backend (Express) ↔ Database (PostgreSQL)
- ✅ Fluxo de autenticação: User → Google OAuth → Backend → JWT Token
- ✅ Fluxo de agendamento: Form → Validation → API → Database → Email Notification
- ✅ Descrição de 3-4 linhas para cada componente

#### 2.2 Stack Técnico
- ✅ **Frontend:**
  - Vite (build tool, port 5173)
  - React (UI library, functional components)
  - TypeScript (type safety)
  - Tailwind CSS (styling)
  - axios (HTTP client)
- ✅ **Backend:**
  - Node.js + Express (REST API)
  - TypeScript (type safety)
  - Prisma ORM (database access)
  - Passport.js (OAuth authentication)
  - SendGrid (email service)
- ✅ **Database:**
  - PostgreSQL (production) / Supabase (free tier)
  - Prisma (migrations & ORM)

#### 2.3 Estrutura de Pastas

**Frontend (`frontend/src/`):**
```
frontend/src/
├── components/        # Componentes reutilizáveis (Button, Form, etc)
├── pages/            # Páginas/rotas (Login, Dashboard, Booking, etc)
├── services/         # API client (axios instances, endpoints)
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces e tipos
├── styles/           # CSS global e utilities
└── utils/            # Funções utilitárias
```

**Backend (`backend/src/`):**
```
backend/src/
├── routes/           # Express routes (auth, agendamentos, admin)
├── controllers/      # Route handlers e lógica de requisição
├── services/         # Business logic (Prisma queries, SendGrid)
├── middleware/       # Auth, error handling, validation
├── types/            # TypeScript interfaces (User, Agendamento, etc)
├── utils/            # Helpers (JWT, date formatting)
├── config/           # Environment config, constants
└── index.ts/server.ts # Aplicação main
```

**Database (`backend/prisma/`):**
```
backend/prisma/
├── schema.prisma     # Schema definition (User, Agendamento)
├── seed.ts           # Seed script para testes
└── migrations/       # Migration files (auto-generated)
```

#### 2.4 Decisões Arquiteturais Chave

- ✅ **Por que Vite ao invés de CRA?** → Faster HMR, modern bundler, faster builds
- ✅ **Por que Express ao invés de NestJS?** → Simpler learning curve, adequate for MVP, less boilerplate
- ✅ **Por que PostgreSQL ao invés de MongoDB?** → Relational data, constraints (unique date+time), ACID transactions
- ✅ **Por que Prisma ao invés de Raw SQL?** → Type-safe queries, migrations management, no ORMs learning curve
- ✅ **Por que Google OAuth?** → Zero friction signup, no password management, trusted by users

#### 2.5 Fluxos Principais

**Autenticação:**
1. User clica "Entrar com Google"
2. Frontend redireciona para `GET /auth/google` (backend)
3. Backend redireciona para Google OAuth consent screen
4. User autoriza
5. Google redireciona para `GET /auth/google/callback` com code
6. Backend troca code por access token e profile
7. Backend cria ou recupera user no database
8. Backend gera JWT token
9. Backend set cookie com JWT
10. Frontend redirecionado para dashboard

**Agendamento:**
1. Client preenche form (endereço, data, horário, observações)
2. Frontend valida dados localmente
3. Frontend faz `POST /api/agendamentos` com dados
4. Backend valida dados, verifica conflito (unique constraint)
5. Backend insere no database com status 'solicitado'
6. Backend retorna agendamento criado
7. Frontend mostra confirmação com detalhes
8. (Posterior) Admin recebe notificação e confirma via painel

#### 2.6 Padrões de Código

**Naming Conventions:**
- **Variáveis/funções:** camelCase (ex: `getUserById`, `currentUser`)
- **Componentes React:** PascalCase (ex: `BookingForm`, `AdminDashboard`)
- **Tipos/Interfaces:** PascalCase (ex: `User`, `Agendamento`)
- **Arquivos:** kebab-case para componentes (ex: `booking-form.tsx`), camelCase para funções (ex: `userService.ts`)

**TypeScript:**
- Sempre tipifique variáveis, parâmetros e retornos
- Use `interface` para tipos públicos, `type` para aliases privados
- Evite `any` - use `unknown` se necessário e faça type guards
- Exemplo:
  ```typescript
  interface User {
    id: string;
    email: string;
    role: 'client' | 'admin';
  }
  ```

**Error Handling:**
- Backend sempre retorna status HTTP apropriado (200, 400, 401, 403, 500)
- Mensagens de erro são em português (para frontend exibir)
- Frontend trata erros de rede graciosamente (fallback messages)

**API Responses:**
- Success: `{ success: true, data: {...} }`
- Error: `{ success: false, error: "Mensagem de erro em português" }`

---

### AC3: API.md - Documentação de Endpoints

**Dado** que sou desenvolvedor frontend ou testador  
**Quando** eu leio o arquivo `API.md`  
**Então** ele documenta todos os endpoints com:

#### 3.1 Autenticação

**POST /auth/google**
- Descrição: Inicia fluxo de Google OAuth
- Parâmetros: nenhum
- Resposta: Redirecionamento para Google consent screen

**GET /auth/google/callback?code=XXX&state=YYY**
- Descrição: Callback do Google OAuth (não chame manualmente)
- Parâmetros: code (do Google), state (CSRF token)
- Resposta: Redirecionamento para `/client/dashboard` com cookie de JWT

**POST /auth/logout**
- Descrição: Logout do usuário
- Headers: `Authorization: Bearer <JWT token>`
- Resposta: `{ success: true }`

**GET /auth/me**
- Descrição: Retorna dados do usuário logado
- Headers: `Authorization: Bearer <JWT token>`
- Resposta: `{ success: true, data: { id, email, name, role } }`

#### 3.2 Agendamentos (Client)

**GET /api/agendamentos/availability?date=YYYY-MM-DD**
- Descrição: Retorna horários disponíveis para uma data
- Parâmetros: date (query string, formato YYYY-MM-DD)
- Headers: `Authorization: Bearer <JWT token>`
- Resposta: `{ success: true, data: { slots: ["09:00", "10:00", "14:00", ...] } }`
- Exemplo:
  ```bash
  curl -H "Authorization: Bearer token..." \
    "http://localhost:3000/api/agendamentos/availability?date=2026-05-22"
  ```

**POST /api/agendamentos**
- Descrição: Criar novo agendamento
- Headers: `Authorization: Bearer <JWT token>`, `Content-Type: application/json`
- Body:
  ```json
  {
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo",
    "observations": "Sofá grande"
  }
  ```
- Resposta (201):
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-123",
      "date": "2026-05-22",
      "time": "14:30",
      "address": "Rua das Flores, 123, São Paulo",
      "observations": "Sofá grande",
      "status": "solicitado",
      "createdAt": "2026-05-13T14:30:00Z"
    }
  }
  ```

**GET /api/agendamentos**
- Descrição: Lista todos os agendamentos do usuário logado
- Headers: `Authorization: Bearer <JWT token>`
- Resposta (200):
  ```json
  {
    "success": true,
    "data": [
      { "id": "uuid-1", "date": "2026-05-22", "time": "14:30", "status": "solicitado", ... },
      { "id": "uuid-2", "date": "2026-05-25", "time": "10:00", "status": "confirmado", ... }
    ]
  }
  ```

**GET /api/agendamentos/:id**
- Descrição: Retorna detalhes de um agendamento específico
- Headers: `Authorization: Bearer <JWT token>`
- Parâmetros: id (path param, UUID do agendamento)
- Resposta (200): Objeto agendamento completo
- Erro (404): Se agendamento não encontrado
- Erro (403): Se agendamento não pertence ao usuário logado

#### 3.3 Agendamentos (Admin)

**GET /api/admin/agendamentos**
- Descrição: Lista TODOS os agendamentos (apenas admin)
- Headers: `Authorization: Bearer <JWT token>` (admin role required)
- Query params (opcionais):
  - `status`: Filtrar por status (solicitado, confirmado, etc)
  - `dateFrom`: Filtrar agendamentos >= data (YYYY-MM-DD)
  - `dateTo`: Filtrar agendamentos <= data (YYYY-MM-DD)
  - `clientEmail`: Filtrar por email do cliente
- Resposta (200): Lista de todos os agendamentos

**PATCH /api/admin/agendamentos/:id/status**
- Descrição: Atualizar status de um agendamento (apenas admin)
- Headers: `Authorization: Bearer <JWT token>` (admin role required)
- Body: `{ "status": "confirmado" }` (ou outro status válido)
- Resposta (200): Agendamento atualizado com novo status
- Efeito colateral: Se status = "confirmado", envia email para cliente

---

### AC4: DATABASE.md - Documentação do Schema

**Dado** que sou desenvolvedor trabalhando com dados  
**Quando** eu leio o arquivo `DATABASE.md`  
**Então** ele contém as seguintes seções:

#### 4.1 Diagrama ER (Entity-Relationship)
- ✅ Diagrama visual mostrando User ←→ Agendamento relacionamento
- ✅ Cardinalidade: User (1) → (many) Agendamento

#### 4.2 Tabela User
- ✅ Descrição: Armazena usuários (clientes e admins)
- ✅ Campos com tipos e constraints:
  - `id` (UUID, PRIMARY KEY)
  - `email` (VARCHAR(255), UNIQUE NOT NULL)
  - `googleId` (VARCHAR(255), UNIQUE NOT NULL)
  - `name` (VARCHAR(255) NOT NULL)
  - `role` (ENUM: 'client' | 'admin', DEFAULT 'client')
  - `createdAt` (TIMESTAMP, DEFAULT now())
  - `updatedAt` (TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP)
- ✅ Índices:
  - `idx_user_googleId`: Para rápidas buscas por Google OAuth
  - `idx_user_email`: Para rápidas buscas por email (login)

#### 4.3 Tabela Agendamento
- ✅ Descrição: Armazena agendamentos de limpeza
- ✅ Campos com tipos e constraints:
  - `id` (UUID, PRIMARY KEY)
  - `userId` (UUID, FOREIGN KEY → User.id, NOT NULL, ON DELETE CASCADE)
  - `date` (DATE NOT NULL)
  - `time` (VARCHAR(5) NOT NULL, formato HH:MM)
  - `address` (TEXT NOT NULL)
  - `observations` (TEXT, nullable)
  - `status` (ENUM: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado', DEFAULT 'solicitado')
  - `createdAt` (TIMESTAMP, DEFAULT now())
  - `updatedAt` (TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP)
- ✅ Unique Constraint: `UNIQUE(date, time)` com validação em aplicação para excluir cancelados
- ✅ Índices:
  - `idx_agendamento_userId`: Para listar agendamentos por usuário
  - `idx_agendamento_date`: Para queries de disponibilidade por data
  - `idx_agendamento_status`: Para filtros por status

#### 4.4 Query Exemplos Comuns
- ✅ "Buscar agendamentos do cliente X":
  ```sql
  SELECT * FROM Agendamento WHERE userId = 'user-uuid' ORDER BY date DESC;
  ```
- ✅ "Buscar horários livres em uma data":
  ```sql
  SELECT DISTINCT time FROM Agendamento 
  WHERE date = '2026-05-22' AND status != 'cancelado';
  ```
- ✅ "Buscar agendamentos pendentes (solicitado)":
  ```sql
  SELECT * FROM Agendamento WHERE status = 'solicitado' ORDER BY date ASC;
  ```

#### 4.5 Constraints & Integridade
- ✅ Foreign Key cascading: Deletar user deleta seus agendamentos automaticamente
- ✅ Unique constraint date+time previne double-bookings
- ✅ All timestamps são in UTC (Z)

---

### AC5: CONTRIBUTING.md - Guia de Contribuição

**Dado** que sou desenvolvedor querendo contribuir para o projeto  
**Quando** eu leio o arquivo `CONTRIBUTING.md`  
**Então** ele contém as seguintes seções:

#### 5.1 Getting Started
- ✅ Link para SETUP.md para ambiente local
- ✅ Como escolher uma task/story para trabalhar
- ✅ Como informar que vai trabalhar em algo (evitar duplicação)

#### 5.2 Processo de Desenvolvimento

**Para uma nova feature:**
1. Selecione uma story do board (ex: "1-4-configure-documentation")
2. Crie branch: `git checkout -b feature/1-4-configure-documentation`
3. Faça commits pequenos e atômicos com mensagens descritivas
4. Siga code style (vide seção 5.4)
5. Teste localmente (testes unitários + verificação manual)
6. Crie Pull Request com descrição clara das mudanças
7. Aguarde code review
8. Merge após aprovação

**Para bugfix:**
1. Crie issue descrevendo o bug
2. Crie branch: `git checkout -b bugfix/descricao-do-bug`
3. Implemente fix com testes que reproduzem o bug
4. Crie PR, aguarde review

#### 5.3 Commits & Mensagens

- ✅ Mensagens em inglês (padrão da indústria)
- ✅ Formato: `[TIPO] Descrição breve (max 50 chars)`
- ✅ Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- ✅ Exemplos:
  ```
  feat: Add booking form validation
  fix: Prevent double-booking race condition
  docs: Update API.md with new endpoint
  test: Add unit tests for availability check
  ```
- ✅ Commits devem ser lógicos e testáveis individualmente

#### 5.4 Code Style & Linting

- ✅ Executar `npm run lint` antes de commitar
- ✅ Use Prettier para formatação: `npm run format`
- ✅ Configuração: `.prettierrc`, `.eslintrc`
- ✅ TypeScript strict mode deve passar sem erros
- ✅ Nenhum `// eslint-disable` sem justificativa

#### 5.5 Testes

- ✅ Componentes React: usar Jest + React Testing Library
- ✅ Backend: usar Jest para testes unitários e integração
- ✅ Cobertura mínima: 70% de coverage
- ✅ Comando: `npm run test`
- ✅ Watch mode: `npm run test:watch`

#### 5.6 Pull Request Checklist

Antes de submeter PR, certifique-se que:
- ✅ Branch está atualizado com `main` (rebase se necessário)
- ✅ `npm run lint` passa sem erros
- ✅ `npm run test` passes com cobertura ≥ 70%
- ✅ Código está formatado com Prettier
- ✅ Descrição do PR é clara e linkada à story
- ✅ Mudanças no database foram feitas via migrations
- ✅ Documentação foi atualizada (se necessário)

#### 5.7 Code Review Feedback

- ✅ Responda comments construtivamente
- ✅ Marque comentários como "Resolvido" uma vez que fez mudança
- ✅ Peça re-review após fazer ajustes solicitados
- ✅ Lembre-se: review é sobre código, não pessoa

---

### AC6: DEVELOPMENT.md - Workflow de Desenvolvimento

**Dado** que sou desenvolvedor trabalhando no projeto diariamente  
**Quando** eu leio o arquivo `DEVELOPMENT.md`  
**Então** ele contém as seguintes seções:

#### 6.1 Daily Development Setup

- ✅ Verificação de checkout para branch correta
- ✅ `npm run dev` para iniciar ambos frontend e backend (ou separado se preferir)
- ✅ Verificação de que todas as dependências estão instaladas
- ✅ Verificação de database conectado
- ✅ Limpar cache se comportamento estranho: `npm run clean`

#### 6.2 Development Server URLs

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:5173 | Aplicação React |
| Backend API | http://localhost:3000 | Express API |
| Prisma Studio | http://localhost:5555 | Database GUI |
| Backend Logs | Terminal da pasta `backend` | Logs de Express |

#### 6.3 Common Development Tasks

**Adicionar uma nova rota backend:**
1. Arquivo: `backend/src/routes/novaRota.ts`
2. Criar handler em `backend/src/controllers/`
3. Registrar rota em `backend/src/server.ts`
4. Testar com `curl` ou Postman

**Adicionar um novo componente frontend:**
1. Arquivo: `frontend/src/components/MeuComponente.tsx`
2. Criar tipos em `frontend/src/types/` se necessário
3. Importar em página/componente pai
4. Testar no browser (HMR deveria recarregar automaticamente)

**Adicionar campo ao database:**
1. Editar `backend/prisma/schema.prisma` (adicionar campo)
2. Executar `npx prisma migrate dev --name descricao_mudanca`
3. Prisma auto-gera tipos
4. Usar novo campo em queries backend
5. Atualizar API responses no controller
6. Frontend consome novo campo em hooks/services

**Debugar problema no backend:**
1. Adicione `console.log()` ou use debugger
2. Node.js VSCode integration: em terminal, conecte debugger
3. Use Prisma Studio para inspecionar DB state
4. Verifique logs em terminal do backend

#### 6.4 Database Migrations

- ✅ Nunca edite arquivo migration direto - sempre use `schema.prisma`
- ✅ Para atualizar schema:
  ```bash
  cd backend
  npx prisma migrate dev --name nome_da_mudanca
  ```
- ✅ Para resetar DB em dev (CUIDADO - deleta tudo):
  ```bash
  npx prisma migrate reset
  ```
- ✅ Para verificar status das migrações:
  ```bash
  npx prisma migrate status
  ```

#### 6.5 Testing Locally

**Frontend Testing:**
- ✅ Testes unitários: `cd frontend && npm run test`
- ✅ Watch mode: `npm run test:watch`
- ✅ Coverage: `npm run test:coverage`

**Backend Testing:**
- ✅ Testes unitários: `cd backend && npm run test`
- ✅ Testes integração (com DB real): `npm run test:integration`
- ✅ Watch mode: `npm run test:watch`

**Manual Testing:**
- ✅ Teste fluxo completo: login → booking → admin confirm
- ✅ Teste validações (dados inválidos, conflitos)
- ✅ Teste em múltiplos browsers/devices
- ✅ Teste com rede lenta (DevTools throttling)

#### 6.6 Debugging Checklist

Quando algo não funciona:
- ✅ Verificar console.log/logs no terminal do servidor
- ✅ Verificar DevTools do browser (Network, Console)
- ✅ Verificar status do banco de dados (Prisma Studio)
- ✅ Verificar variáveis de ambiente (`.env.local` existe?)
- ✅ Tentar limpar cache: `npm run clean`
- ✅ Tentar restart do servidor: `Ctrl+C` e `npm run dev` novamente

#### 6.7 Deployment Preview

**Para Produção:**
- ✅ Frontend: Deploy automático em Vercel (via GitHub)
- ✅ Backend: Deploy manual em Render
- ✅ Database: Supabase (produção) vs Supabase free tier (staging)
- ✅ Secrets: Usar variáveis de ambiente em cada plataforma
- ✅ Monitoramento: Verificar logs em Vercel e Render dashboards

---

### AC7: Documentação Pronta para Usar

**Dado** que a documentação foi criada  
**Quando** eu navego pela pasta do projeto  
**Então** os seguintes arquivos existem e estão linkados:

**Raiz do projeto:**
- ✅ `README.md` (overview do projeto + links para outras docs)
- ✅ `SETUP.md` (setup local)
- ✅ `ARCHITECTURE.md` (arquitetura detalhada)
- ✅ `CONTRIBUTING.md` (guia de contribuição)
- ✅ `DEVELOPMENT.md` (workflow diário)

**Backend:**
- ✅ `backend/API.md` (documentação de endpoints REST)
- ✅ `backend/DATABASE.md` (schema e queries)
- ✅ `backend/README.md` (backend-specific info, referencia arquivo root)

**Frontend:**
- ✅ `frontend/README.md` (frontend-specific info, refere arquivo root)

**Cross-referencing:**
- ✅ README.md linkado para SETUP.md, ARCHITECTURE.md, CONTRIBUTING.md, DEVELOPMENT.md
- ✅ SETUP.md referencia API.md e DATABASE.md
- ✅ ARCHITECTURE.md referencia estrutura de pastas
- ✅ Cada arquivo começa com "Para contexto do projeto, veja SETUP.md"

---

### AC8: Padrão de Documentação Estabelecido

**Dado** que documentação foi criada  
**Quando** futuras stories precisam ser documentadas  
**Então** o seguinte padrão é estabelecido:

- ✅ **Linguagem:** Português (Brasil) para conteúdo, código samples em inglês
- ✅ **Estrutura:** Títulos markdown (H2, H3), listas com ✅, exemplos com syntax highlighting
- ✅ **Tabelas:** Usar markdown tables para comparações, endpoints, campos
- ✅ **Código:** Blocos com language tag:
  ```typescript
  // código aqui
  ```
  ```bash
  # bash aqui
  ```
  ```sql
  -- sql aqui
  ```
- ✅ **Links:** Relativos para outros arquivos de doc, absolutos para URLs externas
- ✅ **Diagrama (opcional):** ASCII art ou descrição textual clara se não houver imagem
- ✅ **Atualizações:** Manter documentação sincronizada com código (atualizar em mesma PR)

---

### AC9: Documentação Validada Contra Implementação

**Dado** que documentação foi criada para Stories 1.1-1.3  
**Quando** eu comparo documentação com arquivos de projeto existentes  
**Então** tudo está correto:

- ✅ Estrutura de pastas em `ARCHITECTURE.md` existe e corresponde ao projeto real
- ✅ Scripts em `SETUP.md` existem em `package.json`
- ✅ URLs dos servidores (5173, 3000, 5555) estão corretas em `vite.config.js`, `server.ts`
- ✅ Campos em `DATABASE.md` correspondem ao `schema.prisma` atual
- ✅ Tipos em `API.md` correspondem aos controllers backend

---

## Implementation Notes

### Considerações Técnicas

1. **Markdown Rendering:** Documentação pode ser visualizada em:
   - GitHub (via browser)
   - VS Code (com extensão Markdown Preview)
   - Localmente em qualquer editor
   
2. **Manutenção:** Documentação deve ser atualizada **durante** desenvolvimento das stories, não depois. Ideal praticar "documentation-driven development".

3. **Diagramas:** ASCII art é suficiente para MVP. Considerar Mermaid.js ou diagrams.net para futuro se crescer complexidade.

4. **Versionamento:** Arquivos de doc não seguem semântica de versão (não são código). Atualizar com commits normais.

### Links Importantes

- **PRD Completo:** Veja [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/prd.md](prd.md) para requisitos completos
- **Arquitetura Técnica Anterior:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/architecture.md](architecture.md)
- **Sprint Plan:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/implementation-artifacts/sprint-plan.md](sprint-plan.md)
- **Epics & Stories:** [/home/davi/Documentos/Projetos/agenda-clean/_bmad-output/planning-artifacts/epics-and-stories.md](epics-and-stories.md)

---

## Definition of Done

Esta story é considerada **CONCLUÍDA** quando todos os critérios de aceitação foram atendidos E:

✅ Todos os 6 arquivos de documentação existem na raiz/pastas apropriadas  
✅ Documentação está sincronizada com implementação real (Stories 1.1-1.3)  
✅ Todos os links internos funcionam e apontam para arquivos corretos  
✅ Instruções de setup foram testadas e funcionam (por outro dev)  
✅ Code samples nos arquivos de doc foram testados e rodam sem erros  
✅ Padrão de documentação está claro e pronto para reutilização em futuras stories

---

## Estimativa de Esforço

| Tarefa | Tempo | Notas |
|--------|-------|-------|
| SETUP.md | 45 min | Setup local + troubleshooting |
| ARCHITECTURE.md | 60 min | Análise estrutura, diagramas, decisões |
| API.md | 45 min | Documentação endpoints |
| DATABASE.md | 30 min | Schema, diagramas ER, queries |
| CONTRIBUTING.md | 30 min | Processo, commits, PR checklist |
| DEVELOPMENT.md | 30 min | Daily tasks, debugging, deployment |
| Review & QA | 30 min | Validar contra código real, testar links |
| **TOTAL** | **3-4 horas** | Solo developer |

---

## Notas do Desenvolvedor

- Esta story prepara o terreno para onboarding rápido de novos desenvolvedores
- Documentação clara reduz suporte futuro (menos perguntas "como eu faço X?")
- Ao revisar anteriores stories (1.1-1.3), incorpore aprendizados nas seções apropriadas
- Considere screenshots/GIFs para SETUP.md se tiver tempo, mas não é crítico para MVP
