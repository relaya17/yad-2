import mongoose, { Schema } from 'mongoose';

export interface AuditLogDoc {
  at: Date;
  method: string;
  path: string;
  status: number;
  ip?: string;
  userId?: string;
  userAgent?: string;
  body?: string;
  query?: string;
  durationMs?: number;
}

const AuditLogSchema = new Schema<AuditLogDoc>(
  {
    at: { type: Date, default: () => new Date(), index: true },
    method: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: Number, required: true },
    ip: { type: String },
    userId: { type: String, index: true },
    userAgent: { type: String },
    body: { type: String },
    query: { type: String },
    durationMs: { type: Number },
  },
  { versionKey: false },
);

export const AuditLogModel = mongoose.model<AuditLogDoc>('AuditLog', AuditLogSchema);


