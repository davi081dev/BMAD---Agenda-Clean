import { Request, Response, NextFunction } from 'express';

// Auth middleware placeholder - será implementado em Story 2.4
export const authMiddleware = () => {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // Authentication middleware
    // Will be implemented in Story 2.4
    next();
  };
};

export default authMiddleware;
