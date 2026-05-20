# agenda-clean API Backend

Backend API for agenda-clean - Sofa cleaning appointment scheduler.

## Overview

This is a **Node.js + Express + TypeScript** backend API that provides:
- ✅ RESTful API endpoints for bookings, authentication, and admin dashboard
- ✅ Type-safe database access with Prisma ORM
- ✅ PostgreSQL database integration
- ✅ Google OAuth authentication
- ✅ Email notifications with SendGrid
- ✅ Centralized error handling
- ✅ Request logging and validation middleware
- ✅ CORS support for frontend integration

## Quick Start

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- npm or pnpm package manager
- PostgreSQL 14+ (local or remote database)
- Environment variables (.env.local file)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual values:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/agenda_clean
   CORS_ORIGIN=http://localhost:5173
   JWT_SECRET=your-super-secret-key-here
   GOOGLE_CLIENT_ID=your-google-oauth-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-secret
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3000`

4. **Test the health endpoint:**
   ```bash
   curl http://localhost:3000/health
   ```

   Expected response:
   ```json
   {
     "success": true,
     "data": {
       "status": "ok",
       "timestamp": "2026-05-13T10:30:00.000Z",
       "uptime": 12.345
     },
     "timestamp": "2026-05-13T10:30:00.000Z"
   }
   ```

## Project Structure

```
backend/
├── src/
│   ├── index.ts                 # Entry point
│   ├── server.ts                # Express app initialization
│   ├── routes/                  # API route handlers
│   │   ├── healthRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   └── adminRoutes.ts
│   ├── controllers/             # Route handler logic
│   │   ├── healthController.ts
│   │   ├── authController.ts
│   │   ├── bookingController.ts
│   │   └── adminController.ts
│   ├── services/                # Business logic layer
│   │   ├── UserService.ts
│   │   ├── BookingService.ts
│   │   └── AuthService.ts
│   ├── middleware/              # Express middleware
│   │   ├── corsMiddleware.ts
│   │   ├── loggerMiddleware.ts
│   │   ├── errorHandler.ts
│   │   ├── requestValidator.ts
│   │   └── authMiddleware.ts
│   ├── types/                   # TypeScript interfaces
│   │   ├── ApiResponse.ts
│   │   ├── User.ts
│   │   └── Booking.ts
│   ├── utils/                   # Utility functions
│   │   ├── formatDate.ts
│   │   ├── validateEmail.ts
│   │   └── logger.ts
│   └── config/                  # Configuration
│       ├── env.ts
│       ├── constants.ts
│       └── index.ts
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment (git-ignored)
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── tsconfig.build.json
├── nodemon.json
├── package.json
└── README.md
```

## Available Scripts

### Development

```bash
# Start development server with auto-reload
npm run dev

# Type checking (no compilation)
npm run type-check

# Lint code with ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

### Production

```bash
# Build TypeScript to JavaScript
npm run build

# Start production server
npm run start
```

### Database

```bash
# Generate Prisma client
npm run prisma:generate

# Create/run database migrations
npm run prisma:migrate

# Open Prisma Studio (visual DB browser)
npm run prisma:studio
```

## Architecture & Design Patterns

### MVC Pattern

```
Request → Router → Controller → Service → Prisma → Database
Response ← Controller ← Service ← Prisma ← Database
```

### Type Safety

- ✅ **Strict TypeScript mode** enabled
- ✅ **No `any` types** (except rare documented exceptions)
- ✅ **Explicit function signatures** with parameter and return types
- ✅ **Type-safe database queries** with Prisma ORM
- ✅ **API response envelopes** with consistent types

### Middleware Stack

1. **CORS Middleware** - Enables frontend communication
2. **Logger Middleware** - Logs all requests/responses
3. **JSON Parser** - Parses incoming JSON bodies
4. **Request Validator** - Validates input (future)
5. **Route Handlers** - API endpoints
6. **Error Handler** - Centralized error processing

### Error Handling

All errors follow a consistent response format:

```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Email is invalid",
    details: [{ field: "email", message: "Invalid format" }]
  },
  timestamp: "2026-05-13T10:30:00.000Z"
}
```

## API Endpoints

### Health Check
- **GET** `/health` - Check server status

### Authentication (Story 2.1)
- **POST** `/api/auth/login` - Google OAuth login
- **POST** `/api/auth/logout` - Logout
- **POST** `/api/auth/refresh` - Refresh token

### Bookings (Story 3.x)
- **GET** `/api/bookings` - List user bookings
- **GET** `/api/bookings/:id` - Get booking details
- **POST** `/api/bookings` - Create new booking
- **PUT** `/api/bookings/:id` - Update booking
- **DELETE** `/api/bookings/:id` - Cancel booking

### Admin (Story 4.x)
- **GET** `/api/admin/dashboard` - Admin dashboard
- **PUT** `/api/admin/bookings/:id/status` - Update booking status
- **GET** `/api/admin/stats` - Statistics

## Environment Variables

Required variables (copy from `.env.example`):

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | `development`, `production`, or `test` |
| `PORT` | Yes | Server port (default: 3000) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `CORS_ORIGIN` | Yes | Frontend URL for CORS |
| `JWT_SECRET` | Yes | Secret for JWT tokens |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth Client Secret |
| `SENDGRID_API_KEY` | No | SendGrid API key for emails |
| `SENDGRID_FROM_EMAIL` | No | Sender email address |
| `ADMIN_EMAIL` | No | Admin email for notifications |

## Development Workflow

### Adding a New Route

1. **Create controller** in `src/controllers/`
   ```typescript
   export const exampleController = {
     handler: async (req: Request, res: Response): Promise<void> => {
       // Implementation
     }
   };
   ```

2. **Create route** in `src/routes/`
   ```typescript
   router.get('/:id', exampleController.handler);
   ```

3. **Register in** `src/server.ts`
   ```typescript
   app.use('/api/example', exampleRoutes());
   ```

### Code Style

- **Formatting**: Use `npm run lint:fix` before committing
- **Naming**: Controllers (PascalCase), routes (camelCase)
- **Types**: Explicit everywhere, no implicit `any`
- **Async/Await**: Always use async/await, never callbacks
- **Error Handling**: Try/catch + pass to next() middleware

## Testing

### Manual Testing with curl

```bash
# Health check
curl http://localhost:3000/health

# List bookings (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/bookings

# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"date": "2026-05-20", "time": "10:00"}'
```

### Testing with Postman

1. Import the API endpoints listed above
2. Set base URL: `http://localhost:3000`
3. Add Authorization header with JWT token
4. Test each endpoint

## Deployment

### Build for Production

```bash
# Type-check and compile
npm run build

# Verify compilation
ls -la dist/

# Test production build
npm run start
```

### Environment for Production

Update `.env` on production server with:
- `NODE_ENV=production`
- Real database URL
- Real JWT secret
- Real OAuth credentials
- Real SendGrid API key

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify DATABASE_URL in .env.local
echo $DATABASE_URL
```

### TypeScript Errors
```bash
# Type-check without compiling
npm run type-check

# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Hot-Reload Not Working
```bash
# Kill nodemon and restart
npm run dev

# Or check file permissions
chmod -R 755 src/
```

## Story References

This backend initialization enables:

- ✅ **Story 1.2** (this story) - Foundation setup
- ⬜ **Story 1.3** - Database schema and Prisma setup
- ⬜ **Story 2.1** - Google OAuth authentication
- ⬜ **Story 3.1** - Booking creation API
- ⬜ **Story 4.1** - Admin dashboard API
- ⬜ **Story 5.x** - Email notifications and deployment

## Development Tips

1. **Use TypeScript strict mode** - Catch errors early
2. **Keep services focused** - One service = one domain
3. **Log important operations** - Helps with debugging
4. **Handle all error cases** - Never let exceptions bubble up
5. **Use Prisma for database** - Type-safe queries, migrations
6. **Test with curl/Postman** - Before connecting frontend

## Resources

- 📖 [Express.js Documentation](https://expressjs.com/)
- 🔷 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 📊 [Prisma Documentation](https://www.prisma.io/docs/)
- 🗄️ [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- 🔐 [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review this README and API docs
3. Check logs: `npm run dev`
4. Ask in project slack channel

## License

MIT - See LICENSE file for details

---

**Last Updated:** May 13, 2026  
**Maintainer:** Davi  
**Project:** agenda-clean
