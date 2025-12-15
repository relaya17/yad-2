import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../lib/env.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.header('authorization');
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }

  const token = header.slice('Bearer '.length).trim();
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.authTokenPayload = payload;

    // minimal contract
    const p = payload as { sub?: string; role?: 'user' | 'admin' };
    if (!p.sub) return res.status(401).json({ error: 'UNAUTHORIZED' });
    req.user = { id: p.sub, role: p.role ?? 'user' };
    return next();
  } catch {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
}


