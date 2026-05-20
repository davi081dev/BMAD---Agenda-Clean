# Contributing Guide - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0

Guia completo para contribuir ao projeto **agenda-clean**.

---

## 1. Getting Started

### 1.1 Setup Inicial

1. **Leia a documentação:**
   - [SETUP.md](./SETUP.md) - Configure seu ambiente local
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Entenda a arquitetura
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Workflow diário

2. **Escolha uma task:**
   - Veja [Sprint Plan](../_bmad-output/implementation-artifacts/sprint-plan.md)
   - Escolha uma story ou bug para trabalhar

3. **Avise que vai trabalhar:**
   - Comente na issue/task: "Vou trabalhar nisso"
   - Assim evita duplicação de esforço

---

## 2. Processo de Desenvolvimento

### 2.1 Para Nova Feature

**Passo 1: Criar Branch**

```bash
# Atualize main
git checkout main
git pull origin main

# Crie branch a partir da story/task
# Formato: feature/[story-id]-[slug]
git checkout -b feature/1-4-configure-documentation
```

**Passo 2: Faça Commits Pequenos e Atômicos**

Commits devem ser pequenos, lógicos e testáveis individualmente:

```bash
# ✅ Bom: commits pequenos e lógicos
git add frontend/src/pages/LoginPage.tsx
git commit -m "feat: Create login page component"

git add frontend/src/services/authService.ts
git commit -m "feat: Add OAuth login service"

# ❌ Ruim: commits grandes com múltiplas mudanças não-relacionadas
git add .
git commit -m "WIP: various changes"
```

**Passo 3: Mensagens de Commit Descritivas**

Formato padrão: `[TIPO] Descrição breve (max 50 chars)`

```
Tipos válidos:
- feat: Nova feature/funcionalidade
- fix: Correção de bug
- docs: Mudanças em documentação
- refactor: Refatoração (sem mudanças de comportamento)
- test: Adição/mudança de testes
- chore: Dependências, build scripts, etc
- perf: Melhoria de performance
- style: Formatação, nada funcional

Exemplos:
✅ feat: Add booking form validation
✅ fix: Prevent double-booking race condition
✅ docs: Update API.md with availability endpoint
✅ test: Add unit tests for validateDate function
✅ chore: Update dependencies

❌ WIP (muito vago)
❌ fixed (capitalization)
❌ fazer isso depois (português)
```

**Passo 4: Siga Code Style**

Execute lint antes de commitar:

```bash
# Frontend
cd frontend
npm run lint        # Verifica estilo
npm run lint:fix    # Corrige automaticamente
npm run type-check  # Verifica tipos TypeScript

# Backend
cd backend
npm run lint        # Verifica estilo
npm run lint:fix    # Corrige automaticamente
npm run type-check  # Verifica tipos TypeScript
```

**Passo 5: Teste Localmente**

```bash
# Frontend tests
cd frontend
npm run test        # Rodar testes
npm run test:watch  # Watch mode

# Backend tests
cd backend
npm run test        # Rodar testes
npm run test:watch  # Watch mode

# Manual testing
# - Teste fluxo completo no navegador
# - Verifique console do browser (F12)
# - Verifique logs do backend (terminal)
```

**Passo 6: Push e Pull Request**

```bash
# Faça push da branch
git push origin feature/1-4-configure-documentation

# Abra Pull Request (PR) no GitHub
# - Título claro da mudança
# - Descrição com contexto
# - Link para a story/issue
# - Checklist (vide seção 2.5)
```

**Passo 7: Code Review**

- Responda comentários construtivamente
- Faça mudanças solicitadas
- Pede re-review quando terminar
- Merge após aprovação

### 2.2 Para Bugfix

**Passo 1: Criar Issue**

```
Título: [BUG] Descreva o comportamento incorreto
Descrição:
- Como reproduzir
- Comportamento esperado
- Comportamento atual
- Screenshots/logs
```

**Passo 2: Criar Branch**

```bash
git checkout -b bugfix/descricao-do-bug
# Exemplo: bugfix/booking-form-validation-error
```

**Passo 3: Reproduzir e Corrigir**

- Escreva teste que reproduz o bug
- Faça fix
- Teste que o bugfix funciona
- Commits descritivos

**Passo 4: PR com Teste**

Include no PR:
- Teste que reproduz bug (antes do fix)
- Fix
- Teste passando (depois do fix)

---

## 3. Commit Messages

### 3.1 Anatomia de uma Boa Mensagem

```
[TIPO] Descrição breve (max 50 chars)

Descrição mais longa (72 chars por linha):
- Explique O QUÊ foi mudado
- Explique O PORQUÊ (não o COMO - código fala por si)
- Referência à issue/story: Closes #123, Related to #456

Exemplo:
---
feat: Add availability endpoint for booking form

The booking form needs to query available time slots for a given date
to prevent users from selecting already-booked times.

API endpoint: GET /api/agendamentos/availability?date=YYYY-MM-DD
Returns JSON with array of available 30-minute slots from 09:00-18:00.

Database index on (date, status) optimized query performance.

Closes #42
---
```

### 3.2 Conventions

- **Linguagem:** English para commits (padrão da indústria)
- **Tempo:** Imperativo presente ("Add" não "Added" ou "Adds")
- **Escopo:** Inclua se relevante: `feat(booking): Add availability`
- **Refs:** `Closes #123` (auto-fecha issue no GitHub)

---

## 4. Code Style & Linting

### 4.1 ESLint e Prettier

Todos os arquivos são lint-ados automaticamente. Setup:

```javascript
// .eslintrc.js (padrão do projeto)
{
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "no-console": "warn",         // console.log é warning
    "@typescript-eslint/no-any": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "no-var": "error",            // Use const/let
  }
}

// .prettierrc.js (código formatado consistentemente)
{
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
}
```

### 4.2 TypeScript Strict Mode

Sempre tipifique:

**✅ Bom:**
```typescript
interface User {
  id: string;
  email: string;
  role: 'client' | 'admin';
}

const getUser = (id: string): Promise<User> => {
  // ...
};

let currentUser: User | null = null;

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value: string = e.target.value;
  // ...
};
```

**❌ Ruim:**
```typescript
const user: any = getUser(id);  // ❌ any é permitido?
let something;                  // ❌ sem tipo
const getUser = (id) => { };    // ❌ sem tipos
const data = fetch(...);        // ❌ async não declarado
```

### 4.3 React Components

**Estrutura padrão:**

```typescript
// ✅ Bom
import React from 'react';
import { BookingFormData } from '../types/booking';
import { validateBooking } from '../utils/validators';

interface BookingFormProps {
  onSuccess?: (booking: Booking) => void;
  onError?: (error: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSuccess,
  onError
}) => {
  const [formData, setFormData] = React.useState<BookingFormData>({
    date: '',
    time: '',
    address: ''
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* JSX aqui */}
    </form>
  );
};
```

### 4.4 Nomeação de Arquivos

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| React Components | kebab-case | `booking-form.tsx` |
| Component folder | kebab-case | `src/components/booking-form/` |
| Services | camelCase | `authService.ts` |
| Hooks | camelCase | `useAuth.ts` |
| Types/interfaces | camelCase | `booking.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
| Routes | kebab-case | `booking-routes.ts` |

---

## 5. Testes

### 5.1 Frontend Tests (Jest + React Testing Library)

```bash
# Rodar testes
cd frontend
npm run test

# Watch mode (re-roda ao mudar arquivo)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Exemplo de teste:**

```typescript
// frontend/src/components/__tests__/BookingForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from '../BookingForm';

describe('BookingForm', () => {
  it('should submit form with valid data', async () => {
    const onSuccess = jest.fn();
    render(<BookingForm onSuccess={onSuccess} />);
    
    const dateInput = screen.getByLabelText(/data/i);
    fireEvent.change(dateInput, { target: { value: '2026-05-22' } });
    
    const submitButton = screen.getByRole('button', { name: /agendar/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should show error on invalid date', () => {
    render(<BookingForm />);
    // ... test implementation
  });
});
```

### 5.2 Backend Tests (Jest)

```bash
# Rodar testes
cd backend
npm run test

# Watch mode
npm run test:watch

# Integration tests (com database real)
npm run test:integration
```

**Exemplo de teste:**

```typescript
// backend/src/services/__tests__/bookingService.test.ts
import { createBooking, isSlotAvailable } from '../bookingService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('bookingService', () => {
  it('should create booking for available slot', async () => {
    const booking = await createBooking({
      userId: 'test-user-id',
      date: new Date('2026-05-22'),
      time: '14:30',
      address: 'Test Address'
    });

    expect(booking).toHaveProperty('id');
    expect(booking.status).toBe('solicitado');
  });

  it('should fail to create booking for unavailable slot', async () => {
    // Setup: create first booking
    await createBooking({ userId: 'user1', date, time, address });
    
    // Try to create second booking at same time
    await expect(
      createBooking({ userId: 'user2', date, time, address })
    ).rejects.toThrow('Horário não disponível');
  });
});
```

### 5.3 Cobertura Mínima

Mínimo esperado:
- **Frontend:** 70% de cobertura (linhas)
- **Backend:** 80% de cobertura (linhas)

```bash
# Visualizar cobertura
npm run test:coverage
# Abre arquivo HTML em coverage/index.html
```

---

## 6. Pull Request Checklist

Antes de submeter PR, verifique:

- [ ] Branch atualizado com `main` (rebase se necessário)
  ```bash
  git fetch origin
  git rebase origin/main
  ```

- [ ] `npm run lint` passa sem erros
  ```bash
  # Frontend
  cd frontend && npm run lint && cd ..
  
  # Backend
  cd backend && npm run lint && cd ..
  ```

- [ ] `npm run type-check` passa (sem erros TypeScript)
  ```bash
  cd frontend && npm run type-check && cd ..
  cd backend && npm run type-check && cd ..
  ```

- [ ] Testes passam com cobertura >= 70%
  ```bash
  npm run test
  ```

- [ ] Código foi formatado com Prettier
  ```bash
  # Automático em commit hook, mas pode rodar:
  npm run format
  ```

- [ ] Descrição do PR é clara e linkada à story
  ```
  Título: feat: Implement booking availability check
  
  Description:
  Adds new endpoint GET /api/agendamentos/availability to return
  available time slots for a given date.
  
  Closes #42 (link para story/issue)
  ```

- [ ] Mudanças em database foram feitas via migrations
  ```bash
  # Não edite schema.prisma sem migração!
  npx prisma migrate dev --name "descricao"
  ```

- [ ] Documentação foi atualizada (se necessário)
  - Mudou um endpoint? Atualize `docs/API.md`
  - Adicionou novo padrão? Atualize `docs/ARCHITECTURE.md`
  - Mudou database? Atualize `docs/DATABASE.md`

- [ ] Nenhuma mudança hardcoded de credenciais
  - Use `.env` para secrets
  - Nunca commita `.env.local`

---

## 7. Code Review Feedback

### 7.1 Respondendo Comentários

**Feedback construtivo:**
> "Este hook é chamado em toda renderização. Considere adicionar dependencies array."

**Resposta apropriada:**
> "Boa observação! Adicionei `[userId]` em dependencies. Agora só refetch quando userId muda."

### 7.2 Marking as Resolved

1. Faça a mudança solicitada
2. Faça commit com mensagem clara
3. Comente: "Done ✓" ou "✅ Resolvido"
4. Clique em "Resolve conversation"

### 7.3 Requesting Re-review

```
Fiz as mudanças solicitadas. Pronto para re-review!
Commits: abc123..def456
```

---

## 8. Merge & Deployment

### 8.1 Merge Criteria

PR pode ser merged quando:
- ✅ Todos os testes passam
- ✅ Code review aprovado
- ✅ Lint/type checks passam
- ✅ Branch atualizado com `main`

### 8.2 Merge Strategy

```bash
# Opção 1: Squash and merge (simples para MVP)
# → Um commit por PR
# Bom para histórico limpo

# Opção 2: Rebase and merge
# → Commits individuais, linearizado
# Bom para rastreabilidade

# Opção 3: Create a merge commit
# → Preserva toda história
# Bom para grandes features
```

Projeto usa: **Squash and merge** (default)

### 8.3 Deploy Checklist

Antes de mergear para `main`:

- [ ] Feature está 100% pronta
- [ ] Sem TODOs ou console.logs deixados
- [ ] Migrations foram testadas
- [ ] Documentação foi atualizada
- [ ] Não tem código comentado (cleanup)

---

## 9. Referências

- **Git Guide:** https://git-scm.com/book/en/v2
- **Conventional Commits:** https://www.conventionalcommits.org/
- **ESLint Docs:** https://eslint.org/docs/
- **Prettier Docs:** https://prettier.io/docs/
- **Jest Docs:** https://jestjs.io/docs/getting-started
- **React Testing Library:** https://testing-library.com/docs/react-testing-library/intro

---

## Dúvidas?

Abra uma issue com tag `question` ou comente na task que está trabalhando.

**Happy coding! 🚀**

