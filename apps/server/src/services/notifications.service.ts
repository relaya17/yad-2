import nodemailer from 'nodemailer';
import { env } from '../lib/env.js';

export async function sendEmail(to: string, subject: string, text: string) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    // notifications are optional in MVP
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to,
    subject,
    text,
  });
}

export async function pushStub(_userId: string, _title: string, _body: string) {
  // Expo / FCM integration point
  return;
}


