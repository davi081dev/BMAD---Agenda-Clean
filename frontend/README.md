# agenda-clean Frontend

Sistema moderno de agendamento de serviços de limpeza de sofá com interface desenvolvida em React, TypeScript e Tailwind CSS.

## 📋 Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** 8.0 ou superior
- **Git** (para versionamento)

## 🚀 Quick Start

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:5173`

### 3. Build para produção

```bash
npm run build
```

O bundle minificado será gerado em `dist/`

### 4. Preview do build

```bash
npm run preview
```

## 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   ├── Alert.tsx
│   ├── LoadingSpinner.tsx
│   ├── Select.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/               # Páginas da aplicação
├── hooks/               # Custom React Hooks
├── services/            # Serviços (API Client, Auth)
├── types/               # Interfaces e tipos TypeScript
├── utils/               # Funções auxiliares e helpers
├── styles/              # CSS e estilos globais
├── config/              # Configurações da aplicação
├── App.tsx              # Componente raiz
└── main.tsx             # Entry point
public/                  # Arquivos estáticos
```

## 🎯 Componentes Disponíveis

### Button
Componente de botão com 3 variantes (primary, secondary, danger) e 3 tamanhos (sm, md, lg).

```tsx
<Button variant="primary" size="md">Agendar</Button>
```

### Input
Campo de entrada com label e validação de erro.

```tsx
<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  error="Email inválido"
/>
```

### Card
Container com padding e shadow.

```tsx
<Card>
  <h2>Título</h2>
  <p>Conteúdo</p>
</Card>
```

### Modal
Dialog com focus management e acessibilidade.

```tsx
<Modal
  title="Confirmar ação"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  Conteúdo do modal
</Modal>
```

### Badge
Status badge com 5 estados (solicitado, confirmado, em_atendimento, concluído, cancelado).

```tsx
<Badge status="confirmado" />
```

### Alert
Mensagem de feedback com 4 tipos (success, error, info, warning).

```tsx
<Alert type="success" message="Agendamento confirmado!" />
```

### Select
Campo select com opções customizáveis.

```tsx
<Select
  label="Status"
  options={[
    { value: 'solicitado', label: 'Solicitado' },
    { value: 'confirmado', label: 'Confirmado' }
  ]}
/>
```

### Navbar
Barra de navegação principal com brand, links e ações.

```tsx
<Navbar
  brand="agenda-clean"
  items={[{ href: '/', label: 'Home' }]}
  actions={<button>Login</button>}
/>
```

### Footer
Rodapé com links e copyright.

```tsx
<Footer
  links={[{ href: '/privacidade', label: 'Privacidade' }]}
  copyright="© 2026 agenda-clean"
/>
```

### LoadingSpinner
Spinner de carregamento para feedback visual.

```tsx
<LoadingSpinner size="md" label="Carregando..." />
```

## 🎨 Design System

### Cores
O projeto usa uma paleta de cores bem-definida:
- **Blue**: Cor primária (azul)
- **Green**: Sucesso (verde)
- **Red**: Erro (vermelho)
- **Orange**: Aviso (laranja)
- **Gray**: Neutro (cinza)

Todas as cores estão configuradas em `tailwind.config.ts` e seguem o padrão de contrast WCAG AA.

### Tipografia
- **xs**: 11px
- **sm**: 13px
- **base**: 14px
- **lg**: 16px
- **xl**: 18px
- **2xl**: 20px
- **3xl**: 24px
- **4xl**: 28px
- **5xl**: 32px

### Espaçamento
Base unit: 4px
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px
- **2xl**: 32px
- **3xl**: 48px

### Sombras
- **xs**: Sutil
- **sm**: Pequena
- **md**: Média
- **lg**: Grande

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Validação de tipos
npm run type-check

# ESLint
npm run lint

# Preview do build
npm run preview
```

## 📚 Padrões de Codificação

### Nomeação
- **Arquivos componentes**: PascalCase (Button.tsx, InputField.tsx)
- **Arquivos utilitários**: camelCase (helpers.ts, api.ts)
- **Variáveis/Funções**: camelCase
- **Interfaces/Types**: PascalCase (ButtonProps, ApiConfig)

### TypeScript
- **Strict Mode ativado**: Todos os arquivos .tsx têm tipos explícitos
- **Interfaces para Props**: Sempre defina interface para props de componentes
- **No implicit any**: Sempre type explícito para parâmetros

Exemplo:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick }) => {
  // ...
}
```

### Acessibilidade (WCAG Level A)
- Sempre use `<button>` e `<a>` em vez de `<div onClick>`
- Adicione `aria-label` em buttons sem texto
- Use `role="dialog"` em modals
- Use `role="status"` em mensagens de status
- Mantenha contrast de cores ≥ 4.5:1
- Touch targets mínimos: 44x44px

### Responsividade
- **Mobile-first**: Design começa em mobile
- Use Tailwind breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Teste em: Mobile (375px), Tablet (768px), Desktop (1440px)

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (não será commitado):

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=seu-google-client-id-aqui
```

Acesse via:
```typescript
import.meta.env.VITE_API_URL
```

## 🧪 Testes

Tests serão adicionados em futures stories. Configuração base:
- Framework: Vitest
- Testing Library: React Testing Library

## 📦 Dependências Principais

- **React**: 18.2.0
- **Vite**: 5.0.8
- **TypeScript**: 5.2.2
- **Tailwind CSS**: 3.3.6
- **ESLint**: 8.55.0

## 🛠 Troubleshooting

### Porta 5173 já em uso
```bash
npm run dev -- --port 3000
```

### Erro de módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot reload não funcionando
Verifique se o arquivo `.env.local` existe e está configurado.

### Build falha com erro de tipos
Execute:
```bash
npm run type-check
```

## 📝 Notas Importantes

- ✅ TypeScript strict mode habilitado
- ✅ Componentes funcionais com React Hooks
- ✅ Acessibilidade WCAG Level A
- ✅ Responsive design mobile-first
- ✅ Design system com tokens bem documentados
- ✅ 10 componentes base prontos para reutilização

## 🚀 Próximos Passos

1. **Story 1.2**: Inicializar Backend (Node.js + PostgreSQL)
2. **Story 2.1**: Autenticação via Google OAuth
3. **Story 2.2**: Páginas de Agendamento (Cliente)
4. **Story 3.1**: Dashboard Admin

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue.

---

**Desenvolvido com ❤️ para agenda-clean**
**Data: 13 de maio de 2026**
