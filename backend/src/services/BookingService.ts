// Booking Service placeholder - será implementado em Story 1.3
import {
  BookingDTO,
  CreateBookingInput,
  UpdateBookingInput,
} from '../types/Booking.js';

export class BookingService {
  static async getBookingById(_id: string): Promise<BookingDTO | null> {
    // To be implemented with Prisma in Story 1.3
    return null;
  }

  static async createBooking(_data: CreateBookingInput): Promise<BookingDTO> {
    // To be implemented with Prisma in Story 1.3
    throw new Error('Not implemented');
  }

  static async updateBooking(
    _id: string,
    _data: UpdateBookingInput
  ): Promise<BookingDTO | null> {
    // To be implemented with Prisma in Story 1.3
    return null;
  }

  static async deleteBooking(_id: string): Promise<boolean> {
    // To be implemented with Prisma in Story 1.3
    return false;
  }

  static async getAllBookings(): Promise<BookingDTO[]> {
    // To be implemented with Prisma in Story 1.3
    return [];
  }
}

export default BookingService;
