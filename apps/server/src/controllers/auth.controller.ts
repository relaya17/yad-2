import type { Request, Response } from 'express';
import { z } from 'zod';
import { loginUser, registerUser } from '../services/auth.service.js';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  city: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterInput = Parameters<typeof registerUser>[0];
type LoginInput = Parameters<typeof loginUser>[0];

export async function register(req: Request, res: Response) {
  const body: RegisterInput = RegisterSchema.parse(req.body);
  const user = await registerUser(body);
  res.json({
    id: user._id.toString(),
    email: user.email,
    fullName: user.fullName,
    city: user.city,
  });
}

export async function login(req: Request, res: Response) {
  const body: LoginInput = LoginSchema.parse(req.body);
  try {
    const { token, user } = await loginUser(body);
    res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        city: user.city,
        role: user.role,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'INVALID_CREDENTIALS';
    if (msg === 'INVALID_CREDENTIALS') return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    if (msg === 'EMAIL_ALREADY_USED') return res.status(409).json({ error: 'EMAIL_ALREADY_USED' });
    throw e;
  }
}


