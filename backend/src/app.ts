import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './config/cors';
import { generalLimiter } from './middleware/rate-limit.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import routes from './routes';
import { env } from './config/env';

// ============================================================
// Express Application Setup
// ============================================================

const app = express();

// ── Security Headers ──
app.set('trust proxy', 1); // Trust first proxy (for Railway/Render)
app.use(helmet());

// ── CORS ──
app.use(cors(corsOptions));

// ── Request Logging ──
app.use(
  morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    skip: (req) => req.url === '/api/v1/health', // Don't log health checks
  })
);

// ── Body Parsing ──
// Note: Stripe webhooks need raw body, so we handle that separately in webhook routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ──
app.use('/api/', generalLimiter);

// ── API Routes ──
app.use('/api/v1', routes);

// ── 404 Handler ──
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// ── Global Error Handler (MUST be last) ──
app.use(errorMiddleware);

export default app;
