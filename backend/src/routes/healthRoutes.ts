import { Router } from 'express';
import { healthController } from '../controllers/healthController.js';

export const healthRoutes = (): Router => {
  const router = Router();

  router.get('/', healthController.check);

  return router;
};

export default healthRoutes;
