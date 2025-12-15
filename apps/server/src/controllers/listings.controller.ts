import type { Request, Response } from 'express';
import { z } from 'zod';
import { ListingModel } from '../models/listing.model.js';
import { saveCompressedImage } from '../services/images.service.js';
import { pushStub } from '../services/notifications.service.js';

const CreateListingSchema = z.object({
  title: z.string().min(3).max(80),
  description: z.string().min(10).max(2000),
  category: z.string().min(2).max(40),
  price: z.coerce.number().min(0),
  specialDeal: z.coerce.boolean().optional().default(false),
  city: z.string().optional().default('אילת'),
});

const GetListingsQuerySchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  specialOnly: z.coerce.boolean().optional(),
  sort: z.enum(['newest', 'priceAsc', 'priceDesc']).optional().default('newest'),
});

const UpdateStatusSchema = z.object({
  status: z.enum(['active', 'sold', 'cancelled']),
});

export async function getListings(req: Request, res: Response) {
  const q = GetListingsQuerySchema.parse(req.query);

  const filter: Record<string, unknown> = { status: 'active', city: 'אילת' };
  if (q.category) filter.category = q.category;
  if (q.specialOnly) filter.specialDeal = true;
  if (q.minPrice != null || q.maxPrice != null) {
    filter.price = {
      ...(q.minPrice != null ? { $gte: q.minPrice } : {}),
      ...(q.maxPrice != null ? { $lte: q.maxPrice } : {}),
    };
  }
  if (q.q) {
    filter.$or = [{ title: { $regex: q.q, $options: 'i' } }, { description: { $regex: q.q, $options: 'i' } }];
  }

  const sort: Record<string, 1 | -1> =
    q.sort === 'priceAsc' ? { price: 1 } : q.sort === 'priceDesc' ? { price: -1 } : { createdAt: -1 };

  const listings = await ListingModel.find(filter).sort(sort).limit(50).lean();
  res.json(
    listings.map((l) => ({
      id: l._id.toString(),
      title: l.title,
      description: l.description,
      category: l.category,
      price: l.price,
      specialDeal: l.specialDeal,
      city: l.city,
      images: l.images,
      createdAt: l.createdAt,
    })),
  );
}

export async function createListing(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'UNAUTHORIZED' });

  const body = CreateListingSchema.parse(req.body);
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];

  const images: string[] = [];
  for (const f of files) {
    images.push(await saveCompressedImage(f));
  }

  const listing = await ListingModel.create({
    ownerId: req.user.id,
    title: body.title,
    description: body.description,
    category: body.category,
    price: body.price,
    specialDeal: body.specialDeal,
    city: body.city,
    images,
  });

  // notification hook point (push/email)
  await pushStub(req.user.id, 'מודעה חדשה פורסמה', listing.title);

  res.status(201).json({
    id: listing._id.toString(),
    title: listing.title,
    description: listing.description,
    category: listing.category,
    price: listing.price,
    specialDeal: listing.specialDeal,
    city: listing.city,
    images: listing.images,
    createdAt: listing.createdAt,
  });
}

export async function updateListingStatus(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'UNAUTHORIZED' });

  const { status } = UpdateStatusSchema.parse(req.body);
  const id = req.params.id;

  const listing = await ListingModel.findById(id);
  if (!listing) return res.status(404).json({ error: 'NOT_FOUND' });
  if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'FORBIDDEN' });
  }

  listing.status = status;
  await listing.save();

  // notification hook point (e.g., "listing sold" / "listing cancelled")
  await pushStub(req.user.id, 'סטטוס מודעה עודכן', `${listing.title} → ${status}`);

  return res.json({ ok: true });
}


