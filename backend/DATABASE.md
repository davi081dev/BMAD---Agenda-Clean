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

### 5.4 Atualizar Status de um Agendamento

```sql
-- Confirmar um agendamento
UPDATE "Agendamento"
SET "status" = 'confirmado', "updatedAt" = NOW()
WHERE "id" = 'uuid-agendamento';
```

---

## 6. Exemplos com Prisma (TypeScript)

### 6.1 Buscar Agendamentos do Cliente

```typescript
// Listar agendamentos do cliente logado
const bookings = await prisma.agendamento.findMany({
  where: {
    userId,
  },
  orderBy: {
    date: 'desc',
  },
});
```

### 6.2 Verificar Disponibilidade

```typescript
// Verificar se um horário está disponível
async function isSlotAvailable(date: Date, time: string): Promise<boolean> {
  const existing = await prisma.agendamento.count({
    where: {
      date,
      time,
      status: { not: 'cancelado' },
    },
  });
  return existing === 0;
}
```

### 6.3 Criar Agendamento

```typescript
// Criar novo agendamento
const booking = await prisma.agendamento.create({
  data: {
    userId,
    date: new Date(data.date),
    time: data.time,
    address: data.address,
    observations: data.observations || null,
    status: 'solicitado',
  },
});
```

---

## 7. Migrations Workflow

### 7.1 Adicionar Campo

```bash
# 1. Edite schema.prisma
# 2. Crie migration
npx prisma migrate dev --name "add_notes_to_agendamento"

# 3. Prisma aplica ao banco e regenera tipos
```

### 7.2 Reverter em Desenvolvimento

```bash
# Reset database (dev only!)
npx prisma migrate reset
```

---

## Referências

- **Prisma Docs:** https://www.prisma.io/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase Docs:** https://supabase.com/docs/

