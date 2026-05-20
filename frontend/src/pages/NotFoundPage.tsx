/**
 * NotFoundPage
 * 
 * Página 404 - Rota não encontrada
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="text-6xl font-bold text-gray-900 mb-4">404</div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Página não encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
          >
            Ir para Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
