import { Router } from 'express';

export const adminRoutes = (): Router => {
  const router = Router();

  // Admin routes - to be implemented in Story 4.x
  // router.get('/dashboard', adminController.getDashboard);
  // router.put('/bookings/:id/status', adminController.updateBookingStatus);
  // router.get('/stats', adminController.getStats);

  return router;
};

export default adminRoutes;
