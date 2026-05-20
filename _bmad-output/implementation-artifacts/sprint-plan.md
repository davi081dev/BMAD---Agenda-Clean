# Sprint Planning - agenda-clean

**Data:** 13 de maio de 2026  
**Projeto:** agenda-clean - Sistema de Agendamento de Limpeza de Sofá  
**Status:** Planejamento Completo - Pronto para Implementação  
**Duração Estimada:** 4 semanas (68 horas)

---

## 1. RESUMO EXECUTIVO

O projeto **agenda-clean** foi decomposto em **5 epics** contendo **28 stories** que cobrem 100% dos requisitos funcionais, não-funcionais e de design UX. O plano de sprint organiza o trabalho em uma sequência lógica que habilita desenvolvimento paralelo após as dependências críticas.

### Métricas-Chave

| Métrica | Valor |
|---------|-------|
| **Total de Epics** | 5 |
| **Total de Stories** | 28 |
| **Esforço Estimado** | 68 horas |
| **Timeline Estimada** | 4 semanas (solo developer) |
| **FRs Cobertos** | 38/38 (100%) |
| **NFRs Cobertos** | 20/20 (100%) |
| **Requisitos UX Cobertos** | 32/32 (100%) |

---

## 2. ESTRUTURA DE EPICS

### Epic 1: Foundation & Setup
**Objetivo:** Inicializar o projeto dual-starter, configurar banco de dados e infraestrutura  
**Esforço:** 16 horas  
**Sprint:** 0 (Semana 1)  
**Status:** Pronto para começar  
**Bloqueador:** Crítico - TODOS os outros epics dependem disso

**Stories:**
- 1.1: Initialize Frontend Project (Vite+React+Tailwind) - 2h
- 1.2: Initialize Backend Project (Node.js+Express+TypeScript) - 2h
- 1.3: Database Schema & Prisma Setup - 3h
- 1.4: Environment Configuration & Secrets Management - 1h
- 1.5: Project Documentation & Architecture README - 1h

---

### Epic 2: Authentication & User Management
**Objetivo:** Implementar Google OAuth, criação automática de contas e controle de acesso  
**Esforço:** 12 horas  
**Sprint:** 1 (Semana 1-2)  
**Status:** Pronto quando Epic 1 completar  
**Bloqueador:** Crítico - BLOQUEADOR para Epics 3 e 4

**Stories:**
- 2.1: Google OAuth Setup & Passport.js Integration - 2h
- 2.2: Automatic User Account Creation on First Login - 2h
- 2.3: Admin Role Pre-configuration - 1h
- 2.4: JWT Session Tokens & Session Management - 2h
- 2.5: Protected Route Middleware & Authorization - 2h
- 2.6: Login Page & Google OAuth Button (Frontend) - 2h

---

### Epic 3: Client Booking Experience
**Objetivo:** Construir fluxo completo de agendamento para clientes (Ana)  
**Esforço:** 16 horas  
**Sprint:** 2 (Semana 2-3)  
**Status:** Pode executar em paralelo com Epic 4 após Epic 2  
**Bloqueador:** Depende de Epic 2 (Autenticação)

**Stories:**
- 3.1: Booking Form Component (Address, Date, Time, Notes) - 3h
- 3.2: Real-Time Availability Validation - 3h
- 3.3: Booking Confirmation & Success Message - 2h
- 3.4: Client Booking History View - 3h
- 3.5: Booking Detail View - 2h
- 3.6: Client Dashboard Home Page - 1h

**Proposta de Valor:** Clientes conseguem agendar em <2 minutos sem fricção

---

### Epic 4: Admin Management Dashboard
**Objetivo:** Construir painel centralizado para admin gerenciar todos os agendamentos  
**Esforço:** 14 horas  
**Sprint:** 3 (Semana 3, paralelo com Sprint 2)  
**Status:** Pode executar em paralelo com Epic 3 após Epic 2  
**Bloqueador:** Depende de Epic 2 (Autenticação)

**Stories:**
- 4.1: Admin Dashboard Layout & Navigation - 2h
- 4.2: Agendamentos List View (All Clients) - 3h
- 4.3: Filter & Search Agendamentos - 2h
- 4.4: Status Update UI (Inline Actions) - 2h
- 4.5: Agendamento Detail Modal/View - 2h
- 4.6: Real-Time Availability Display - 2h

**Proposta de Valor:** Admin gerencia TODOS os agendamentos de um único painel, zero WhatsApp

---

### Epic 5: Email Notifications & System Integration
**Objetivo:** Implementar notificações por email confiáveis, prevenção de conflitos e deploy para produção  
**Esforço:** 10 horas  
**Sprint:** 4 (Semana 4)  
**Status:** Inicia quando Epics 3 e 4 estão 80% completos  
**Bloqueador:** Final antes do lançamento MVP

**Stories:**
- 5.1: SendGrid Integration & Email Service Setup - 1h
- 5.2: Booking Confirmation Email Template - 1h
- 5.3: Conflict Prevention at Database Level - 1h
- 5.4: Email Notification on Status Changes - 2h
- 5.5: Error Handling & Reliability - 2h
- 5.6: Frontend & Backend Deployment - 2h
- 5.7: System Testing & QA - 1h

**Proposta de Valor:** Clientes recebem confirmações por email (prova tangível), sistema está pronto para produção

---

## 3. MAPA DE DEPENDÊNCIAS

```
Epic 1: Foundation & Setup (16h) [SEMANA 1]
    │
    ├─> Vite + React + Tailwind (Frontend)
    ├─> Node.js + Express (Backend)  
    ├─> PostgreSQL + Prisma
    └─> Environment & Config
         │
         └─> Epic 2: Authentication & User Management (12h) [SEMANA 1-2] ◄─── BLOQUEADOR
              │
              ├─> Google OAuth + Passport.js
              ├─> Auto User Creation
              ├─> JWT Sessions
              ├─> Role-based Authorization
              └─> Login Page
                   │
                   ├─> Epic 3: Client Booking (16h) [SEMANA 2-3] ◄─── Pode executar PARALELO
                   │    ├─> Booking Form
                   │    ├─> Availability Validation
                   │    ├─> Confirmation & Success
                   │    ├─> History View
                   │    └─> Dashboard
                   │
                   └─> Epic 4: Admin Dashboard (14h) [SEMANA 3] ◄─── Pode executar PARALELO
                        ├─> Dashboard Layout
                        ├─> List View (All Bookings)
                        ├─> Filters & Search
                        ├─> Status Update UI
                        └─> Detail View
                             │
                             └─> Epic 5: Email & Deploy (10h) [SEMANA 4]
                                  ├─> SendGrid Integration
                                  ├─> Email Templates
                                  ├─> Conflict Prevention
                                  ├─> Status Emails
                                  ├─> Error Handling
                                  ├─> Deployment (Vercel + Render + Supabase)
                                  └─> Testing & QA
```

---

## 4. TIMELINE & SEQUÊNCIA DE IMPLEMENTAÇÃO

### ⏰ SEMANA 1: Foundation & Setup (Epic 1)
**Esforço:** 16 horas  
**Objetivo:** Estabelecer fundação técnica para todo o desenvolvimento

**Sequência (Execute em Ordem):**

1. **Story 1.1:** Initialize Frontend Project (2h)
   - `npm create vite@latest agenda-clean-web -- --template react-ts`
   - Tailwind CSS + shadcn/ui
   - Entrega: Projeto Vite rodando em `localhost:5173`

2. **Story 1.2:** Initialize Backend Project (2h)
   - `npm init` + Express + TypeScript
   - nodemon para auto-reload
   - Entrega: Backend rodando em `localhost:3000`

3. **Story 1.3:** Database Schema & Prisma (3h)
   - Tabelas: User e Agendamento
   - Unique constraint on (date, time)
   - Entrega: `schema.prisma` completo, migrations funcionando

4. **Story 1.4:** Environment Configuration (1h)
   - `.env` template com variáveis
   - Validação de variáveis críticas
   - Entrega: `.env.local` pronto para Google OAuth + SendGrid keys

5. **Story 1.5:** Project Documentation (1h)
   - README com instruções de setup
   - Arquitetura do projeto
   - Entrega: `docs/ARCHITECTURE.md` completo

**Status Esperado ao Final da Semana 1:**
- ✅ Dual-starter projects initialized
- ✅ Database schema ready
- ✅ Local development environment working
- ✅ Epic 1: **DONE**
- ✅ Epic 2 (Auth) pode começar imediatamente

---

### ⏰ SEMANA 1-2: Authentication & User Management (Epic 2)
**Esforço:** 12 horas  
**Objetivo:** Habilitar login seguro e controle de acesso

**Sequência (Execute em Ordem):**

1. **Story 2.1:** Google OAuth Setup (2h)
   - Passport.js Google strategy
   - Callback handling
   - Entrega: Login via Google funciona

2. **Story 2.2:** Auto User Creation (2h)
   - User criado automaticamente no BD
   - googleId + email mapeados
   - Entrega: Primeiro login cria User record

3. **Story 2.3:** Admin Role Config (1h)
   - ADMIN_EMAILS environment variable
   - Role assignment on login
   - Entrega: Admin detectado automaticamente

4. **Story 2.4:** JWT Sessions (2h)
   - Token generation após OAuth
   - Token validation middleware
   - Entrega: Authenticated API calls work

5. **Story 2.5:** Protected Routes (2h)
   - Authorization middleware
   - Client vs Admin endpoints
   - Entrega: Unauthorized requests rejected

6. **Story 2.6:** Login Page UI (2h)
   - React component com Google button
   - Mobile-optimized
   - Entrega: Página de login funcional

**Status Esperado ao Final da Semana 2:**
- ✅ Google OAuth completamente implementado
- ✅ Sessions seguras com JWT
- ✅ Role-based access control
- ✅ Epic 2: **DONE**
- ✅ Epics 3 & 4 (Booking + Admin) pode começar AGORA (paralelo possível)

---

### ⏰ SEMANA 2-3: Client Booking Experience (Epic 3) & PARALELO COM SEMANA 3: Admin Dashboard (Epic 4)
**Esforço Combinado:** 30 horas (16h Epic 3 + 14h Epic 4)  
**Timeline:** Ambos podem rodar em paralelo durante semana 2-3

#### **OPÇÃO 1: Sequencial (Se solo developer quer focar em um por vez)**
- Semana 2: Epic 3 completo (16h)
- Semana 3: Epic 4 completo (14h)

#### **OPÇÃO 2: Paralelo (Recomendado para acelerar)**
- Semana 2-3: Sprint 2 (Epic 3 - Booking) + Sprint 3 (Epic 4 - Admin) lado-a-lado

---

### 📱 EPIC 3: Client Booking (Semana 2-3) - 16 horas

**Sequência:**

1. **Story 3.1:** Booking Form (3h)
   - React component com form
   - Address, Date, Time, Notes fields
   - Client-side validation
   - Entrega: Form renderiza corretamente

2. **Story 3.2:** Availability Validation (3h)
   - API endpoint para slots disponíveis
   - Real-time response <500ms
   - Entrega: Clientes veem slots disponíveis/indisponíveis

3. **Story 3.3:** Confirmation Message (2h)
   - Success page com ✓ checkmark
   - Detalhes do agendamento
   - Entrega: Feedback visual claro ao cliente

4. **Story 3.4:** History View (3h)
   - Lista de agendamentos do cliente
   - Status badges (coloridas)
   - Responsive layout
   - Entrega: Clientes veem todo seu histórico

5. **Story 3.5:** Detail View (2h)
   - Página de detalhes completa
   - Informações persistidas
   - Entrega: Clientes veem tudo sobre cada agendamento

6. **Story 3.6:** Dashboard Home (1h)
   - Homepage para cliente logado
   - Dois botões: "Novo Agendamento" e "Meus Agendamentos"
   - Entrega: Navegação clara

**Status Esperado ao Final da Semana 3:**
- ✅ Clientes conseguem agendar <2 minutos
- ✅ Validação de disponibilidade real-time
- ✅ Confirmação imediata na tela
- ✅ Histórico persistido
- ✅ Epic 3: **DONE**

---

### 👨‍💼 EPIC 4: Admin Dashboard (Semana 3) - 14 horas

**Sequência:**

1. **Story 4.1:** Dashboard Layout (2h)
   - Sidebar/Menu structure
   - Header com greeting
   - Responsive design
   - Entrega: Layout base funcionando

2. **Story 4.2:** List View (3h)
   - Tabela com todos os agendamentos
   - Colunas: Cliente, Data, Hora, Status
   - Sorting & pagination
   - Entrega: Admin vê TODOS os agendamentos

3. **Story 4.3:** Filter & Search (2h)
   - Search por nome do cliente
   - Filtros por status e data
   - Real-time filtering
   - Entrega: Admin encontra agendamentos rapidamente

4. **Story 4.4:** Status Update UI (2h)
   - Dropdown/buttons para mudar status
   - Estado transitions correto
   - Feedback visual
   - Entrega: Admin consegue confirmar agendamentos

5. **Story 4.5:** Detail Modal (2h)
   - Modal com informações completas
   - Status update disponível
   - Keyboard accessible
   - Entrega: Admin vê tudo sobre cada agendamento

6. **Story 4.6:** Availability Display (2h)
   - Calendar ou tabela mostrando slots
   - Disponíveis vs Booked
   - Entrega: Admin visualiza schedule

**Status Esperado ao Final da Semana 3:**
- ✅ Admin vê TODOS os agendamentos centralizados
- ✅ Sem necessidade de abrir WhatsApp
- ✅ Confirmação de agendamentos com 1 clique
- ✅ Zero double-bookings (validação em tempo real)
- ✅ Epic 4: **DONE**

---

### 📧 SEMANA 4: Email & Deployment (Epic 5)
**Esforço:** 10 horas  
**Objetivo:** Integrar email confiável e deploy para produção

**Sequência:**

1. **Story 5.1:** SendGrid Setup (1h)
   - npm package + API key
   - Email service module
   - Entrega: SendGrid integrado

2. **Story 5.2:** Email Template (1h)
   - HTML template profissional
   - Branding + booking details
   - Entrega: Template pronto

3. **Story 5.3:** Conflict Prevention DB (1h)
   - Unique constraint validação
   - Atomic operations
   - Entrega: Double-booking impossível

4. **Story 5.4:** Status Change Emails (2h)
   - Email dispara quando status = "confirmado"
   - Async sending (não bloqueia)
   - Retry logic
   - Entrega: Clientes recebem confirmações

5. **Story 5.5:** Error Handling (2h)
   - Try/catch em todas operações
   - User-friendly messages
   - Logging
   - Entrega: Sistema robusto

6. **Story 5.6:** Deployment (2h)
   - Frontend para Vercel
   - Backend para Render
   - Database Supabase
   - Environment variables
   - Entrega: Sistema em produção

7. **Story 5.7:** Testing & QA (1h)
   - End-to-end flow testing
   - Mobile testing
   - Conflict testing
   - Entrega: MVP validado

**Status Esperado ao Final da Semana 4:**
- ✅ Emails confiáveis enviando
- ✅ Sistema em produção (Vercel + Render + Supabase)
- ✅ Zero conflitos de agendamento
- ✅ Todos os FRs/NFRs implementados
- ✅ Epic 5: **DONE**
- ✅ **MVP LAUNCH READY** 🚀

---

## 5. ESTIMATIVAS DE ESFORÇO

### Por Epic (em horas)

| Epic | Stories | Esforço | % do Total | Sprint |
|------|---------|---------|-----------|--------|
| **1: Foundation** | 5 | 16 | 23.5% | Sprint 0 (Semana 1) |
| **2: Authentication** | 6 | 12 | 17.6% | Sprint 1 (Semana 1-2) |
| **3: Client Booking** | 6 | 16 | 23.5% | Sprint 2 (Semana 2-3) |
| **4: Admin Dashboard** | 6 | 14 | 20.6% | Sprint 3 (Semana 3) |
| **5: Email & Deploy** | 7 | 10 | 14.7% | Sprint 4 (Semana 4) |
| **TOTAL** | **28** | **68** | **100%** | **4 Semanas** |

### Por Semana

| Semana | Epics | Horas | Conteúdo |
|--------|-------|-------|----------|
| **Semana 1** | Epic 1 | 16 | Foundation (Frontend+Backend+DB) |
| **Semana 1-2** | Epic 2 | 12 | Authentication (OAuth+Sessions) |
| **Semana 2-3** | Epic 3 | 16 | Client Booking Flow |
| **Semana 3** | Epic 4 | 14 | Admin Dashboard |
| **Semana 4** | Epic 5 | 10 | Email + Deployment + Testing |
| **TOTAL** | **5 Epics** | **68** | **MVP Ready** |

---

## 6. ANÁLISE DE DEPENDÊNCIAS & PARALELIZAÇÃO

### Caminho Crítico (Critical Path)

```
Epic 1 (16h) → Epic 2 (12h) → Epic 3 & 4 (16h + 14h paralelo) → Epic 5 (10h)
```

**Duração Total:** 4 semanas (68 horas)

### Oportunidades de Paralelização

#### ✅ **Após Semana 1 (Epic 1 completo):**
- Epic 2 começa IMEDIATAMENTE (unblocks Epics 3 & 4)
- Tempo: Semana 1-2

#### ✅ **Após Semana 2 (Epic 2 completo):**
- **Epic 3 (Client Booking) E Epic 4 (Admin Dashboard) podem rodar EM PARALELO**
- Mesmo desenvolvedor pode alternar entre os dois
- Tempo: Semana 2-3 (sobreposição)

#### ✅ **Quando Epics 3 & 4 ~80% completos:**
- Epic 5 inicia (email setup, templates)
- Enquanto Epics 3 & 4 finalizam últimas stories
- Tempo: Final da Semana 3 / Semana 4

### Dependências Detalhadas

| Story | Depende De | Tipo | Impacto |
|-------|-----------|------|--------|
| 1.1 Frontend | - | Nenhuma | Inicio do projeto |
| 1.2 Backend | - | Nenhuma | Parallel com 1.1 |
| 1.3 DB Schema | 1.2 | Hard | Database pronto para testes |
| 1.4 Env Config | 1.1, 1.2 | Hard | Variáveis de ambiente |
| 1.5 Documentation | 1.1, 1.2, 1.3, 1.4 | Soft | Onboarding apenas |
| 2.1 OAuth Setup | 1.2, 1.4 | Hard | BLOQUEADOR para autenticação |
| 2.2 Auto Create User | 2.1, 1.3 | Hard | BLOQUEADOR para login |
| 2.3 Admin Role | 2.2 | Soft | Apenas setup admin |
| 2.4 JWT Sessions | 2.1 | Hard | BLOQUEADOR para API security |
| 2.5 Protected Routes | 2.4, 2.3 | Hard | BLOQUEADOR para autorização |
| 2.6 Login Page | 2.1, 1.1 | Hard | BLOQUEADOR para UI login |
| 3.1 Booking Form | 1.1, 2.* | Hard | Core user feature |
| 3.2 Availability Check | 3.1, 1.3 | Hard | BLOQUEADOR para double-booking prevention |
| 3.3 Confirmation | 3.2 | Soft | UX polish |
| 3.4 History | 1.3, 2.* | Medium | Data persistence |
| 3.5 Detail View | 3.4 | Soft | UX enhancement |
| 3.6 Dashboard | 2.* | Soft | Navigation |
| 4.1 Layout | 1.1, 2.* | Soft | UI structure |
| 4.2 List View | 4.1, 1.3 | Hard | Core admin feature |
| 4.3 Filters | 4.2 | Soft | UX enhancement |
| 4.4 Status Update | 4.2, 1.3 | Hard | Core admin feature |
| 4.5 Detail Modal | 4.2 | Soft | UX enhancement |
| 4.6 Availability | 4.2, 1.3 | Soft | Optional for MVP |
| 5.1 SendGrid | 1.2, 1.4 | Hard | Email integration |
| 5.2 Email Template | 5.1 | Medium | Email content |
| 5.3 Conflict Prevention | 1.3 | Hard | Data integrity |
| 5.4 Status Emails | 5.1, 4.4 | Medium | Notification flow |
| 5.5 Error Handling | All stories | Medium | Production readiness |
| 5.6 Deployment | All stories | Hard | Production launch |
| 5.7 Testing | 5.6 | Hard | Validation |

---

## 7. CRITICALIDADE & PRIORIZAÇÃO

### P0 - CRÍTICO (MVP não funciona sem isto)

**Epic 1:**
- 1.1, 1.2, 1.3, 1.4 (Foundation)

**Epic 2:**
- 2.1, 2.2, 2.4, 2.5, 2.6 (OAuth, Sessions, Protected Routes, Login)

**Epic 3:**
- 3.1, 3.2, 3.3 (Booking Form, Availability, Confirmation)

**Epic 4:**
- 4.1, 4.2, 4.4 (Layout, List View, Status Update)

**Epic 5:**
- 5.1, 5.2, 5.4, 5.6, 5.7 (Email, Deployment, Testing)

**Total P0 Stories:** 18/28 (64%)  
**Esforço P0:** ~50 horas

### P1 - IMPORTANTE (MVP melhor com isto, mas não é bloqueador)

**Epic 2:**
- 2.3 (Admin Role - pode ser config manual)

**Epic 3:**
- 3.4, 3.5, 3.6 (History, Detail, Dashboard)

**Epic 4:**
- 4.3, 4.5 (Filters, Detail Modal)

**Epic 5:**
- 5.5 (Error Handling - importante para produção)

**Total P1 Stories:** 8/28 (29%)  
**Esforço P1:** ~15 horas

### P2 - NICE-TO-HAVE (MVP sem isto, pode vir pós-launch)

**Epic 4:**
- 4.6 (Real-time Availability Display - opcional)

**Epic 5:**
- 5.3 (Conflict Prevention at DB - importante mas pode ser validado em app level)

**Total P2 Stories:** 2/28 (7%)  
**Esforço P2:** ~3 horas

### Estratégia de Corte (Se timeline apertada)

Se tempo ficar curto, pode-se ADIAR para pós-MVP:
1. Story 4.6 (Availability Display) - 2h savings
2. Story 3.4 + 3.5 (History + Detail) - 5h savings (ver histórico manualmente no email)
3. Story 4.3 (Filters) - 2h savings (lista simples sem filtros)

**Mínimo Viável (MVP absolutamente mínimo):** ~50 horas (Epics 1, 2, e Stories P0 de 3,4,5)

---

## 8. RISCOS & MITIGAÇÃO

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| **Timeline apertado** | MVP atrasado | ALTA | Cortar P2 stories se necessário; Parallelizar Epics 3&4 |
| **OAuth complexity** | Bloqueador | MÉDIA | Usar Passport.js (comprovado); Testar cedo |
| **Database constraint** | Double-booking bug | MÉDIA | Implementar constraint no SQL + validação no código; Testes rigorosos |
| **Email reliability** | Clientes não recebem confirmação | BAIXA | SendGrid é confiável; Ter fallback manual |
| **Responsive design issues** | Mobile quebrado | MÉDIA | Usar Tailwind+shadcn (já built-in); Testar mobile frequentemente |
| **Deployment complexity** | Produção não sobe | BAIXA | Vercel+Render são managed services (simples); Testar deploy cedo |

---

## 9. DEFINIÇÃO DE SUCESSO (Acceptance Criteria do Sprint)

### ✅ MVP Launch Ready quando:

1. **Funcionalidade Completa:**
   - [ ] Cliente consegue agendar em <2 minutos
   - [ ] Admin consegue confirmar agendamento em 1 clique
   - [ ] Email de confirmação recebido após confirmação
   - [ ] Zero double-bookings possível

2. **Todos os FRs Implementados:**
   - [ ] 38/38 Functional Requirements codificados e testados
   - [ ] 20/20 Non-Functional Requirements atendidos
   - [ ] 32/32 UX Requirements implementados

3. **Qualidade de Código:**
   - [ ] Sem console errors ou warnings
   - [ ] WCAG Level A acessibilidade verificada
   - [ ] Mobile responsiveness validada (320px+)
   - [ ] Lighthouse score: Performance 80+, Accessibility 90+

4. **Deployado & Testado:**
   - [ ] Frontend rodando em Vercel
   - [ ] Backend rodando em Render
   - [ ] Database em Supabase
   - [ ] End-to-end flow testado
   - [ ] Nenhum breaking issue encontrado

---

## 10. PRÓXIMAS AÇÕES

### Imediato (Esta Semana)

1. **Create Story Files** (bmad-create-story)
   - Criar arquivo `.md` para cada uma das 28 stories
   - Cada story com contexto completo para desenvolvedor
   - Localização: `/implementation-artifacts/stories/`

2. **Update sprint-status.yaml**
   - À medida que story files são criados, atualizar status para `ready-for-dev`
   - Isso ativa o workflow de desenvolvimento

3. **Setup Local Environment**
   - Clone do repositório
   - `.env.local` setup com placeholders
   - Preparar contas (Google OAuth, SendGrid)

### Semana 1

4. **Begin Epic 1 Implementation** (Story 1.1)
   - `npm create vite@latest agenda-clean-web`
   - Start development

### Semana 2-4

5. **Progress Tracking**
   - Update sprint-status.yaml conforme stories completam
   - Run retrospectives no final de cada epic
   - Adjust timeline se necessário

---

## 11. RASTREAMENTO & COMUNICAÇÃO

### Arquivo de Status
- **Localização:** `/implementation-artifacts/sprint-status.yaml`
- **Atualização:** Conforme stories transicionam de status
- **Métricas Rastreadas:**
  - Stories completadas por semana
  - Effort vs. Estimate
  - Bloqueadores identificados

### Relatórios
- **Weekly:** Atualizar sprint-status.yaml com progresso
- **Sprint-End:** Conduzir retrospectiva, capturar learnings

---

## APÊNDICE A: Mapeamento FR/NFR/UX para Epics

Todos os 38 FRs, 20 NFRs, e 32 requisitos UX foram mapeados para stories específicas. Veja `epics-and-stories.md` para coverage map detalhado.

**Coverage:** 100% de todos os requisitos ✅

---

## APÊNDICE B: Estrutura de Arquivos Esperada

```
agenda-clean/
├── _bmad-output/
│   ├── planning-artifacts/
│   │   ├── prd.md
│   │   ├── architecture.md
│   │   ├── ux-design-specification.md
│   │   └── epics-and-stories.md (criado)
│   └── implementation-artifacts/
│       ├── sprint-status.yaml (criado - HOJE)
│       ├── sprint-plan.md (este arquivo)
│       └── stories/ (será criado ao fazer create-story)
│           ├── 1-1-initialize-frontend-project.md
│           ├── 1-2-initialize-backend-project.md
│           └── ... (26 mais stories)
│
├── agenda-clean-web/ (será criado - Story 1.1)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── agenda-clean-api/ (será criado - Story 1.2)
│   ├── src/
│   │   ├── server.ts
│   │   ├── auth/
│   │   ├── routes/
│   │   ├── services/
│   │   └── db/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   └── ARCHITECTURE.md (será criado - Story 1.5)
│
└── README.md (será atualizado - Story 1.5)
```

---

**Sprint Planning Executado:** 13 de maio de 2026  
**Status:** ✅ COMPLETO E PRONTO PARA DESENVOLVIMENTO  
**Próximo Passo:** Executar `bmad-create-story` para criar arquivos de story individuais

