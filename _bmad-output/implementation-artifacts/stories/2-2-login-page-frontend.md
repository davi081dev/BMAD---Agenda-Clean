---
storyId: "2.2"
storyKey: "2-2-login-page-frontend"
epicId: "2"
epicName: "Authentication & User Management"
title: "Login Page (Frontend)"
priority: "critical"
status: "ready-for-dev"
estimatedHours: 4
createdDate: "20 de maio de 2026"
projectName: "agenda-clean"
language: "pt-br"
---

# Story 2.2: Login Page (Frontend)

## 📋 Contexto & Visão Geral

Esta é a **primeira story de Frontend** do Epic 2 (Authentication & User Management), implementando a interface visual de login que permite clientes (Ana) e admin (João) autenticarem via Google OAuth. Ela depende diretamente da Story 2.1 (Google OAuth Backend) que fornece o endpoint `/auth/google` e a orquestração OAuth.

Seu objetivo: criar uma **página de login responsiva, acessível e centrada no usuário** que:
1. Exiba um único botão de ação: "Entrar com Google"
2. Redirecione para `/auth/google` quando clicado
3. Trate estados de carregamento com feedback visual
4. Exiba erros de forma clara e acionável
5. Funcione perfeitamente em mobile (320px) e desktop (1024px+)
6. Atenda a requisitos de acessibilidade (WCAG A)

**Valor de Negócio:**
- Fornece a primeira experiência do usuário (Ana) com o sistema
- Zero-friction login (1 clique = Google OAuth automático)
- Define tom de confiança: simples, claro, profissional
- Habilita todas as journeys de cliente e admin (sem login, nada funciona)
- Reduz fricção de cadastro manual (problema resolvido em 2.1 backend)

**Impacto na Implementação:**
- ✅ **Bloqueador Direto:** Frontend não pode funcionar sem página de login
- ✅ **Bloqueador Indireto:** Stories 3.1-3.6 (Client Experience) e 4.1-4.6 (Admin Dashboard) requerem login funcional
- ✅ **Habilitador:** Após 2.2, desenvolvimento de páginas protegidas (dashboard, agendamento form) pode começar

**Dependências:**
- ✅ **Completada:** Epic 1 (Foundation & Setup) — frontend Vite+React+Tailwind pronto
- ✅ **Completada:** Story 2.1 (Google OAuth Backend) — endpoints `/auth/google` e `/auth/google/callback` implementados
- ✅ **Requer:** Story 1.4 (Environment Config) — `VITE_API_URL` disponível no `.env.local`

**Sprint Assignment:**
- Sprint: 1 (Week 1-2)
- Sequência: Primeira story de Frontend do Epic 2 (parallelizável com 2.1 backend após 2.1 estar pronto)
- Paralelizável com: 2.3, 2.4, 2.5, 2.6 (todas dependem de 2.1 backend estar pronto, frontend pode começar na sequência)

---

## 👤 User Story

```
Como cliente/usuário do sistema agenda-clean,
Quero fazer login com minha conta Google em um único clique,
Para que eu possa acessar minha agenda de agendamentos,
sem precisar criar uma nova conta ou preencher formulários.

Critério de Aceitação: Login deve ser completado em < 10 segundos,
sem erros, com feedback visual claro durante o processo.
```

---

## 🎯 Objetivo & Requisitos Funcionais

**Objetivo Principal:**
Implementar a camada de UI de autenticação (frontend) que permite:
1. Usuários verem uma página de login profissional e confiável
2. Clicar "Entrar com Google" e ser redirecionados ao fluxo OAuth
3. Receber feedback visual durante o login (loading state)
4. Ver erros claros se o login falhar (resposta de erro do backend)
5. Ser redirecionados ao dashboard após login bem-sucedido

**Escopo Específico desta Story:**

1. ✅ Criar componente `LoginPage.tsx` (página principal de login)
2. ✅ Criar componente `GoogleLoginButton.tsx` (botão de ação)
3. ✅ Criar componente `LoginLayout.tsx` (layout responsivo)
4. ✅ Implementar redirecionamento para `/auth/google` no clique
5. ✅ Implementar loading state durante autenticação
6. ✅ Implementar exibição de erros (se login falhar)
7. ✅ Implementar verificação de URL de erro (query params do callback)
8. ✅ Configurar integração com backend (`VITE_API_URL`)
9. ✅ Testar responsividade (mobile 320px, tablet, desktop)
10. ✅ Testar acessibilidade (WCAG A: focus indicators, semantic HTML, keyboard nav)
11. ✅ Criar testes unitários para componentes
12. ✅ Documentar padrões de componentes e fluxo OAuth

---

## ✅ Acceptance Criteria (BDD)

### AC1: Componente LoginPage renderiza corretamente

```gherkin
GIVEN que eu sou novo usuário abrindo o site agenda-clean
WHEN abro a URL http://localhost:5173 (sem autenticação)
THEN a página renderiza com:
  - Header com logo/título "agenda-clean" (texto ou ícone)
  - Seção principal com:
    - Título: "Bem-vindo ao agenda-clean"
    - Subtítulo: "Agendamento de limpeza de sofá feito fácil"
    - Único botão visível: "Entrar com Google" (azul, ícone Google, 48px altura em mobile)
    - Rodapé opcional: "© 2026 agenda-clean" ou similar
  - Layout é centrado, simples, nada piscante ou distraído
AND nenhuma outra página/conteúdo é visível (login é a única opção)
AND página carrega sem JavaScript errors
```

### AC2: LoginLayout é responsivo (mobile-first)

```gherkin
GIVEN que quero usar o sistema em qualquer dispositivo
WHEN abro a página de login em diferentes resoluções
THEN layout se adapta corretamente:
  - 320px (mobile): 
    - Column layout, botão full-width
    - Padding: 16px left/right
    - Botão 48px altura (thumb-friendly)
    - Título 24px, subtítulo 16px
  - 768px (tablet):
    - Ainda column layout mas com mais breathing room
    - Padding: 24px left/right
    - Botão agora ~300px width (centrado)
  - 1024px+ (desktop):
    - Pode usar layout de 2 colunas (imagem esquerda, form direita) OU manter centrado
    - Padding adequado para não estreito demais
    - Botão ~250px width
AND CSS usa Tailwind breakpoints: sm:, md:, lg:
AND sem media queries customizadas (puro Tailwind)
```

### AC3: GoogleLoginButton dispara redirecionamento para /auth/google

```gherkin
GIVEN que clico o botão "Entrar com Google"
WHEN onClick é disparado
THEN:
  - Button muda para loading state (text desaparece, spinner aparece)
  - Requisição é feita para: GET ${VITE_API_URL}/auth/google
  - Backend redireciona o navegador para Google OAuth
  - Usuário é levado ao Google login/consent screen
AND button é disabled durante loading (não pode ser clicado novamente)
AND nenhum erro é logado se a requisição for bem-sucedida
```

### AC4: Loading state funciona durante autenticação

```gherkin
GIVEN que estou no processo de login via Google
WHEN await redirect to Google happens (loading period)
THEN:
  - GoogleLoginButton mostra loading indicator:
    - Spinner ou skeleton loader (no botão)
    - Texto muda para "Processando..." ou desaparece
    - Button é disabled (pointer-events: none)
    - Cursor muda para não-interativo
  - Usuário vê feedback visual claro (algo está acontecendo)
AND loading state dura no máximo 2 segundos antes de redirecionamento
AND loading state não bloqueia a página (fundo transparente, não modal)
```

### AC5: Página detecta erro de login via query params

```gherkin
GIVEN que login falhou (por qualquer razão)
WHEN backend redireciona para /login?error=oauth_error
THEN:
  - LoginPage detecta query param 'error'
  - Mensagem de erro é exibida abaixo do botão:
    - Fundo vermelho claro (Red #FEE2E2)
    - Texto vermelho escuro (Red #DC2626)
    - Ícone de erro ao lado
    - Mensagem legível: "Falha ao fazer login. Por favor, tente novamente."
  - Botão permanece clicável (usuário pode tentar novamente)
AND erro é clearable (clique em X ou tenta novamente sem erro remanescente)
AND erro não expõe informações técnicas (não mostra "OAuth strategy failed")
```

### AC6: Componente é acessível (WCAG A)

```gherkin
GIVEN que quero usar o site com teclado apenas
WHEN navego a página com Tab
THEN:
  - Foco visual é CLARO e visível em todo elemento interativo (blue #2563EB border/outline)
  - Posso dar Tab no botão "Entrar com Google"
  - Posso pressionar Enter para ativar o botão
  - Foco order é lógico: top-to-bottom, left-to-right
  - Nenhum foco fica preso (tab trap)
AND button tem aria-label descritivo: "Fazer login com Google"
AND página tem title semântico: <title>Fazer Login - agenda-clean</title>
AND heading usa tag <h1>: "Bem-vindo ao agenda-clean"
AND HTML é semântico (não divs genéricos, mas <main>, <button>, etc)
AND cores não são o único indicador de estado:
  - Error está indicado por COR + ÍCONE + TEXTO
  - Loading está indicado por SPINNER + DISABLED STATE + CURSOR CHANGE
```

### AC7: Testes unitários cobrem componentes principais

```gherkin
GIVEN que quero qualidade confiável
WHEN executo npm test
ENTÃO arquivo src/components/__tests__/LoginPage.test.tsx contém:
  - Teste: LoginPage renderiza título, subtítulo, botão
  - Teste: GoogleLoginButton dispara onClick quando clicado
  - Teste: GoogleLoginButton mostra loading state quando prop isLoading=true
  - Teste: GoogleLoginButton é disabled quando isLoading=true
  - Teste: LoginPage detecta query param 'error' e exibe mensagem
  - Teste: Mensagem de erro desaparece quando usuário tenta novamente
  - Teste: ARIA labels estão presentes no botão
  - Teste: Layout é responsivo (teste sem assertions visuais, só que renderiza)
AND arquivo src/components/__tests__/LoginLayout.test.tsx contém:
  - Teste: LoginLayout renderiza children corretamente
  - Teste: LoginLayout aplica classes Tailwind (via className string ou component test)
AND todos os testes passam (100% pass rate)
AND coverage >= 80% (funções, linhas)
```

### AC8: Integração com backend funciona corretamente

```gherkin
GIVEN que tenho backend rodando em http://localhost:3000
WHEN clico o botão "Entrar com Google" na página de login
THEN:
  - Frontend chama GET ${VITE_API_URL}/auth/google (http://localhost:3000/api/auth/google)
  - Backend responde com redirecionamento (HTTP 302 ou similar)
  - Browser segue o redirecionamento (window.location.href = ...)
  - Usuário é levado a Google OAuth
AND nenhum erro CORS é exibido no console
AND ${VITE_API_URL} é resolvido corretamente a partir do .env.local
AND se backend está offline, usuário vê erro claro (não página branca de erro)
```

### AC9: Tratamento de erros graceful

```gherkin
GIVEN que várias coisas podem dar errado
WHEN uma das seguintes ocorre:
  - Backend retorna 500 Internal Server Error
  - VITE_API_URL está incorreto/vazio
  - Network está offline
  - Browser bloqueia redirecionamento (popup blocker)
THEN:
  - Usuário vê mensagem de erro legível e acionável
  - Botão continua clicável (pode tentar novamente)
  - Nenhuma página branca de erro, nenhum crash
  - Console do developer mostra erro com contexto claro
AND mensagem de erro específica depende do tipo:
  - Network error: "Erro de conexão. Verifique sua internet."
  - Backend error: "Serviço indisponível. Tente novamente mais tarde."
  - Missing env var: "Configuração do servidor incompleta. Entre em contato com suporte."
```

### AC10: Após login bem-sucedido, usuário é redirecionado ao dashboard

```gherkin
DADO que login foi bem-sucedido (2.1 backend criou JWT token)
QUANDO /auth/google/callback é executado
ENTÃO:
  - Backend redireciona para ${FRONTEND_URL}/dashboard (e.g., http://localhost:5173/dashboard)
  - Frontend chama useEffect ou similar para verificar autenticação
  - Se token está válido (no cookie): dashboard renderiza
  - Se token está inválido: usuário retorna para página de login
AND cookie de autenticação é httpOnly (não acessível via JavaScript malicioso)
AND redirecionamento é automático (não requer clique adicional)
AND nenhuma informação sensível é exposição em URL
```

### AC11: Componentes seguem padrões do projeto (Tailwind + shadcn/ui)

```gherkin
GIVEN que preciso manter código consistente
WHEN crio componentes LoginPage, GoogleLoginButton, LoginLayout
THEN:
  - Uso Tailwind CSS para todos os estilos (sem CSS modules ou inline styles)
  - GoogleLoginButton é baseado em componente shadcn/ui Button (quando aplicável)
  - LoginLayout é um componente React funcional simples
  - Componentes usam TypeScript strict mode
  - Props são tipadas explicitamente (interfaces/types)
  - Sem prop-drilling (use Context ou Redux se necessário)
AND código segue o padrão de componentes já no projeto:
  - Naming: PascalCase para componentes
  - Imports: Absolutos via src/ (não ../, ../../)
  - Exports: Default exports para componentes
AND código passa em linter: npm run lint
```

### AC12: Página de login tem copy profissional e clara em português

```gherkin
GIVEN que usuários são brasileiros
WHEN abrem a página de login
THEN:
  - Título: "Bem-vindo ao agenda-clean" (claro, sem jargão)
  - Subtítulo: "Agendamento de limpeza de sofá feito fácil" (explica valor)
  - Botão: "Entrar com Google" (ação clara, não "Log in" ou "Login")
  - Erro: "Falha ao fazer login. Por favor, tente novamente." (legível, não técnico)
  - Loading: "Processando..." (opcional, spinner é suficiente)
AND copy não tem erros ortográficos ou de português
AND copy não menciona detalhes técnicos (OAuth, Google API, etc)
AND copy está no código como strings (não hardcoded em componentes)
```

---

## 🏗️ Contexto Técnico & Decisões

### Stack Tecnológico (Frontend)

| Componente | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| **Framework** | React | ^18.0 | Já no projeto, componentes reativos |
| **Tipagem** | TypeScript | ^5.0 | Type safety, previne erros em runtime |
| **Styling** | Tailwind CSS | ^3.0 | Utility-first, responsivo, configurado no projeto |
| **UI Components** | shadcn/ui | latest | Acessível, copy-paste, customizável |
| **Router** | React Router v6 | ^6.0 | Navegação entre páginas (instalado em 1.1) |
| **HTTP Client** | Fetch API native | — | Nativo, sem dependências extras (no fetch wrapper se necessário) |
| **State Management** | React Context | — | Simples para autenticação, sem Redux (pode ser adicionado depois) |
| **Testing** | Vitest + React Testing Library | latest | Rápido, focado em testes de comportamento |

### Padrão de Autenticação: OAuth 2.0 + Cookie-Based Sessions

**Por que Cookie (não localStorage ou sessionStorage):**
- ✅ httpOnly cookie é protegido contra XSS
- ✅ Browser envia automaticamente (sem código manual)
- ✅ Suporte a CSRF (sameSite attribute)
- ✅ Padrão HTTP seguro

**Por que Google OAuth (não Magic Links ou Password):**
- ✅ Zero-friction (Ana não cria nova senha)
- ✅ Google gerencia segurança (não armazenamos senhas)
- ✅ Familiar para usuários brasileiros

**Por que sem Token no URL:**
- ✅ Token em cookie é mais seguro que em URL
- ✅ Previne exposição em logs, browser history, etc

### Fluxo de Autenticação (Frontend Perspective)

```
┌─ LoginPage ─────────────────┐      ┌─ Backend ──────────────────┐
│                             │      │                            │
│ 1. Usuário vê:              │      │                            │
│    "Entrar com Google"      │      │                            │
│    (botão azul)             │      │                            │
│                             │      │                            │
│ 2. Clica botão              │      │                            │
│    onClick triggered        │      │                            │
│                             │      │                            │
│ 3. Button muda para         │      │                            │
│    loading state            │      │                            │
│    (spinner + disabled)     │      │                            │
│                             │      │                            │
│ 4. fetch() chama:           │      │                            │
│    GET /auth/google ─────────────> 5. Backend executa          │
│                             │      │    Google OAuth redirect   │
│                             │      │                            │
│ 6. Browser recebe 302 ────────────> 7. Backend redireciona    │
│    redirect + seguirá      │      │    para Google             │
│    automaticamente          │      │                            │
│                             │      │                            │
│ (Google OAuth flow)         │      │ (Fora do escopo desta      │
│                             │      │  story, veja 2.1 backend)  │
│                             │      │                            │
│ 8. Após Google auth,        │      │                            │
│    Backend redireciona ────────────> /dashboard                │
│    para frontend:           │      │    (com JWT cookie)        │
│    /dashboard               │      │                            │
│                             │      │                            │
│ 9. Frontend detecta         │      │                            │
│    usuário autenticado      │      │                            │
│    (cookie no browser)      │      │                            │
│                             │      │                            │
│ 10. LoginPage redireciona   │      │                            │
│     para <Dashboard />      │      │                            │
│     (useNavigate ou         │      │                            │
│      useEffect com auth)    │      │                            │
│                             │      │                            │
└─────────────────────────────┘      └────────────────────────────┘
```

### Estrutura de Componentes React

**Hierarquia:**

```
pages/
  LoginPage.tsx (página completa)
    ├─ LoginLayout (layout externo)
    │   └─ GoogleLoginButton (componente de ação)
    │       └─ (usa shadcn/ui Button internamente)
    └─ ErrorMessage (feedback de erro)
```

**Props & State Management:**

```typescript
// LoginPage.tsx
- State: isLoading (boolean), error (string | null)
- Effects: 
  - Verifica query params para detectar erro
  - Verifica autenticação ao montar (redireciona se já autenticado)
  
// LoginLayout.tsx
- Props: children (ReactNode)
- Apenas apresentação (nenhuma lógica)

// GoogleLoginButton.tsx
- Props: isLoading (boolean), onClick (function)
- Renderiza botão com estado de loading
```

### Estrutura de Arquivos

```
frontend/src/
├── components/
│   ├── auth/
│   │   ├── GoogleLoginButton.tsx
│   │   ├── LoginLayout.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── __tests__/
│   │       ├── LoginPage.test.tsx
│   │       ├── GoogleLoginButton.test.tsx
│   │       └── LoginLayout.test.tsx
│   └── ...existing components
│
├── pages/
│   ├── LoginPage.tsx
│   └── ...existing pages
│
├── types/
│   ├── auth.ts (Auth types/interfaces)
│   └── ...existing types
│
├── services/
│   ├── authService.ts (funções de auth: getAuthStatus, logout, etc)
│   └── ...existing services
│
├── hooks/
│   ├── useAuth.ts (hook para acessar estado de autenticação)
│   └── ...existing hooks
│
└── ...existing folders

// Key new/modified files:
- components/auth/GoogleLoginButton.tsx (NEW)
- components/auth/LoginLayout.tsx (NEW)
- components/auth/ErrorMessage.tsx (NEW)
- pages/LoginPage.tsx (NEW)
- types/auth.ts (NEW)
- services/authService.ts (NEW or ADD methods)
- hooks/useAuth.ts (NEW)
- App.tsx (MODIFY: adiciona rota /login)
```

### Configuração de Ambiente

**Arquivo: `.env.local` (na raiz de frontend/)**

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# (Outras vars do Google OAuth se necessárias no frontend - tipicamente não)
```

**Arquivo: `.env.example`**

```bash
# Backend API URL (deve apontar para seu servidor backend)
# Development: http://localhost:3000/api
# Production: https://seu-dominio.com/api
VITE_API_URL=http://localhost:3000/api
```

### Padrões de Erro & Retry

**Tratamento de Erros no Frontend:**

1. **Erro de Rede (Network Error)**
   - Catch block em fetch
   - Mensagem: "Erro de conexão. Verifique sua internet."
   - Retry: Botão permanece clicável

2. **Erro 4xx do Backend**
   - Backend retorna 400/401/403
   - Mensagem: Extraída de `response.json().error` se disponível, ou genérica
   - Retry: Botão permanece clicável

3. **Erro 5xx do Backend**
   - Backend retorna 500/502/503
   - Mensagem: "Serviço indisponível. Tente novamente mais tarde."
   - Retry: Botão permanece clicável

4. **Erro de Configuração (missing VITE_API_URL)**
   - Detectado ao montar componente
   - Mensagem: "Configuração do servidor incompleta. Entre em contato com suporte."
   - Severity: CRITICAL (não deve chegar em produção)

### Testes: Cobertura Esperada

**Arquivos de Teste:**

```
src/components/auth/__tests__/
├── LoginPage.test.tsx
├── GoogleLoginButton.test.tsx
└── LoginLayout.test.tsx

src/services/__tests__/
└── authService.test.ts

src/hooks/__tests__/
└── useAuth.test.ts
```

**Casos de Teste Mínimos:**

```javascript
// LoginPage.test.tsx
✓ renderiza título, subtítulo, botão
✓ detecta query param 'error' e mostra mensagem
✓ permite tentar novamente após erro
✓ redireciona para dashboard se já autenticado

// GoogleLoginButton.test.tsx
✓ renderiza com texto "Entrar com Google"
✓ dispara onClick quando clicado
✓ mostra spinner quando isLoading=true
✓ é disabled quando isLoading=true
✓ tem aria-label descritivo

// LoginLayout.test.tsx
✓ renderiza children
✓ aplica layout responsivo

// authService.test.ts
✓ getAuthStatus retorna usuário autenticado
✓ getAuthStatus retorna null se não autenticado
✓ logout limpa state

// useAuth.test.ts
✓ retorna estado de autenticação
✓ fornece método logout
```

---

## 📁 Detalhamento da Implementação

### 1. GoogleLoginButton.tsx

Componente que renderiza o botão com lógica de redirecionamento OAuth.

**Responsabilidades:**
- Renderizar botão azul "Entrar com Google"
- Lidar com clique → chamar `/auth/google`
- Mostrar loading state durante redirecionamento
- Ser disabled durante carregamento

**Props:**
```typescript
interface GoogleLoginButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
}
```

**Comportamento:**
```
User clicks button
  → isLoading = true
  → spinner/disabled state
  → window.location.href = `/auth/google`
  → browser redireciona ao OAuth
  → (loading state mantém até redirecionamento)
```

### 2. LoginLayout.tsx

Layout wrapper simples para a página de login.

**Responsabilidades:**
- Estrutura HTML semântica
- Styling responsivo (mobile-first Tailwind)
- Centralizar conteúdo

**Props:**
```typescript
interface LoginLayoutProps {
  children: ReactNode;
}
```

**Estrutura HTML:**
```html
<div> {/* full-screen container */}
  <main>
    <div> {/* centered card */}
      {children}
    </div>
  </main>
</div>
```

### 3. ErrorMessage.tsx

Componente para exibir mensagens de erro.

**Responsabilidades:**
- Exibir erro com fundo vermelho claro
- Mostrar ícone de erro
- Botão X para fechar (ou auto-desaparece)

**Props:**
```typescript
interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}
```

### 4. LoginPage.tsx

Página completa de login.

**Responsabilidades:**
- Orquestrar componentes (LoginLayout + GoogleLoginButton + ErrorMessage)
- Detectar query param `error` e exibir mensagem
- Verificar autenticação ao montar (redirecionar se já logged in)
- Gerenciar estado de loading durante OAuth

**Lógica:**
```typescript
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. Verifica se já autenticado ao montar
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.getAuthStatus();
      if (user) navigate('/dashboard');
    };
    checkAuth();
  }, []);

  // 2. Detecta query param 'error'
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('error')) {
      setError('Falha ao fazer login. Por favor, tente novamente.');
    }
  }, []);

  // 3. Handler para clique do botão
  const handleLogin = () => {
    setIsLoading(true);
    // Redirecionamento é automático via window.location.href
  };

  return (
    <LoginLayout>
      <h1>Bem-vindo ao agenda-clean</h1>
      <p>Agendamento de limpeza de sofá feito fácil</p>
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      <GoogleLoginButton isLoading={isLoading} onClick={handleLogin} />
    </LoginLayout>
  );
};
```

### 5. authService.ts

Funções utilitárias para autenticação.

**Métodos:**
```typescript
// Verifica se usuário está autenticado (frontend-side)
async function getAuthStatus() {
  try {
    const response = await fetch(`${API_URL}/auth/status`, { credentials: 'include' });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// Faz logout
async function logout() {
  await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
  // Limpa local state se necessário
}

// Função auxiliar para redirecionar a Google OAuth
function redirectToGoogleAuth() {
  const apiUrl = import.meta.env.VITE_API_URL;
  window.location.href = `${apiUrl}/auth/google`;
}
```

### 6. useAuth.ts

Hook customizado para acessar estado de autenticação.

```typescript
function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.getAuthStatus().then(u => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, isLoading, logout, isAuthenticated: !!user };
}
```

### 7. App.tsx (modificações)

Adicionar rota para `/login`:

```typescript
// App.tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  {/* outras rotas */}
</Routes>
```

---

## 🔍 Critérios de Qualidade

**Antes de marcar como Done:**

- ✅ Todos os 12 Acceptance Criteria passam
- ✅ Testes unitários: 100% pass, ≥ 80% coverage
- ✅ Lint (ESLint): 0 errors, 0 warnings
- ✅ Type check (TypeScript): 0 errors
- ✅ Manual testing:
  - [ ] Login funciona em mobile (Chrome DevTools 320px)
  - [ ] Login funciona em tablet (768px)
  - [ ] Login funciona em desktop (1024px+)
  - [ ] Navegação por teclado (Tab, Enter) funciona
  - [ ] Focus indicators visíveis
  - [ ] Erros são legíveis
  - [ ] Loading state é visível
- ✅ Accessibility audit (Lighthouse): ≥ 90 score
- ✅ Código segue convenções do projeto (imports, naming, etc)
- ✅ Documentação atualizada (README, Storybook se aplicável)

---

## 📚 Referências & Links

### Documentos do Projeto

- **PRD:** [planning-artifacts/prd.md](../planning-artifacts/prd.md) — Requisitos completos do sistema
- **UX Design:** [planning-artifacts/ux-design-specification.md](../planning-artifacts/ux-design-specification.md) — Design tokens, cores, layout
- **Epics & Stories:** [planning-artifacts/epics-and-stories.md](../planning-artifacts/epics-and-stories.md) — Contexto de todas as stories
- **Story 2.1 (Dependency):** [stories/2-1-google-oauth-setup-backend.md](./2-1-google-oauth-setup-backend.md) — Backend OAuth implementado

### Documentação Técnica

- **React Router:** [reactrouter.com](https://reactrouter.com) — Navegação entre páginas
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com) — Utility CSS classes
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com) — Componentes React acessíveis
- **Vitest:** [vitest.dev](https://vitest.dev) — Testing framework
- **React Testing Library:** [testing-library.com/react](https://testing-library.com/react) — Testes de comportamento

### Padrões de Segurança

- **OAuth 2.0 Flow:** [oauth.net/2/](https://oauth.net/2/) — Especificação OAuth
- **OWASP XSS Prevention:** [owasp.org/www-community/attacks/xss/](https://owasp.org/www-community/attacks/xss/) — Por que httpOnly cookie é seguro
- **WCAG A Compliance:** [w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/) — Acessibilidade web

### Recursos da Empresa

- **Projeto Frontend:** `/home/davi/Documentos/Projetos/agenda-clean/frontend/` — Código-fonte
- **Backend API:** `/home/davi/Documentos/Projetos/agenda-clean/backend/` — Endpoints OAuth
- **Package.json:** `frontend/package.json` — Dependências instaladas

---

## 💡 Notas Importantes para o Dev

### Segurança

- ✅ **NUNCA** armazene token em localStorage (vulnerável a XSS)
- ✅ **NUNCA** exponha `GOOGLE_CLIENT_ID` (isso é public, está ok)
- ✅ **SEMPRE** use `credentials: 'include'` em fetch quando precisar de cookies
- ✅ **SEMPRE** valide estado OAuth no backend (frontend é apenas apresentação)

### Performance

- ✅ LoginPage é a primeira página que usuários veem → deve carregar < 1s
- ✅ Nenhuma dependência pesada necessária (React Router já está lá)
- ✅ Nenhuma API call até usuário clicar botão (load on demand)

### Acessibilidade

- ✅ focus-visible classes do Tailwind para indicadores de foco
- ✅ aria-label no botão explicando ação
- ✅ Mensagens de erro não são visuais-only (texto + ícone)
- ✅ HTML semântico (<button> real, não <div> simulado)

### Testes

- ✅ Testes devem focar em **comportamento**, não implementação
- ✅ Não teste `window.location.href = ...` diretamente (muito frágil)
- ✅ Mock backend endpoints (`fetch` mock) para testes isolados

---

## ✍️ Checklist de Entrega

- [ ] Componentes criados (GoogleLoginButton, LoginLayout, ErrorMessage, LoginPage)
- [ ] Arquivo authService.ts criado com funções de autenticação
- [ ] Hook useAuth.ts criado para estado global de autenticação
- [ ] Rota `/login` adicionada em App.tsx
- [ ] Todos os 12 Acceptance Criteria verificados manualmente
- [ ] Testes unitários escritos e passando (≥ 80% coverage)
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors
- [ ] Responsividade testada (320px, 768px, 1024px)
- [ ] Acessibilidade: navegação por teclado funciona, focus indicators visíveis
- [ ] Documentação atualizada (este arquivo + comentários no código)
- [ ] PR criado com descrição clara de mudanças
- [ ] Code review aprovado
- [ ] Story marcada como "done" no sprint-status.yaml

---

## 🤔 Perguntas Frequentes (FAQ)

**P: Por que não usar `useNavigate` ao invés de `window.location.href`?**  
R: OAuth requer redirecionamento de navegador (fora da SPA). `window.location.href` é o padrão correto.

**P: E se VITE_API_URL não estiver definido?**  
R: Component deve exibir erro claro ao usuário (AC9). Em development, console.error. Em produção, monitore com Sentry/similar.

**P: Como testamos o Google OAuth sem credenciais reais?**  
R: Testes unitários mockam fetch. Testes E2E (se houver) usam credenciais de teste do Google.

**P: Preciso fazer logout?**  
R: Implementar botão de logout em outra story (3.6 ou 4.1). Esta story é apenas login.

---

**Criado:** 20 de maio de 2026  
**Linguagem:** Português (Brasil)  
**Skill:** bmad-create-story  
**Status:** Ready for Development ✅
