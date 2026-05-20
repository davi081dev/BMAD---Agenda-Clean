---
storyId: "1.1"
storyKey: "1-1-initialize-frontend-project"
epicId: "1"
epicName: "Foundation & Setup"
title: "Inicializar Projeto Frontend"
priority: "critical"
status: "ready-to-implement"
estimatedHours: 2
createdDate: "13 de maio de 2026"
projectName: "agenda-clean"
language: "pt-br"
---

# Story 1.1: Inicializar Projeto Frontend

## 📋 Contexto & Visão Geral

Este é o **primeiro story crítico** do epic de Foundation & Setup. Não há dependências - é um **blocker que habilita todos os outros epics**. O objetivo é configurar a arquitetura frontend completa (Vite + React + TypeScript + Tailwind CSS) com a estrutura de pastas, componentes base, e padrões de codificação que todos os stories subsequentes utilizarão.

**Valor de Negócio:**
- Habilita desenvolvimento paralelo de todas as features frontend
- Estabelece padrões de código que serão reusados em 30+ componentes posteriores
- Configura bundle optimization e performance baselines
- Define pipeline de desenvolvimento (hot reload, type checking, etc)

**Dependências:**
- ❌ Nenhuma (blocker para Epics 2, 3, 4, 5)

**Sprint Assignment:**
- Sprint: 0 (Semana 1)
- Sequência: Primeira story (paralelo com Story 1.2 Backend)

---

## 👤 User Story

```
Como desenvolvedor do projeto agenda-clean,
Quero ter um projeto React moderno, type-safe e bem-estruturado,
Para que eu possa construir a interface de cliente (Ana) e admin (João) 
com produtividade, confiança e padrões consistentes.
```

---

## 🎯 Objetivo & Requisitos Funcionais

**Objetivo Principal:**
Criar a base sólida do projeto frontend que será mantida durante toda a implementação. Cada decisão aqui impacta a produtividade nos próximos 27 stories.

**Escopo Específico desta Story:**

1. ✅ Criar novo projeto React com Vite (latest stable version)
2. ✅ Configurar TypeScript com strict mode habilitado
3. ✅ Instalar e configurar Tailwind CSS com design system tokens
4. ✅ Estruturar pastas base (src/components, src/pages, src/hooks, src/utils, src/types, src/services)
5. ✅ Criar componentes base reutilizáveis (Button, Input, Card, Modal, Badge)
6. ✅ Configurar sistema de design (colors, typography, spacing, shadows)
7. ✅ Implementar estrutura de arquivo .env para configuração
8. ✅ Configurar scripts npm (dev, build, lint, type-check)
9. ✅ Criar projeto Git com .gitignore apropriado
10. ✅ Documentar setup local e padrões de codificação no README.md

---

## ✅ Acceptance Criteria (BDD)

### AC1: Projeto Vite + React criado com sucesso
```gherkin
GIVEN eu rodo npm create vite@latest
WHEN configuro com React e TypeScript
THEN o projeto está criado com todas as dependências instaladas
AND npm run dev funciona sem erros
AND a aplicação abre em http://localhost:5173 automaticamente
```

### AC2: TypeScript configurado em strict mode
```gherkin
GIVEN que o projeto foi criado
WHEN executo npm run type-check
THEN não há erros de tipo
AND tsconfig.json tem: strict: true, moduleResolution: "bundler"
AND todos os arquivos .tsx têm tipos explícitos
```

### AC3: Tailwind CSS totalmente funcional
```gherkin
GIVEN que o Tailwind está instalado e configurado
WHEN crio uma página de teste com classes Tailwind
THEN as classes são compiladas corretamente
AND o site fica responsivo (testado em mobile, tablet, desktop)
AND design tokens estão definidos em tailwind.config.ts
```

### AC4: Estrutura de pastas implementada
```gherkin
GIVEN que quero organizar o código
WHEN navego a src/
THEN encontro estrutura:
  src/
  ├── components/       # componentes reutilizáveis
  ├── pages/            # páginas (Login, Dashboard, etc)
  ├── hooks/            # custom hooks
  ├── services/         # API client, auth service
  ├── utils/            # helpers, formatters
  ├── types/            # interfaces e tipos TypeScript
  ├── App.tsx           # root component
  └── main.tsx          # entry point
```

### AC5: Componentes base criados
```gherkin
GIVEN que preciso de componentes reutilizáveis
WHEN navego a src/components/
THEN encontro implementados:
  - Button.tsx (primary, secondary, danger, disabled states)
  - Input.tsx (text, email, date, time fields com labels)
  - Card.tsx (container com padding e shadow)
  - Modal.tsx (dialog com focus management)
  - Badge.tsx (5 status states: solicitado, confirmado, em_atendimento, concluído, cancelado)
  - Alert.tsx (success, error, info, warning)
  - LoadingSpinner.tsx (feedback visual)
AND cada componente tem:
  - Props interface explícita
  - Acessibilidade (aria labels, semantic HTML)
  - Tailwind classes aplicadas
  - Exemplos de uso em comentários
```

### AC6: Design System estabelecido
```gherkin
GIVEN que quero manter visual consistente
WHEN abro tailwind.config.ts
THEN encontro configurado:
  - Color palette (Blue, Green, Red, Orange, Gray, White)
  - Typography scale (11px a 32px com line-heights)
  - Spacing system (4px base unit)
  - Shadows (sm, md, lg)
  - Border radius (xs, sm, md, lg)
AND cada token é nomeado semanticamente
AND a paleta de cores está otimizada para contrast WCAG AA
```

### AC7: Variáveis de ambiente configuradas
```gherkin
GIVEN que preciso de configuração por ambiente
WHEN crio arquivo .env.local
THEN posso definir:
  VITE_API_URL=http://localhost:3000/api
  VITE_GOOGLE_CLIENT_ID=<a ser preenchido em Story 2.1>
AND .env.example existe com template
AND .env.local é ignorado por Git
AND o código acessa via import.meta.env.VITE_API_URL
```

### AC8: Scripts npm funcionam corretamente
```gherkin
GIVEN que quero desenvolver eficientemente
WHEN executo:
  - npm run dev      # hot reload servidor development
  - npm run build    # production build minificado
  - npm run lint     # verificação de código (ESLint)
  - npm run type-check  # verificação de tipos (tsc)
THEN todos os scripts executam sem erros
AND build produz bundle < 500KB (gzipped)
AND lint output é claro e acionável
```

### AC9: Git inicializado com .gitignore apropriado
```gherkin
GIVEN que preciso versionarno código
WHEN navego ao diretório raiz do projeto
THEN:
  - git init foi executado
  - .gitignore existe com:
    node_modules/
    dist/
    .env.local
    .DS_Store
    *.log
  - First commit "feat(frontend): initialize vite react project"
```

### AC10: Documentação de setup local
```gherkin
GIVEN que um novo desenvolvedor entra no projeto
WHEN lê README.md na raiz do projeto frontend
ENTÃO encontra:
  1. Pré-requisitos (Node 18+, npm 8+)
  2. Instruções de setup (git clone, npm install, npm run dev)
  3. Estrutura de pastas explicada
  4. Padrões de codificação (naming, file structure)
  5. Como rodar testes
  6. Como fazer build
  7. Troubleshooting comum
AND ele consegue fazer setup em <5 minutos
```

---

## 🏗️ Contexto Técnico & Decisões

### Stack Tecnológico

| Componente | Tecnologia | Versão | Justificativa |
|---|---|---|---|
| **Build Tool** | Vite | ^5.0 | Fast ES modules, 10x dev speed vs Webpack, modern standard |
| **Framework** | React | ^18.2 | Stable, mature, large ecosystem, proven track record |
| **Type Safety** | TypeScript | ^5.2 | Strict mode, excellent DX, catches errors at compile time |
| **Styling** | Tailwind CSS | ^3.3 | Utility-first, small bundle, responsive by default, WCAG ready |
| **Components** | shadcn/ui | latest | Pre-built accessible components, highly customizable |
| **Linting** | ESLint | ^8.0 | Code quality, consistency, catches common mistakes |
| **Code Format** | Prettier | ^3.0 | Automatic formatting, zero config |
| **HTTP Client** | Axios | ^1.6 | Simple, promise-based, interceptors for auth |
| **Routing** | TanStack Router | ^1.0 | Type-safe routing, modern alternative to React Router v6 |
| **State** | TanStack Query | ^5.0 | Server state management, caching, sync |

### Padrões Arquiteturais

**1. Componentes Funcionais + Hooks**
- ✅ Usar sempre componentes funcionais (não class components)
- ✅ Custom hooks para lógica reutilizável
- ✅ Props interface explícita para cada componente
- ✅ Destructuring props no parametro da função

Exemplo:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}) => {
  // implementação
};
```

**2. Separação de Responsabilidades**
- `src/components/` → componentes reutilizáveis (Button, Input, Modal)
- `src/pages/` → páginas inteiras (LoginPage, DashboardPage)
- `src/services/` → API calls e business logic (authService, bookingService)
- `src/hooks/` → lógica reutilizável (useAuth, useBooking)
- `src/utils/` → funções utilitárias (formatters, validators)
- `src/types/` → TypeScript interfaces (User, Booking, etc)

**3. Nomeação de Arquivos**
- Componentes: PascalCase `Button.tsx`, `LoginForm.tsx`
- Hooks: camelCase com prefixo `use` → `useAuth.ts`, `useForm.ts`
- Utils: camelCase → `formatDate.ts`, `validateEmail.ts`
- Types: PascalCase → `User.ts`, `Booking.ts`

**4. Acessibilidade por Padrão**
- Usar `<button>` em vez de `<div onClick>`
- Associar labels com inputs: `<label htmlFor="email">`
- ARIA labels para ícones: `<button aria-label="Close modal">`
- Cores nunca são a única indicação (usar ícones + texto)
- Contrast ratio mínimo 4.5:1

**5. Responsividade com Tailwind**
```typescript
// Mobile-first approach
<div className="w-full px-4 sm:px-6 md:px-8">
  <h1 className="text-2xl sm:text-3xl md:text-4xl">Title</h1>
</div>
```

---

## 📦 Entregáveis Específicos

### Estrutura de Pastas Completa
```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Alert.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts  # export all
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── formatTime.ts
│   │   ├── validateEmail.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── (será preenchido em stories posteriores)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css  # Tailwind imports
├── public/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── README.md
└── .eslintrc.js
```

### Arquivos de Configuração

**1. `tailwind.config.ts` com Design System**
```typescript
// Colors com semantic naming
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // blue
    900: '#1e3a8a',
  },
  success: '#10b981',    // green
  error: '#ef4444',      // red
  warning: '#f97316',    // orange
  gray: { 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 },
}

// Typography scale
fontSize: {
  xs: ['11px', { lineHeight: '16px' }],
  sm: ['12px', { lineHeight: '18px' }],
  base: ['14px', { lineHeight: '20px' }],
  lg: ['16px', { lineHeight: '24px' }],
  xl: ['18px', { lineHeight: '28px' }],
  '2xl': ['20px', { lineHeight: '28px' }],
  '3xl': ['24px', { lineHeight: '32px' }],
  '4xl': ['28px', { lineHeight: '36px' }],
  '5xl': ['32px', { lineHeight: '40px' }],
}

// Spacing system (4px base)
spacing: {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  // ... até 64px
}

// Shadows
boxShadow: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
}
```

**2. `vite.config.ts`**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

**3. `tsconfig.json` (strict mode)**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**4. `.env.example`**
```
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-client-id-here
```

**5. `package.json` scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "preview": "vite preview"
  }
}
```

---

## 🔗 Links para Requisitos Relacionados

**PRD:**
- [Responsive UI Requirements](../../planning-artifacts/prd.md#functional-requirements-38-total) - FR30-FR34
- [Success Criteria - Responsividade](../../planning-artifacts/prd.md#measurable-outcomes)

**Arquitetura:**
- [Technical Stack](../../planning-artifacts/architecture.md#technical-stack-decisions)
- [Code Structure & Patterns](../../planning-artifacts/architecture.md#code-structure--organization)
- [Performance Requirements](../../planning-artifacts/architecture.md#performance-baselines)

**UX Design:**
- [Design System & Tokens](../../planning-artifacts/ux-design-specification.md#design-system--tokens)
- [Color Palette](../../planning-artifacts/ux-design-specification.md#color-system)
- [Typography System](../../planning-artifacts/ux-design-specification.md#typography-system)
- [Component Library](../../planning-artifacts/ux-design-specification.md#component-library)

**Epics:**
- [Epic 1 Overview](../../planning-artifacts/epics-and-stories.md#epic-1-foundation--setup)
- [Story Dependencies](../../planning-artifacts/epics-and-stories.md#story-structure)

---

## 🎨 Padrões & Convenções a Usar

### Padrão de Componente
```typescript
// src/components/ExampleComponent.tsx
import React from 'react';

interface ExampleComponentProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * ExampleComponent - Brief description
 * 
 * @example
 * <ExampleComponent variant="primary" onClick={handleClick}>
 *   Click me
 * </ExampleComponent>
 */
export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  return (
    <div 
      className={`
        px-4 py-2 rounded-md
        ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      role="button"
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

export default ExampleComponent;
```

### Padrão de Custom Hook
```typescript
// src/hooks/useExample.ts
import { useState, useCallback } from 'react';

interface UseExampleOptions {
  initialValue?: string;
}

export const useExample = ({ initialValue = '' }: UseExampleOptions = {}) => {
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, setValue, reset };
};
```

### Padrão de Type Definition
```typescript
// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

export interface Booking {
  id: string;
  clientId: string;
  address: string;
  date: Date;
  time: string;
  notes?: string;
  status: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 📊 Estimativa & Timeline

| Tarefa | Duração | Notas |
|--------|---------|-------|
| Criar projeto Vite + React + TS | 15 min | npm create vite + instalar |
| Configurar Tailwind CSS + design tokens | 30 min | Implementar color palette, spacing, typography |
| Implementar componentes base | 45 min | Button, Input, Card, Modal, Badge, Alert, Spinner |
| Estruturar pastas e padrões | 15 min | Criar estrutura base + documentar |
| Configurar Git e .gitignore | 10 min | git init + first commit |
| Documentar README + padrões | 15 min | Setup local, estrutura, guidelines |
| **TOTAL** | **130 min (~2h)** | Pronto para dev paralelo |

---

## 🚀 Próximos Passos

Após completar esta story:

1. **Story 1.2** (paralelo) → Backend setup (Node.js+Express+TypeScript)
2. **Story 1.3** (paralelo) → Database schema + Prisma
3. **Story 1.4** (paralelo) → Environment configuration
4. **Story 1.5** (sequencial) → Project documentation + architecture README
5. **Epic 2** (blocker) → Autenticação Google OAuth (depende de 1.1-1.5 completos)

---

## 📝 Notas Importantes

⚠️ **TypeScript Strict Mode é Crítico**
- Toda a implementação subsequente depende disso
- Se ignora strict agora, causará problemas de tipo no Story 1.2+ (backend integração)
- Zero `any` types (com exceção de casos raros documentados)

⚠️ **Acessibilidade Não é Nice-to-Have**
- Cada componente base que criar será reusado 5-10 vezes
- Implementar acessibilidade agora economiza refactoring posterior
- WCAG Level A é pré-requisito do PRD

⚠️ **Bundle Size Importa**
- Tailwind JIT deve compilar apenas classes usadas
- Production build deve ser < 500KB (gzipped)
- Se exceder, investigar: fonte inline, icons, ou dependências heavy

⚠️ **Design Tokens são Contratos Futuros**
- Colors, spacing, typography são CONSTANTES
- Qualquer mudança impacta 20+ stories posteriores
- Validar com UX (Davi) antes de finalizar

---

## ✨ Definição de Pronto (DoD)

A story está **PRONTA PARA REVIEW** quando:

- ✅ Projeto Vite criado com npm create vite
- ✅ TypeScript em strict mode, zero type errors
- ✅ Tailwind CSS com design tokens completos configurado
- ✅ 7 componentes base implementados (Button, Input, Card, Modal, Badge, Alert, Spinner)
- ✅ Estrutura de pastas criada e documentada
- ✅ .env.example criado
- ✅ npm scripts funcionam (dev, build, lint, type-check)
- ✅ Git inicializado, .gitignore apropriado, first commit feito
- ✅ README.md documenta setup local em < 5 min
- ✅ Padrões de codificação documentados nesta story
- ✅ Production build executa sem warnings
- ✅ Teste manual: npm run dev abre navegador, hot reload funciona
- ✅ Teste manual: npm run build → dist/ criado < 500KB
- ✅ Teste manual: npm run lint → zero errors
- ✅ Teste manual: npm run type-check → zero errors
- ✅ Código enviado para repositório Git com commit message clara

---

## 🔍 Checklist de Implementação

Ao implementar, seguir esta ordem:

- [ ] **Fase 1: Setup** (15 min)
  - [ ] npm create vite@latest com React + TypeScript
  - [ ] npm install para instalar dependências
  - [ ] Verificar npm run dev funciona

- [ ] **Fase 2: Tailwind & Design System** (30 min)
  - [ ] npm install -D tailwindcss postcss autoprefixer
  - [ ] Criar tailwind.config.ts com design tokens
  - [ ] Criar postcss.config.js
  - [ ] Criar src/index.css com Tailwind imports
  - [ ] Testar: aplicar classe Tailwind a div

- [ ] **Fase 3: Componentes Base** (45 min)
  - [ ] Criar src/components/Button.tsx
  - [ ] Criar src/components/Input.tsx
  - [ ] Criar src/components/Card.tsx
  - [ ] Criar src/components/Modal.tsx
  - [ ] Criar src/components/Badge.tsx
  - [ ] Criar src/components/Alert.tsx
  - [ ] Criar src/components/LoadingSpinner.tsx
  - [ ] Criar src/components/index.ts (exports)

- [ ] **Fase 4: Estrutura & Configuração** (15 min)
  - [ ] Criar pastas: pages/, hooks/, services/, utils/, types/
  - [ ] Criar index.ts em cada pasta (para imports limpos)
  - [ ] Configurar .env.example
  - [ ] Configurar ESLint + Prettier

- [ ] **Fase 5: Git & Documentação** (25 min)
  - [ ] git init
  - [ ] Criar .gitignore apropriado
  - [ ] npm install para garantir package-lock.json
  - [ ] git add .
  - [ ] git commit -m "feat(frontend): initialize vite react project"
  - [ ] Criar README.md com setup local
  - [ ] Documentar padrões de codificação

- [ ] **Fase 6: Validação** (10 min)
  - [ ] npm run dev → sem erros, hot reload funciona
  - [ ] npm run build → sucesso, dist/ < 500KB
  - [ ] npm run lint → zero errors
  - [ ] npm run type-check → zero errors
  - [ ] Verificar arquivo de commit no Git

---

## 🎓 Recursos & Documentação

- [Vite Documentation](https://vitejs.dev/)
- [React 18 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Accessibility - WebAIM](https://webaim.org/)
- [WCAG 2.1 Level A Checklist](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0%2C2.1)

---

**Status:** ✅ Pronto para Implementação  
**Última Atualização:** 13 de maio de 2026  
**Criado por:** Story Creation Workflow - BMAD  
**Para:** Davi (Desenvolvedor)
