/**
 * ProfilePage
 * 
 * Página de perfil do usuário autenticado.
 * Permite visualizar e editar informações da conta.
 */
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Meu Perfil
        </h1>
        <p className="mt-2 text-gray-600">
          Gerencie suas informações de conta e preferências.
        </p>
      </div>

      {/* Informações Pessoais */}
      <Card>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
            {user?.name
              ?.split(' ')
              .map(w => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Nome Completo</label>
            <p className="text-gray-900 mt-1">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900 mt-1">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Seção de Segurança */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Segurança</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Sua conta é protegida por autenticação OAuth com Google.
          </p>
          <Button variant="secondary" disabled>
            Gerenciar Sessões (Em breve)
          </Button>
        </div>
      </Card>

      {/* Seção de Preferências */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferências</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Receber notificações por email</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Lembrar agendamentos futuros</span>
          </label>
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage
