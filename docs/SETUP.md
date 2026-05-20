# Setup Local - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0

Guia passo-a-passo para configurar o projeto **agenda-clean** em seu ambiente local de desenvolvimento.

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

### 1.1 Obrigatórios

- **Node.js** v18.x LTS ou superior ([Download](https://nodejs.org/))
  - Verificar: `node --version`
  - Recomendado: v20.x LTS (suporte estendido até 2026)

- **npm** v9.x ou superior (vem com Node.js)
  - Verificar: `npm --version`
  - Atualizar: `npm install -g npm@latest`

- **Git** configurado no seu sistema ([Download](https://git-scm.com/))
  - Verificar: `git --version`
  - Configurar identidade:
    ```bash
    git config --global user.name "Seu Nome"
    git config --global user.email "seu.email@example.com"
    ```

- **PostgreSQL** v14+ instalado localmente OU acesso ao **Supabase** (free tier)
  - PostgreSQL local: ([Download](https://www.postgresql.org/download/))
  - OU Supabase: ([Criar projeto grátis](https://supabase.com/))
  - Verificar PostgreSQL: `psql --version`

### 1.2 Recomendado

- **VS Code** ([Download](https://code.visualstudio.com/))
  - Extensões recomendadas:
    - **Prettier** (Code Formatter) - formatação de código
    - **ESLint** - linting de JavaScript/TypeScript
    - **Tailwind CSS IntelliSense** - autocompletar CSS
    - **Thunder Client** ou **REST Client** - testar APIs
    - **Prisma** - suporte a syntax highlighting do schema

- **Postman** ou **Thunder Client** para testar endpoints API (opcional, curl também funciona)

---

## 2. Instalação Local (Step-by-Step)

### 2.1 Clone do Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/agenda-clean.git

# Entre na pasta do projeto
cd agenda-clean

# Verifique a estrutura
ls -la
```

### 2.2 Instalação de Dependências

```bash
# Instale dependências do projeto raiz (se houver)
npm install

# Instale dependências do backend
cd backend
npm install

# Instale dependências do frontend
cd ../frontend
npm install

# Volte para raiz
cd ..
```

### 2.3 Configuração de Variáveis de Ambiente

#### Backend (Node.js + Express)

```bash
# Entre na pasta backend
cd backend

# Copie o arquivo de template para .env.local
cp .env.example .env.local

# Edite o arquivo .env.local com suas credenciais
nano .env.local  # ou use seu editor favorito
```

**Variáveis necessárias em `backend/.env.local`:**

```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/agenda-clean-dev"

# Server Config
PORT=3000
NODE_ENV=development

# Google OAuth (para autenticação)
GOOGLE_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret-aqui

# JWT Token Secret (gere com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=gere-uma-string-aleatoria-aqui

# Email Service (SendGrid)
SENDGRID_API_KEY=sua-api-key-sendgrid

# Frontend URL (para redirecionamentos OAuth)
FRONTEND_URL=http://localhost:5173
```

#### Frontend (React + Vite)

```bash
# Entre na pasta frontend
cd frontend

# Copie o arquivo de template
cp .env.example .env.local

# Edite conforme necessário
nano .env.local
```

**Variáveis necessárias em `frontend/.env.local`:**

```env
# Backend API URL
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=agenda-clean
```

### 2.4 Setup do Banco de Dados

Escolha **UMA** das opções abaixo:

#### Opção A: PostgreSQL Local (Linux/Mac/Windows)

```bash
# Criar banco de dados local
createdb agenda-clean-dev

# Verificar conexão
psql -U postgres -d agenda-clean-dev -c "SELECT 1"
```

Atualizar `DATABASE_URL` em `backend/.env.local`:
```env
DATABASE_URL="postgresql://postgres:seu-password@localhost:5432/agenda-clean-dev"
```

#### Opção B: PostgreSQL com Docker

```bash
# Inicie um container PostgreSQL
docker run --name agenda-clean-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=agenda-clean-dev \
  -p 5432:5432 \
  -d postgres:14-alpine

# Atualizar DATABASE_URL:
DATABASE_URL="postgresql://postgres:password@localhost:5432/agenda-clean-dev"
```

#### Opção C: Supabase (Free Tier - Recomendado para MVP)

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto (free tier)
3. Vá para "Settings → Database"
4. Copie a **Connection string** (URI padrão do PostgreSQL)
5. Cole em `backend/.env.local`:
   ```env
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]"
   ```

### 2.5 Execução de Migrações

```bash
# Entre na pasta backend (se não estiver lá)
cd backend

# Execute as migrações do Prisma
npx prisma migrate dev

# Isso irá:
# 1. Criar as tabelas no banco (User, Agendamento)
# 2. Aplicar as constraints
# 3. Gerar tipos TypeScript automaticamente

# Verifique que tudo foi criado
npx prisma studio  # Abre GUI do banco (http://localhost:5555)
```

### 2.6 (Opcional) Seed Data para Testes

```bash
# Insira dados de teste no banco
npm run db:seed

# Isso irá:
# 1. Criar usuários de teste (cliente + admin)
# 2. Criar alguns agendamentos de exemplo
# 3. Facilitar testes manuais
```

---

## 3. Executando os Servidores de Desenvolvimento

### 3.1 Terminal 1: Backend (Node.js + Express)

```bash
# Na raiz do projeto
cd backend

# Inicie o servidor com hot-reload
npm run dev

# Esperado: "Server running on http://localhost:3000"
```

### 3.2 Terminal 2: Frontend (React + Vite)

```bash
# Na raiz do projeto
cd frontend

# Inicie o servidor de desenvolvimento
npm run dev

# Esperado: "Local: http://localhost:5173"
# Navegador deve abrir automaticamente
```

### 3.3 (Opcional) Terminal 3: Prisma Studio

```bash
# Na raiz do projeto
cd backend

# Abra a GUI do banco
npx prisma studio

# Navegue para http://localhost:5555
```

---

## 4. URLs dos Servidores

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:5173 | Aplicação React (cliente) |
| **Backend API** | http://localhost:3000 | Express REST API |
| **Health Check** | http://localhost:3000/health | Verificar se backend está rodando |
| **Prisma Studio** | http://localhost:5555 | GUI para visualizar database |

### 4.1 Teste Rápido de Conectividade

```bash
# Verificar se backend está rodando
curl http://localhost:3000/health

# Esperado: { "status": "ok", "timestamp": "2026-05-13T..." }

# Verificar se frontend carrega
curl http://localhost:5173

# Esperado: HTML da página (começando com <!DOCTYPE html>)
```

---

## 5. Troubleshooting Comum

### Problema: "npm install" falha com erro de permissão

**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Tente novamente
npm install

# Se ainda falhar, tente instalar globalmente
npm install -g npm@latest
```

### Problema: "MODULE_NOT_FOUND: Cannot find module '@prisma/client'"

**Solução:**
```bash
# Gere o cliente Prisma novamente
cd backend
npx prisma generate

# Reinstale dependências
npm install
```

### Problema: "EADDRINUSE: address already in use :::3000"

A porta 3000 já está sendo usada por outro processo.

**Solução:**
```bash
# Encontre o processo usando a porta
# No Linux/Mac:
lsof -i :3000

# No Windows:
netstat -ano | findstr :3000

# Mate o processo (Linux/Mac):
kill -9 <PID>

# No Windows:
taskkill /PID <PID> /F
```

### Problema: "Error: connect ECONNREFUSED 127.0.0.1:5432" (PostgreSQL)

O banco de dados não está rodando.

**Solução:**
```bash
# Se PostgreSQL local, inicie o serviço
# No Linux:
sudo systemctl start postgresql

# No Mac:
brew services start postgresql

# No Windows:
services.msc → PostgreSQL → Start

# Ou use Docker:
docker start agenda-clean-db

# Verifique a DATABASE_URL em .env.local
cat backend/.env.local | grep DATABASE_URL
```

### Problema: "Unable to connect to database" com Supabase

DATABASE_URL está incorreta.

**Solução:**
```bash
# Vá para supabase.com → seu projeto
# Settings → Database → Connection strings
# Copie a "URI" padrão (não a "psql")
# Cole em backend/.env.local

# Teste conexão:
cd backend
npx prisma db execute --stdin < /dev/null
```

### Problema: "Variáveis de ambiente não são lidas"

**Solução:**
```bash
# Verifique se .env.local existe e está no diretório correto
ls -la backend/.env.local

# Verifique se .env.local está no .gitignore (não commit secrets)
cat .gitignore | grep env

# Reinicie os servidores (mudanças em .env requerem restart)
# Ctrl+C em ambos terminais
npm run dev  # Inicie novamente
```

### Problema: Frontend não consegue conectar ao backend

```bash
# Verifique se VITE_API_URL está correto em frontend/.env.local
cat frontend/.env.local | grep VITE_API_URL

# Verifique CORS no backend (arquivo backend/src/middleware/corsMiddleware.ts)
# O backend deve estar aceitando requisições de http://localhost:5173

# Teste manualmente:
curl -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  http://localhost:3000/health
```

---

## 6. Verificação de Setup Correto

### Checklist Visual

Use este checklist para garantir que tudo está funcionando:

- [ ] **Frontend carrega em `http://localhost:5173`**
  - Você deve ver a página de login do agenda-clean
  - Nenhum erro no console do navegador (F12 → Console)

- [ ] **Backend API responde em `http://localhost:3000/health`**
  ```bash
  curl http://localhost:3000/health
  # Resultado: {"status":"ok","timestamp":"2026-05-13T..."}
  ```

- [ ] **Banco de dados está conectado**
  ```bash
  cd backend
  npx prisma studio
  # Navegue para http://localhost:5555
  # Você deve ver as tabelas User e Agendamento (vazias ou com seed data)
  ```

- [ ] **Seed data foi inserido (se rodou db:seed)**
  - No Prisma Studio, vá para "User"
  - Você deve ver pelo menos 2 usuários (cliente + admin)

- [ ] **Nenhum erro no terminal**
  - Terminal do frontend: nenhuma mensagem de erro vermelha
  - Terminal do backend: nenhuma mensagem de erro vermelha

### Teste de Fluxo Completo

```bash
# 1. Backend rodando?
curl http://localhost:3000/health

# 2. Frontend carrega?
# Abra browser em http://localhost:5173

# 3. Banco conectado?
cd backend
npx prisma studio
# Abra http://localhost:5555

# 4. Pode fazer login?
# Clique "Login com Google" (pode ser que não funcione sem credenciais OAuth configuradas)
```

---

## 7. Próximos Passos

Depois de configurar o ambiente local:

1. **Leia a Arquitetura:** [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)
2. **Entenda os Endpoints:** [`backend/API.md`](../backend/API.md)
3. **Entenda o Database:** [`backend/DATABASE.md`](../backend/DATABASE.md)
4. **Comece a Desenvolver:** [`docs/DEVELOPMENT.md`](./DEVELOPMENT.md)
5. **Siga o Guia de Contribuição:** [`docs/CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## 8. Referências

- **Documentação do Projeto:** [`README.md`](../README.md)
- **Arquitetura Técnica:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **PRD Completo:** [`planning-artifacts/prd.md`](../_bmad-output/planning-artifacts/prd.md)
- **Node.js Docs:** https://nodejs.org/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Prisma Docs:** https://www.prisma.io/docs/
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/

---

## Suporte

Se encontrar problemas não listados no troubleshooting:

1. Verifique se está usando as versões recomendadas (Node 18+, npm 9+)
2. Tente limpar cache e reinstalar: `npm cache clean --force && npm install`
3. Verifique logs em `backend/.env` e `frontend/.env.local`
4. Abra uma issue no GitHub com a mensagem de erro completa

**Bom desenvolvimento! 🚀**
