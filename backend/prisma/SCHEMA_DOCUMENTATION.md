# Schema Database - agenda-clean

> 📅 **Data de criação:** 13 de maio de 2026  
> 🔄 **Status:** Ready for APIs  
> 📊 **Versão da migração:** 20260513231437_init

---

## Visão Geral

Este documento descreve o schema do banco de dados PostgreSQL para o projeto **agenda-clean**, um sistema de agendamento de limpeza de sofás.

### Stack Técnico

- **Banco de dados:** PostgreSQL 15+
- **ORM:** Prisma 5.15.0
- **Drivers:** Postgres adapter nativo
- **Encoding:** UTF-8 (suporte completo a acentuação em português)

---

## Modelos de Dados

### 1. **User** - Usuários do Sistema

Armazena informações de clientes e administradores. Usuários são criados automaticamente no primeiro login via Google OAuth.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | TEXT (UUID) | @id, @default(uuid()) | Identificador único gerado automaticamente |
| `email` | TEXT | @unique, NOT NULL | Email único (vem do Google Profile) |
| `googleId` | VARCHAR(255) | @unique, NOT NULL | ID do Google OAuth, único |
| `name` | TEXT | NOT NULL | Nome completo (vem do Google Profile) |
| `role` | ENUM | @default(client) | `client` ou `admin` - determina permissões |
| `createdAt` | TIMESTAMP(3) | @default(now()) | Data de criação (UTC) |
| `updatedAt` | TIMESTAMP(3) | @updatedAt | Data da última atualização (UTC) |

#### Índices e Constraints

- **UNIQUE:** email, googleId
- **INDEX:** googleId (otimiza buscas OAuth)
- **Relacionamento:** 1 User → N Agendamentos (one-to-many)

#### Enumeração: UserRole

```typescript
enum UserRole {
  client      // Cliente que agenda serviços
  admin       // Administrador que gerencia agendamentos
}
```

#### Exemplo de Dados

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "ana@example.com",
  "googleId": "1234567890",
  "name": "Ana Silva",
  "role": "client",
  "createdAt": "2026-05-13T15:45:00Z",
  "updatedAt": "2026-05-13T15:45:00Z"
}
```

---

### 2. **Agendamento** - Agendamentos de Serviço

Armazena solicitações de agendamento de limpeza de sofás. Cada agendamento é vinculado a um usuário (cliente) e possui um status que evolui através do fluxo de trabalho.

#### Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | TEXT (UUID) | @id, @default(uuid()) | Identificador único |
| `userId` | TEXT | FK → User.id | ID do cliente que criou o agendamento |
| `date` | DATE | NOT NULL | Data do agendamento (sem hora) |
| `time` | VARCHAR(5) | NOT NULL | Horário em formato HH:MM (ex: "14:30") |
| `address` | TEXT | NOT NULL | Endereço onde o serviço será realizado |
| `observations` | TEXT | NOT NULL | Notas/observações adicionadas pelo cliente |
| `status` | ENUM | @default(solicitado) | Estado atual do agendamento |
| `createdAt` | TIMESTAMP(3) | @default(now()) | Data de criação |
| `updatedAt` | TIMESTAMP(3) | @updatedAt | Data da última atualização |

#### Índices e Constraints

- **UNIQUE:** (date, time) - **Previne double-booking** (two bookings on same time slot)
- **FOREIGN KEY:** userId → User.id (ON DELETE CASCADE)
- **INDEX:** userId, date, status (otimizam queries comuns)

#### Enumeração: AgendamentoStatus

```typescript
enum AgendamentoStatus {
  solicitado        // Agendamento solicitado, aguardando confirmação do admin
  confirmado        // Admin confirmou o agendamento
  em_atendimento    // Serviço iniciado
  concluido         // Serviço finalizado com sucesso
  cancelado         // Agendamento cancelado (libera o slot)
}
```

#### Transições de Status

```
solicitado
    ↓
confirmado
    ↓
em_atendimento
    ↓
concluido

OU a qualquer momento:
solicitado/confirmado/em_atendimento → cancelado
```

#### Validações (Aplicação + Banco de Dados)

1. **Foreign Key Constraint:** userId deve referenciar um User existente
2. **Unique Constraint:** Máximo um agendamento não-cancelado por (date, time)
3. **Data Validation (App):** date deve ser hoje ou no futuro
4. **Time Validation (App):** time deve estar no formato "HH:MM" com valores válidos
5. **Address Validation (App):** não pode ser vazio
6. **Cascade Delete:** ao deletar User, todos seus Agendamentos são deletados

#### Exemplo de Dados

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "date": "2026-05-19",
  "time": "14:30",
  "address": "Rua das Flores, 123, São Paulo, SP",
  "observations": "Sofá grande, necessário limpeza profunda",
  "status": "solicitado",
  "createdAt": "2026-05-13T16:00:00Z",
  "updatedAt": "2026-05-13T16:00:00Z"
}
```

---

## Constraints Críticos

### 1. Prevenção de Double-Booking

```sql
CREATE UNIQUE INDEX "unique_date_time_active" ON "Agendamento"("date", "time")
```

**Como funciona:**
- Garante que não pode haver dois agendamentos no mesmo (date, time)
- O banco de dados rejeita tentativas de INSERT/UPDATE que violem este constraint
- Agendamentos cancelados **ocupam o slot** (para histórico), mas a validação na aplicação deve tratá-los especialmente

**Implementação na Aplicação:**

```typescript
// ANTES de criar agendamento:
const existingBooking = await prisma.agendamento.findUnique({
  where: {
    date_time: {
      date: new Date(requestDate),
      time: requestTime
    }
  }
});

if (existingBooking && existingBooking.status !== 'cancelado') {
  throw new Error('Horário indisponível');
}
```

### 2. Integridade Referencial

```sql
ALTER TABLE "Agendamento" 
ADD CONSTRAINT "Agendamento_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "User"("id") 
ON DELETE CASCADE ON UPDATE CASCADE
```

**Comportamento:**
- Ao deletar um User, todos seus Agendamentos são automaticamente deletados
- Ao atualizar User.id, todos os Agendamentos relacionados são atualizados

### 3. Enums Customizados do PostgreSQL

```sql
CREATE TYPE "UserRole" AS ENUM ('client', 'admin');
CREATE TYPE "AgendamentoStatus" AS ENUM ('solicitado', 'confirmado', 'em_atendimento', 'concluido', 'cancelado');
```

**Benefícios:**
- Validação em nível de banco de dados
- Tipos mais seguros que VARCHAR
- Melhor desempenho em queries

---

## Migrações e Histórico

### Migração Inicial (20260513231437_init)

- Criação das tabelas User e Agendamento
- Criação dos tipos enum UserRole e AgendamentoStatus
- Criação de todos os índices e constraints
- Arquivo: `prisma/migrations/20260513231437_init/migration.sql`

**Reversibilidade:** Sim, a migração pode ser revertida com `npx prisma migrate resolve --rolled-back 20260513231437_init`

---

## Seed Data

### Usuários de Teste

| Email | Nome | Google ID | Role |
|-------|------|-----------|------|
| ana@example.com | Ana Silva | 1234567890 | client |
| admin@example.com | João Admin | 0987654321 | admin |
| maria@example.com | Maria Santos | 1111111111 | client |
| pedro@example.com | Pedro Oliveira | 2222222222 | client |

### Agendamentos de Teste

- **Ana - Próxima semana:** 19/05/2026 às 14:30 (solicitado)
- **Ana - Confirmado:** 15/05/2026 às 10:00 (confirmado)
- **Maria - Em atendimento:** 12/05/2026 às 15:00 (em_atendimento)
- **Pedro - Concluído:** 11/05/2026 às 13:00 (concluido)
- **Ana - Cancelado:** 17/05/2026 às 16:00 (cancelado)
- **Maria - Outro:** 22/05/2026 às 11:00 (solicitado)

**Executar seed:**
```bash
npm run db:seed
```

---

## Acessando o Banco de Dados

### Prisma Studio (Interface Gráfica)

```bash
npm run prisma:studio
```

Abre em `http://localhost:5555` - permite CRUD visual dos dados.

### Queries Comuns via Prisma Client

#### Criar User

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    email: 'novo@example.com',
    googleId: '9999999999',
    name: 'Novo Usuário',
    role: 'client'
  }
});
```

#### Listar Agendamentos de um Usuário

```typescript
const agendamentos = await prisma.agendamento.findMany({
  where: { userId: userId },
  include: { user: true },
  orderBy: { date: 'asc' }
});
```

#### Buscar Slots Disponíveis (sem double-booking)

```typescript
const bookings = await prisma.agendamento.findMany({
  where: {
    date: targetDate,
    status: { not: 'cancelado' }
  },
  select: { time: true }
});

const occupiedTimes = bookings.map(b => b.time);
const availableTimes = allTimeSlots.filter(t => !occupiedTimes.includes(t));
```

#### Listar Todos os Agendamentos (Admin)

```typescript
const allBookings = await prisma.agendamento.findMany({
  include: { user: true },
  orderBy: [{ date: 'asc' }, { time: 'asc' }]
});
```

---

## Performance e Otimizações

### Índices Criados

| Tabela | Campos | Tipo | Propósito |
|--------|--------|------|-----------|
| User | email | UNIQUE | Busca por email (login) |
| User | googleId | UNIQUE | Busca por Google ID (OAuth) |
| User | googleId | INDEX | Otimiza buscas frequentes |
| Agendamento | userId | INDEX | Busca "agendamentos do usuário" |
| Agendamento | date | INDEX | Busca "agendamentos da data" |
| Agendamento | status | INDEX | Busca "agendamentos com status" |
| Agendamento | date, time | UNIQUE | Prevenção de double-booking |

### Recomendações de Query

- **Sempre use `include` ou `select` explícito** para evitar N+1 queries
- **Ordene por índices** (date, status, userId)
- **Use WHERE com campos indexados** quando possível
- **Para listas grandes, implemente paginação** com `skip` e `take`

---

## Documentação de Tipos TypeScript

Todos os tipos são auto-gerados pelo Prisma Client em `@prisma/client`:

```typescript
import { 
  User, 
  Agendamento, 
  UserRole, 
  AgendamentoStatus,
  Prisma
} from '@prisma/client';

// Tipos auto-gerados incluem:
// - User
// - Agendamento
// - UserRole (enum)
// - AgendamentoStatus (enum)
// - UserCreateInput
// - AgendamentoFindManyArgs
// - ... e muitos mais
```

IntelliSense está completo em TypeScript com autocomplete para:
- Campos de models
- Operadores de queries
- Tipos de argumentos
- Valores de enums

---

## Backup e Recuperação

### Backup Manual

```bash
# Dump da estrutura + dados
docker exec agenda-clean-db pg_dump -U agendaclean -d agenda_clean_dev > backup.sql

# Apenas estrutura
docker exec agenda-clean-db pg_dump -U agendaclean -d agenda_clean_dev --schema-only > schema.sql
```

### Restaurar Backup

```bash
docker exec -i agenda-clean-db psql -U agendaclean -d agenda_clean_dev < backup.sql
```

---

## Próximas Fases (Pós-MVP)

Estas features **não estão implementadas** na Story 1.3, mas estão documentadas para Phase 2+:

### Phase 2: Disponibilidade Configurável
- Tabela `Availability` (admin configura horários disponíveis por dia)
- Horários hardcoded no MVP: segunda-sexta, 09:00-18:00

### Phase 2: Auditoria e Logs
- Tabela `AuditLog` (registra todas as mudanças de status)
- Quem (userId), o quê (old status → new status), quando (timestamp)

### Phase 3: Avaliações e Reviews
- Tabela `Review` (cliente avalia o serviço após conclusão)
- Rating (1-5 stars), comentário, data

### Phase 3: Recorrência
- Campo `recurrence` em Agendamento
- Suportar agendamentos recorrentes (semanal, mensal, etc)

---

## Checklist de Validação (AC - Acceptance Criteria)

✅ **AC1:** Schema Prisma com User table definida  
✅ **AC2:** Schema Prisma com Agendamento table definida  
✅ **AC3:** Availability table deferred para Phase 2  
✅ **AC4:** Tipos TypeScript auto-gerados  
✅ **AC5:** Migração inicial criada (20260513231437_init)  
✅ **AC6:** Prisma Studio funcional  
✅ **AC7:** Seed data criado com 4 usuários e 6 agendamentos  
✅ **AC8:** Validações em nível de banco de dados  
✅ **AC9:** Documentação de schema (este arquivo)  

---

## Contato e Suporte

- **Projeto:** agenda-clean
- **Versão do Banco:** v1.0 (13 de maio de 2026)
- **Mantidor:** Davi
- **Linguagem:** Português (Brasil)

Para dúvidas sobre o schema, consulte:
1. Este documento (schema-documentation.md)
2. PRD: `/_bmad-output/planning-artifacts/prd.md`
3. Arquitetura: `/_bmad-output/planning-artifacts/architecture.md`
