import { Request, Response, NextFunction } from 'express';

export interface ValidationError {
  field: string;
  message: string;
}

export const requestValidator = () => {
  return (_req: Request, _res: Response, next: NextFunction): void => {
    // Validation middleware placeholder
    // Will be used in Story 1.3+ for request body validation
    next();
  };
};

export default requestValidator;
