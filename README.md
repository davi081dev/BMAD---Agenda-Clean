# agenda-clean

> Sistema web de agendamento de limpeza de sofá com Google OAuth, gestão centralizada de agendamentos e painel administrativo.

**Status:** MVP em desenvolvimento  
**Data:** 13 de maio de 2026  
**Autor:** Davi

---

## Visão Geral

**agenda-clean** resolve o caos operacional de agendamentos manuais em WhatsApp/ligações através de uma aplicação web clara e intuitiva:

- 👤 **Clientes** agendam limpeza de sofá com Google OAuth (zero friction)
- ⏰ **Sistema previne double-bookings** automaticamente
- 📧 **Admin gerencia** agendamentos centralizadamente
- ✅ **Confirmação automática** via email quando status muda

### Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | PostgreSQL (Supabase free tier) |
| **Auth** | Google OAuth 2.0 |
| **ORM** | Prisma |

---

## Quick Start (5 minutos)

### Pré-requisitos

- Node.js v18+ LTS
- npm v9+
- PostgreSQL 14+ OU Supabase (free tier)
- Git

### Setup Local

```bash
# 1. Clone
git clone https://github.com/seu-usuario/agenda-clean.git
cd agenda-clean

# 2. Instale dependências
npm install && cd frontend && npm install && cd ../backend && npm install && cd ..

# 3. Configure variáveis de ambiente
# Backend
cd backend
cp .env.example .env.local
# Edite .env.local com DATABASE_URL e credenciais Google

# Frontend
cd ../frontend
cp .env.example .env.local

# 4. Setup database
cd ../backend
npx prisma migrate dev
npm run db:seed

# 5. Inicie servidores
# Terminal 1
npm run dev

# Terminal 2
cd ../frontend
npm run dev

# Pronto! Frontend em http://localhost:5173
```

**Próximos passos:** Veja [SETUP.md](./docs/SETUP.md) para instruções completas.

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [**SETUP.md**](./docs/SETUP.md) | Setup local completo, pré-requisitos, troubleshooting |
| [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) | Decisões arquiteturais, stack técnico, fluxos principais |
| [**API.md**](./docs/API.md) | Endpoints REST documentados, exemplos de requisições |
| [**DATABASE.md**](./docs/DATABASE.md) | Schema Prisma, queries comuns, migrations |
| [**CONTRIBUTING.md**](./docs/CONTRIBUTING.md) | Processo de desenvolvimento, commit messages, code review |
| [**DEVELOPMENT.md**](./docs/DEVELOPMENT.md) | Workflow diário, debugging, common tasks |

### Documentação de Projeto

- [**PRD Completo**](./_bmad-output/planning-artifacts/prd.md) - Requisitos funcionais e não-funcionais
- [**Epics & Stories**](./_bmad-output/planning-artifacts/epics-and-stories.md) - Roadmap do MVP
- [**Sprint Plan**](./_bmad-output/implementation-artifacts/sprint-plan.md) - Planejamento da implementação

---

## Estrutura do Projeto

```
agenda-clean/
├── docs/                          # 📚 Documentação
│   ├── SETUP.md                  # Setup local
│   ├── ARCHITECTURE.md           # Arquitetura técnica
│   ├── API.md                    # Endpoints REST
│   ├── DATABASE.md               # Schema do banco
│   ├── CONTRIBUTING.md           # Guia de contribuição
│   └── DEVELOPMENT.md            # Workflow diário
│
├── frontend/                      # ⚛️ React Frontend (Vite)
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── pages/                # Páginas (rotas)
│   │   ├── services/             # API client
│   │   ├── types/                # TypeScript types
│   │   └── styles/               # CSS global
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                       # 🚀 Express Backend
│   ├── src/
│   │   ├── routes/               # Express routes
│   │   ├── controllers/          # Route handlers
│   │   ├── services/             # Business logic
│   │   ├── middleware/           # Middleware
│   │   ├── types/                # Types
│   │   └── server.ts             # App setup
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── seed.ts               # Seed script
│   │   └── migrations/           # Migrations
│   ├── API.md                    # API documentation
│   ├── DATABASE.md               # Database documentation
│   └── package.json
│
├── _bmad-output/                 # 📋 Artifacts (planning)
│   ├── planning-artifacts/
│   │   ├── prd.md
│   │   ├── architecture.md
│   │   ├── epics-and-stories.md
│   │   └── ux-design-specification.md
│   └── implementation-artifacts/
│       ├── sprint-plan.md
│       └── stories/
│
├── docker-compose.yml            # Docker setup (futuro)
├── README.md                      # Este arquivo
└── .gitignore
```

---

## Servidores de Desenvolvimento

| Serviço | URL | Porta |
|---------|-----|-------|
| Frontend (React) | http://localhost:5173 | 5173 |
| Backend (Express) | http://localhost:3000 | 3000 |
| Prisma Studio | http://localhost:5555 | 5555 |

Verifique conectividade:
```bash
# Backend health
curl http://localhost:3000/health

# Frontend (abre no navegador)
http://localhost:5173

# Database
npx prisma studio
```

---

## Workflow de Desenvolvimento

### Primeira Vez?
1. Leia [SETUP.md](./docs/SETUP.md)
2. Leia [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
3. Comece com [DEVELOPMENT.md](./docs/DEVELOPMENT.md)

### Padrão de Commit

```bash
# Formato: [TIPO] Descrição breve
git commit -m "feat: Add availability endpoint for bookings"
git commit -m "fix: Prevent double-booking race condition"
git commit -m "docs: Update API.md with new endpoints"

# Tipos: feat, fix, docs, refactor, test, chore, perf, style
```

### Pull Request

1. Crie branch: `git checkout -b feature/1-4-configure-documentation`
2. Faça commits pequenos
3. Push: `git push origin feature/1-4-configure-documentation`
4. Abra PR com descrição clara
5. Aguarde code review
6. Merge após aprovação

Detalhes em [CONTRIBUTING.md](./docs/CONTRIBUTING.md).

---

## Recursos Úteis

### Setup & Environment
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Supabase](https://supabase.com/) - Managed PostgreSQL

### Frontend
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend
- [Express Docs](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Node.js Docs](https://nodejs.org/docs/)

### Development Tools
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Git](https://git-scm.com/) - Version control
- [Thunder Client](https://www.thunderclient.com/) - API testing
- [Postman](https://www.postman.com/) - API testing

---

## Troubleshooting

### Database não conecta
```bash
# PostgreSQL local
sudo systemctl status postgresql  # Linux
brew services list postgresql     # Mac

# Supabase: verificar DATABASE_URL em backend/.env.local
```

### Module not found errors
```bash
npm cache clean --force
npm install
cd frontend && npm install && cd ../backend && npm install && cd ..
```

### Porta já em uso
```bash
# Encontre processo
lsof -i :3000
# Mate processo
kill -9 <PID>
```

Mais em [SETUP.md troubleshooting](./docs/SETUP.md#5-troubleshooting-comum).

---

## Status do Projeto

### ✅ Completo
- [x] Frontend setup (Vite + React + Tailwind)
- [x] Backend setup (Express + TypeScript)
- [x] Database setup (Prisma + PostgreSQL)
- [x] Documentação de projeto

### 🔄 Em Progresso
- [ ] Endpoints API (auth, bookings, admin)
- [ ] Componentes React
- [ ] Integração Google OAuth
- [ ] Testes unitários
- [ ] Deploy (Vercel + Render)

### 📋 Backlog
- [ ] Notificações por email (SendGrid)
- [ ] Painel administrativo
- [ ] Histórico de agendamentos
- [ ] Relatórios (futuro)

---

## Contato & Suporte

- **Repositório:** https://github.com/seu-usuario/agenda-clean
- **Issues:** Abra uma issue com label `question`, `bug`, ou `enhancement`
- **Discussões:** Use Discussions para perguntas gerais

---

## License

MIT License - veja [LICENSE](./LICENSE) para detalhes.

---

**Desenvolvido com ❤️ por Davi em 2026**

Últimas alterações: 13 de maio de 2026

