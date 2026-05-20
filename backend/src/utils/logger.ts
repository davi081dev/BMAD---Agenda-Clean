export interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  timestamp: string;
  message: string;
  data?: Record<string, unknown>;
}

export const logInfo = (message: string, data?: Record<string, unknown>): void => {
  const log: LogEntry = {
    level: 'info',
    timestamp: new Date().toISOString(),
    message,
    data,
  };
  console.info(`[INFO] ${log.message}`, data || '');
};

export const logWarn = (message: string, data?: Record<string, unknown>): void => {
  const log: LogEntry = {
    level: 'warn',
    timestamp: new Date().toISOString(),
    message,
    data,
  };
  console.warn(`[WARN] ${log.message}`, data || '');
};

export const logError = (message: string, error?: Record<string, unknown>): void => {
  const log: LogEntry = {
    level: 'error',
    timestamp: new Date().toISOString(),
    message,
    data: error,
  };
  console.error(`[ERROR] ${log.message}`, error || '');
};

export const logDebug = (message: string, data?: Record<string, unknown>): void => {
  if (process.env.NODE_ENV !== 'production') {
    const log: LogEntry = {
      level: 'debug',
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    console.log(`[DEBUG] ${log.message}`, data || '');
  }
};

export default {
  logInfo,
  logWarn,
  logError,
  logDebug,
};
