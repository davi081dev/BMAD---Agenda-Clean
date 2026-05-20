import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/ApiResponse.js';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: Record<string, unknown>[];
}

interface ErrorResponse extends ApiResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>[];
  };
}

export const errorHandler = () => {
  return (
    error: ApiError | Error,
    _req: Request,
    res: Response<ErrorResponse>,
    _next: NextFunction
  ): void => {
    const apiError = error as ApiError;
    const statusCode = apiError.statusCode || 500;
    const code = apiError.code || 'INTERNAL_ERROR';
    const message = error.message || 'An unexpected error occurred';

    console.error(`[ERROR] ${code}: ${message}`);
    if (apiError.details) {
      console.error('Details:', apiError.details);
    }

    res.status(statusCode).json({
      success: false,
      error: {
        code,
        message,
        details: apiError.details || [],
      },
      timestamp: new Date().toISOString(),
    });
  };
};

export default errorHandler;
