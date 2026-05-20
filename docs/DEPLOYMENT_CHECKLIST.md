# Deployment Checklist

Checklist completo para fazer deploy com segurança e confiança.

## ✅ Validação Pré-Deployment

Antes de fazer deploy para staging ou produção, verifique:

### 📊 Qualidade de Código

- [ ] Todos os PR checks passaram no GitHub (GitHub Actions green ✅)
- [ ] ESLint: sem erros (`npm run lint`)
- [ ] TypeScript: sem erros de tipo (strict mode)
- [ ] Build: produção builda com sucesso (`npm run build`)
- [ ] Testes: todos os testes passam (coverage ≥80%, se configurado)
- [ ] Sem `console.log` statements em código de produção
- [ ] Sem comentários `TODO`/`FIXME` que bloqueiem deployment
- [ ] Sem variáveis não utilizadas
- [ ] Sem imports não utilizados

### 🔧 Configuração de Ambiente

- [ ] `.env.development` corresponde ao setup de dev local
- [ ] `.env.staging` tem todas as variáveis obrigatórias
- [ ] `.env.production` tem placeholders para todos os secrets
- [ ] **Nenhum secret real foi commitado em git**
- [ ] GitHub Secrets estão configurados para CI/CD injection
- [ ] URLs do banco de dados estão corretas para ambiente-alvo
- [ ] Credenciais Google OAuth registradas para domínio alvo

### 🗄️ Database

- [ ] Banco de dados está acessível e rodando
- [ ] Todos os migrations Prisma estão atualizados
- [ ] `npx prisma migrate status` não mostra migrações pendentes
- [ ] Backups do banco existem (especialmente para produção)
- [ ] Banco de testes está limpo e pronto

### 🔙 Backend Deployment (Render.com)

- [ ] Código mais recente foi commitado e pushado
- [ ] Todos os testes backend passam
- [ ] `npm run build` executa com sucesso
- [ ] Variáveis de ambiente estão configuradas no Render dashboard
- [ ] CONNECTION STRING do banco está testada
- [ ] Projeto Render está conectado ao repo GitHub correto
- [ ] Branch de deploy está correto (main para prod, staging para staging)
- [ ] Health check endpoint `/health` está respondendo (se implementado)

### 🎨 Frontend Deployment (Vercel)

- [ ] Código mais recente foi commitado e pushado
- [ ] Todos os testes frontend passam
- [ ] `npm run build` produz output otimizado
- [ ] Variáveis de ambiente estão configuradas no Vercel dashboard
- [ ] Preview build mostra conteúdo correto e styling aplicado
- [ ] Projeto Vercel está conectado ao repo GitHub correto
- [ ] Branch de deploy está correto (main para prod, staging para staging)

### 🚨 Validação Pós-Deployment

Após o deployment completar, verifique:

- [ ] Frontend carrega sem erros de console
- [ ] Backend API está respondendo (testar endpoint da API)
- [ ] Google OAuth login funciona end-to-end
- [ ] Conexões com banco estão estáveis
- [ ] Sem erros 5xx nos logs
- [ ] Respostas da API têm headers corretos (CORS, Content-Type)
- [ ] Frontend consegue comunicar com backend API
- [ ] Monitoramento/alertas estão ativos

---

## 🔄 Plano de Rollback

Se o deployment falhar:

1. **Identifique** a falha nos logs do GitHub Actions
2. **Revise** logs de deploy no Render (backend) ou Vercel (frontend)
3. **Reverta** para commit anterior:
   ```bash
   git revert <commit-hash>
   git push origin <branch>
   ```
4. **Corrija** o problema localmente
5. **Re-deploy** usando procedure padrão

---

## 📋 Deploy Staging

Procedure para deploy em staging:

### 1️⃣ Validação Local

```bash
# Na raiz do projeto
bash scripts/validate-all.sh

# Esperado: backend OK + frontend OK
# Exit code: 0 se tudo funciona
```

### 2️⃣ Commit & Push

```bash
git add .
git commit -m "feat: <descripção da feature>"
git push origin staging
```

### 3️⃣ GitHub Actions Roda Automaticamente

- ✅ Backend CI workflow dispara
- ✅ Frontend CI workflow dispara
- ✅ Ambos rodam em paralelo
- ⏳ Aguarde conclusão (5-10 min)

### 4️⃣ Verificar Resultado

- Acesse GitHub → Actions tab
- Veja status dos workflows "Backend CI" e "Frontend CI"
- Se todos green ✅: deploy passou, Render/Vercel auto-deploy
- Se qualquer red ❌: fix issue e re-push

### 5️⃣ Testar Staging

- Teste em: `https://staging-agenda-clean.vercel.app`
- Verifique: Google OAuth login, API calls, styling
- Verifique: Sem erros de console (F12 → Console)

### 6️⃣ Pronto para Produção?

- Se staging teste OK → aprovado para produção
- Se staging teste falhar → volte ao passo 1

---

## 🚀 Deploy Produção

Procedure para deploy em produção:

### ⚠️ Pré-Produção Checklist

- [ ] Staging foi testado e aprovado
- [ ] Todos os acceptance criteria foram satisfeitos
- [ ] Story documentation está atualizada
- [ ] Ninguém mais está fazendo deploy concurrently

### 1️⃣ Validação Local (Repeater Importância)

```bash
bash scripts/validate-all.sh
```

### 2️⃣ Criar Release Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0 - <description>"
# Versão follows semver: MAJOR.MINOR.PATCH
```

### 3️⃣ Push para GitHub

```bash
git push origin main
git push origin v1.0.0
```

### 4️⃣ GitHub Actions Valida

- ✅ Backend CI dispara
- ✅ Frontend CI dispara
- ⏳ Aguarde (5-10 min)

### 5️⃣ Manual Approval (se configurado)

- GitHub Actions pode exigir aprovação manual
- Revise logs dos workflows
- Se tudo OK → Approve deployment

### 6️⃣ Plataformas Auto-Deploy

- Render: backend auto-deploya após aprovação
- Vercel: frontend auto-deploya após aprovação
- ⏳ Aguarde (5-15 min para cada plataforma)

### 7️⃣ Verificar Produção

Teste em: `https://agenda-clean.app`

**Verificações essenciais:**
```bash
# Teste 1: Frontend carrega
curl https://agenda-clean.app

# Teste 2: API backend está vivo
curl https://api.agenda-clean.app/health

# Teste 3: Google OAuth login funciona
# Faça login manualmente no site

# Teste 4: Sem erros de console
# F12 → Console tab → Sem erros vermelho ❌
```

### 8️⃣ Monitorar por 24 Horas

- ✅ Revise error logs a cada hora
- ✅ Verifique alertas (se configurados)
- ✅ Teste features críticas periodicamente
- ✅ Se erro crítico encontrado → execute rollback

---

## 🆘 Emergency Procedures

### Database Connection Lost

**Sintomas:** Erros "Cannot connect to database" nos logs

**Passos:**
1. Acesse Supabase dashboard → Status
2. Verifique se cluster está online
3. Revise `DATABASE_URL` em environment
4. Reinicie aplicação no Render/Vercel
5. Teste conexão: `npm run prisma:studio`

### Google OAuth Not Working

**Sintomas:** Erro "Invalid OAuth credentials" ao fazer login

**Passos:**
1. Acesse Google Cloud Console
2. Verifique Client ID/Secret estão corretos
3. Verifique Authorized redirect URIs incluem seu domínio
4. Teste em staging primeiro
5. Limpe browser cookies (`Ctrl+Shift+Del`)
6. Tente login novamente

### High Error Rate (>5% 5xx errors)

**Sintomas:** Muitos erros 500 nos logs

**Passos:**
1. Revise GitHub Actions logs para deployment recente
2. Revise application error logs no Render
3. Procure patterns nos erros (database? auth? API?)
4. Se padrão desconhecido → Rollback for previous version
5. Contacte suporte da plataforma se infraestrutura issue

### Memory/CPU Issues

**Sintomas:** Performance lenta, timeouts aumentando

**Passos:**
1. Upgrade instance size no Render/Vercel
2. Revise code por memory leaks (especialmente async)
3. Revise database queries por N+1 problems
4. Implemente caching se necessário
5. Redeploye com otimizações

---

## 📞 Contatos de Suporte

- **Render Support**: https://render.com/support
- **Vercel Support**: https://vercel.com/help
- **Supabase Support**: https://supabase.com/support
- **SendGrid Support**: https://support.sendgrid.com
- **GitHub Actions**: https://docs.github.com/en/actions

---

## 📚 Referência Rápida

**Validar tudo localmente:**
```bash
bash scripts/validate-all.sh
```

**Visualizar status de migrations:**
```bash
cd backend && npx prisma migrate status
```

**Resetar database (dev only):**
```bash
cd backend && npx prisma migrate reset
```

**Ver logs em staging:**
- Render: https://dashboard.render.com → Logs
- Vercel: https://vercel.com → Deployments → Logs

---

**Última atualização:** 20 de maio de 2026  
**Responsável:** Team Backend + Frontend
