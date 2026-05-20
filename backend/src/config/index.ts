import { validateEnv } from './env.js';

// Validate environment on startup
if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}

export { config as default } from './env.js';
export * from './env.js';
export * from './constants.js';
