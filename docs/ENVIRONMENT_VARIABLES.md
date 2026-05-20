# Environment Variables Guide

Guia completo de variáveis de ambiente para o projeto **agenda-clean**.

## Backend Environment Variables

### Database

- **`DATABASE_URL`** (obrigatório): Connection string PostgreSQL
  - **Dev**: `postgresql://usuario:senha@localhost:5432/database_dev`
  - **Staging**: Supabase staging cluster
  - **Production**: Supabase production cluster (encrypted)
  - **Formato**: `postgresql://user:password@host:port/database`
  - **Notas**: Mudar em cada ambiente, NUNCA commitar credenciais reais

### Authentication

- **`GOOGLE_CLIENT_ID`** (obrigatório): Google OAuth Client ID
  - **Dev**: Client ID para desenvolvimento local
  - **Staging**: Client ID para staging
  - **Production**: Client ID para produção
  - **Origem**: Google Cloud Console → Credentials
  - **Notas**: Público, pode estar em git

- **`GOOGLE_CLIENT_SECRET`** (obrigatório): Google OAuth Client Secret
  - **Dev**: Secret para desenvolvimento (não é sensível em dev)
  - **Staging**: Secret para staging
  - **Production**: Injeta via GitHub Secrets (`PROD_GOOGLE_CLIENT_SECRET`)
  - **Notas**: NUNCA commitar em produção, use GitHub Secrets
  - **⚠️ Sensível em Production**: Protegido por GitHub Secrets

- **`JWT_SECRET`** (obrigatório): Secret key para assinar JWT tokens
  - **Dev**: Qualquer string, mas recomenda-se usar algo forte
  - **Staging**: String forte (32+ caracteres)
  - **Production**: Injeta via GitHub Secrets (`PROD_JWT_SECRET`)
  - **Requisitos**: Mínimo 32 caracteres em produção, caracteres aleatórios
  - **⚠️ Sensível**: NUNCA expor em logs ou documentação

### Email

- **`SENDGRID_API_KEY`** (obrigatório): SendGrid API key para envio de emails
  - **Dev**: Use sandbox mode (emails não são enviados)
  - **Staging**: Production API key (emails são enviados)
  - **Production**: Production API key (injeta via GitHub Secrets)
  - **Origem**: SendGrid Dashboard → Settings → API Keys
  - **Notas**: Sandbox mode em dev para não sobrecarregar caixa de entrada
  - **⚠️ Sensível**: NUNCA commitar em staging/production

### URLs

- **`FRONTEND_URL`** (obrigatório): URL do frontend para redirects após login
  - **Dev**: `http://localhost:5173`
  - **Staging**: `https://staging-agenda-clean.vercel.app`
  - **Production**: `https://agenda-clean.app`
  - **Notas**: Usar HTTPS em staging/prod, HTTP em dev

- **`BACKEND_URL`** (obrigatório): URL do backend para redirects internos
  - **Dev**: `http://localhost:3000`
  - **Staging**: `https://api-staging-agenda-clean.render.com`
  - **Production**: `https://api.agenda-clean.app`
  - **Notas**: Usar HTTPS em staging/prod, HTTP em dev

### Admin

- **`ADMIN_EMAILS`** (obrigatório): Lista de emails que recebem role admin
  - **Formato**: `email1@domain.com,email2@domain.com` (separados por vírgula)
  - **Dev**: `admin@dev.local,dev@dev.local`
  - **Staging**: `admin@staging.local,qa@staging.local`
  - **Production**: Apenas emails reais que devem ser admins
  - **Notas**: Apenas estes emails conseguem acessar painel admin

### Node

- **`NODE_ENV`** (obrigatório): Ambiente Node.js
  - **Valores**: `development` | `staging` | `production`
  - **Dev**: `development`
  - **Staging**: `staging`
  - **Production**: `production`
  - **Notas**: Afeta logging, cache, validações

- **`LOG_LEVEL`** (opcional, padrão=`info`): Nível de logging
  - **Valores**: `debug` | `info` | `warn` | `error`
  - **Dev**: `debug` (máximo verbosity)
  - **Staging**: `info` (eventos importantes)
  - **Production**: `error` (apenas erros)
  - **Notas**: Reduz verbosity em produção para performance

### Feature Flags

- **`ENABLE_MOCK_EMAIL`** (opcional, padrão=`false`): Habilita mock de emails
  - **Dev**: `true` (emails não são enviados, loga no console)
  - **Staging**: `false` (emails reais são enviados)
  - **Production**: `false` (emails reais são enviados)
  - **Notas**: Útil para development local

## Frontend Environment Variables

### API

- **`VITE_API_URL`** (obrigatório): URL base do backend API
  - **Dev**: `http://localhost:3000/api`
  - **Staging**: `https://api-staging-agenda-clean.render.com/api`
  - **Production**: `https://api.agenda-clean.app/api`
  - **Notas**: Vite substitui em build time com prefixo `VITE_`

### Authentication

- **`VITE_GOOGLE_CLIENT_ID`** (obrigatório): Google OAuth Client ID (public)
  - **Dev**: Client ID para desenvolvimento
  - **Staging**: Client ID para staging
  - **Production**: Client ID para produção
  - **Notas**: Público, pode estar em git
  - **⚠️ Importante**: Diferente do backend, este é apenas para frontend

### Environment

- **`VITE_ENV`** (obrigatório): Nome do ambiente
  - **Valores**: `development` | `staging` | `production`
  - **Dev**: `development`
  - **Staging**: `staging`
  - **Production**: `production`
  - **Notas**: Vite prefix required (`VITE_` prefix)

- **`VITE_LOG_LEVEL`** (opcional, padrão=`info`): Nível de logging no frontend
  - **Valores**: `debug` | `info` | `warn` | `error`
  - **Dev**: `debug`
  - **Staging**: `info`
  - **Production**: `error`
  - **Notas**: Apenas log nível especificado ou superior

## Setup Local

### 1️⃣ Primeiro Setup (clonar projeto)

**Backend:**
```bash
cd backend
cp .env.development .env.local
# Edite .env.local com seus valores locais de database
```

**Frontend:**
```bash
cd frontend
cp .env.development .env.local
# Edite .env.local se necessário
```

### 2️⃣ Desenvolver Localmente

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3️⃣ Antes de Commit

```bash
# Validar localmente
bash scripts/validate-all.sh

# Se tudo OK
git add .
git commit -m "..."
git push origin feature-branch
```

## Setup Staging

1. Use `.env.staging` como template
2. Preencha secrets via GitHub Actions Secrets
3. Deploy via Render (backend) e Vercel (frontend)
4. GitHub Actions injeta secrets em build time

**GitHub Secrets necessários:**
- `STAGING_DB_PASSWORD`
- `STAGING_JWT_SECRET`

## Setup Production

1. Configure ALL secrets via GitHub Secrets (Settings → Secrets)
2. Nenhum `.env.local` em produção
3. Plataforma injeta secrets via variables de ambiente

**GitHub Secrets necessários para Production:**
- `PROD_DATABASE_URL` (connection string completa)
- `PROD_GOOGLE_CLIENT_ID`
- `PROD_GOOGLE_CLIENT_SECRET`
- `PROD_SENDGRID_API_KEY`
- `PROD_JWT_SECRET` (32+ chars, aleatório)

---

## 🔐 Security Best Practices

✅ **DO:**
- Use `.env.development` com valores de exemplo
- Use `.env.local` para valores reais locais
- Commite apenas `.env.development` em git
- Use GitHub Secrets para values em staging/production
- Mude JWT_SECRET em produção
- Use HTTPS em staging/production

❌ **DON'T:**
- Nunca commite `.env.staging` ou `.env.production` com secrets reais
- Nunca loge valores de `JWT_SECRET`, `SENDGRID_API_KEY`, `DATABASE_URL`
- Nunca compartilhe credentials via chat/email
- Nunca use hardcoded values em production
- Nunca ignore `.gitignore` para secrets

---

## 🧪 Verificação

**Testar variáveis locais:**
```bash
cd backend && cat .env.local | grep DATABASE_URL
cd frontend && cat .env.local | grep VITE_API_URL
```

**Testar variáveis em produção (via GitHub):**
- GitHub Actions mostra quais secrets foram injetados ✅
- Nunca mostra valores dos secrets (apenas `***`)
- Logs diferem entre `npm run dev` (mostra vars) vs CI (secrets ocultos)

---

**Última atualização:** 20 de maio de 2026
