import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/ApiResponse.js';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export const healthController = {
  check: async (
    req: Request,
    res: Response<ApiResponse<HealthResponse>>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const health: HealthResponse = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };

      res.json({
        success: true,
        data: health,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  },
};

export default healthController;
