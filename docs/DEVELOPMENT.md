# Development Workflow - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0

Guia de workflow diário para desenvolvimento do **agenda-clean**.

---

## 1. Setup Inicial do Dia

### 1.1 Morning Standup Checklist

Ao começar o dia:

```bash
# 1. Ir para pasta do projeto
cd /home/davi/Documentos/Projetos/agenda-clean

# 2. Verificar branch correta
git status
# Output: On branch feature/1-4-configure-documentation (exemplo)

# 3. Atualizar da main (se necessário)
git fetch origin
git rebase origin/main  # ou git pull origin main

# 4. Instalar dependências (se foram adicionadas)
npm install
cd frontend && npm install && cd ../backend && npm install && cd ..

# 5. Verificar banco de dados
# Se não estiver rodando, inicie:
# PostgreSQL local: sudo systemctl start postgresql (Linux)
# Docker: docker start agenda-clean-db
# Supabase: (automático online)

# 6. Iniciar servidores em abas diferentes
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: (opcional) Prisma Studio
cd backend && npx prisma studio
```

### 1.2 Verificação Rápida

```bash
# Health check do backend
curl http://localhost:3000/health
# Esperado: { "status": "ok", ... }

# Frontend carrega?
# Abrir http://localhost:5173 no navegador
# Esperar página carregar sem erros no console (F12)

# Database conectado?
# Se Prisma Studio abriu em http://localhost:5555
# Você consegue ver as tabelas? Sim = OK
```

---

## 2. Development Server URLs

Anote essas URLs para teste rápido:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:5173 | React app |
| **Backend** | http://localhost:3000 | Express API |
| **API Health** | http://localhost:3000/health | Quick status check |
| **Prisma Studio** | http://localhost:5555 | Database GUI |

### 2.1 Testing com cURL

```bash
# Quick test do backend
curl http://localhost:3000/health

# Test com token (se implementado)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/agendamentos

# POST request
curl -X POST http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-05-22","time":"14:30","address":"Rua X"}'
```

---

## 3. Common Development Tasks

### 3.1 Adicionar Nova Rota Backend

**Caso de uso:** Novo endpoint REST (ex: GET /api/agendamentos)

**Passo 1: Crie o route file**
```typescript
// backend/src/routes/bookingRoutes.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import * as bookingController from '../controllers/bookingController.js';

const router = Router();

// GET /api/agendamentos - list bookings
router.get('/', authMiddleware, bookingController.listBookings);

// POST /api/agendamentos - create booking
router.post('/', authMiddleware, bookingController.createBooking);

export default router;
```

**Passo 2: Crie o controller**
```typescript
// backend/src/controllers/bookingController.ts
import { Request, Response } from 'express';
import { listUserBookings, createNewBooking } from '../services/bookingService.js';

export const listBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await listUserBookings(req.user?.id);
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao listar agendamentos' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await createNewBooking({
      userId: req.user?.id,
      ...req.body
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message
    });
  }
};
```

**Passo 3: Implemente a service (business logic)**
```typescript
// backend/src/services/bookingService.ts
import { prisma } from './prismaService.js';

export const listUserBookings = async (userId: string) => {
  return await prisma.agendamento.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  });
};

export const createNewBooking = async (data: {
  userId: string;
  date: string;
  time: string;
  address: string;
}) => {
  // Validate availability
  const existing = await prisma.agendamento.count({
    where: {
      date: new Date(data.date),
      time: data.time,
      status: { not: 'cancelado' }
    }
  });

  if (existing > 0) {
    const error = new Error('Horário já agendado');
    (error as any).status = 409;
    throw error;
  }

  return await prisma.agendamento.create({
    data: {
      userId: data.userId,
      date: new Date(data.date),
      time: data.time,
      address: data.address,
      status: 'solicitado'
    }
  });
};
```

**Passo 4: Registre a rota no server**
```typescript
// backend/src/server.ts
import bookingRoutes from './routes/bookingRoutes.js';

app.use('/api/agendamentos', bookingRoutes);
```

**Passo 5: Teste**
```bash
# Terminal 1: Backend rodando
# Terminal 2: Fazer request
curl -X POST http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-05-22","time":"14:30","address":"Test"}'

# Esperado: 201 Created com agendamento
```

**Passo 6: Commit**
```bash
git add backend/src/routes/bookingRoutes.ts
git commit -m "feat: Add GET/POST agendamentos endpoints"

git add backend/src/controllers/bookingController.ts
git commit -m "feat: Add booking controller"

git add backend/src/services/bookingService.ts
git commit -m "feat: Add booking service with validation"

git add backend/src/server.ts
git commit -m "chore: Register booking routes"
```

### 3.2 Adicionar Novo Componente React

**Caso de uso:** Novo componente UI (ex: BookingForm)

**Passo 1: Crie o componente**
```typescript
// frontend/src/components/booking-form.tsx
import React from 'react';
import { BookingFormData } from '../types/booking.js';

interface BookingFormProps {
  onSuccess?: (booking: any) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = React.useState<BookingFormData>({
    date: '',
    time: '',
    address: '',
    observations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    onSuccess?.(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Endereço"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Agendar</button>
    </form>
  );
};
```

**Passo 2: Crie types se necessário**
```typescript
// frontend/src/types/booking.ts
export interface BookingFormData {
  date: string;
  time: string;
  address: string;
  observations?: string;
}

export interface Agendamento extends BookingFormData {
  id: string;
  status: 'solicitado' | 'confirmado' | 'concluido' | 'cancelado';
  createdAt: string;
  updatedAt: string;
}
```

**Passo 3: Use em página**
```typescript
// frontend/src/pages/booking.tsx
import { BookingForm } from '../components/booking-form.js';

export const BookingPage: React.FC = () => {
  const handleSuccess = (booking: any) => {
    console.log('Agendamento criado:', booking);
    // Navigate to dashboard
  };

  return (
    <div>
      <h1>Novo Agendamento</h1>
      <BookingForm onSuccess={handleSuccess} />
    </div>
  );
};
```

**Passo 4: Teste no navegador**
- Hot reload automático (Vite)
- Abra DevTools (F12)
- Teste interação

**Passo 5: Commit**
```bash
git add frontend/src/components/booking-form.tsx
git commit -m "feat: Add BookingForm component"

git add frontend/src/types/booking.ts
git commit -m "feat: Add BookingFormData type"

git add frontend/src/pages/booking.tsx
git commit -m "feat: Add booking page with form"
```

### 3.3 Adicionar Campo ao Database

**Caso de uso:** Novo campo em User ou Agendamento

**Passo 1: Editar schema.prisma**
```prisma
// backend/prisma/schema.prisma

model Agendamento {
  // ... campos existentes ...
  
  // Novo campo
  phoneNumber String? // Número do cliente (opcional)
  
  // ... resto do modelo ...
}
```

**Passo 2: Criar migration**
```bash
cd backend
npx prisma migrate dev --name "add_phone_to_agendamento"

# Prisma irá:
# 1. Gerar SQL em migrations/[timestamp]_add_phone_to_agendamento/
# 2. Aplicar ao banco
# 3. Regenerar tipos TypeScript
```

**Passo 3: Usar novo campo em controller/service**
```typescript
export const createBooking = async (req: Request, res: Response) => {
  const booking = await prisma.agendamento.create({
    data: {
      // ...
      phoneNumber: req.body.phoneNumber // Novo campo
    }
  });
  res.json({ success: true, data: booking });
};
```

**Passo 4: Atualizar API.md**
```markdown
// docs/API.md
POST /api/agendamentos
{
  "date": "2026-05-22",
  "time": "14:30",
  "address": "...",
  "phoneNumber": "(11) 98765-4321"  // Novo campo (optional)
}
```

**Passo 5: Commit migration**
```bash
git add backend/prisma/schema.prisma
git commit -m "feat: Add phoneNumber field to Agendamento"

git add backend/prisma/migrations/
git commit -m "feat: Migration - add phoneNumber to agendamentos table"

git add docs/API.md
git commit -m "docs: Update API.md with phoneNumber parameter"
```

**Passo 6: Update database.md if needed**
```bash
git add docs/DATABASE.md
git commit -m "docs: Update DATABASE.md with new field"
```

---

## 4. Database Operations

### 4.1 Migrations (Change Schema)

```bash
# Sempre edite schema.prisma, NUNCA altere migration SQL diretamente

cd backend

# 1. Edite schema.prisma
# Ex: adicione novo campo

# 2. Crie migration automática
npx prisma migrate dev --name "descricao_da_mudanca"

# 3. Prisma:
#    - Detecta mudanças no schema
#    - Gera SQL em migrations/
#    - Aplica ao banco
#    - Regenera tipos TypeScript

# 4. Verify
npx prisma studio  # Abre GUI, verifique tabelas
```

### 4.2 Seed Data (Popular Banco)

```bash
cd backend

# Ver/editar seed script
cat prisma/seed.ts

# Executar seed
npm run db:seed

# Isso popula banco com dados de teste para desenvolvimento
```

### 4.3 Reset Database (Development Only)

⚠️ **CUIDADO:** Deleta TODOS os dados!

```bash
cd backend

# Reverter todas as migrations, reaplica from scratch
npx prisma migrate reset

# Isso:
# 1. Deleta banco
# 2. Reaplica todas as migrations
# 3. Roda seed.ts
# 4. Deixa banco em estado inicial

# Use APENAS em development!
```

### 4.4 Verificar Migrations

```bash
# Ver status de todas as migrations
npx prisma migrate status

# Output:
# Following migrations have been applied:
# 20260510121530_init
# 20260512143000_add_phone_number

# Following migrations have not yet been applied:
# (none)
```

### 4.5 Prisma Studio (GUI Database)

```bash
cd backend
npx prisma studio

# Abre http://localhost:5555
# Você pode:
# - Visualizar dados em tabelas
# - Adicionar/editar/deletar records
# - Testar queries
# - Tudo sem SQL
```

---

## 5. Testing Locally

### 5.1 Frontend Unit Tests

```bash
cd frontend

# Rodar testes uma vez
npm run test

# Watch mode (re-roda ao mudar arquivo)
npm run test:watch

# Coverage report
npm run test:coverage
# Abre coverage/index.html

# Teste específico
npm run test -- booking-form.test.ts
```

### 5.2 Backend Unit Tests

```bash
cd backend

# Rodar testes
npm run test

# Watch mode
npm run test:watch

# Testes com database real
npm run test:integration
```

### 5.3 Manual Testing (Full Flow)

```bash
# 1. Garantir servidores rodando
# Backend: http://localhost:3000 ✓
# Frontend: http://localhost:5173 ✓
# Database: Conectado ✓

# 2. Test no navegador
# - Abrir http://localhost:5173
# - Login com Google (se OAuth configurado)
# - Navegar páginas
# - Preencher formulários
# - Verificar requisições (DevTools Network tab)

# 3. Backend logs
# Terminal do backend mostra logs de cada request
# Procure por erros (vermelho)

# 4. Database status
# Abrir Prisma Studio (http://localhost:5555)
# Verifique se dados foram inseridos corretamente
```

---

## 6. Debugging

### 6.1 Frontend Debugging

**Browser DevTools (F12):**
```
Console tab: Erros JavaScript, console.log()
Network tab: Requisições HTTP, responses
Application tab: localStorage, cookies
React DevTools extension: Estado de componentes
```

**VS Code Debugger:**
```bash
# .vscode/launch.json (se não tiver, crie)
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/frontend"
    }
  ]
}

# Pressione F5 para iniciar debugger
# Coloque breakpoints clicando à esquerda de número de linha
```

### 6.2 Backend Debugging

**Console.log:**
```typescript
// Adicione logs estratégicos
console.log('User:', req.user);
console.log('Creating booking:', req.body);
console.log('Available slots:', slots);
```

**VS Code Node Debugger:**
```bash
# Modifique script em backend/package.json
"dev": "node --inspect-brk=9229 src/index.ts"

# Execute
npm run dev

# VS Code → Run and Debug (Ctrl+Shift+D)
# Selecione "Node" e clique Play
```

**Prisma Studio:**
```bash
npx prisma studio
# Abre GUI, visualize dados em tempo real
```

### 6.3 Common Debugging Checklist

Quando algo não funciona:

- [ ] **Verificar console do browser** (F12 → Console)
  - Erros JavaScript?
  - Network requests falhando?
  
- [ ] **Verificar logs do backend** (terminal)
  - Erros de servidor?
  - Middleware rejeitando?
  
- [ ] **Verificar database** (Prisma Studio)
  - Dados foram salvos?
  - Constraints violadas?
  
- [ ] **Verificar variáveis de ambiente** 
  ```bash
  cat backend/.env.local
  cat frontend/.env.local
  # Todas as variáveis necessárias estão lá?
  ```

- [ ] **Verificar network tab** (DevTools)
  - Request foi enviada?
  - Status code da resposta?
  - Response body válida?

- [ ] **Tentar limpar cache e restart**
  ```bash
  npm run clean  # Se existir
  npm cache clean --force
  npm install
  npm run dev
  ```

---

## 7. Common Issues & Solutions

| Problema | Solução |
|----------|---------|
| "Port 3000 already in use" | `lsof -i :3000` → `kill -9 PID` |
| "ECONNREFUSED - Database" | Verificar PostgreSQL rodando, DATABASE_URL correta |
| "MODULE_NOT_FOUND @prisma/client" | `cd backend && npx prisma generate && npm install` |
| "Token invalid/expired" | Limpar localStorage, fazer login novamente |
| "CORS error in console" | Verificar CORS headers em backend/corsMiddleware.ts |
| "Form validation not working" | Verificar tipos em backend/src/middleware/requestValidator.ts |
| "Hot reload não funciona" | Restart Vite: `Ctrl+C` + `npm run dev` |
| "Types are not recognized" | Rodar `npm run type-check`, reinstalar `npm install` |

---

## 8. Performance Optimization (During Development)

### 8.1 Frontend Performance

```bash
# Analyze bundle size
npm run build
npm run preview  # Serve production build locally

# Chrome DevTools: Performance tab
# Record → Interagir com app → Stop
# Identifique componentes lentos
```

### 8.2 Backend Performance

```typescript
// Adicione timestamps em queries lentas
const start = Date.now();
const bookings = await prisma.agendamento.findMany({...});
const duration = Date.now() - start;
console.log(`Query took ${duration}ms`);

// Se > 100ms, considere otimizar (índices, queries)
```

---

## 9. Deployment Preview

Esta seção é para referência futura (não necessário em desenvolvimento):

```bash
# Frontend: Vercel (automático via GitHub)
# - Mergear para main
# - Vercel auto-deploy para https://agenda-clean.vercel.app

# Backend: Render (deploy manual)
# - Criar conta em render.com
# - Conectar repositório GitHub
# - Deploy automático ao mergear para main

# Database: Supabase (já no MVP)
# - Usar free tier para staging
# - Criar projeto separado para production
```

---

## 10. Referências Rápidas

### Git Commands
```bash
git status                          # Ver status
git add <file>                      # Stage file
git commit -m "msg"                 # Commit
git push origin feature/my-feature  # Push
git pull origin main                # Pull
git rebase origin/main              # Rebase onto main
```

### NPM Commands
```bash
npm install                # Instalar dependências
npm run dev               # Iniciar servidor de dev
npm run build             # Build para produção
npm run lint              # Verificar style
npm run lint:fix          # Corrigir automaticamente
npm run type-check        # Verificar tipos
npm run test              # Rodar testes
npm run test:watch        # Watch mode
```

### Prisma Commands
```bash
npx prisma migrate dev --name "desc"  # Criar migration
npx prisma migrate reset              # Reset (dev only!)
npx prisma studio                     # Abrir GUI
npx prisma generate                   # Regenerar tipos
npx prisma db execute --stdin         # Executar SQL raw
```

---

## Bom desenvolvimento! 🚀

Dúvidas? Cheque [CONTRIBUTING.md](./CONTRIBUTING.md) ou [SETUP.md](./SETUP.md).

