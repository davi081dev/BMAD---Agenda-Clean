// Booking interfaces - placeholder para Story 1.3
export interface BookingDTO {
  id: string;
  userId: string;
  date: Date;
  time: string;
  status: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  date: Date;
  time: string;
  notes?: string;
}

export interface UpdateBookingInput {
  status?: 'solicitado' | 'confirmado' | 'em_atendimento' | 'concluído' | 'cancelado';
  notes?: string;
}
