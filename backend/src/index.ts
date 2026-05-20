import { createApp } from './server.js';
import { config } from './config/index.js';

const port = config.PORT || 3000;
const app = createApp();

app.listen(port, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║      🚀 agenda-clean API Server Started               ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  🌐 Server: http://localhost:${port}`);
  console.log(`║  📊 Health: GET http://localhost:${port}/health`);
  console.log(`║  🔌 CORS: ${config.CORS_ORIGIN}`);
  console.log(`║  🔧 Environment: ${config.NODE_ENV}`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('✅ Server is ready to accept connections');
  console.log('📚 API Documentation: See README.md');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('');
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('');
  console.log('⚠️  SIGINT signal received: closing HTTP server');
  process.exit(0);
});
