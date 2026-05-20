export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>[];
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data?: T[];
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>[];
  };
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  timestamp: string;
}

export default ApiResponse;
