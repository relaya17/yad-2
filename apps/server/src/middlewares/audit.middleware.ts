import type { NextFunction, Request, Response } from 'express';
import { AuditLogModel } from '../models/auditLog.model.js';

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return '"[unserializable]"';
  }
}

export function auditMiddleware(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();

  res.on('finish', async () => {
    try {
      await AuditLogModel.create({
        at: new Date(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        ip: req.ip,
        userId: req.user?.id,
        userAgent: req.get('user-agent'),
        body: safeJson(req.body),
        query: safeJson(req.query),
        durationMs: Date.now() - startedAt,
      });
    } catch {
      // best-effort audit; never crash response
    }
  });

  next();
}


