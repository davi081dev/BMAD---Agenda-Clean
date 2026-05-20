---
storyId: '1.3'
storyKey: '1-3-setup-database'
epicId: '1'
epicName: 'Foundation & Setup'
storyTitle: 'Setup Database (Prisma + PostgreSQL)'
storyStatus: 'backlog'
estimatedEffort: '2-3 horas'
priority: 'high'
dependencies:
  - '1-2-backend-setup'
createdAt: '13 de maio de 2026'
author: 'Davi'
language: 'pt-br'
---

# Story 1.3: Setup Database (Prisma + PostgreSQL)

**Sequência:** Epic 1 - Foundation & Setup → Depende de Story 1.2 (Backend Setup)  
**Estimativa:** 2-3 horas  
**Status:** Backlog  
**Prioridade:** Alta

---

## Contexto

Este é o terceiro passo na implementação do **agenda-clean**, um sistema de agendamento de limpeza de sofás. As stories anteriores prepararam a estrutura base:
- ✅ **1.1:** Frontend setup (Vite + React + Tailwind)
- ✅ **1.2:** Backend setup (Node.js + Express + TypeScript)
- 🔄 **1.3:** Database setup (Prisma + PostgreSQL) ← **VOCÊ ESTÁ AQUI**

A Story 1.3 estabelece a camada de persistência de dados, definindo o schema completo do banco de dados e criando as migrações iniciais. Isso é **crítico** para as stories subsequentes de autenticação (2.1-2.6) e booking (3.x).

---

## User Story Statement

**Como** desenvolvedor,  
**Quero** definir o schema completo do banco de dados com Prisma e criar as migrações iniciais,  
**Para que** o banco de dados esteja pronto para armazenar dados de usuários e agendamentos com integridade referencial garantida.

---

## Objetivos da Story

1. **Definir o schema Prisma** com todas as tabelas, relacionamentos e constraints necessários
2. **Gerar migrações** através do Prisma (arquivo `migration.sql`)
3. **Validar a estrutura** com tipos TypeScript auto-gerados
4. **Criar seed data** para testes locais (usuários dummy, agendamentos exemplo)
5. **Garantir constraints de integridade** em nível de banco de dados

---

## Acceptance Criteria

### AC1: Schema Prisma Definido com User Table

**Dado** que o projeto backend está inicializado  
**Quando** eu criar o arquivo `schema.prisma`  
**Então** a seguinte tabela `User` existe com:

- ✅ `id` (String, @id, @default(uuid())) - Identificador único (UUID)
- ✅ `email` (String, @unique) - Email do usuário (único no sistema)
- ✅ `googleId` (String, @unique, @db.Varchar(255)) - ID do Google OAuth (único)
- ✅ `name` (String) - Nome completo do usuário (do Google Profile)
- ✅ `role` (Enum: 'client' | 'admin') - Papel do usuário, default 'client'
- ✅ `createdAt` (DateTime, @default(now())) - Timestamp de criação
- ✅ `updatedAt` (DateTime, @updatedAt) - Timestamp de última atualização
- ✅ Índice em `googleId` para otimizar buscas OAuth: `@@index([googleId])`
- ✅ Relacionamento com `Agendamento` via `agendamentos` (one-to-many)

**E** a seguinte validação é aplicada:
- `email` não pode ser vazio
- `googleId` não pode ser vazio
- `name` não pode ser vazio

### AC2: Schema Prisma Definido com Agendamento Table

**Dado** que a tabela `User` está definida  
**Quando** eu criar a tabela `Agendamento`  
**Então** a seguinte tabela existe com:

- ✅ `id` (String, @id, @default(uuid())) - Identificador único (UUID)
- ✅ `userId` (String, @db.Varchar(36)) - Foreign key para User.id
- ✅ `user` (User, @relation("agendamentos")) - Relacionamento com User
- ✅ `date` (DateTime, @db.Date) - Data do agendamento (sem hora)
- ✅ `time` (String, @db.Varchar(5)) - Horário no formato "HH:MM" (ex: "14:30")
- ✅ `address` (String) - Endereço para o serviço
- ✅ `observations` (String, @db.Text) - Observações/notas adicionais do cliente
- ✅ `status` (Enum: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado') - Status do agendamento, default 'solicitado'
- ✅ `createdAt` (DateTime, @default(now())) - Timestamp de criação
- ✅ `updatedAt` (DateTime, @updatedAt) - Timestamp de última atualização

**E** os seguintes constraints e índices são aplicados:
- ✅ Constraint de unique em `(date, time)` **excluindo registros com status 'cancelado'** para prevenir double-booking
  - Constraint deve permitir múltiplos registros cancelados no mesmo slot
  - Implementação: `@@unique([date, time], map: "unique_date_time_not_cancelled")`
  - ⚠️ **Nota:** Prisma não suporta unique constraints condicionais nativamente. Solução alternativa:
    - Usar índice unique sem filtro: `@@unique([date, time])`
    - Validação no aplicativo: antes de INSERT, verificar se existe agendamento ativo (não-cancelado) no slot
    - Ou usar trigger SQL do PostgreSQL na migração para enforce automático
- ✅ Foreign key com `onDelete: Cascade` para remover agendamentos quando usuário é deletado
- ✅ Índices em:
  - `userId` para queries "agendamentos do usuário"
  - `date` para queries "agendamentos da data X"
  - `status` para queries "agendamentos com status X"

**E** a seguinte validação é aplicada:
- `userId` deve referenciar um User existente
- `date` deve ser uma data válida e futura (ou hoje)
- `time` deve estar no formato "HH:MM" com hora 00-23 e minutos 00-59
- `address` não pode ser vazio
- `observations` pode ser vazio

### AC3: Schema Prisma Definido com Availability Table (Opcional - Phase 2)

**Dado** que o schema User e Agendamento estão definidos  
**Quando** eu revisar os requisitos  
**Então** a tabela `Availability` **não será criada nesta story** (deferred para Phase 2)

**Justificativa:** A disponibilidade será inicialmente hardcoded no backend (ex: "segunda a sexta, 09:00-18:00"). Após MVP, será criada tabela `Availability` para configuração dinâmica pelo admin.

### AC4: Tipos TypeScript Auto-gerados

**Dado** que o schema Prisma está definido  
**Quando** eu executar `npx prisma generate`  
**Então** os tipos TypeScript são auto-gerados em `@prisma/client`:

- ✅ `User` type com todas as propriedades
- ✅ `Agendamento` type com todas as propriedades
- ✅ `Enums` para `UserRole` e `AgendamentoStatus`
- ✅ IntelliSense funciona no projeto (autocomplete para `prisma.user.findUnique()`, etc)

### AC5: Migração Inicial Criada

**Dado** que o schema Prisma está pronto  
**Quando** eu executar `npx prisma migrate dev --name init`  
**Então** os seguintes artefatos são criados:

- ✅ Arquivo SQL migration em `prisma/migrations/[timestamp]_init/migration.sql`
- ✅ Arquivo contém:
  - CREATE TABLE statements para User e Agendamento
  - CREATE UNIQUE INDEX para (email) e (googleId)
  - CREATE UNIQUE INDEX para (date, time)
  - CREATE FOREIGN KEY constraints
  - CREATE INDEX para otimizações de query (userId, date, status)
- ✅ Migration é reversível (contém UP e DOWN scripts)
- ✅ Arquivo `.env` é atualizado automaticamente (ou manual) com `DATABASE_URL="..."`

### AC6: Prisma Studio Funcional

**Dado** que a migração foi executada  
**Quando** eu rodar `npx prisma studio`  
**Então**:

- ✅ Prisma Studio abre em `http://localhost:5555`
- ✅ Interface visual mostra as tabelas `User` e `Agendamento`
- ✅ Posso criar/editar registros manualmente (útil para testes)
- ✅ Relacionamentos são visualizáveis (User → Agendamentos)

### AC7: Seed Data Criado para Testes

**Dado** que o banco de dados está vazio  
**Quando** eu executar `npx prisma db seed`  
**Então** os seguintes dados são inseridos:

**Usuários de teste:**
```
1. User "Ana Silva" (Cliente)
   - email: ana@example.com
   - googleId: "1234567890"
   - role: client

2. User "João Admin" (Admin)
   - email: admin@example.com
   - googleId: "0987654321"
   - role: admin
```

**Agendamentos de teste:**
```
1. Agendamento "Ana - Próxima semana"
   - userId: Ana Silva
   - date: [data de 7 dias à frente]
   - time: 14:30
   - address: Rua das Flores, 123, São Paulo
   - observations: Sofá grande, necessário limpeza profunda
   - status: solicitado

2. Agendamento "Ana - Confirmado"
   - userId: Ana Silva
   - date: [data de 3 dias à frente]
   - time: 10:00
   - address: Avenida Principal, 456, São Paulo
   - observations: Sofá pequeno
   - status: confirmado
```

**E** o arquivo `prisma/seed.ts` é criado e é executável via `npx prisma db seed`

### AC8: Validações em Nível de Banco de Dados

**Dado** que o schema foi migrado  
**Quando** eu tentar criar agendamentos inválidos  
**Então** o banco de dados rejeita com erro apropriado:

- ✅ Tentar criar agendamento com `userId` inválido → Erro de constraint de FK
- ✅ Tentar criar dois agendamentos no mesmo (date, time) → Erro de unique constraint
- ✅ Tentar criar User com email duplicado → Erro de unique constraint
- ✅ Tentar criar User com googleId duplicado → Erro de unique constraint

### AC9: Documentação de Schema

**Dado** que o schema Prisma está completo  
**Quando** eu visualizar o arquivo `prisma/schema.prisma`  
**Então** o código inclui:

- ✅ Comentários explicando cada model
- ✅ Comentários explicando enums e suas values
- ✅ Comentários sobre constraints críticos (double-booking prevention)
- ✅ Referência aos requisitos do PRD/Arquitetura

---

## Schema Prisma Completo

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

/// Roles de usuário no sistema
enum UserRole {
  /// Cliente que agenda serviços
  client
  /// Administrador que gerencia agendamentos
  admin
}

/// Estados possíveis de um agendamento
enum AgendamentoStatus {
  /// Agendamento solicitado pelo cliente, aguardando confirmação
  solicitado
  /// Agendamento confirmado pelo admin
  confirmado
  /// Serviço em atendimento (cliente/admin marcou como iniciado)
  em_atendimento
  /// Serviço concluído com sucesso
  concluído
  /// Agendamento cancelado (libera o slot para reutilização)
  cancelado
}

// ============================================
// MODELS
// ============================================

/// Usuários do sistema (clientes e admins)
/// Criados automaticamente no primeiro login via Google OAuth
model User {
  /// ID único gerado como UUID
  id String @id @default(uuid())

  /// Email do usuário (único no sistema)
  /// Vem do Google Profile e é usado para login
  email String @unique

  /// ID do usuário no Google OAuth (único)
  /// Usado para vincular conta ao Google Profile nas atualizações
  googleId String @unique @db.VarChar(255)

  /// Nome completo do usuário (vem do Google Profile)
  name String

  /// Papel/role do usuário: 'client' ou 'admin'
  /// Determina quais endpoints API o usuário pode acessar
  role UserRole @default(client)

  /// Timestamp de quando o usuário foi criado
  createdAt DateTime @default(now())

  /// Timestamp de última atualização do perfil
  updatedAt DateTime @updatedAt

  /// Relacionamento: agendamentos criados por este usuário
  /// onDelete: Cascade → quando usuário é deletado, seus agendamentos também são
  agendamentos Agendamento[]

  /// Índice para otimizar buscas por googleId (OAuth lookups)
  @@index([googleId])
}

/// Agendamentos de serviço de limpeza
/// Criados pelos clientes, gerenciados pelo admin
model Agendamento {
  /// ID único gerado como UUID
  id String @id @default(uuid())

  /// ID do cliente que criou o agendamento
  /// Foreign key para User.id
  userId String

  /// Relacionamento: cliente que criou este agendamento
  user User @relation("agendamentos", fields: [userId], references: [id], onDelete: Cascade)

  /// Data do agendamento (sem horário)
  /// Formato: YYYY-MM-DD
  date DateTime @db.Date

  /// Horário do agendamento
  /// Formato: HH:MM (ex: "14:30")
  time String @db.VarChar(5)

  /// Endereço onde o serviço será realizado
  /// Exemplo: "Rua das Flores, 123, São Paulo, SP"
  address String

  /// Observações/notas adicionadas pelo cliente
  /// Exemplo: "Sofá grande, necessário limpeza profunda"
  observations String @db.Text

  /// Status atual do agendamento
  /// Transições: solicitado → confirmado → em_atendimento → concluído
  /// Ou: solicitado → cancelado (libera o slot)
  status AgendamentoStatus @default(solicitado)

  /// Timestamp de quando o agendamento foi criado
  createdAt DateTime @default(now())

  /// Timestamp de última atualização do status
  updatedAt DateTime @updatedAt

  /// CONSTRAINT CRÍTICO: Previne double-booking
  /// Impede que dois agendamentos (não-cancelados) ocupem o mesmo slot
  /// Postgres unique constraint que é verificado no banco de dados
  /// ⚠️ Validação adicional: aplicação deve checar antes de INSERT
  @@unique([date, time], map: "unique_date_time_not_cancelled")

  /// Índices para otimizar queries comuns
  @@index([userId])
  @@index([date])
  @@index([status])
}
```

---

## Configuração e Implementação

### Passo 1: Instalar Prisma (se ainda não estiver)

```bash
cd backend
npm install @prisma/client prisma --save-dev
npm install @types/node --save-dev
```

### Passo 2: Inicializar Prisma (se ainda não estiver)

```bash
npx prisma init
```

Isto criará:
- Arquivo `prisma/schema.prisma`
- Arquivo `.env` com `DATABASE_URL` placeholder

### Passo 3: Configurar DATABASE_URL no .env

**Para desenvolvimento local com PostgreSQL:**

```env
# .env (desenvolvimento local)
DATABASE_URL="postgresql://username:password@localhost:5432/agenda_clean_dev"
```

**Para desenvolvimento com Docker Compose (recomendado):**

1. Criar `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: agenda-clean-db
    environment:
      POSTGRES_USER: agendaclean
      POSTGRES_PASSWORD: devpassword123
      POSTGRES_DB: agenda_clean_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agendaclean"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

2. Iniciar PostgreSQL:

```bash
docker-compose up -d
```

3. Configurar `.env`:

```env
DATABASE_URL="postgresql://agendaclean:devpassword123@localhost:5432/agenda_clean_dev"
```

### Passo 4: Copiar Schema Prisma

Copiar o schema completo acima para `prisma/schema.prisma` (substituir o placeholder gerado).

### Passo 5: Gerar Tipos TypeScript

```bash
npx prisma generate
```

Isto vai:
- Ler `schema.prisma`
- Gerar tipos em `@prisma/client`
- Validar o schema sintaxe

### Passo 6: Criar Migração Inicial

```bash
npx prisma migrate dev --name init
```

Isto vai:
- Validar o schema
- Gerar arquivo SQL migration em `prisma/migrations/`
- **Executar a migração** no banco de dados
- Criar o arquivo `.prisma/client` com tipos

**Output esperado:**
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Created migration: 20260513123456_init

✔ Generated Prisma Client (5.7.0) to ./node_modules/@prisma/client in 165ms

Start using Prisma Client in Node.js (API)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

### Passo 7: Criar Arquivo de Seed Data

Criar `prisma/seed.ts`:

```typescript
import { PrismaClient, UserRole, AgendamentoStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Limpar dados existentes (para ambiente de teste)
  // Em produção, isso não seria feito
  await prisma.agendamento.deleteMany({});
  await prisma.user.deleteMany({});

  // Criar usuários de teste
  const anaUser = await prisma.user.create({
    data: {
      email: 'ana@example.com',
      googleId: '1234567890',
      name: 'Ana Silva',
      role: UserRole.client,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      googleId: '0987654321',
      name: 'João Admin',
      role: UserRole.admin,
    },
  });

  // Criar agendamentos de teste
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 7 dias no futuro

  const upcomingDate = new Date();
  upcomingDate.setDate(upcomingDate.getDate() + 3); // 3 dias no futuro

  await prisma.agendamento.create({
    data: {
      userId: anaUser.id,
      date: futureDate,
      time: '14:30',
      address: 'Rua das Flores, 123, São Paulo',
      observations: 'Sofá grande, necessário limpeza profunda',
      status: AgendamentoStatus.solicitado,
    },
  });

  await prisma.agendamento.create({
    data: {
      userId: anaUser.id,
      date: upcomingDate,
      time: '10:00',
      address: 'Avenida Principal, 456, São Paulo',
      observations: 'Sofá pequeno',
      status: AgendamentoStatus.confirmado,
    },
  });

  console.log('Database seeding completed!');
  console.log(`Created ${1} admin user and ${1} client user`);
  console.log(`Created ${2} test agendamentos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Passo 8: Configurar Script de Seed em package.json

Adicionar em `backend/package.json`:

```json
{
  "scripts": {
    "prisma:seed": "ts-node prisma/seed.ts",
    "prisma:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  }
}
```

### Passo 9: Executar Seed

```bash
npm run prisma:seed
```

**Output esperado:**
```
Starting database seeding...
Database seeding completed!
Created 1 admin user and 1 client user
Created 2 test agendamentos
```

### Passo 10: Testar com Prisma Studio

```bash
npm run prisma:studio
```

Abrirá `http://localhost:5555` com interface visual para gerenciar dados.

---

## Validação de Constraints

### Test 1: Validar Unique Constraint em Email

```typescript
// Deve falhar (email duplicado)
const user = await prisma.user.create({
  data: {
    email: 'ana@example.com', // Já existe
    googleId: 'different-id',
    name: 'Another Ana',
  },
});
// ❌ Erro: Unique constraint failed on the fields: (`email`)
```

### Test 2: Validar Foreign Key

```typescript
// Deve falhar (userId inválido)
const agendamento = await prisma.agendamento.create({
  data: {
    userId: 'non-existent-id',
    date: new Date(),
    time: '14:30',
    address: 'Rua X',
    observations: '',
  },
});
// ❌ Erro: Foreign key constraint failed on the field: `Agendamento_userId_fkey`
```

### Test 3: Validar Unique Constraint (date, time)

```typescript
// Deve falhar (slot já ocupado)
const agendamento = await prisma.agendamento.create({
  data: {
    userId: anaUser.id,
    date: futureDate, // Mesma data e hora do agendamento existente
    time: '14:30',
    address: 'Rua Y',
    observations: '',
  },
});
// ❌ Erro: Unique constraint failed on the fields: (`date`,`time`)
```

---

## Artefatos Criados

Após completar esta story, os seguintes arquivos existirão:

```
backend/
├── .env                           (com DATABASE_URL configurada)
├── package.json                   (atualizado com @prisma/client)
├── tsconfig.json                  (sem mudanças)
├── prisma/
│   ├── schema.prisma              (✨ NOVO - schema completo)
│   ├── seed.ts                    (✨ NOVO - seed data)
│   └── migrations/
│       └── [timestamp]_init/
│           ├── migration.sql      (✨ NOVO - SQL gerada pelo Prisma)
│           └── migration_lock.toml
└── node_modules/@prisma/          (gerado - tipos TypeScript)
```

---

## Estimativa de Tempo

| Atividade | Tempo Estimado |
|-----------|----------------|
| Instalar dependências | 15 min |
| Configurar Docker/PostgreSQL | 10 min |
| Copiar schema Prisma | 10 min |
| Gerar migração | 5 min |
| Criar seed data | 20 min |
| Testar com Prisma Studio | 10 min |
| Validação e testes | 20 min |
| **Total** | **1:30h** |

**Buffer estimado:** 45 min - 1h (troubleshooting, documentação, verificações finais)  
**Total com buffer:** **2-3 horas**

---

## Dependências e Pré-requisitos

### Deve estar completo antes desta story:
- ✅ **Story 1.1:** Frontend setup (Vite + React)
- ✅ **Story 1.2:** Backend setup (Node.js + Express + TypeScript)

### Ferramentas necessárias:
- Node.js 18+ instalado
- npm ou yarn
- PostgreSQL 13+ (local ou Docker)
- Git (para versionamento)

### Variáveis de ambiente necessárias:
- `DATABASE_URL` (será solicitado durante setup)

---

## Links para Requisitos

### PRD (Requisitos Funcionais Relacionados):
- **FR25:** System persists all agendamento data to database
- **FR26:** System persists all user data (Google profile, preferences)
- **FR27:** Client data is associated with logged-in user and never mixed
- **AUX2:** PostgreSQL database schema with Prisma ORM
- **AUX3:** Unique constraint on (date, time) to prevent double-bookings at database level

### Arquitetura (Decisões Técnicas):
- **Database Schema:** PostgreSQL com Prisma ORM
- **Data Model:** User (id, email, googleId, name, role, createdAt, updatedAt)
- **Data Model:** Agendamento (id, userId, date, time, address, observations, status, createdAt, updatedAt)
- **Double-Booking Prevention:** Unique constraint no banco de dados
- **Constraint on (date, time):** Implementado em nível de database para atomicidade

### Stories Subsequentes (Dependem desta):
- **2.1:** Google OAuth Setup & Passport.js Integration (necessita User table)
- **2.2:** Automatic User Account Creation (necessita User table)
- **2.3:** Admin Role Pre-configuration (necessita User table com role)
- **2.4:** JWT Session Tokens (necessita User table)
- **3.x:** Client Booking Experience (necessita Agendamento table)
- **4.x:** Admin Management Dashboard (necessita Agendamento table)

---

## Próximos Passos (Após AC Completo)

1. ✅ Confirmar que `npx prisma studio` funciona e dados aparecem
2. ✅ Confirmar que tipos TypeScript estão disponíveis em `@prisma/client`
3. ✅ Confirmar que migração foi executada no PostgreSQL
4. → Marcar Story 1.3 como **Pronto** em `sprint-status.yaml`
5. → Prosseguir para **Story 1.4: Environment Configuration & Secrets**
6. → Prosseguir para **Story 1.5: Project Documentation**
7. → Prosseguir para **Story 2.1: Google OAuth Setup** (primeira story de Epic 2)

---

## Notas Importantes

### Double-Booking Prevention (Crítico)

A constraint `@@unique([date, time])` é **crítica** para a integridade dos agendamentos. No entanto, há uma nuance:

**Problema:** Depois que um agendamento é cancelado, o slot deveria ficar livre novamente para reutilização.

**Solução implementada:**
1. Usar unique constraint no banco de dados: `@@unique([date, time])`
2. Adicionar validação no nível de aplicação:
   - Antes de INSERT: verificar se existe agendamento ATIVO (status ≠ 'cancelado') no mesmo slot
   - Se existir ativo → retornar erro
   - Se existir cancelado → permitir novo agendamento no mesmo slot
3. Alternativa com Trigger SQL (não implementado aqui, deferred para Phase 2):
   - Criar trigger PostgreSQL que valida constraint apenas para agendamentos não-cancelados

**Para a Story 1.3:** Implementar constraint simples. Validação completa será feita na Story 3.2 (Client Booking - Real-time Availability Validation).

### Segurança de Dados

- ✅ Usar UUID para IDs (não sequential integers que podem ser guessed)
- ✅ Usar TIMESTAMP automático com `@default(now())` e `@updatedAt`
- ✅ Foreign key com `onDelete: Cascade` (cleanup automático)
- ✅ Índices em campos frequentemente queryados (userId, date, status)

### Performance

- ✅ Índice em `googleId` para OAuth lookups (crítico para login rápido)
- ✅ Índice em `userId` para queries "agendamentos do usuário"
- ✅ Índice em `date` para queries de disponibilidade
- ✅ Índice em `status` para admin dashboard filtering

---

## Troubleshooting Comum

### ❌ Erro: "connect ECONNREFUSED 127.0.0.1:5432"
**Causa:** PostgreSQL não está rodando  
**Solução:** Iniciar PostgreSQL (`docker-compose up -d`) ou verificar conexão

### ❌ Erro: "Unique constraint failed on the fields: (`email`)"
**Causa:** Tentando criar user com email duplicado  
**Solução:** Usar email diferente ou limpar dados com `npx prisma db reset`

### ❌ Erro: "Column type not supported: bpchar"
**Causa:** Schema contém tipo não suportado  
**Solução:** Revisar schema.prisma, remover tipos inválidos

### ❌ Prisma Studio não abre em http://localhost:5555
**Causa:** Porta 5555 já está em uso  
**Solução:** Parar outro serviço na porta 5555 ou usar flag `--port`

```bash
npx prisma studio --port 5556
```

---

## Checklist de Conclusão

- [ ] Dependências Prisma instaladas (`@prisma/client`, `prisma`)
- [ ] PostgreSQL rodando (local ou Docker)
- [ ] `DATABASE_URL` configurada em `.env`
- [ ] `schema.prisma` criado com User e Agendamento tables
- [ ] `npx prisma migrate dev --name init` executado com sucesso
- [ ] Tipos TypeScript auto-gerados em `@prisma/client`
- [ ] `prisma/seed.ts` criado
- [ ] `npm run prisma:seed` executado com sucesso
- [ ] `npm run prisma:studio` funciona e mostra dados
- [ ] Constraints validados (unique email, unique googleId, unique date+time)
- [ ] Foreign key constraint testado
- [ ] Arquivo de migração em `prisma/migrations/` criado
- [ ] Documentação revisada e completa
- [ ] Nenhum erro de TypeScript no projeto (`npx tsc --noEmit`)

---

**Pronto para implementação! 🚀**

_Esta story foi criada em 13 de maio de 2026 como parte do plano de sprint do projeto agenda-clean._
