import cors from 'cors';
import { env } from './env';

// ============================================================
// CORS Configuration
// ============================================================

export const corsOptions: cors.CorsOptions = {
  origin: env.NODE_ENV === 'production' ? [env.FRONTEND_URL] : [env.FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24h preflight cache
};
