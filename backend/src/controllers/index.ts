import { Request, Response, NextFunction } from 'express';

// Admin controller placeholder - será implementado em Story 4.x
export const adminController = {
  getDashboard: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Get admin dashboard handler
    // To be implemented in Story 4.1
    _next();
  },

  updateBookingStatus: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Update booking status handler
    // To be implemented in Story 4.2
    _next();
  },

  getStats: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> => {
    // Get statistics handler
    // To be implemented in Story 4.3
    _next();
  },
};

export default adminController;
