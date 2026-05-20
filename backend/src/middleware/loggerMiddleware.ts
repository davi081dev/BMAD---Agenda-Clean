import { Request, Response, NextFunction } from 'express';

interface RequestLog {
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  duration: number;
}

export const loggerMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const log: RequestLog = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration,
      };

      console.log(
        `[${log.timestamp}] ${log.method} ${log.path} - ${log.statusCode} (${log.duration}ms)`
      );
    });

    next();
  };
};

export default loggerMiddleware;
