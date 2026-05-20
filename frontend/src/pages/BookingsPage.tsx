/**
 * BookingsPage
 * 
 * Página para gerenciar agendamentos do usuário.
 * Exibe lista de agendamentos atuais e passados.
 */
import React from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

export function BookingsPage() {
  // Mock data para demonstração
  const bookings = []

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Meus Agendamentos
          </h1>
          <p className="mt-2 text-gray-600">
            Veja e gerencie todos os seus agendamentos.
          </p>
        </div>
        <Button variant="primary">
          Novo Agendamento
        </Button>
      </div>

      {/* Lista de Agendamentos ou Mensagem Vazia */}
      <Card>
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum agendamento</h3>
            <p className="text-gray-600 mt-2">
              Você ainda não tem agendamentos. Comece criando um novo agendamento!
            </p>
            <Button variant="primary" className="mt-4">
              Criar Agendamento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">Agendamento {index + 1}</h3>
                  <p className="text-sm text-gray-600">Data e hora do agendamento</p>
                </div>
                <Button variant="secondary" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações</h2>
        <p className="text-gray-600">
          Funcionalidade de agendamentos será disponibilizada em breve.
          Os agendamentos que você criar aparecerão aqui.
        </p>
      </Card>
    </div>
  )
}

export default BookingsPage
