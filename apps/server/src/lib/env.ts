import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/yad2_eilat'),
  JWT_SECRET: z.string().min(10).default('change_me_change_me'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('תשאל את דודו <no-reply@tishal-et-dudu.local>'),
});

export const env = EnvSchema.parse(process.env);


