import { Request, Response, NextFunction } from 'express';

// Booking controller placeholder - será implementado em Story 3.x
export const bookingController = {
  create: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Create booking handler
    // To be implemented in Story 3.1
    _next();
  },

  getAll: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Get all bookings handler
    // To be implemented in Story 3.2
    _next();
  },

  getById: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Get booking by ID handler
    // To be implemented in Story 3.2
    _next();
  },

  update: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Update booking handler
    // To be implemented in Story 3.3
    _next();
  },

  delete: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Delete booking handler
    // To be implemented in Story 3.4
    _next();
  },
};

export default bookingController;
