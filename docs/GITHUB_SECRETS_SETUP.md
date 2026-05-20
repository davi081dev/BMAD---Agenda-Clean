# GitHub Secrets Setup Guide

Guia para configurar GitHub Secrets necessários para CI/CD em staging e produção.

## 📝 Acessar GitHub Secrets

1. Vá até seu repositório no GitHub
2. Clique em **Settings** (⚙️ no topo)
3. Na sidebar esquerda, clique em **Secrets and variables** → **Actions**
4. Clique em **New repository secret** para cada secret

---

## 🔐 Staging Secrets

Para ambiente **staging**, configure estes secrets:

### `STAGING_DB_PASSWORD`

- **Descrição:** Password para conexão com database staging
- **Valor:** Obtém de Supabase dashboard → Settings → Database → Password
- **Exemplo:** `abc123xyz789`

### `STAGING_JWT_SECRET`

- **Descrição:** Secret key para assinar JWT tokens em staging
- **Requisitos:** 
  - Mínimo 32 caracteres
  - Caracteres aleatórios (números, letras, símbolos)
  - Diferente do desenvolvimento
- **Como gerar:**
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Exemplo:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## 🚀 Production Secrets

Para ambiente **production**, configure estes secrets:

### `PROD_DATABASE_URL`

- **Descrição:** URL completa de conexão com database produção
- **Valor:** Obtém de Supabase dashboard → Connection strings
- **Formato:** `postgresql://user:password@host:port/database`
- **Exemplo:** `postgresql://prod_user:very_strong_password@db.supabase.co:5432/prod_db`

### `PROD_GOOGLE_CLIENT_ID`

- **Descrição:** Google OAuth Client ID para produção
- **Origem:** Google Cloud Console → APIs & Services → Credentials
- **Notas:** Pode ser público (usado no frontend também)
- **Exemplo:** `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### `PROD_GOOGLE_CLIENT_SECRET`

- **Descrição:** Google OAuth Client Secret para produção
- **Origem:** Google Cloud Console → APIs & Services → Credentials
- **⚠️ Sensível:** NUNCA commitar ou logar
- **Exemplo:** `GOCSPX-abcd1234efgh5678ijkl9012`

### `PROD_SENDGRID_API_KEY`

- **Descrição:** SendGrid API key para envio de emails em produção
- **Origem:** SendGrid Dashboard → Settings → API Keys
- **Requisitos:** Use API key gerada especificamente para produção
- **⚠️ Sensível:** NUNCA compartilhar ou logar
- **Exemplo:** `SG.abc1234def5678ghi9012jkl3456mno`

### `PROD_JWT_SECRET`

- **Descrição:** Secret key para assinar JWT tokens em produção
- **Requisitos:**
  - Mínimo 32 caracteres
  - Caracteres aleatórios (números, letras, símbolos)
  - ÚNICO para produção (diferente de staging/dev)
  - NUNCA reutilizar entre ambientes
- **⚠️ Muito Sensível:** NUNCA expor em logs ou documentação
- **Como gerar:**
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Exemplo:** `x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4`

---

## ✅ Passo a Passo: Adicionar Secrets

### 1️⃣ Abrir GitHub Secrets

```
GitHub.com → Seu Repositório
  → Settings (⚙️)
    → Secrets and variables → Actions
      → New repository secret
```

### 2️⃣ Adicionar Cada Secret

Para cada secret:
1. Clique em **New repository secret**
2. Preencha **Name** (ex: `STAGING_DB_PASSWORD`)
3. Preencha **Value** (ex: `abc123xyz789`)
4. Clique em **Add secret**

### 3️⃣ Verificar Secrets Criados

Você deve ver todos os secrets listados:
- ✅ `STAGING_DB_PASSWORD`
- ✅ `STAGING_JWT_SECRET`
- ✅ `PROD_DATABASE_URL`
- ✅ `PROD_GOOGLE_CLIENT_ID`
- ✅ `PROD_GOOGLE_CLIENT_SECRET`
- ✅ `PROD_SENDGRID_API_KEY`
- ✅ `PROD_JWT_SECRET`

### 4️⃣ GitHub Actions Usa Secrets Automaticamente

Quando você faz push, GitHub Actions:
1. Lê os workflows (`.github/workflows/*.yml`)
2. Detecta variáveis com padrão `${{ secrets.NOME }}`
3. Injeta o valor do secret durante build
4. NUNCA mostra valor em logs (apenas `***`)

---

## 🔍 Verificar Secrets nos Workflows

**Backend Workflow:**
```yaml
# Em .github/workflows/backend-ci.yml
env:
  DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}
  JWT_SECRET: ${{ secrets.PROD_JWT_SECRET }}
```

**Como GitHub Actions injeta:**
1. No build time, substitui `${{ secrets.PROD_DATABASE_URL }}` pelo valor real
2. Valor é injetado como variável de ambiente
3. Seu código lê via `process.env.DATABASE_URL`
4. Logs NUNCA mostram valor (protegido automaticamente)

---

## 🚨 Security Best Practices

✅ **DO:**
- Gere secrets aleatórios e fortes
- Use secrets diferentes para cada ambiente
- Armazene secrets APENAS no GitHub
- Use GitHub's Web UI para secrets (mais seguro)
- Rotacione secrets regularmente (a cada 3-6 meses)
- Gere novo JWT_SECRET em caso de suspeita de vazamento

❌ **DON'T:**
- Nunca compartilhe secrets via chat/email
- Nunca logue secrets em console
- Nunca commite `.env.staging` ou `.env.production` com valores reais
- Nunca use mesmos secrets em múltiplos ambientes
- Nunca reutilize secrets de dev em staging/prod
- Nunca ignore warnings do GitHub sobre secrets em código

---

## 🧪 Testar Secrets

Após adicionar secrets, faça um push para disparar workflows:

```bash
# Fazer pequena mudança
echo "# test" >> backend/README.md

# Commit & push
git add backend/README.md
git commit -m "test: trigger GitHub Actions"
git push origin main
```

**Verificar na GitHub UI:**
1. Vá para seu repositório
2. Clique na aba **Actions**
3. Veja o workflow em execução
4. Clique no workflow para ver logs
5. Se secrets foram injetados → você vê ✅ em build time
6. Se erro de secret faltando → você vê ❌ com mensagem clara

---

## 🔄 Secrets Expirando / Sendo Rotacionados?

Se precisar rotacionar um secret (ex: nova API key):

1. **Gere nova chave** na plataforma (Google Cloud, SendGrid, etc)
2. **Update no GitHub:** Settings → Secrets → Click secret → Update
3. **Preencha novo valor**
4. **Clique Update**
5. **Próximos deploys** usarão nova chave automaticamente

**Nota:** Não é necessário fazer re-deploy, novos pushes usam novo secret.

---

## 📞 Troubleshooting

### "Workflow falha com 'secret not found'"

**Causa:** Secret foi referenciado no workflow mas não foi criado.

**Solução:**
1. Verifique o nome do secret no workflow
2. Vá em Settings → Secrets
3. Crie secret faltando com exato mesmo nome

### "Build fails during .env injection"

**Causa:** Secret value injetado incorretamente (formato errado).

**Solução:**
1. Revise o valor do secret (não tenha espaços extras)
2. Teste valor localmente em `.env.local`
3. Verifique formato (ex: DATABASE_URL deve ser válido PostgreSQL)

### "Cannot see secret value to verify"

**Esperado:** GitHub NUNCA mostra valor de secret (mesmo para owner).

**Por que:** Security best practice - até seu próprio acesso é restrito.

**Verificar se correto:**
1. Faça um push pequeno
2. Veja logs do Actions → Build passos
3. Se não tiver erro → secret está correto

---

## 📚 Referência Rápida

**Staging:**
```
STAGING_DB_PASSWORD = <password do Supabase>
STAGING_JWT_SECRET = <random 32+ chars>
```

**Production:**
```
PROD_DATABASE_URL = postgresql://user:pass@host/db
PROD_GOOGLE_CLIENT_ID = xxx-yyyyyyy.apps.googleusercontent.com
PROD_GOOGLE_CLIENT_SECRET = GOCSPX-xxxxxxx
PROD_SENDGRID_API_KEY = SG.xxxxxxxxxxxx
PROD_JWT_SECRET = <random 32+ chars unique to prod>
```

---

**Última atualização:** 20 de maio de 2026
