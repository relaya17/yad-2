import mongoose, { Schema } from 'mongoose';

export interface UserDoc {
  email: string;
  passwordHash: string;
  fullName: string;
  city: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    city: { type: String, default: 'אילת' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const UserModel = mongoose.model<UserDoc>('User', UserSchema);


