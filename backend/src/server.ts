import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestValidator } from './middleware/requestValidator.js';
import { initializePassport } from './auth/passport.js';
import { config } from './config/index.js';
import { healthRoutes } from './routes/healthRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { bookingRoutes } from './routes/bookingRoutes.js';
import { adminRoutes } from './routes/index.js';

export const createApp = (): Express => {
  const app = express();

  // ============================================
  // MIDDLEWARE (applied in order)
  // ============================================

  // CORS middleware
  app.use(corsMiddleware());

  // Request logging middleware
  app.use(loggerMiddleware());

  // Body parser middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Cookie parser middleware - DEVE vir antes de session
  // Necessário para parsear cookies (incluindo authToken)
  app.use(cookieParser());

  // Express session middleware - Necessário para Passport OAuth
  // Armazena informações de sessão em memória (desenvolvimento)
  // Em produção, considerar usar session store (Redis, etc)
  app.use(
    session({
      secret: config.JWT_SECRET, // Usar JWT_SECRET como session secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: config.NODE_ENV === 'production', // HTTPS em produção
        httpOnly: true, // Proteção contra XSS
        sameSite: 'strict', // Proteção contra CSRF
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      },
    })
  );

  // Initialize Passport authentication
  initializePassport(app);

  // Request validation middleware
  app.use(requestValidator());

  // ============================================
  // ROUTES
  // ============================================

  // Health check route
  app.use('/health', healthRoutes());

  // Auth routes (OAuth 2.0 with Google)
  app.use('/auth', authRoutes());

  // API routes (will be implemented in subsequent stories)
  app.use('/api/bookings', bookingRoutes());
  app.use('/api/admin', adminRoutes());

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `Route ${req.method} ${req.originalUrl} not found`,
        details: [],
      },
      timestamp: new Date().toISOString(),
    });
  });

  // Error handler middleware (must be last)
  app.use(errorHandler());

  return app;
};

export default createApp;
