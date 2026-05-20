---
storyId: "1.5"
storyKey: "1-5-setup-cicd-environments"
epicId: "1"
epicName: "Foundation & Setup"
projectName: "agenda-clean"
author: "Davi"
date: "13 de maio de 2026"
status: "ready-for-development"
estimatedEffort: "3-4 horas"
priority: "high"
dependencies: 
  - "1-4-environment-configuration-secrets-management"
skills_required:
  - "GitHub Actions"
  - "CI/CD Pipeline Configuration"
  - "Environment Variable Management"
  - "Linux Shell Scripting"
  - "Node.js Build Tools"
type: "infrastructure"
---

# Story 1.5: Setup CI/CD & Environments

**Epic:** Foundation & Setup (Última story do Epic 1)  
**Sprint:** 0 (Semana 1)  
**Data:** 13 de maio de 2026  
**Nível:** Intermediate  
**Linguagem:** Português (Brasil)  

---

## 📋 User Story

```
Como desenvolvedor,
Quero configurar pipelines automatizados de CI/CD com GitHub Actions 
e ambientes de desenvolvimento, staging e produção,
Para que eu tenha confiança na qualidade do código antes de deployar 
e cada ambiente tenha configurações específicas e seguras.
```

---

## 🎯 Story Objective

Estabelecer uma infraestrutura de Integração Contínua/Entrega Contínua (CI/CD) completa que:

- **Automatize testes e validações** em cada commit para pegar bugs cedo
- **Previna regressões** através de lint, type checking, e build validation
- **Garanta qualidade de código** com checks obrigatórias antes de merge
- **Configure ambientes isolados** (dev, staging, prod) com variáveis específicas
- **Valide localmente** antes de enviar para CI/CD
- **Facilite deploys seguros** com checklists e validações

---

## 📝 Description Detalhada

### Contexto

O projeto **agenda-clean** é um dual-starter (frontend Vite+React + backend Node.js+Express). Para manter qualidade de código e facilitar deploys, precisamos de:

1. **GitHub Actions Workflow** que executa em cada push/PR:
   - Lint checks (ESLint)
   - Type checking (TypeScript)
   - Build validation
   - Testes (quando existirem)

2. **Múltiplos Ambientes** com configurações distintas:
   - **Development** (.env.development): variáveis locais para desenvolvimento local
   - **Staging** (.env.staging): ambiente de teste antes de produção
   - **Production** (.env.production): configurações de produção seguras

3. **Scripts de Validação Local** para rodar CI checks antes de fazer commit

4. **Deployment Checklist** para garantir que toda dependência foi satisfeita

### Por Que É Importante

- **Qualidade Garantida:** Erros de lint e type são detectados automaticamente
- **Deploys Seguros:** GitHub Actions executa validações antes de merge
- **Configurações Isoladas:** Cada ambiente tem suas próprias variáveis
- **Desenvolvimento Mais Rápido:** Dev consegue validar localmente sem esperar por CI
- **Menos Bugs em Produção:** Multiple layers de validação (local → CI → deploy)

### Relação com PRD & Architecture

**Da PRD:**
- ✅ NFR8: "All data in transit is encrypted (HTTPS/TLS)" → CI/CD valida se deployments estão em HTTPS
- ✅ NFR13: "Session tokens expire after 30 days of inactivity" → ENV vars gerenciam JWT_SECRET
- ✅ AUX14-16: "Frontend deployment to Vercel... Backend deployment to Render..." → CI/CD facilita estes deploys

**Da Architecture:**
- ✅ "Environment configuration for Google OAuth, SendGrid, JWT, and database" → Estruturamos .env para cada ambiente
- ✅ "Initial project scaffolding and boilerplate generation" → CI/CD valida scaffolding está correto

---

## ✅ Acceptance Criteria

### 1️⃣ GitHub Actions Workflow - Backend

**Given** um novo commit é feito no `backend/` folder  
**When** o commit é empushado para GitHub  
**Then** GitHub Actions dispara e executa:

- ✅ **Instalação de dependências**: `npm ci`
- ✅ **Lint**: `npm run lint` (ESLint sem erros)
- ✅ **Type Checking**: `npm run type-check` (TypeScript strict mode)
- ✅ **Build**: `npm run build` (produz output otimizado em `dist/`)
- ✅ **Testes** (quando existirem): `npm run test` (passa com 100% ou ≥80% coverage)

**And** o workflow arquivo está em `.github/workflows/backend-ci.yml`  
**And** o workflow roda em Linux (ubuntu-latest)  
**And** o workflow falha se qualquer step falha (breaking the build)  
**And** status check aparece no PR/commit no GitHub

---

### 2️⃣ GitHub Actions Workflow - Frontend

**Given** um novo commit é feito no `frontend/` folder  
**When** o commit é empushado para GitHub  
**Then** GitHub Actions dispara e executa:

- ✅ **Instalação de dependências**: `npm ci`
- ✅ **Lint**: `npm run lint` (ESLint sem erros)
- ✅ **Type Checking**: `npm run type-check` (TypeScript strict mode)
- ✅ **Build**: `npm run build` (produz output em `dist/` para produção)
- ✅ **Testes** (quando existirem): `npm run test` (passa com 100% ou ≥80% coverage)

**And** o workflow arquivo está em `.github/workflows/frontend-ci.yml`  
**And** o workflow roda em Linux (ubuntu-latest)  
**And** o workflow falha se qualquer step falha  
**And** status check aparece no PR/commit no GitHub

---

### 3️⃣ GitHub Actions Workflow - Lint & Type Check

**Given** um developer faz commit sem rodar validações locais  
**When** o commit é empushado  
**Then** GitHub Actions imediatamente roda:

- ✅ **ESLint** em ambos frontend e backend
- ✅ **TypeScript compiler** em strict mode
- ✅ **Build validation** para garantir produção está pronta

**And** se lint ou type-check falham → CI falha → PR fica vermelho  
**And** developer recebe notificação e consegue ver erro no GitHub  
**And** erro é claro o suficiente para dev saber exatamente o que corrigir  

Example output:
```
❌ Frontend Lint Failed
Error: src/components/Button.tsx
  Line 42: 'unused' is declared but never used (no-unused-vars)
  
Fix: Remove unused variable or use it in the component
```

---

### 4️⃣ Ambiente Development (.env.development)

**Given** um developer clona o projeto  
**When** copia `.env.development` para `.env.local` no backend e frontend  
**Then** as seguintes variáveis estão configuradas para desenvolvimento local:

**Backend `.env.development`:**
```
# Database (Local PostgreSQL)
DATABASE_URL="postgresql://agenda_dev:devpass@localhost:5432/agenda_dev"

# Google OAuth (Development Client ID/Secret - não usar em produção!)
GOOGLE_CLIENT_ID="xxx-yyyyyyy.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxx"

# SendGrid (Sandbox mode - emails não são enviados)
SENDGRID_API_KEY="SG.xxxxxxxxxxxx"

# JWT
JWT_SECRET="dev-secret-key-change-in-prod"

# Node Environment
NODE_ENV="development"

# URLs
FRONTEND_URL="http://localhost:5173"
BACKEND_URL="http://localhost:3000"

# Admin Emails (Development - qualquer email é admin)
ADMIN_EMAILS="admin@dev.local,dev@dev.local"

# Feature Flags
LOG_LEVEL="debug"
ENABLE_MOCK_EMAIL="true"
```

**Frontend `.env.development`:**
```
# API Configuration
VITE_API_URL="http://localhost:3000/api"

# Google OAuth
VITE_GOOGLE_CLIENT_ID="xxx-yyyyyyy.apps.googleusercontent.com"

# Feature Flags
VITE_LOG_LEVEL="debug"
VITE_ENV="development"
```

**And** arquivo `.env.development` está em `git` (safe defaults, sem secrets reais)  
**And** arquivo `.env.local` está em `.gitignore` (local overrides, seguro)  
**And** comentários claros explicam cada variável  

---

### 5️⃣ Ambiente Staging (.env.staging)

**Given** um backend/frontend está pronto para testar em staging  
**When** arquivo `.env.staging` é lido antes de deploy  
**Then** as seguintes variáveis estão configuradas para staging:

**Backend `.env.staging`:**
```
# Database (Supabase Staging Cluster)
DATABASE_URL="postgresql://agenda_staging:${STAGING_DB_PASSWORD}@db-staging.supabase.co:5432/agenda_staging"

# Google OAuth (Staging Client ID/Secret)
GOOGLE_CLIENT_ID="staging-xxx-yyyyyyy.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxx-staging"

# SendGrid (Production API Key, emails são enviados)
SENDGRID_API_KEY="SG.xxxxxxxxxxxx-staging"

# JWT
JWT_SECRET="${STAGING_JWT_SECRET}"  # Injected via GitHub Secrets

# Node Environment
NODE_ENV="staging"

# URLs
FRONTEND_URL="https://staging-agenda-clean.vercel.app"
BACKEND_URL="https://api-staging-agenda-clean.render.com"

# Admin Emails
ADMIN_EMAILS="admin@staging.local,qa@staging.local"

# Feature Flags
LOG_LEVEL="info"
ENABLE_MOCK_EMAIL="false"
```

**Frontend `.env.staging`:**
```
# API Configuration
VITE_API_URL="https://api-staging-agenda-clean.render.com/api"

# Google OAuth
VITE_GOOGLE_CLIENT_ID="staging-xxx-yyyyyyy.apps.googleusercontent.com"

# Feature Flags
VITE_LOG_LEVEL="info"
VITE_ENV="staging"
```

**And** arquivo `.env.staging` contém placeholders para secrets sensíveis  
**And** secrets reais são injetados via GitHub Secrets during CI  
**And** comentários indicam quais variáveis são sensíveis  

---

### 6️⃣ Ambiente Production (.env.production)

**Given** um deploy está sendo feito para produção  
**When** arquivo `.env.production` é utilizado  
**Then** as seguintes variáveis estão configuradas para produção:

**Backend `.env.production`:**
```
# Database (Supabase Production Cluster - ENCRYPTED)
DATABASE_URL="${PROD_DATABASE_URL}"  # Injected via platform secrets

# Google OAuth (Production Client ID/Secret)
GOOGLE_CLIENT_ID="${PROD_GOOGLE_CLIENT_ID}"
GOOGLE_CLIENT_SECRET="${PROD_GOOGLE_CLIENT_SECRET}"

# SendGrid (Production API Key)
SENDGRID_API_KEY="${PROD_SENDGRID_API_KEY}"

# JWT (Production Secret - STRONG)
JWT_SECRET="${PROD_JWT_SECRET}"

# Node Environment
NODE_ENV="production"

# URLs
FRONTEND_URL="https://agenda-clean.app"
BACKEND_URL="https://api.agenda-clean.app"

# Admin Emails (Real admin emails)
ADMIN_EMAILS="davi@email.com"

# Feature Flags
LOG_LEVEL="error"
ENABLE_MOCK_EMAIL="false"
```

**Frontend `.env.production`:**
```
# API Configuration
VITE_API_URL="https://api.agenda-clean.app/api"

# Google OAuth (Production)
VITE_GOOGLE_CLIENT_ID="${VITE_PROD_GOOGLE_CLIENT_ID}"

# Feature Flags
VITE_LOG_LEVEL="error"
VITE_ENV="production"
```

**And** TODOS os secrets em produção são injetados via secure environment variables (GitHub Secrets)  
**And** NENHUM secret real está em `git`  
**And** LOG_LEVEL é "error" para reduzir verbosidade em produção  
**And** URLs apontam para domínios de produção corretos  

---

### 7️⃣ Variáveis de Ambiente Documentadas

**Given** um developer precisa entender qual variável é qual  
**When** abre um arquivo `docs/ENVIRONMENT_VARIABLES.md`  
**Then** documenta:

```markdown
# Environment Variables Guide

## Backend Environment Variables

### Database
- `DATABASE_URL` (required): PostgreSQL connection string
  - Dev: localhost with test database
  - Prod: Supabase with encrypted connection
  - Format: postgresql://user:password@host:port/database

### Authentication
- `GOOGLE_CLIENT_ID` (required): Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` (required): Google OAuth Client Secret
- `JWT_SECRET` (required): Secret key for signing JWT tokens
  - ⚠️ MUST be strong (32+ chars) in production
  - Dev: any string, but should be strong

### Email
- `SENDGRID_API_KEY` (required): SendGrid API key for email delivery
  - Dev: Use sandbox mode (emails not sent)
  - Prod: Use production API key

### URLs
- `FRONTEND_URL` (required): Frontend URL for redirects
  - Dev: http://localhost:5173
  - Prod: https://agenda-clean.app

### Admin
- `ADMIN_EMAILS` (required): Comma-separated list of admin emails
  - Format: email1@domain.com,email2@domain.com
  - Only these emails get admin role

### Node
- `NODE_ENV` (required): Environment name (development, staging, production)
- `LOG_LEVEL` (optional, default=info): Logging level (debug, info, warn, error)

## Frontend Environment Variables

### API
- `VITE_API_URL` (required): Backend API base URL
  - Dev: http://localhost:3000/api
  - Prod: https://api.agenda-clean.app/api

### Authentication
- `VITE_GOOGLE_CLIENT_ID` (required): Google OAuth Client ID (public, same as backend)

### Environment
- `VITE_ENV` (required): Environment name (development, staging, production)
- `VITE_LOG_LEVEL` (optional, default=info): Logging level

## How to Set Up

### Local Development
1. Copy `.env.development` to `.env.local` in backend/
2. Copy `.env.development` to `.env.local` in frontend/
3. Modify `.env.local` with your local values (DB password, etc.)
4. Start servers: `npm run dev`

### Staging
1. Use `.env.staging` as template
2. Fill in staging secrets via environment injection
3. Deploy to staging platforms

### Production
1. Set all secrets via GitHub Secrets
2. CI/CD injects secrets at build time
3. No `.env.local` in production
```

**And** arquivo está em `docs/ENVIRONMENT_VARIABLES.md`  
**And** cada variável tem description, required status, e exemplos para cada ambiente  
**And** há warnings claros sobre secrets em produção  

---

### 8️⃣ Scripts de Validação Local

**Given** um developer está pronto para fazer commit  
**When** executa script de validação local  
**Then** os seguintes scripts estão disponíveis no `package.json`:

**Backend scripts:**
```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "type-check": "tsc --noEmit",
    "build": "tsc",
    "dev": "nodemon src/index.ts",
    "validate": "npm run lint && npm run type-check && npm run build",
    "validate:fix": "npm run lint:fix && npm run type-check && npm run build"
  }
}
```

**Frontend scripts:**
```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "type-check": "tsc --noEmit",
    "build": "vite build",
    "dev": "vite",
    "validate": "npm run lint && npm run type-check && npm run build",
    "validate:fix": "npm run lint:fix && npm run type-check && npm run build"
  }
}
```

**And** um script root-level na raiz do projeto:
```bash
#!/bin/bash
# scripts/validate-all.sh - Valida frontend e backend simultaneamente

echo "🔍 Validando Backend..."
cd backend && npm run validate || exit 1

echo "✅ Backend OK"
echo ""
echo "🔍 Validando Frontend..."
cd ../frontend && npm run validate || exit 1

echo "✅ Frontend OK"
echo ""
echo "🎉 Tudo pronto para commit!"
```

**And** script pode ser executado com: `bash scripts/validate-all.sh`  
**And** script retorna exit code 1 se qualquer validação falha  
**And** developer consegue usar `npm run validate:fix` para corrigir automaticamente  

---

### 9️⃣ Deployment Checklist

**Given** código passou em todos os testes e CI/CD checks  
**When** developer precisa fazer deploy para staging ou produção  
**Then** um arquivo `docs/DEPLOYMENT_CHECKLIST.md` documenta:

```markdown
# Deployment Checklist

## Pre-Deployment Validation

Before deploying to staging or production, verify:

### Code Quality
- [ ] All PR checks passed (GitHub Actions green)
- [ ] ESLint: no errors
- [ ] TypeScript: no type errors (strict mode)
- [ ] Build: production build completes successfully
- [ ] Tests: all tests pass (coverage ≥80%)
- [ ] No console.log statements in production code
- [ ] No TODO/FIXME comments that block deployment

### Environment Setup
- [ ] `.env.development` matches actual dev setup
- [ ] `.env.staging` has all required variables
- [ ] `.env.production` has placeholders for all secrets
- [ ] No secrets are committed to git
- [ ] GitHub Secrets are configured for CI/CD injection
- [ ] Database URLs are correct for target environment
- [ ] Google OAuth credentials are registered for target domain

### Database
- [ ] Database is running and accessible
- [ ] All Prisma migrations are up-to-date
- [ ] `npx prisma migrate status` shows no pending migrations
- [ ] Database backups exist (for production)
- [ ] Test database is clean and ready

### Backend Deployment (Render)
- [ ] Latest code is committed and pushed
- [ ] All backend tests pass
- [ ] Build script runs successfully
- [ ] Environment variables are set in Render dashboard
- [ ] Database connection string is tested
- [ ] Render project is connected to correct GitHub repo
- [ ] Deploy branch is set correctly (main for prod, staging for staging)

### Frontend Deployment (Vercel)
- [ ] Latest code is committed and pushed
- [ ] All frontend tests pass
- [ ] Build script produces optimized output
- [ ] Environment variables are set in Vercel dashboard
- [ ] Build preview shows correct content and styling
- [ ] Vercel project is connected to correct GitHub repo
- [ ] Deploy branch is set correctly

### Post-Deployment Verification

After deployment completes:

- [ ] Frontend loads without console errors
- [ ] Backend API is responding (health check endpoint)
- [ ] Google OAuth login works end-to-end
- [ ] Database connections are stable
- [ ] No 5xx errors in logs
- [ ] API responses have correct headers (CORS, Content-Type)
- [ ] Frontend can communicate with backend API
- [ ] Monitoring/alerting is active

### Rollback Plan

If deployment fails:

1. Identify the failure in GitHub Actions logs
2. Check deploy logs on Render (backend) or Vercel (frontend)
3. Revert to previous commit: `git revert <commit-hash>`
4. Fix issue locally and re-deploy

## Staging Deployment

```bash
# 1. Validate locally
bash scripts/validate-all.sh

# 2. Push to github
git add .
git commit -m "feat: <description>"
git push origin staging

# 3. GitHub Actions runs automatically
# 4. Check GitHub Actions logs for any failures
# 5. If CI passes, Render and Vercel auto-deploy
# 6. Test at https://staging-agenda-clean.vercel.app
```

## Production Deployment

```bash
# 1. Validate locally
bash scripts/validate-all.sh

# 2. Create release
git tag -a v1.0.0 -m "Release v1.0.0"

# 3. Push to github
git push origin main
git push origin v1.0.0

# 4. GitHub Actions runs validation
# 5. Manual approval required in GitHub (if configured)
# 6. Render and Vercel auto-deploy on approval
# 7. Test at https://agenda-clean.app
# 8. Monitor error logs for 24 hours
```

## Emergency Procedures

### Database Connection Lost
- Check Supabase dashboard for status
- Verify DATABASE_URL in environment
- Restart application on Render/Vercel

### Google OAuth Not Working
- Verify client ID matches deployed domain
- Check Google Cloud Console for authorized redirect URIs
- Clear browser cookies and retry

### High Error Rate
- Check GitHub Actions logs for recent deployments
- Review application error logs
- Consider rolling back to previous version
- Contact platform support if infrastructure issue
```

**And** arquivo está em `docs/DEPLOYMENT_CHECKLIST.md`  
**And** checklist é claro e acionável (checkboxes para cada item)  
**And** inclui seções para dev/staging/prod distintas  
**And** inclui plano de rollback  

---

### 🔟 GitHub Actions File Structure

**Given** GitHub Actions precisa rodar automaticamente  
**When** commits são feitos para frontend/ ou backend/  
**Then** os seguintes arquivos de workflow existem:

**File: `.github/workflows/backend-ci.yml`**

```yaml
name: Backend CI

on:
  push:
    branches: [ main, staging ]
    paths: [ backend/**, .github/workflows/backend-ci.yml ]
  pull_request:
    branches: [ main, staging ]
    paths: [ backend/** ]

jobs:
  ci:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: agenda_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: 'backend/package-lock.json'
      
      - name: Install dependencies
        run: npm ci
        working-directory: backend
      
      - name: Run ESLint
        run: npm run lint
        working-directory: backend
      
      - name: Run TypeScript Check
        run: npm run type-check
        working-directory: backend
      
      - name: Build
        run: npm run build
        working-directory: backend
      
      - name: Run Tests
        run: npm run test
        working-directory: backend
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/agenda_test
```

**File: `.github/workflows/frontend-ci.yml`**

```yaml
name: Frontend CI

on:
  push:
    branches: [ main, staging ]
    paths: [ frontend/**, .github/workflows/frontend-ci.yml ]
  pull_request:
    branches: [ main, staging ]
    paths: [ frontend/** ]

jobs:
  ci:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'
      
      - name: Install dependencies
        run: npm ci
        working-directory: frontend
      
      - name: Run ESLint
        run: npm run lint
        working-directory: frontend
      
      - name: Run TypeScript Check
        run: npm run type-check
        working-directory: frontend
      
      - name: Build
        run: npm run build
        working-directory: frontend
      
      - name: Run Tests
        run: npm run test
        working-directory: frontend
        env:
          VITE_API_URL: http://localhost:3000/api
```

**And** ambos workflows têm cache configurado para npm dependencies (faster runs)  
**And** workflow para backend tem PostgreSQL service container  
**And** workflows rodam em paralelo (frontend e backend independentes)  
**And** workflows disparam apenas quando relevant files mudam  
**And** status check aparece no PR/commit  

---

## 📊 Definition of Done

A story é considerada **completa** quando:

- ✅ GitHub Actions workflows criados e testados (`.github/workflows/backend-ci.yml` e `.github/workflows/frontend-ci.yml`)
- ✅ `.env.development`, `.env.staging`, `.env.production` criados com exemplos
- ✅ `docs/ENVIRONMENT_VARIABLES.md` documenta todas as variáveis
- ✅ `docs/DEPLOYMENT_CHECKLIST.md` fornece instruções de deploy
- ✅ Scripts npm adicionados para `validate`, `validate:fix`, etc.
- ✅ Root-level script `scripts/validate-all.sh` funciona e valida ambos projetos
- ✅ CI/CD dispara automaticamente em cada push e PR
- ✅ PRs têm status checks vermelhos se lint/type-check falham
- ✅ Developer consegue rodar `npm run validate` localmente antes de commit
- ✅ Todos os arquivos `.env` (except `.env.development`) estão em `.gitignore`
- ✅ Workflow logs são claros e fáceis de debugar

---

## 🔗 Dependencies & Context

### Depende De:
- ✅ **Story 1.4: Environment Configuration & Secrets Management**
  - Arquivo `.env` template deve existir
  - Variáveis de ambiente devem estar documentadas

### Habilita:
- 📌 **Story 2.1+**: Todos os epics subsequentes podem agora confiar em CI/CD para validações
- 📌 **Deployment**: Frontend pode ser deployado para Vercel, Backend para Render com confiança

### Artefatos Relacionados:
- PRD: Requisitos de segurança (NFR8, NFR13) e deployment (AUX14-16)
- Architecture: Environment configuration, deployment architecture
- Sprint Plan: Epic 1 finalizado após esta story

---

## 🕐 Effort Estimation

**Total Estimado: 3-4 horas**

| Tarefa | Tempo | Notas |
|--------|-------|-------|
| GitHub Actions setup (backend) | 45min | Workflow YAML, service containers |
| GitHub Actions setup (frontend) | 45min | Workflow YAML, caching |
| Environment files (.env.*) | 45min | Development, staging, production |
| Scripts & validate.sh | 30min | npm scripts, root validation script |
| Documentation (ENV vars + Checklist) | 30min | docs/ENVIRONMENT_VARIABLES.md, docs/DEPLOYMENT_CHECKLIST.md |
| Testing workflows locally | 45min | Trigger builds, verify status checks |
| **Total** | **3h 50min** | |

---

## 📝 Implementation Notes

### GitHub Actions Details
- Use `ubuntu-latest` runner (cheaper, sufficient for this project)
- Cache npm dependencies para acelerar builds (npm ci + cache)
- Backend precisa de PostgreSQL service container para testes
- Frontend não precisa de services (pure JS/TS)
- Workflows devem falhar rápido se há erros críticos

### Environment Setup
- `.env.development` é safe para git (exemplo de variáveis)
- `.env.local` é git-ignored (valores locais reais)
- `.env.staging` tem placeholders para secrets sensíveis
- `.env.production` usa variáveis injetadas via GitHub Secrets
- GitHub Secrets: Configure via Settings > Secrets > Actions

### Security Best Practices
- NUNCA commitar secrets reais em `.env.staging` ou `.env.production`
- SEMPRE usar GitHub Secrets para injetar production secrets
- SEMPRE usar HTTPS_ONLY em production (configured by platform)
- SEMPRE validar DATABASE_URL format antes de usar
- SEMPRE usar strong JWT_SECRET em production (≥32 chars random)

### Local Development Flow
1. Dev clona repo
2. Dev copia `.env.development` → `.env.local`
3. Dev modifica `.env.local` com valores locais
4. Dev roda `npm run dev` em backend e frontend
5. Dev antes de commit: `bash scripts/validate-all.sh`
6. Se tudo OK → push
7. GitHub Actions roda validações
8. Se CI OK → dev pode merge

---

## 🧪 Validation Criteria (Como testar)

### ✅ Test 1: GitHub Actions Backend Workflow
```bash
# Trigger: Make any change to backend/src/ and push
# Expected: GitHub Actions "Backend CI" runs and passes
# Verify: Go to Actions tab, see green checkmark
```

### ✅ Test 2: GitHub Actions Frontend Workflow
```bash
# Trigger: Make any change to frontend/src/ and push
# Expected: GitHub Actions "Frontend CI" runs and passes
# Verify: Go to Actions tab, see green checkmark
```

### ✅ Test 3: Local Lint Failure
```bash
# Trigger: Add eslint violation to backend/src/index.ts
# Run: npm run lint
# Expected: Error shows with line number and fix suggestion
```

### ✅ Test 4: Local Type-Check Failure
```bash
# Trigger: Add type error to frontend/src/App.tsx
# Run: npm run type-check
# Expected: TypeScript shows error with file:line
```

### ✅ Test 5: Environment Variables Load
```bash
# Backend:
cd backend && cat .env.development  # Should show all vars
# Frontend:
cd frontend && cat .env.development  # Should show all vars
```

### ✅ Test 6: Validate Script Works Locally
```bash
bash scripts/validate-all.sh
# Expected: Output shows backend OK, frontend OK
# Exit code: 0 if success, 1 if failure
```

### ✅ Test 7: PR Status Checks
```bash
# Create PR on GitHub
# Expected: "Backend CI" and "Frontend CI" checks appear
# If make change that breaks lint, check turns red
```

---

## 📚 References & Links

### GitHub Actions Docs
- https://docs.github.com/en/actions
- https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions

### Environment Variables
- https://nodejs.org/en/knowledge/file-system/how-to-use-the-dotenv-module/
- https://vitejs.dev/guide/env-and-modes.html

### TypeScript & ESLint
- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- https://eslint.org/docs/latest/use/configure/

### Deployment
- https://vercel.com/docs (Frontend deployment)
- https://render.com/docs (Backend deployment)

---

## ❓ Questions for Clarification

_Salvas para referência futura se necessário_

1. **Monitoramento & Alertas**: Após deployment, há requisitos de monitoring em Render/Vercel?
2. **Testes Automatizados**: Quando as suites de teste serão adicionadas? (Story 1.5 assume estrutura básica)
3. **Database Seeding**: Há necessidade de seed script para dev/staging?
4. **API Health Check**: Incluir endpoint `/health` no backend para CI validar?
5. **Secrets Rotation**: Política de rotação de secrets (JWT_SECRET, etc.)?

---

**Story Author:** Davi  
**Date Created:** 13 de maio de 2026  
**Last Updated:** 13 de maio de 2026  
**Status:** ✅ Ready for Development
