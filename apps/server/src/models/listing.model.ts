import mongoose, { Schema } from 'mongoose';

export interface ListingDoc {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  specialDeal: boolean;
  city: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'sold' | 'cancelled';
}

const ListingSchema = new Schema<ListingDoc>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0, index: true },
    specialDeal: { type: Boolean, default: false, index: true },
    city: { type: String, default: 'אילת', index: true },
    images: { type: [String], default: [] },
    status: { type: String, enum: ['active', 'sold', 'cancelled'], default: 'active', index: true },
    createdAt: { type: Date, default: () => new Date(), index: true },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

ListingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const ListingModel = mongoose.model<ListingDoc>('Listing', ListingSchema);


