---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-01b-continue
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - product-brief-agenda-clean-2026-03-10.md
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: service
  complexity: low
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document - agenda-clean

**Author:** Davi
**Date:** 8 de abril de 2026

## Executive Summary

**agenda-clean** é uma aplicação web de agendamento de serviços de limpeza de sofá que resolve o caos operacional de agendamentos manuais através de clareza radical e controle automático. Hoje, agendamentos acontecem via WhatsApp/ligação, gerando falta de visibilidade, sem histórico para o cliente e risco constante de conflito de horários. O sistema resolve isso com autenticação via Google OAuth (zero fricção de cadastro), agendamento self-service com validação automática de disponibilidade em tempo real, e painel administrativo para gerenciamento centralizado — tudo desenhado especificamente para o fluxo da empresa, não um agendador genérico.

### O Que Torna Isto Especial

O diferenciador não é complexidade — é **a coragem de focar exclusivamente no que importa**. Google OAuth elimina o cadastro manual completamente (uma barreira real para clientes ocasionais). Controle automático de conflitos tira a responsabilidade cognitiva do admin. A visão central é que **confiança é construída através de simplicidade**: cliente agenda sem fricção, admin gerencia sem risco. Não há features que não contribuem ao fluxo real.

## Project Classification

- **Tipo:** Aplicação Web (SPA)
- **Domínio:** Serviços / Small Business Operations
- **Complexidade:** Baixa
- **Contexto:** Greenfield (novo projeto do zero)

## Success Criteria

### User Success

Cliente consegue agendar serviços de limpeza de sofá sem fricção, recebendo confirmação imediata de disponibilidade e mantendo histórico de seus agendamentos acessível a qualquer momento. O sucesso é medido pela capacidade de completar um agendamento do zero ao fim em menos de 2 minutos, sem contato com o administrador.

### Business Success

O admin deixa de gastar tempo com confirmações manuais via WhatsApp, confiando que o sistema automaticamente previne conflitos de horários. O sucesso operacional é atingido quando 100% dos agendamentos novos são realizados através do sistema (não via WhatsApp) e zero double-bookings ocorrem.

### Technical Success

- **Zero double-bookings:** Sistema impede dois agendamentos no mesmo slot automaticamente
- **Autenticação confiável:** 100% dos logins Google completados com sucesso
- **Taxa de conclusão:** ≥ 80% dos usuários que iniciam o fluxo completam o agendamento
- **Responsividade:** Sistema funciona perfeitamente em mobile (2G) e desktop
- **Disponibilidade:** Sistema disponível para uso sem erros críticos

### Measurable Outcomes

| Métrica | Alvo | Avaliação |
|---------|------|-----------|
| Taxa de conclusão de agendamento | ≥ 80% | Usuários que iniciam completam |
| Double-bookings | 0 | Zero conflitos via sistema |
| Sucesso de autenticação | 100% | Logins Google sem falhas |
| Tempo de agendamento | < 2 min | Do login à confirmação |
| Adoção pelo admin | 100% | Todas as atualizações de status via painel |

## Product Scope

### MVP - Minimum Viable Product

**Essencial para lançamento:**

- Autenticação via Google OAuth com criação automática de conta
- Agendamento self-service (endereço, data, horário, observações)
- Validação de disponibilidade em tempo real
- Visualização de agendamentos do cliente
- Painel administrativo com lista de todos os agendamentos
- Alteração de status de agendamento (solicitado → confirmado → em_atendimento → concluído / cancelado)
- Liberação automática de slots quando agendamento é cancelado

## User Journeys

### Jornada 1: Ana — Agendamento Sem Fricção (Cliente - Happy Path)

**Persona:** Ana, 35 anos, dona de casa que agenda limpeza de sofá regularmente.

**Cenário:** Ana volta para casa, vê sofá muito sujo, precisa agendar rapidamente. Historicamente teria que procurar WhatsApp, esperar resposta e confirmação. Hoje, está com pressa.

**Journey:**

1. Abre navegador no celular → clica em "Entrar com Google"
2. Autenticada em 1 segundo (OAuth automático)
3. Vê tela "Novo Agendamento"
4. Preenche: endereço, data (próximo sábado), horário (10h da manhã), observações (sofá grande, precisa urgente)
5. Clica "Verificar Disponibilidade" 
6. **Sistema responde em tempo real:** "✓ Horário disponível!"
7. Confirma agendamento
8. Ve confirmação na tela: "Seu agendamento foi criado. Status: Solicitado. Aguardando confirmação do administrador."

**Momento Aha!:** Ana conseguiu agendar sem fricção, sem falar com ninguém, com confirmação imediata. Sensação de controle e velocidade.

**Requisitos Revelados:**
- Onboarding instantâneo via Google OAuth
- UX mobile clara, intuitiva e rápida
- Validação de disponibilidade em tempo real
- Feedback imediato na tela após criação

---

### Jornada 2: Ana — Histórico e Recorrência (Cliente - Edge Case)

**Persona:** Ana, cliente recorrente que já usou o sistema.

**Cenário:** 3 meses depois, Ana precisa agendar limpeza novamente. Quer confirmar disponibilidade e ver o histórico de seus serviços anteriores.

**Journey:**

1. Abre o sistema
2. "Já estou no sistema" (Google OAuth, já autenticada)
3. Vê home com dois botões: "Novo Agendamento" e "Meus Agendamentos"
4. Clica em "Meus Agendamentos"
5. Vê histórico completo: agendamentos passados com status "Concluído"
   - Sábado, 10h: 3 meses atrás ✓ Concluído
   - Dados: endereço, horário, serviço, observações que deixou
6. Email recebido naquela época: "Seu agendamento foi confirmado"
7. **Confiança construída:** "O sistema mantém meu histórico, lembrou de mim, as coisas que anotei estão lá"
8. Clica "Novo Agendamento" → mesma jornada rápida anterior

**Momento Aha!:** Confiança através da persistência de dados. Ana sente que o sistema é confiável porque tudo que aconteceu está registrado.

**Requisitos Revelados:**
- Visualização de histórico de agendamentos
- Cada agendamento guarda contexto completo (data, hora, endereço, observações)
- Status persistente e acessível
- Experiência de recorrência frictionless

---

### Jornada 3: João — Gestão Centralizada (Admin - Happy Path)

**Persona:** João, 42 anos, proprietário da empresa de limpeza.

**Cenário:** João passa o dia recebendo mensagens no WhatsApp de clientes confirmando agendamentos, tentando organizar agenda, às vezes tendo conflitos. Processo é manual e caótico.

**Journey:**

1. Abre painel admin (login Google, acesso pré-configurado como admin)
2. Vê dashboard com lista centralizada de TODOS os agendamentos
3. Cada agendamento exibe: cliente, data, hora, endereço, status atual
4. Status disponíveis para cada agendamento: `solicitado`, `confirmado`, `em_atendimento`, `concluído`, `cancelado`
5. João vê agendamento de Ana com status "solicitado"
6. Clica no agendamento → ve detalhes completos
7. Clica botão "Confirmar" → status muda para "confirmado"
8. **Sistema automaticamente envia email para Ana:** "Seu agendamento foi confirmado! Sábado às 10h no [endereço]"
9. Cliente que tentou agendar em slot conflitante recebe erro imediato: "Esse horário não está disponível"
10. Agendamento é cancelado por algum motivo → slot é **liberado automaticamente** para novos agendamentos
11. **Momento Aha!:** João rodou um dia inteiro SEM ABRIR WHATSAPP. Zero conflitos. Visibilidade total. Tudo é automático.

**Requisitos Revelados:**
- Visão centralizada de todos os agendamentos em tempo real
- Gerenciamento de status rápido (1 clique por agendamento)
- Bloqueio automático de conflitos de horários
- Liberação automática de slots quando agendamento é cancelado
- **Notificações automáticas por email quando agendamento é confirmado**
- UX desktop clara e eficiente

---

### Jornada 4: João — Troubleshooting (Admin - Edge Case)

**Persona:** João, proprietário investigando problema de comunicação.

**Cenário:** Cliente liga reclamando que não recebeu confirmação de agendamento que fez ontem. João precisa investigar e resolver.

**Journey:**

1. João abre painel admin
2. Usa filtro de busca: procura pelo nome do cliente ou data
3. Encontra agendamento: status "solicitado" desde ontem
4. Clica para ver detalhes completos: nome, endereço, hora, observações, timestamp de criação
5. **Entende o problema:** Cliente agendou, mas João não confirmou ainda (estava ocupado)
6. Clica botão "Confirmar"
7. Status muda para "confirmado"
8. **Sistema automaticamente envia email para cliente:** "Seu agendamento foi confirmado"
9. João liga de volta para cliente: "Acabei de confirmar no sistema, você deve receber um email de confirmação em alguns segundos"
10. Cliente recebe email de confirmação
11. **Problema resolvido:** Cliente tem prova de confirmação via email, João não precisa fazer follow-up manual

**Momento Aha!:** Notificações automáticas transformam troubleshooting de frustrante em rápido. Cliente sai satisfeito com prova tangível de confirmação.

**Requisitos Revelados:**
- Busca e filtros essenciais (por nome, data, status)
- Rastreabilidade completa de cada agendamento (timestamps, histórico de mudanças)
- **Notificações automáticas garantem que cliente sempre sabe o status**
- UX de troubleshooting simples e eficiente

---

### Journey Requirements Summary

As 4 jornadas acima revelam estes grupos de requisitos funcionais:

**Cliente - Agendamento:**
- Login via Google OAuth com criação automática de conta
- Formulário de agendamento (endereço, data, hora, observações)
- Validação em tempo real de disponibilidade
- Feedback imediato de sucesso/erro

**Cliente - Histórico:**
- Lista de agendamentos do usuário logado
- Filtro por status
- Visualização de detalhes de cada agendamento
- Persistência de dados

**Admin - Visualização:**
- Dashboard centralizado com todos os agendamentos
- Filtros (por data, status, cliente)
- Visualização de detalhes de cada agendamento

**Admin - Gerenciamento:**
- Alteração de status de agendamento (solicitado → confirmado → em_atendimento → concluído/cancelado)
- Prevenção automática de conflitos de horários
- Liberação automática de slots quando agendamento é cancelado

**Sistema - Notificações:**
- Email automático quando agendamento é confirmado
- Template simples com data, hora, endereço, link para visualizar
- Sem SMS, WhatsApp ou push notifications no MVP

### Growth Features (Pós-MVP)

Recursos que tornam o produto mais competitivo, mas podem vir após lançamento:

- Notificações (e-mail, SMS ou WhatsApp)
- Cancelamento de agendamento pelo próprio cliente
- Edição de agendamento pelo cliente
- Dashboard com relatórios e analytics
- Filtros e busca avançada na agenda
- Integração com Google Calendar

### Vision (Futuro)

Visão de longo prazo para evolução do produto:

- Múltiplos administradores com permissões granulares
- Modelo SaaS para múltiplas empresas de serviço
- Seleção de tipo de serviço com preços e durações diferentes
- Sistema de pagamento integrado
- Avaliações e feedback de clientes
- Marketplace de serviços relacionados

## Web Application Specific Requirements

### Browser Support & Compatibility

- **Target Browsers:** Chrome, Firefox, Safari, Edge (versões atuais e anterior)
- **iOS:** Safari 14+, Chrome mobile (atual)
- **Android:** Chrome mobile (atual), Firefox mobile (atual)
- **Desktop:** Windows, macOS, Linux com navegadores modernos
- **No Legacy Support:** Sem requisitos para IE11, Android 5.0, ou navegadores muito antigos
- **Implicação Técnica:** Podemos usar ES2020+, CSS Grid, Flexbox, Fetch API, async/await sem polyfills extensos

### Responsive Design & Mobile-First

- **Design Principal:** Mobile-first (cliente agenda no celular, fora de casa)
- **Breakpoints:**
  - **Mobile:** 320px-768px (tela principal do cliente)
  - **Tablet:** 768px-1024px
  - **Desktop:** 1024px+ (tela principal do admin)
- **Ferramenta:** Tailwind CSS + shadcn/ui (conforme brief)
- **Prioridade Visual:** Cliente precisa de interface clara em telas pequenas

### Performance Targets

- **Page Load Time:** < 3 segundos em conexão lenta (2G simulada)
- **Interaction Response:** < 200ms para ações críticas (agendar, mudar status)
- **Lighthouse Score:** 80+ em Performance, 90+ em Accessibility
- **JavaScript Bundle Size:** < 500KB (carregamento lazy de features quando necessário)
- **Métrica Critical Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

### SEO Strategy

- **Abordagem:** Secundária — não é driver de descoberta
- **Implementação:**
  - Meta tags padrão (title, description, viewport)
  - Open Graph tags para compartilhamento social
  - Robots.txt e sitemap.xml para indexação básica
  - Sem Server-Side Rendering necessário (SPA pura suficiente)
- **Descoberta Principal:** Google Maps, redes sociais, indicação direta

### Real-Time Requirements

- **Escopo MVP:** Não há requisito de atualizações em tempo real instantâneas
- **Fluxo de Atualização:**
  - Cliente agenda → recebe confirmação imediata na tela
  - Admin deve recarregar página (F5) para ver novos agendamentos de clientes
  - Cliente deve recarregar para ver mudança de status (quando admin atualiza)
- **Implicação técnica:** Sem WebSockets, sem polling contínuo — HTTP request/response simples, REST API
- **Caminho Pós-MVP:** Se necessário mais tarde, polling ou WebSockets podem ser adicionados

### Accessibility Level

- **Nível Alvo:** WCAG Level A (Basic Accessibility) — MVP
- **Implementação:**
  - HTML semântico (`<button>`, `<label>`, `<nav>`, `<main>`)
  - Contraste de cores: 4.5:1 para texto normal, 3:1 para texto grande
  - Navegação completa por teclado (Tab, Enter, Escape)
  - Labels associados aos inputs e campos de form
  - Sem requisito de AltText em imagens (poucas imagens no MVP)
  - Suporte básico a leitores de tela (ARIA labels onde óbvio)
- **Sem WCAG AA:** Acessibilidade aprofundada não é requisito MVP
- **Post-MVP:** Pode ser melhorado para WCAG AA se base de usuários incluir pessoas com deficiência visual

### Development Stack Implications

Baseado nas decisões técnicas acima:

**Frontend:**
- React 18+ + Vite (SPA)
- Tailwind CSS (responsive, mobile-first)
- shadcn/ui (componentes com acessibilidade básica)
- React Context ou Zustand para state management (simples)
- Axios ou Fetch API para requisições HTTP

**Backend:**
- Node.js + Express
- PostgreSQL
- Passport.js + Google OAuth 2.0
- JWT para sessões
- SendGrid ou similar para emails

**Ferramentas & Deploy:**
- Git/GitHub para versionamento
- Vercel ou Netlify para frontend
- Render ou Railway para backend
- Supabase ou similar para PostgreSQL

**Sem:** GraphQL, WebSockets, Server-Side Rendering, PWA offline, i18n, temas dinâmicos

## Project Scoping & Phased Development

### MVP Strategy & Context

**Project Type:** Solo developer, full-stack implementation  
**Timeline:** 2-4 weeks for MVP launch  
**Use Case:** Personal business (cleaning company owner), self-operated  
**Resource Model:** Individual developer handling all frontend + backend + deployment

**MVP Philosophy:** Lean & essential only — validate that the core problem is solved without cosmetic polish

### MVP Feature Set (Phase 1 - Critical Path)

**Estimated Effort:** ~74 hours of development

#### Features IN MVP:

**Authentication & Authorization:**
- Google OAuth 2.0 login (zero friction)
- Automatic account creation on first login
- Role detection (client vs admin) based on pre-configured email

**Client-Facing Features:**
- Create agendamento (endereço, data, horário, observações)
- View histórico of own agendamentos
- Real-time availability validation (immediate conflict detection)
- Email confirmation when agendamento is confirmed

**Admin-Facing Features:**
- Centralized dashboard showing ALL agendamentos
- List view with status, client name, date, time
- Update agendamento status (solicitado → confirmado → em_atendimento → concluído / cancelado)
- Automatic slot liberation when agendamento is cancelled

**System-Level:**
- Automatic email on confirmation (SendGrid, simple template)
- Conflict prevention (no double-bookings)
- Data persistence (PostgreSQL)

#### Features OUT of MVP (Phase 2+):

- Client can cancel own agendamento (admin only in MVP)
- Client can edit agendamento (admin only in MVP)
- Advanced filters on agenda (search by name, date range, etc.)
- Dashboard analytics (agendamentos per month, completion rate, etc.)
- WhatsApp notifications (email only in MVP)
- Mobile app native
- Multi-admin with granular permissions
- Payment integration
- Landing page / marketing site
- Multi-tenancy / SaaS model

### Development Phase Breakdown

#### Phase 1 (MVP - Weeks 1-4):
- **Hours: ~74**
  - Google OAuth setup (4h)
  - Agendamento form + validation (8h)  
  - Admin dashboard (12h)
  - Database schema + migrations (6h)
  - REST API endpoints (16h)
  - Frontend UI (React components) (20h)
  - Email integration (4h)
  - Deployment setup (4h)

#### Phase 2 (Post-MVP - Weeks 5-8):
- Client-side actions (cancel, edit)
- Advanced filtering and search
- Basic analytics dashboard
- WhatsApp notification option
- UX polish and mobile refinement

#### Phase 3 (Expansion - Future):
- Multi-admin with permissions matrix
- Payment integration (Stripe)
- Service type selection with custom pricing
- SaaS model for other cleaning companies
- Client ratings and feedback system

### Implementation Constraints & Trade-offs

**UX Polish vs Functionality:**
- Priority: Core features working reliably > visual perfection
- Rationale: Solo developer, limited time; can be polished in Phase 2

**Mobile Experience:**
- Responsive design implemented (Tailwind CSS mobile-first)
- Desktop admin interface prioritized
- Mobile client interface functional but may lack final polish

**Real-Time Updates:**
- Deferred to post-MVP
- Current approach: Manual refresh (F5) to see updates
- No WebSockets or polling in MVP (complexity too high for solo dev timeline)

**Deployment Simplicity:**
- Vercel (frontend) + Render (backend) with git-based deployment
- No custom Docker, Kubernetes, or complex CI/CD
- Single database (PostgreSQL) via Supabase or similar

### Success Definition for MVP

MVP is successful when:
1. ✅ Client can create agendamento in < 2 minutes without friction
2. ✅ Admin can manage all agendamentos from single dashboard
3. ✅ Zero double-bookings (automatic conflict prevention)
4. ✅ 100% email confirmation sent on agendamento confirmation
5. ✅ Agendamento data persists and is retrievable
6. ✅ Both client and admin can complete core workflows without errors

### Risk Mitigation

**Timeline Risk:**
- Mitigation: Strip features ruthlessly if deadline approaches
- Fallback: Launch with email notifications via manual admin action (no automation)

**Technical Complexity Risk:**
- OAuth: Use Passport.js (proven, standard)
- Database: Prisma ORM (reduces SQL boilerplate)
- Deployment: Managed services (Vercel, Render) instead of self-hosted

**Data Loss / Reliability Risk:**
- PostgreSQL with automatic backups (via Supabase/managed service)
- Email delivery via SendGrid (reliable, not custom SMTP)

## Functional Requirements

### User Authentication & Authorization

- FR1: Client can login via Google OAuth
- FR2: Client account is automatically created on first Google login
- FR3: Admin account is pre-configured (by email)
- FR4: System identifies user role (client vs admin) based on authenticated email
- FR5: Client can logout

### Client Agendamento Management

- FR6: Client can create agendamento with: endereço, data, horário, observações
- FR7: System validates agendamento data is complete before saving
- FR8: System prevents agendamento creation when date/time slot is already occupied
- FR9: System returns error message when requested slot is unavailable
- FR10: Client receives confirmation message immediately after successful agendamento creation
- FR11: Client can view list of own agendamentos (current + past)
- FR12: Client can view details of any of own agendamentos (date, time, endereço, observações, status)

### Admin Agendamento Management

- FR13: Admin can view centralized list of ALL agendamentos (from all clients)
- FR14: Admin can view details of any agendamento
- FR15: Admin can change agendamento status (solicitado → confirmado → em_atendimento → concluído / cancelado)
- FR16: System automatically updates agendamento status in database when admin changes it

### Conflict Prevention & Slot Management

- FR17: System prevents two agendamentos in the same date/time slot
- FR18: System liberates slot automatically when agendamento status is changed to "cancelado"
- FR19: System makes liberated slot available for new agendamentos immediately
- FR20: System checks conflict at moment of agendamento creation (real-time validation)

### Notifications & Communication

- FR21: System sends email automatically when agendamento status changes to "confirmado"
- FR22: Email contains: agendamento date, time, client name, endereço
- FR23: Email includes link to view full agendamento details
- FR24: Email delivery is reliable (retries on failure)

### Data Persistence & Retrieval

- FR25: System persists all agendamento data to database
- FR26: System persists all user data (Google profile, preferences)
- FR27: Client data is associated with logged-in user and never mixed
- FR28: Agendamento data includes timestamps of creation and status changes
- FR29: All persisted data is retrievable on demand (for client viewing or admin management)

### Responsive User Interface

- FR30: Client interface is accessible and usable on mobile devices (320px+)
- FR31: Client interface is accessible and usable on desktop (1024px+)
- FR32: Admin interface is optimized for desktop but functional on mobile
- FR33: All buttons, forms, and interactive elements are keyboard navigable
- FR34: Color contrast meets minimum accessibility standards

### System Reliability & Error Handling

- FR35: System gracefully handles network errors (displays user-friendly message)
- FR36: System prevents data loss on failed operations (rollback on error)
- FR37: System recovers from unexpected errors without losing user data
- FR38: System provides clear error messages when operations fail

## Non-Functional Requirements

### Performance

- NFR1: Agendamento creation completes within 2 seconds (user interaction to confirmation)
- NFR2: Admin dashboard loads within 3 seconds on typical desktop connection
- NFR3: Client login via Google OAuth completes within 1 second
- NFR4: Availability check (slot validation) returns response within 500ms
- NFR5: Email sending queued within 100ms of status change (delivery can be async)
- NFR6: System supports concurrent usage of 10+ users without performance degradation

### Security

- NFR7: All user passwords are managed via Google OAuth (no local password storage)
- NFR8: All data in transit is encrypted (HTTPS/TLS)
- NFR9: All data at rest is encrypted (database encryption)
- NFR10: Admin account email is securely verified (only pre-configured email can be admin)
- NFR11: Client agendamentos are isolated (client can only view own agendamentos)
- NFR12: Email containing agendamento details includes verification link (prevent spam)
- NFR13: Session tokens expire after 30 days of inactivity
- NFR14: Database backup is automated daily with retention of 7 days

### Accessibility

- NFR15: All interactive elements are keyboard navigable (Tab, Enter, Escape)
- NFR16: Color contrast ratio minimum 4.5:1 for normal text
- NFR17: Form labels are associated with input fields (label for/id attributes)
- NFR18: Error messages are clear and describe how to fix the issue
- NFR19: Mobile interface remains functional on 320px width screens
- NFR20: Font size is at least 14px for body text (readability)
