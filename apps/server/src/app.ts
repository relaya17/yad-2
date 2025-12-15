import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'node:path';

import { env } from './lib/env.js';
import { auditMiddleware } from './middlewares/audit.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { listingsRoutes } from './routes/listings.routes.js';
import { wizardRoutes } from './routes/wizard.routes.js';
import { uploadRoutes } from './routes/upload.routes.js';
import { ensureUploadsDir } from './services/images.service.js';

export function createApp() {
  const app = express();

  // best-effort ensure upload dir exists
  ensureUploadsDir().catch(() => {});

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));

  app.use(
    rateLimit({
      windowMs: 60_000,
      max: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  app.use(auditMiddleware);

  app.use('/api/auth', authRoutes);
  app.use('/api/wizard', wizardRoutes);
  app.use('/api/listings', listingsRoutes);
  app.use('/api/upload', uploadRoutes);

  app.use(errorMiddleware);

  return app;
}


