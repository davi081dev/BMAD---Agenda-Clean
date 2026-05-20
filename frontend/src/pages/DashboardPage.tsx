/**
 * DashboardPage
 * 
 * Página principal para usuários autenticados.
 * Mostra informações gerais da conta e acesso rápido a funções principais.
 */
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/Card'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Aqui você pode gerenciar seus agendamentos e perfil.
        </p>
      </div>

      {/* Grid de Estatísticas/Ações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Agendamentos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Próximos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="text-3xl">⏰</div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completados</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </Card>
      </div>

      {/* Seção de Ações Rápidas */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="space-y-3">
          <p className="text-gray-600">
            Use o menu de navegação para gerenciar seus agendamentos.
          </p>
        </div>
      </Card>

      {/* Seção de Informações da Conta */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Nome</label>
            <p className="text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage
