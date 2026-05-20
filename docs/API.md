# API Documentation - agenda-clean

**Última atualização:** 13 de maio de 2026  
**Versão:** 1.0.0  
**Base URL:** `http://localhost:3000` (desenvolvimento) | `https://api.agenda-clean.app` (produção)

Documentação completa dos endpoints REST do backend do **agenda-clean**.

---

## 1. Autenticação

### 1.1 Iniciar fluxo Google OAuth

**Endpoint:** `GET /auth/google`

Inicia o fluxo de autenticação Google OAuth. Redireciona o navegador para o consent screen do Google.

```bash
curl -X GET http://localhost:3000/auth/google
```

**Parâmetros:** nenhum

**Resposta:** Redirecionamento HTTP 302 para Google OAuth

**Notas:**
- Não chame manualmente - use um botão "Entrar com Google" no frontend
- Google redireciona para `/auth/google/callback?code=XXX`

### 1.2 Callback do Google OAuth

**Endpoint:** `GET /auth/google/callback`

Callback automático do Google OAuth (não chame diretamente). Backend valida o code, obtém profile, cria/busca user e gera JWT.

```bash
# Exemplo (automático, não execute manualmente):
GET http://localhost:3000/auth/google/callback?code=4/0AX4XfW...&state=xyz123
```

**Parâmetros Query:**
- `code` (string, required): Authorization code do Google
- `state` (string, required): CSRF token (previne CSRF attacks)

**Resposta:** Redirecionamento HTTP 302 para `http://localhost:5173/dashboard`

**Headers após redirecionamento:**
```
Set-Cookie: token=<JWT>; HttpOnly; Path=/; Max-Age=2592000
```

**Processo interno:**
1. Valida `state` token
2. Troca `code` por `access_token` com Google
3. Obtém profile (email, name, picture, googleId)
4. Busca User no database por `googleId`
5. Se não existe, cria novo User com role `client`
6. Gera JWT token (exp 30 dias)
7. Seta cookie HttpOnly com JWT
8. Redireciona para dashboard

### 1.3 Logout

**Endpoint:** `POST /auth/logout`

Logout do usuário (limpa token).

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)

**Request Body:** vazio

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Logout realizado com sucesso"
  }
}
```

**Efeitos:**
- Token é invalidado
- Cookie é limpo (Set-Cookie com Max-Age=0)
- Frontend deve remover token do localStorage
- Redirecionar para `/login`

### 1.4 Get Current User

**Endpoint:** `GET /auth/me`

Retorna dados do usuário logado.

```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)

**Request Body:** vazio

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "joao@example.com",
    "name": "João Silva",
    "role": "client",
    "createdAt": "2026-05-10T14:30:00Z",
    "updatedAt": "2026-05-13T10:15:00Z"
  }
}
```

**Errors:**
- `401 Unauthorized`: Token inválido ou expirado
  ```json
  { "success": false, "error": "Token inválido" }
  ```

---

## 2. Health Check

### 2.1 Health Check

**Endpoint:** `GET /health`

Verifica se o backend está rodando e conectado ao banco de dados.

```bash
curl -X GET http://localhost:3000/health
```

**Parâmetros:** nenhum

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-05-13T14:30:00Z",
  "uptime": 3600,
  "database": "connected"
}
```

**Uso:** Muito útil durante desenvolvimento para verificar se o servidor está rodando.

---

## 3. Agendamentos (Cliente)

### 3.1 Listar Agendamentos do Cliente

**Endpoint:** `GET /api/agendamentos`

Retorna todos os agendamentos do usuário logado, ordenados por data (descending).

```bash
curl -X GET http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)

**Query Parameters (opcionais):**
- `status` (string): Filtrar por status (`solicitado`, `confirmado`, `em_atendimento`, `concluido`, `cancelado`)
- `dateFrom` (string, YYYY-MM-DD): Agendamentos >= desta data
- `dateTo` (string, YYYY-MM-DD): Agendamentos <= desta data
- `limit` (integer): Máximo de registros (padrão: 50)
- `offset` (integer): Pagination offset (padrão: 0)

**Exemplos:**
```bash
# Todos agendamentos
curl -X GET http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer <JWT_TOKEN>"

# Apenas agendamentos confirmados
curl -X GET "http://localhost:3000/api/agendamentos?status=confirmado" \
  -H "Authorization: Bearer <JWT_TOKEN>"

# Agendamentos futuro a partir de 2026-05-20
curl -X GET "http://localhost:3000/api/agendamentos?dateFrom=2026-05-20" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "date": "2026-05-22",
      "time": "14:30",
      "address": "Rua das Flores, 123, São Paulo, SP",
      "observations": "Sofá grande, necessário limpeza profunda",
      "status": "confirmado",
      "createdAt": "2026-05-13T10:15:00Z",
      "updatedAt": "2026-05-13T11:45:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "date": "2026-05-25",
      "time": "10:00",
      "address": "Avenida Paulista, 1000, São Paulo, SP",
      "observations": null,
      "status": "solicitado",
      "createdAt": "2026-05-13T14:30:00Z",
      "updatedAt": "2026-05-13T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 50,
    "offset": 0
  }
}
```

**Errors:**
- `401 Unauthorized`: Token inválido

### 3.2 Get Agendamento Específico

**Endpoint:** `GET /api/agendamentos/:id`

Retorna detalhes de um agendamento específico (apenas seu próprio agendamento).

```bash
curl -X GET http://localhost:3000/api/agendamentos/550e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Parameters:**
- `id` (string, path param): UUID do agendamento

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo, SP",
    "observations": "Sofá grande",
    "status": "confirmado",
    "createdAt": "2026-05-13T10:15:00Z",
    "updatedAt": "2026-05-13T11:45:00Z"
  }
}
```

**Errors:**
- `401 Unauthorized`: Token inválido
- `403 Forbidden`: Agendamento não pertence ao usuário logado
- `404 Not Found`: Agendamento não existe

### 3.3 Verificar Disponibilidade (Horários Livres)

**Endpoint:** `GET /api/agendamentos/availability?date=YYYY-MM-DD`

Retorna horários disponíveis para uma data específica.

```bash
curl -X GET "http://localhost:3000/api/agendamentos/availability?date=2026-05-22" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)

**Query Parameters:**
- `date` (string, required, YYYY-MM-DD): Data para verificar disponibilidade

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "date": "2026-05-22",
    "slots": [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30"
    ],
    "timezone": "America/Sao_Paulo"
  }
}
```

**Notas:**
- Slots são de 30 em 30 minutos entre 09:00-18:00
- Horários com agendamentos confirmados/solicitados são excluídos
- Slots cancelados são considerados livres

**Errors:**
- `400 Bad Request`: Parâmetro `date` inválido ou faltando

### 3.4 Criar Novo Agendamento

**Endpoint:** `POST /api/agendamentos`

Cria um novo agendamento para o usuário logado.

```bash
curl -X POST http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo, SP",
    "observations": "Sofá grande, necessário limpeza profunda"
  }'
```

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>` (required)
- `Content-Type: application/json` (required)

**Request Body:**
```json
{
  "date": "2026-05-22",
  "time": "14:30",
  "address": "Rua das Flores, 123, São Paulo, SP",
  "observations": "Sofá grande, necessário limpeza profunda"
}
```

**Parameters:**
- `date` (string, required, YYYY-MM-DD): Data do agendamento
- `time` (string, required, HH:MM): Horário do agendamento (09:00-18:00, slots de 30min)
- `address` (string, required, max 500 chars): Endereço onde o serviço será realizado
- `observations` (string, optional, max 1000 chars): Observações/notas adicionais

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo, SP",
    "observations": "Sofá grande, necessário limpeza profunda",
    "status": "solicitado",
    "createdAt": "2026-05-13T14:30:00Z",
    "updatedAt": "2026-05-13T14:30:00Z"
  }
}
```

**Errors:**
- `400 Bad Request`: Dados inválidos
  ```json
  {
    "success": false,
    "error": "Endereço é obrigatório"
  }
  ```

- `401 Unauthorized`: Token inválido

- `409 Conflict`: Horário já agendado
  ```json
  {
    "success": false,
    "error": "Horário 14:30 em 2026-05-22 já está agendado. Escolha outro."
  }
  ```

- `422 Unprocessable Entity`: Validação falhou
  ```json
  {
    "success": false,
    "error": "Data não pode ser no passado"
  }
  ```

---

## 4. Agendamentos (Admin)

### 4.1 Listar Todos os Agendamentos (Admin Only)

**Endpoint:** `GET /api/admin/agendamentos`

Retorna TODOS os agendamentos do sistema (apenas para usuários com role `admin`).

```bash
curl -X GET "http://localhost:3000/api/admin/agendamentos" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

**Headers:**
- `Authorization: Bearer <ADMIN_JWT_TOKEN>` (required, admin role required)

**Query Parameters (opcionais):**
- `status` (string): Filtrar por status
- `dateFrom` (string, YYYY-MM-DD): Agendamentos >= desta data
- `dateTo` (string, YYYY-MM-DD): Agendamentos <= desta data
- `clientEmail` (string): Filtrar por email do cliente
- `limit` (integer): Máximo de registros (padrão: 100)
- `offset` (integer): Pagination offset (padrão: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "ana@example.com",
        "name": "Ana Silva",
        "role": "client"
      },
      "date": "2026-05-22",
      "time": "14:30",
      "address": "Rua das Flores, 123, São Paulo, SP",
      "observations": "Sofá grande",
      "status": "confirmado",
      "createdAt": "2026-05-13T10:15:00Z",
      "updatedAt": "2026-05-13T11:45:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "email": "maria@example.com",
        "name": "Maria Santos",
        "role": "client"
      },
      "date": "2026-05-25",
      "time": "10:00",
      "address": "Avenida Paulista, 1000, São Paulo, SP",
      "observations": null,
      "status": "solicitado",
      "createdAt": "2026-05-13T14:30:00Z",
      "updatedAt": "2026-05-13T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 100,
    "offset": 0
  }
}
```

**Errors:**
- `401 Unauthorized`: Token inválido
- `403 Forbidden`: Usuário não é admin

### 4.2 Atualizar Status de Agendamento (Admin Only)

**Endpoint:** `PATCH /api/admin/agendamentos/:id/status`

Atualiza o status de um agendamento (apenas admin). Quando muda para `confirmado`, envia email ao cliente.

```bash
curl -X PATCH http://localhost:3000/api/admin/agendamentos/550e8400-e29b-41d4-a716-446655440001/status \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmado"}'
```

**Headers:**
- `Authorization: Bearer <ADMIN_JWT_TOKEN>` (required, admin role required)
- `Content-Type: application/json` (required)

**Parameters:**
- `id` (string, path param): UUID do agendamento

**Request Body:**
```json
{
  "status": "confirmado"
}
```

**Valores válidos de status:**
- `solicitado` - Agendamento novo, aguardando confirmação
- `confirmado` - Admin confirmou, cliente recebe email
- `em_atendimento` - Serviço está acontecendo
- `concluido` - Serviço foi concluído
- `cancelado` - Agendamento cancelado, libera o slot

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo, SP",
    "observations": "Sofá grande",
    "status": "confirmado",
    "createdAt": "2026-05-13T10:15:00Z",
    "updatedAt": "2026-05-13T14:35:00Z"
  }
}
```

**Efeitos colaterais:**
- Se `status` = `confirmado`: Envia email ao cliente com detalhes do agendamento
- Se `status` = `cancelado`: Libera o slot (permite novo agendamento naquele horário)
- `updatedAt` é atualizado automaticamente

**Errors:**
- `400 Bad Request`: Status inválido
  ```json
  {
    "success": false,
    "error": "Status inválido. Valores válidos: solicitado, confirmado, em_atendimento, concluido, cancelado"
  }
  ```

- `401 Unauthorized`: Token inválido
- `403 Forbidden`: Usuário não é admin
- `404 Not Found`: Agendamento não existe

---

## 5. Error Responses

Todos os erros seguem o padrão:

```json
{
  "success": false,
  "error": "Mensagem descritiva em português"
}
```

### 5.1 HTTP Status Codes

| Status | Significado | Cenário |
|--------|-----------|---------|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos (validação falhou) |
| `401` | Unauthorized | Token inválido, expirado ou faltando |
| `403` | Forbidden | Autenticado, mas sem permissão (não é admin) |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Violação de constraint (ex: double-booking) |
| `422` | Unprocessable Entity | Lógica de negócio falhou |
| `500` | Server Error | Erro interno do servidor |

### 5.2 Common Error Messages

| Erro | Cenário | Status |
|------|---------|--------|
| `Token inválido` | Token malformado ou expirado | 401 |
| `Autenticação obrigatória` | Authorization header faltando | 401 |
| `Apenas admin pode fazer isso` | User role é `client` | 403 |
| `Agendamento não encontrado` | ID não existe no banco | 404 |
| `Horário já agendado` | Double-booking attempt | 409 |
| `Data não pode ser no passado` | Tentando agendar data passada | 422 |
| `Endereço é obrigatório` | Campo vazio no form | 400 |

---

## 6. Autenticação & Headers

### 6.1 JWT Token

Todos os endpoints protegidos requerem JWT token no header `Authorization`:

```bash
curl -X GET http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Token Format:**
```
Bearer <base64-encoded-jwt>
```

**Token Components:**
- Header: `{ "alg": "HS256", "typ": "JWT" }`
- Payload: `{ "id": "user-uuid", "email": "user@example.com", "iat": ..., "exp": ... }`
- Signature: HMAC SHA256

**Expiração:** 30 dias após geração

### 6.2 CORS Headers

Backend adiciona headers CORS para todas as requisições:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 7. Rate Limiting (Futuro)

Não implementado em MVP, mas planejado para produção:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1620000000
```

---

## 8. Exemplos de Uso Completo

### 8.1 Fluxo de Login e Agendamento (cURL)

```bash
#!/bin/bash

# 1. OAuth redirect (browser, não cURL)
# Usuário clica "Entrar com Google"
# Browser vai para http://localhost:3000/auth/google
# Google redireciona de volta para /auth/google/callback
# Backend seta cookie com JWT
# Usuário é redirecionado para http://localhost:5173/dashboard

# Para fins de teste, considere fazer login via UI
# Ou configurar um script de teste com Playwright/Cypress

# 2. Get current user
TOKEN="seu-jwt-token-aqui"

curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer $TOKEN"

# 3. Check availability for May 22, 2026
curl -X GET "http://localhost:3000/api/agendamentos/availability?date=2026-05-22" \
  -H "Authorization: Bearer $TOKEN"

# 4. Create booking
curl -X POST http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-05-22",
    "time": "14:30",
    "address": "Rua das Flores, 123, São Paulo, SP",
    "observations": "Sofá grande"
  }'

# 5. List my bookings
curl -X GET http://localhost:3000/api/agendamentos \
  -H "Authorization: Bearer $TOKEN"

# 6. (As admin) List all bookings
ADMIN_TOKEN="seu-admin-jwt-aqui"

curl -X GET http://localhost:3000/api/admin/agendamentos \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 7. (As admin) Confirm a booking
curl -X PATCH http://localhost:3000/api/admin/agendamentos/550e8400-e29b-41d4-a716-446655440001/status \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmado"}'
```

### 8.2 Frontend API Client Example

```typescript
// frontend/src/services/api.ts

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Adiciona JWT ao header Authorization
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Agendamentos
  async listBookings(filters?: { status?: string; dateFrom?: string }) {
    const response = await this.client.get('/api/agendamentos', { params: filters });
    return response.data.data;
  }

  async getBooking(id: string) {
    const response = await this.client.get(`/api/agendamentos/${id}`);
    return response.data.data;
  }

  async checkAvailability(date: string) {
    const response = await this.client.get('/api/agendamentos/availability', {
      params: { date }
    });
    return response.data.data.slots;
  }

  async createBooking(data: {
    date: string;
    time: string;
    address: string;
    observations?: string;
  }) {
    const response = await this.client.post('/api/agendamentos', data);
    return response.data.data;
  }

  // Admin
  async listAllBookings() {
    const response = await this.client.get('/api/admin/agendamentos');
    return response.data.data;
  }

  async updateBookingStatus(id: string, status: string) {
    const response = await this.client.patch(
      `/api/admin/agendamentos/${id}/status`,
      { status }
    );
    return response.data.data;
  }

  // Auth
  async logout() {
    await this.client.post('/auth/logout');
    localStorage.removeItem('token');
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data.data;
  }
}

export const api = new ApiClient();
```

---

## Referências

- **JWT.io:** https://jwt.io/
- **HTTP Status Codes:** https://httpwg.org/specs/rfc9110.html#status.codes
- **Express API:** https://expressjs.com/en/api.html
- **CORS:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

