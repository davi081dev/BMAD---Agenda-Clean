/**
 * Tipos compartilhados da aplicação
 * 
 * Esta pasta contém todas as interfaces TypeScript
 * e tipos reutilizáveis em toda a aplicação.
 */

/** Tipos de agendamento */
export type AgendamentoStatus =
  | 'solicitado'
  | 'confirmado'
  | 'em_atendimento'
  | 'concluído'
  | 'cancelado'

/** Entidade Agendamento */
export interface Agendamento {
  id: string
  clienteId: string
  status: AgendamentoStatus
  dataAgendamento: Date
  endereço: string
  observacoes?: string
  criadoEm: Date
  atualizadoEm: Date
}

/** Usuário Cliente */
export interface Cliente {
  id: string
  nome: string
  email: string
  telefone?: string
  criadoEm: Date
}

/** Configuração de API */
export interface ApiConfig {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
}
