# Database Documentation - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0  
**Provider:** PostgreSQL 14+ (Supabase free tier para MVP)

Documentação completa do schema do banco de dados e queries comuns.

---

## 1. Visão Geral

O banco de dados do **agenda-clean** é relacional (PostgreSQL) com 2 tabelas principais:

- **User**: Armazena usuários (clientes e admins)
- **Agendamento**: Armazena agendamentos de limpeza de sofá

**Relacionamento:** 1 User → N Agendamentos (one-to-many)

---

## 2. Diagrama Entity-Relationship (ER)

```
┌─────────────────────────┐
│        User             │
├─────────────────────────┤
│ id (UUID, PK)           │◄──────┐
│ email (VARCHAR, UNIQUE) │       │
│ googleId (VARCHAR, UNQ) │       │
│ name (VARCHAR)          │       │
│ role (ENUM)             │       │
│ createdAt (TIMESTAMP)   │       │
│ updatedAt (TIMESTAMP)   │       │
│ @@index(googleId)       │       │
└─────────────────────────┘       │
         │                        │
         │ 1:N                    │
         │ (onDelete: Cascade)    │
         │                        │
┌────────┴──────────────────────┐
│      Agendamento              │
├───────────────────────────────┤
│ id (UUID, PK)                 │
│ userId (UUID, FK) ────────────┘
│ date (DATE)                   │
│ time (VARCHAR)                │
│ address (TEXT)                │
│ observations (TEXT, nullable) │
│ status (ENUM)                 │
│ createdAt (TIMESTAMP)         │
│ updatedAt (TIMESTAMP)         │
│ @@unique([date, time])        │
│ @@index(userId)               │
│ @@index(date)                 │
│ @@index(status)               │
└───────────────────────────────┘
```

---

## 3. Tabela User

Armazena usuários do sistema (clientes e admins). Criados automaticamente no primeiro login via Google OAuth.

### 3.1 Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid() | ID único do usuário |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email (do Google Profile) |
| `googleId` | VARCHAR(255) | UNIQUE, NOT NULL | ID do Google OAuth |
| `name` | VARCHAR(255) | NOT NULL | Nome completo (do Google Profile) |
| `role` | ENUM | DEFAULT 'client', NOT NULL | Papel: 'client' ou 'admin' |
| `createdAt` | TIMESTAMP | DEFAULT now(), NOT NULL | Quando foi criado |
| `updatedAt` | TIMESTAMP | DEFAULT now(), NOT NULL | Última atualização |

### 3.2 Enums

**UserRole:**
- `client` - Cliente que agenda serviços (padrão)
- `admin` - Administrador que gerencia agendamentos

### 3.3 Índices

```sql
-- Índice para rápidas buscas por Google OAuth
CREATE INDEX idx_user_googleId ON "User"(googleId);

-- Email já tem UNIQUE constraint (que inclui índice)
```

### 3.4 Restrições

- **Unique:** `(email)` - um email por usuário
- **Unique:** `(googleId)` - um googleId por usuário
- **Foreign Keys:** Agendamentos vinculados (onDelete: Cascade)

### 3.5 Exemplo de Dados

```
id                                    | email              | googleId       | name           | role   | createdAt           | updatedAt
--------------------------------------|-------------------|----------------|----------------|--------|---------------------|--------------------
550e8400-e29b-41d4-a716-446655440000 | joao@example.com   | 123456789      | João Silva     | admin  | 2026-05-10 14:30    | 2026-05-10 14:30
550e8400-e29b-41d4-a716-446655440001 | ana@example.com    | 987654321      | Ana Santos     | client | 2026-05-11 10:15    | 2026-05-11 10:15
550e8400-e29b-41d4-a716-446655440002 | maria@example.com  | 555666777      | Maria Oliveira | client | 2026-05-12 16:45    | 2026-05-12 16:45
```

---

## 4. Tabela Agendamento

Armazena agendamentos de limpeza de sofá. Criados pelos clientes, gerenciados pelo admin.

### 4.1 Estrutura

| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid() | ID único do agendamento |
| `userId` | UUID | NOT NULL, FK → User.id (onDelete: Cascade) | Cliente que agendou |
| `date` | DATE | NOT NULL | Data do agendamento (YYYY-MM-DD) |
| `time` | VARCHAR(5) | NOT NULL | Horário (HH:MM, ex: "14:30") |
| `address` | TEXT | NOT NULL | Endereço do serviço |
| `observations` | TEXT | nullable | Observações/notas adicionais |
| `status` | ENUM | DEFAULT 'solicitado', NOT NULL | Estado do agendamento |
| `createdAt` | TIMESTAMP | DEFAULT now(), NOT NULL | Quando foi criado |
| `updatedAt` | TIMESTAMP | DEFAULT now(), NOT NULL | Última atualização |

### 4.2 Enums

**AgendamentoStatus:**
- `solicitado` - Cliente agendou, aguardando admin confirmar
- `confirmado` - Admin confirmou, cliente recebeu email
- `em_atendimento` - Serviço está acontecendo
- `concluido` - Serviço foi finalizado
- `cancelado` - Agendamento foi cancelado (libera o slot)

### 4.3 Índices

```sql
-- Rápidas buscas de agendamentos por usuário
CREATE INDEX idx_agendamento_userId ON "Agendamento"(userId);

-- Rápidas queries de disponibilidade por data
CREATE INDEX idx_agendamento_date ON "Agendamento"(date);

-- Rápidos filtros por status
CREATE INDEX idx_agendamento_status ON "Agendamento"(status);

-- UNIQUE constraint (previne double-booking)
CREATE UNIQUE INDEX idx_agendamento_unique_date_time 
  ON "Agendamento"(date, time);
```

### 4.4 Restrições

- **UNIQUE:** `(date, time)` - Apenas um agendamento ativo por slot
  - ⚠️ Importante: Validação também em nível de aplicação
  - Cancelados são permitidos (histórico)
  
- **Foreign Key:** `userId → User.id` com `onDelete: Cascade`
  - Se usuário é deletado, seus agendamentos também são

### 4.5 Exemplo de Dados

```
id                                    | userId                                | date       | time  | address                    | observations     | status       | createdAt           | updatedAt
--------------------------------------|---------------------------------------|------------|-------|----------------------------|------------------|--------------|---------------------|--------------------
550e8400-e29b-41d4-a716-446655440010 | 550e8400-e29b-41d4-a716-446655440001 | 2026-05-22 | 14:30 | Rua das Flores, 123        | Sofá grande      | confirmado   | 2026-05-13 10:15    | 2026-05-13 11:45
550e8400-e29b-41d4-a716-446655440011 | 550e8400-e29b-41d4-a716-446655440002 | 2026-05-25 | 10:00 | Avenida Paulista, 1000     | NULL             | solicitado   | 2026-05-13 14:30    | 2026-05-13 14:30
550e8400-e29b-41d4-a716-446655440012 | 550e8400-e29b-41d4-a716-446655440001 | 2026-05-20 | 09:30 | Rua da Praia, 456          | Espreguiçadeira  | cancelado    | 2026-05-12 15:00    | 2026-05-13 09:00
```

---

## 5. Queries Comuns

### 5.1 Buscar Agendamentos de um Cliente

```sql
-- Todos os agendamentos do cliente X, ordenados por data (descendente)
SELECT * FROM "Agendamento"
WHERE "userId" = 'uuid-do-cliente'
ORDER BY "date" DESC, "time" DESC;

-- Apenas agendamentos futuros/confirmados
SELECT * FROM "Agendamento"
WHERE "userId" = 'uuid-do-cliente'
  AND "date" >= CURRENT_DATE
  AND "status" IN ('confirmado', 'solicitado', 'em_atendimento')
ORDER BY "date" ASC;
```

### 5.2 Buscar Horários Livres em uma Data

```sql
-- Horários JÁ AGENDADOS em 2026-05-22
SELECT DISTINCT "time" FROM "Agendamento"
WHERE "date" = '2026-05-22'
  AND "status" != 'cancelado'
ORDER BY "time" ASC;

-- Horários LIVRES (versão em app, mais fácil com Prisma)
-- SELECT * FROM available_slots WHERE slot_date = '2026-05-22'
-- (implementar em backend como função ou em app)
```

### 5.3 Buscar Agendamentos Pendentes (Para Admin)

```sql
-- Agendamentos que precisam de confirmação
SELECT 
  a.*,
  u."email", u."name"
FROM "Agendamento" a
JOIN "User" u ON a."userId" = u."id"
WHERE a."status" = 'solicitado'
ORDER BY a."date" ASC, a."time" ASC;
```

### 5.4 Buscar Agendamentos em um Período (Para Admin)

```sql
-- Agendamentos entre datas
SELECT 
  a.*,
  u."email", u."name"
FROM "Agendamento" a
JOIN "User" u ON a."userId" = u."id"
WHERE a."date" BETWEEN '2026-05-01' AND '2026-05-31'
  AND a."status" != 'cancelado'
ORDER BY a."date" ASC, a."time" ASC;
```

### 5.5 Contar Agendamentos por Status

```sql
-- Distribuição de agendamentos
SELECT 
  "status",
  COUNT(*) as total
FROM "Agendamento"
WHERE "date" >= CURRENT_DATE
GROUP BY "status"
ORDER BY total DESC;
```

### 5.6 Atualizar Status de um Agendamento

```sql
-- Confirmar um agendamento
UPDATE "Agendamento"
SET "status" = 'confirmado', "updatedAt" = NOW()
WHERE "id" = 'uuid-agendamento';

-- Cancelar (libera o slot)
UPDATE "Agendamento"
SET "status" = 'cancelado', "updatedAt" = NOW()
WHERE "id" = 'uuid-agendamento';
```

### 5.7 Deletar Agendamentos Antigos (Maintenance)

```sql
-- Deletar agendamentos concluídos/cancelados com mais de 1 ano
DELETE FROM "Agendamento"
WHERE "status" IN ('concluido', 'cancelado')
  AND "date" < CURRENT_DATE - INTERVAL '1 year';
```

---

## 6. Exemplos com Prisma (TypeScript)

### 6.1 Buscar Agendamentos do Cliente

```typescript
// backend/src/services/bookingService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Listar agendamentos do cliente logado
async function getUserBookings(userId: string) {
  const bookings = await prisma.agendamento.findMany({
    where: {
      userId,
    },
    include: {
      user: true, // Incluir dados do usuário
    },
    orderBy: {
      date: 'desc',
    },
  });
  return bookings;
}

// Com filtros
async function getUserBookings(
  userId: string,
  filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }
) {
  const bookings = await prisma.agendamento.findMany({
    where: {
      userId,
      ...(filters?.status && { status: filters.status }),
      ...(filters?.dateFrom && { date: { gte: new Date(filters.dateFrom) } }),
      ...(filters?.dateTo && { date: { lte: new Date(filters.dateTo) } }),
    },
    orderBy: { date: 'desc' },
  });
  return bookings;
}
```

### 6.2 Verificar Disponibilidade

```typescript
// Verificar se um horário está disponível
async function isSlotAvailable(date: Date, time: string): Promise<boolean> {
  const existing = await prisma.agendamento.count({
    where: {
      date,
      time,
      status: { not: 'cancelado' }, // Cancelados são livres
    },
  });
  return existing === 0;
}

// Listar horários disponíveis para uma data
async function getAvailableSlotsForDate(date: Date): Promise<string[]> {
  // Slots de 09:00 a 18:00, de 30 em 30 minutos
  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Buscar horários JÁ agendados
  const bookedSlots = await prisma.agendamento.findMany({
    where: {
      date,
      status: { not: 'cancelado' },
    },
    select: { time: true },
  });

  const bookedTimes = bookedSlots.map(b => b.time);
  return allSlots.filter(slot => !bookedTimes.includes(slot));
}
```

### 6.3 Criar Agendamento

```typescript
// Criar novo agendamento
async function createBooking(data: {
  userId: string;
  date: Date;
  time: string;
  address: string;
  observations?: string;
}) {
  // Validar disponibilidade
  const isAvailable = await isSlotAvailable(data.date, data.time);
  if (!isAvailable) {
    throw new Error('Horário não disponível');
  }

  // Criar
  const booking = await prisma.agendamento.create({
    data: {
      userId: data.userId,
      date: new Date(data.date).toISOString().split('T')[0], // YYYY-MM-DD
      time: data.time,
      address: data.address,
      observations: data.observations || null,
      status: 'solicitado',
    },
    include: { user: true },
  });

  return booking;
}
```

### 6.4 Atualizar Status

```typescript
// Atualizar status de agendamento (admin)
async function updateBookingStatus(
  bookingId: string,
  newStatus: 'confirmado' | 'em_atendimento' | 'concluido' | 'cancelado'
) {
  const booking = await prisma.agendamento.update({
    where: { id: bookingId },
    data: {
      status: newStatus,
      updatedAt: new Date(),
    },
    include: { user: true },
  });

  // Se confirmado, enviar email ao cliente
  if (newStatus === 'confirmado') {
    await sendConfirmationEmail(booking.user.email, booking);
  }

  return booking;
}
```

### 6.5 Listar Todos Agendamentos (Admin)

```typescript
// Admin dashboard - listar todos
async function getAllBookings(filters?: {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  clientEmail?: string;
}) {
  const bookings = await prisma.agendamento.findMany({
    where: {
      ...(filters?.status && { status: filters.status }),
      ...(filters?.dateFrom && { date: { gte: new Date(filters.dateFrom) } }),
      ...(filters?.dateTo && { date: { lte: new Date(filters.dateTo) } }),
      ...(filters?.clientEmail && {
        user: { email: { contains: filters.clientEmail } },
      }),
    },
    include: { user: true },
    orderBy: { date: 'asc' },
  });
  return bookings;
}
```

---

## 7. Integridade de Dados

### 7.1 Constraint: Unique (date, time)

Previne double-bookings:

```sql
-- Nivel de database
UNIQUE INDEX unique_date_time_active ON "Agendamento"(date, time);

-- Nivel de aplicação (Prisma, antes de INSERT)
const exists = await prisma.agendamento.count({
  where: { date, time, status: { not: 'cancelado' } }
});
if (exists > 0) throw new Error('Slot já agendado');
```

### 7.2 Foreign Key: userId → User.id (Cascade)

Se um usuário é deletado, seus agendamentos também são:

```
DELETE FROM "User" WHERE id = 'uuid'
→ Automaticamente deleta todos os Agendamentos daquele userId
```

### 7.3 Timestamps: createdAt, updatedAt

Auditoria e troubleshooting:

```
createdAt: Quando foi criado (imutável)
updatedAt: Última mudança (automático, atualizado em cada UPDATE)
```

---

## 8. Backup & Recovery

### 8.1 Backup Automático (Supabase)

Supabase (free tier) faz backup automático:
- **Frequência:** Daily
- **Retenção:** 7 dias
- **Recovery:** Pode restaurar via Supabase Dashboard

### 8.2 Migração & Versionamento

Prisma tracks todas as migrations:

```bash
# Ver status das migrations
npx prisma migrate status

# Listar todas as migrations
ls -la backend/prisma/migrations/

# Reverter última migration (dev only)
npx prisma migrate resolve --rolled-back "<timestamp>"
```

---

## 9. Performance Tuning (Futuro)

### 9.1 Query Optimization

- ✅ Índices em colunas frequentemente filtradas (userId, date, status)
- 🔄 Análise de slow queries (EXPLAIN ANALYZE)
- 🔄 Connection pooling (PgBouncer, futuro)

### 9.2 Caching (Futuro)

- 🔄 Redis cache para availability checks (reduzir load)
- 🔄 Invalidação inteligente de cache

---

## 10. Migrations Workflow

### 10.1 Adicionar Campo

```bash
# 1. Edite backend/prisma/schema.prisma
# Adicione novo campo, ex:
# model Agendamento {
#   ...
#   notes String? // novo campo
# }

# 2. Crie migration
cd backend
npx prisma migrate dev --name "add_notes_to_agendamento"

# 3. Prisma:
#    - Gera SQL em migrations/[timestamp]_add_notes_to_agendamento/migration.sql
#    - Aplica ao banco
#    - Regenera tipos TypeScript

# 4. Commit
git add backend/prisma/migrations/
git commit -m "feat: Add notes field to agendamentos"
```

### 10.2 Alterar Tabela

```bash
# Mudar tipo de campo, adicionar constraints, etc
# Mesmo workflow: edita schema.prisma → npx prisma migrate dev
```

### 10.3 Reverter em Desenvolvimento

```bash
# Reverter última migration (dev only, destrutivo!)
npx prisma migrate reset

# Isso deleta todos os dados e reaplica todas as migrations
```

---

## Referências

- **Prisma Docs:** https://www.prisma.io/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase Docs:** https://supabase.com/docs/
- **SQL Tutorial:** https://www.postgresql.org/docs/current/sql.html

