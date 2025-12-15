import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../lib/env.js';
import { UserModel } from '../models/user.model.js';

export async function registerUser(input: { email: string; password: string; fullName: string; city?: string }) {
  const existing = await UserModel.findOne({ email: input.email }).lean();
  if (existing) throw new Error('EMAIL_ALREADY_USED');

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await UserModel.create({
    email: input.email,
    passwordHash,
    fullName: input.fullName,
    city: input.city ?? 'אילת',
  });

  return user;
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new Error('INVALID_CREDENTIALS');

  const token = jwt.sign({ role: user.role }, env.JWT_SECRET, { subject: user._id.toString(), expiresIn: '7d' });
  return { token, user };
}


