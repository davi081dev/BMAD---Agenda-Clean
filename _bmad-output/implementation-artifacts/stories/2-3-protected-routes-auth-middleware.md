---
storyId: "2.3"
storyKey: "2-3-protected-routes-auth-middleware"
epicId: "2"
epicName: "Authentication & User Management"
title: "Protected Routes & Auth Middleware (Frontend)"
priority: "critical"
status: "ready-for-dev"
estimatedHours: 3
createdDate: "20 de maio de 2026"
projectName: "agenda-clean"
language: "pt-br"
---

# Story 2.3: Protected Routes & Auth Middleware (Frontend)

## 📋 Contexto & Visão Geral

Esta é a **segunda story de Frontend** do Epic 2 (Authentication & User Management), implementando o middleware de autenticação e sistema de rotas protegidas que garante apenas usuários autenticados possam acessar páginas internas (dashboard, agendamento, etc). Ela depende diretamente da Story 2.2 (Login Page Frontend) que fornece a página de entrada e redireciona autenticados para o dashboard.

Seu objetivo: criar um **sistema de roteamento seguro e resiliente** que:
1. Implemente componente `ProtectedRoute` para wrapar rotas privadas
2. Crie componente `PrivateLayout` para layout de usuários autenticados
3. Redirecione usuários não-autenticados automaticamente para `/login`
4. Exiba loading placeholders enquanto verifica autenticação
5. Implemente error boundaries para capturar falhas de UI
6. Configure lazy loading para otimizar bundle size
7. Funcione corretamente em navegação entre rotas protegidas

**Valor de Negócio:**
- Garante segurança: usuários não-autenticados não conseguem acessar páginas internas
- Melhora UX: feedback visual durante verificação de autenticação (não blank page)
- Habilita todas as journeys de cliente (Ana) e admin (João) com confiança
- Reduz bugs: validação centralizada de autenticação (não repetida em cada página)
- Otimiza performance: lazy loading reduz bundle inicial

**Impacto na Implementação:**
- ✅ **Bloqueador Direto:** Frontend não pode ter páginas internas sem proteção
- ✅ **Bloqueador Indireto:** Stories 3.1-3.6 (Client Experience) e 4.1-4.6 (Admin Dashboard) requerem proteção de rotas
- ✅ **Habilitador:** Após 2.3, desenvolvimento de páginas internas (AgendamentoPage, DashboardPage) pode começar

**Dependências:**
- ✅ **Completada:** Epic 1 (Foundation & Setup) — frontend Vite+React+Tailwind pronto
- ✅ **Completada:** Story 2.1 (Google OAuth Backend) — autenticação backend funciona
- ✅ **Completada:** Story 2.2 (Login Page Frontend) — página de login implementada
- ✅ **Requer:** useAuth hook já existe em `/frontend/src/hooks/useAuth.ts`

**Sprint Assignment:**
- Sprint: 1 (Week 1-2)
- Sequência: Segunda story de Frontend do Epic 2 (após 2.2, before 3.1-3.6)
- Bloqueador direto para: 3.1 (Booking Form), 4.1 (Admin Dashboard), todas as rotas protegidas
- Paralelizável com: Nada (é dependência crítica)

---

## 👤 User Story

```
Como cliente/admin do sistema agenda-clean,
Quero que páginas privadas (dashboard, agendamento, etc) fiquem protegidas,
Para que apenas eu (autenticado) possa acessar minhas informações,
e se eu não estiver logado, seja redirecionado automaticamente para login.

Critério de Aceitação: Ao tentar acessar /dashboard sem autenticação,
sou redirecionado para /login em < 2 segundos sem erros ou páginas em branco.
```

---

## 🎯 Objetivo & Requisitos Funcionais

**Objetivo Principal:**
Implementar o middleware de autenticação e sistema de rotas protegidas que:
1. Verifica se usuário está autenticado em cada acesso a rota protegida
2. Redireciona para `/login` se não autenticado
3. Exibe loading feedback enquanto verifica autenticação (não blank page)
4. Renderiza página se autenticado, com layout apropriado
5. Captura erros de UI em error boundaries
6. Otimiza performance com lazy loading de páginas

**Escopo Específico desta Story:**

### 1. Componente ProtectedRoute

Criar wrapper que protege rotas individuais:

```typescript
// src/components/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}
```

Funcionalidade:
- ✅ Usa `useAuth()` hook para verificar autenticação
- ✅ Renderiza `LoadingSpinner` enquanto `isLoading === true`
- ✅ Redireciona para `/login` se `isAuthenticated === false`
- ✅ Renderiza `children` se autenticado
- ✅ Usa `<Navigate replace>` do React Router para evitar histórico
- ✅ Sem props de UI (layout/header vem de PrivateLayout)

### 2. Componente PrivateLayout

Criar layout compartilhado para páginas autenticadas:

```typescript
// src/components/PrivateLayout.tsx
interface PrivateLayoutProps {
  children: React.ReactNode
  title?: string
}

export function PrivateLayout({ children, title }: PrivateLayoutProps) {
  const { user, logout } = useAuth()
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar/Header com navegação */}
      {/* User info + logout button */}
      <main className="flex-1 overflow-auto">
        {/* Page content goes here */}
      </main>
    </div>
  )
}
```

Funcionalidade:
- ✅ Exibe header com logo/título
- ✅ Exibe informações do usuário autenticado (name, email avatar)
- ✅ Botão de logout com confirmação
- ✅ Navegação entre páginas internas (links para dashboard, agendamento, etc)
- ✅ Responsive (sidebar em desktop, hamburger em mobile)
- ✅ Breadcrumb opcional mostrando página atual
- ✅ Recebe `children` como conteúdo principal

### 3. Integração React Router

Configurar rotas com proteção:

```typescript
// src/App.tsx or src/routes/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { PrivateLayout } from '@/components/PrivateLayout'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <DashboardPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Mais rotas protegidas seguem o mesmo padrão */}
        <Route path="/agendamento/novo" element={...} />
        <Route path="/perfil" element={...} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

Funcionalidade:
- ✅ BrowserRouter como wrapper
- ✅ Rotas públicas: `/login` (sem ProtectedRoute)
- ✅ Rotas protegidas: `/dashboard`, `/agendamento/*`, `/perfil` (com ProtectedRoute + PrivateLayout)
- ✅ Fallback 404: redireciona para `/login` (não mostra erro)
- ✅ Sem hardcoding de rotas (reutiliza padrão)

### 4. Lazy Loading de Páginas

Otimizar bundle com código dividido:

```typescript
// src/routes/index.tsx
import { lazy, Suspense } from 'react'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const BookingPage = lazy(() => import('@/pages/BookingPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

// Usar em Routes:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <PrivateLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardPage />
        </Suspense>
      </PrivateLayout>
    </ProtectedRoute>
  }
/>
```

Funcionalidade:
- ✅ `React.lazy()` para importar páginas dinamicamente
- ✅ `<Suspense>` com fallback spinner enquanto carrega
- ✅ Reduz bundle inicial (JS dividido por rota)
- ✅ Webpack/Vite automaticamente gera chunks

### 5. Error Boundary

Capturar erros de UI para melhor UX:

```typescript
// src/components/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error boundary caught:', error, info)
    // Enviar para Sentry se disponível
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
          <h1 className="text-2xl font-bold text-red-900">Algo deu errado</h1>
          <p className="mt-2 text-red-700">Por favor, tente novamente.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Recarregar página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

Envolver App com ErrorBoundary:
```typescript
<ErrorBoundary>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</ErrorBoundary>
```

Funcionalidade:
- ✅ Captura erros não-capturados em componentes filhos
- ✅ Exibe mensagem amigável ao usuário
- ✅ Botão de reload para recuperação
- ✅ Loga erro para debugging (console ou Sentry)
- ✅ Não quebrabilidade: se PrivateLayout quebra, Error Boundary pega

### 6. LoadingSpinner Componente

Exibir feedback visual durante carregamento:

```typescript
// src/components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  )
}
```

Funcionalidade:
- ✅ Spinner animado (rotate animation)
- ✅ Texto descritivo ("Carregando...")
- ✅ Full-screen backdrop (min-h-screen)
- ✅ Centered com flexbox
- ✅ Acessível: sem distrações visuais (apenas spinner + texto)

### 7. Configuração de Ambiente

Verificar `.env.local` tem variáveis necessárias:

```bash
# .env.local
VITE_API_URL=http://localhost:3000
```

Funcionalidade:
- ✅ `VITE_API_URL` usado pelo `useAuth()` hook para chamar `/api/auth/status`
- ✅ Não adiciona novas variáveis (reutiliza de Story 1.4)

---

## ✅ Acceptance Criteria (BDD)

### AC1: ProtectedRoute redireciona não-autenticados para /login

```gherkin
GIVEN que estou em /dashboard mas não autenticado
WHEN a página carrega
THEN:
  - LoadingSpinner é renderizado por < 1 segundo
  - Após `useAuth()` retornar isLoading=false
  - React Router executa <Navigate to="/login" replace />
  - URL muda para /login
  - Histórico não inclui /dashboard (replace=true)
AND DashboardPage nunca é renderizado
AND nenhum erro é logado
```

### AC2: ProtectedRoute renderiza conteúdo se autenticado

```gherkin
GIVEN que estou autenticado (localStorage tem token)
WHEN acesso /dashboard
THEN:
  - LoadingSpinner mostra por < 1 segundo (enquanto `useAuth()` verifica)
  - useAuth() retorna isLoading=false, isAuthenticated=true
  - ProtectedRoute renderiza children (DashboardPage)
  - PrivateLayout renderiza ao redor (header, sidebar, etc)
  - DashboardPage renderiza seu conteúdo
AND página está interativa (não é mais loading)
AND URL permanece /dashboard
AND nenhum erro é logado
```

### AC3: PrivateLayout exibe informações do usuário autenticado

```gherkin
GIVEN que sou usuário autenticado (Ana ou João)
WHEN acesso qualquer página protegida (e.g., /dashboard)
THEN PrivateLayout renderiza:
  - Header com logo "agenda-clean" (ou ícone)
  - Informações do usuário:
    - Nome do usuário (e.g., "Ana Silva")
    - Email (e.g., "ana@example.com")
    - Avatar ou ícone padrão (não quebra se avatar vazio)
  - Botão "Sair" visível e clicável
  - Navegação para páginas internas (links com rota correta)
AND informações vêm de useAuth().user
AND header é consistente em TODAS as páginas protegidas
AND layout é responsivo (mobile, tablet, desktop)
```

### AC4: PrivateLayout logout funciona corretamente

```gherkin
GIVEN que estou autenticado e vejo botão "Sair"
WHEN clico em "Sair"
THEN:
  - Dialog de confirmação aparece: "Tem certeza que quer sair?"
  - Se clico "Cancelar": dialog fecha, permaneço na página
  - Se clico "Confirmar":
    - useAuth().logout() é chamado
    - Token é removido do localStorage (ou cookie)
    - Página redireciona para /login (automático)
    - URL muda para /login
    - Histórico é mantido (não replace=true)
AND nenhum erro é logado
AND logout é imediato (< 1 segundo)
AND após logout, /dashboard retorna loading + redireciona /login (not-authed)
```

### AC5: Lazy loading de páginas funciona

```gherkin
GIVEN que abro app pela primeira vez
WHEN verifico Network tab do DevTools
THEN:
  - Bundle inicial NÃO inclui DashboardPage, BookingPage, etc
  - Apenas código compartilhado é carregado (router, hooks, components)
  - Quando acesso /dashboard:
    - Novo chunk é baixado (dashboard.[hash].js)
    - Suspense fallback (LoadingSpinner) mostra por < 500ms
    - DashboardPage renderiza após chunk ser carregado
AND bundle inicial é < 500KB (ou significativamente menor que com eager imports)
AND chunks posteriores são carregados sem recarregar página
AND não há quebra de UI enquanto chunks carregam (Suspense fallback é usado)
```

### AC6: Error Boundary captura erros de UI

```gherkin
GIVEN que um componente em PrivateLayout joga erro (ReferenceError, etc)
WHEN o erro é lançado durante render
THEN:
  - ErrorBoundary detecta o erro
  - Mensagem amigável é exibida: "Algo deu errado"
  - Botão "Recarregar página" fica visível
  - Erro é logado no console ou Sentry
  - Página não fica em blank branco / indefinido
AND clicando "Recarregar página": window.location.reload() é chamado
AND usuário pode se recuperar do erro
```

### AC7: Navegação entre rotas protegidas funciona

```gherkin
GIVEN que estou em /dashboard (autenticado)
WHEN clico link para /perfil (também protegido)
THEN:
  - useAuth() retorna cached result (não refetch desnecessariamente)
  - ProtectedRoute permite renderizar /perfil
  - PrivateLayout permanece visível (header/nav não recarregam)
  - ProfilePage renderiza
  - URL muda para /perfil
  - Nenhum spinner "Loading" aparece (pois já estou autenticado)
AND navegação é smooth (sem flashing ou redirecionamentos extras)
AND useAuth() não refaz GET /api/auth/status em cada rota change
```

### AC8: Rotas públicas (login) não usam ProtectedRoute

```gherkin
GIVEN que estou não-autenticado
WHEN acesso /login
THEN:
  - LoginPage renderiza imediatamente (sem ProtectedRoute)
  - Nenhum LoadingSpinner ou redirect
  - Botão "Entrar com Google" é visível
AND se já estou autenticado e acesso /login:
  - Option 1: LoginPage renderiza mesmo assim (usuário pode ver)
  - Option 2: Redireciona para /dashboard (se fizer sentido)
  - Comportamento é consistente e documentado
```

### AC9: Fallback 404 redireciona para login

```gherkin
GIVEN que acesso uma rota inválida (e.g., /xyz/invalid)
WHEN a página tenta carregar
THEN:
  - React Router não encontra match
  - Fallback route <Route path="*" /> é acionado
  - Redireciona para /login (não mostra erro 404)
  - URL muda para /login
AND nenhum "Not Found" ou erro é visível
AND UX é limpa (usuário automaticamente para login se route invalid)
```

### AC10: useAuth hook integra com ProtectedRoute

```gherkin
GIVEN que useAuth() hook existe em src/hooks/useAuth.ts
WHEN ProtectedRoute importa e usa o hook
THEN:
  - useAuth() retorna: { user, isLoading, isAuthenticated, logout }
  - ProtectedRoute usa isLoading e isAuthenticated
  - Hook verifica autenticação ao montar (useEffect + GET /api/auth/status)
  - Token é lido de localStorage ou cookies (já implementado)
AND ProtectedRoute não reinventa lógica (reutiliza hook)
AND hook é o source of truth para autenticação
```

---

## 🔧 Arquitetura & Padrões

### Estrutura de Arquivos

```
src/
├── components/
│   ├── ProtectedRoute.tsx         ← NEW
│   ├── PrivateLayout.tsx          ← NEW
│   ├── ErrorBoundary.tsx          ← NEW
│   └── LoadingSpinner.tsx         ← NEW
├── pages/
│   ├── LoginPage.tsx              (já existe de 2.2)
│   ├── DashboardPage.tsx          (placeholder para 3.x)
│   ├── BookingPage.tsx            (placeholder para 3.x)
│   └── ProfilePage.tsx            (placeholder para 3.x)
├── hooks/
│   └── useAuth.ts                 (já existe)
├── routes/
│   └── index.tsx                  ← NEW (ou App.tsx)
├── App.tsx
└── main.tsx
```

### Fluxo de Autenticação

```
1. Usuário acessa /dashboard
   ↓
2. React Router monta ProtectedRoute
   ↓
3. ProtectedRoute chama useAuth() hook
   ↓
4. useAuth() faz GET /api/auth/status (backend)
   ↓
5. Enquanto isLoading=true: renderiza LoadingSpinner
   ↓
6. Resposta retorna:
   a) Se autenticado: isAuthenticated=true → renderiza children (DashboardPage)
   b) Se não autenticado: isAuthenticated=false → <Navigate to="/login" />
```

### Padrões React Utilizados

| Padrão | Componente | Propósito |
|--------|-----------|----------|
| HOC (Higher-Order Component) | ProtectedRoute | Wrapa rotas para adicionar proteção |
| Context API / Hook | useAuth | Compartilha estado de autenticação |
| Error Boundary | ErrorBoundary | Captura erros não-capturados |
| Code Splitting | Lazy + Suspense | Otimiza bundle com lazy loading |
| Conditional Rendering | ProtectedRoute | Renderiza diferente baseado em estado |
| Layout Pattern | PrivateLayout | Compartilha header/nav entre rotas |

---

## 📚 Referências & Links

### Links Internos

- **PRD:** [planning-artifacts/prd.md](../planning-artifacts/prd.md) - Requisitos de negócio
- **Architecture:** [planning-artifacts/architecture.md](../planning-artifacts/architecture.md) - Decisões arquiteturais
- **Epic 2:** [planning-artifacts/epics-and-stories.md](../planning-artifacts/epics-and-stories.md#epic-2) - Contexto do Epic
- **Story 2.1:** [2-1-google-oauth-setup-backend.md](./2-1-google-oauth-setup-backend.md) - Backend OAuth
- **Story 2.2:** [2-2-login-page-frontend.md](./2-2-login-page-frontend.md) - Login UI
- **Sprint Plan:** [sprint-plan.md](../sprint-plan.md) - Timeline e dependências

### Documentação Externa

- [React Router v6 Docs](https://reactrouter.com/) - Protected routes pattern
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) - Error handling
- [React.lazy & Suspense](https://react.dev/reference/react/lazy) - Code splitting
- [Tailwind CSS](https://tailwindcss.com/) - Styling (já usado em projeto)
- [shadcn/ui](https://ui.shadcn.com/) - Componentes reutilizáveis (já usado em projeto)

### Código Existente a Reutilizar

- `/frontend/src/hooks/useAuth.ts` - Hook de autenticação (NOT reinventar)
- `/frontend/src/services/authService.ts` - Chamadas API (reutilizar `getAuthStatus`)
- `/frontend/src/types/auth.ts` - Types de User, etc (reutilizar)
- `/frontend/tailwind.config.ts` - Configuração Tailwind (para LoadingSpinner, etc)
- `/frontend/src/pages/LoginPage.tsx` - Referência de padrão (de Story 2.2)

---

## ⏱️ Estimativa de Esforço

| Tarefa | Horas | Notas |
|--------|-------|-------|
| ProtectedRoute + PrivateLayout | 1.0h | Padrão simples + Tailwind |
| LoadingSpinner + ErrorBoundary | 0.5h | Componentes simples |
| Configurar React Router com lazy loading | 0.5h | Refatorar App.tsx ou criar routes/index.tsx |
| Testes unitários (ProtectedRoute, routing) | 0.5h | Vitest + React Testing Library |
| Integração e testes E2E básicos | 0.5h | Verificar redirects, lazy loading |
| **TOTAL** | **3h** | Sem surpresas esperadas |

---

## ✨ Notas Adicionais

### Contexto de Implementação

Esta story é um "fundação invisível" — o usuário final não vê ProtectedRoute ou ErrorBoundary, mas a qualidade de implementação aqui define estabilidade de TODOS os recursos subsequentes. Decisões aqui afetam:

- **Stories 3.1-3.6 (Client Booking):** Todas as páginas de Ana dependem de ProtectedRoute
- **Stories 4.1-4.6 (Admin Dashboard):** Todas as páginas de João dependem de ProtectedRoute
- **Debugging futuro:** ErrorBoundary economiza horas de debugging em prod

### Decisões Já Tomadas (Do Architecture Doc)

1. ✅ React Router v6 é a stack padrão (não useNavigate em múltiplos lugares)
2. ✅ useAuth hook é centralizado (não reimplementar em cada página)
3. ✅ Lazy loading é obrigatório para otimizar bundle (Vite suporta nativamente)
4. ✅ Error Boundaries são necessárias (WCAG compliance + UX)
5. ✅ PrivateLayout compartilhado (não duplicar header/nav)

### Questões Abertas (Para Dev Agent)

1. **Refresh token handling:** O useAuth hook deve refetch auth-status em interval? Ou apenas ao montar?
   - Recomendação: Apenas ao montar (simples). Se token expirar, próximo acesso a `/api` retorna 401 → redireciona /login.

2. **Admin Role:** Como distinguir entre cliente (Ana) e admin (João) no PrivateLayout?
   - Recomendação: `user.role` vem de backend. PrivateLayout verifica `user.role === 'admin'` para renderizar admin-specific nav links.

3. **Deep linking:** Se usuário compartilha URL /dashboard com não-autenticado, qual o fluxo?
   - Esperado: ProtectedRoute mostra spinner → redireciona /login → após login, redireciona /dashboard.
   - ⚠️ Não está implementado nesta story: "Remember where user wanted to go" (nice-to-have para Phase 2).

4. **Session expiry:** Se token expirar enquanto usuário está na página, o que acontece?
   - Esperado: Próximo clique que chama `/api` retorna 401 → logout automático → redireciona /login.
   - Note: useAuth hook não polling (não verifica expiry continuamente).

### Known Issues & Mitigations

| Issue | Mitigation |
|-------|-----------|
| Flash of login page antes de redirecionar | Use LoadingSpinner enquanto isLoading=true |
| Token inválido (expirado) | useAuth() trata erro, seta user=null, redireciona /login |
| Múltiplas chamadas a /api/auth/status | useAuth() faz apenas ao montar (não refetch desnecessário) |
| Browser back button após logout | <Navigate replace /> impede voltar para páginas autenticadas |
| Erro em PrivateLayout ProtectedRoute não renderiza | ErrorBoundary captura e renderiza fallback |

---

## 📝 Checklist de Implementação

- [ ] Criar `src/components/ProtectedRoute.tsx` com lógica de redirect
- [ ] Criar `src/components/PrivateLayout.tsx` com header/nav/layout
- [ ] Criar `src/components/LoadingSpinner.tsx` com spinner animado
- [ ] Criar `src/components/ErrorBoundary.tsx` com error handling
- [ ] Refatorar `src/App.tsx` (ou criar `src/routes/index.tsx`) com React Router setup
- [ ] Adicionar rotas protegidas (placeholder para /dashboard, /perfil, /agendamento/novo)
- [ ] Configurar lazy loading com React.lazy + Suspense
- [ ] Remover hardcoded <Navigate> de LoginPage (deixar que App.tsx gerencie routing)
- [ ] Criar página placeholder para /dashboard, /perfil (suficiente para teste)
- [ ] Testes: ProtectedRoute redirects quando não-autenticado
- [ ] Testes: ProtectedRoute renderiza quando autenticado
- [ ] Testes: Lazy loading funciona (chunk é carregado)
- [ ] Testes: Error Boundary captura erro
- [ ] Testes: PrivateLayout renderiza header + nav
- [ ] Testes: Logout funciona e redireciona /login
- [ ] Validar responsividade (mobile 320px, tablet, desktop)
- [ ] Validar acessibilidade (focus indicators, keyboard nav, ARIA)
- [ ] Documentar padrões em `docs/FRONTEND_PATTERNS.md` ou README

---

## 🎬 Próxima Story

Após esta story estar completa:

1. **Story 3.1 (Booking Form):** Pode começar (ProtectedRoute + PrivateLayout já prontos)
2. **Story 4.1 (Admin Dashboard):** Pode começar (mesma infraestrutura)
3. **Story 2.4 (JWT Sessions):** Pode refinar token handling baseado em como auth flows funciona aqui

