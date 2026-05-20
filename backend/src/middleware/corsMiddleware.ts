import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export const corsMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', config.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,X-Requested-With'
    );
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }

    next();
  };
};

export default corsMiddleware;
