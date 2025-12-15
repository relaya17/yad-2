import type { Request, Response } from 'express';
import { saveCompressedImage } from '../services/images.service.js';

export async function uploadImages(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'UNAUTHORIZED' });

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const filenames: string[] = [];
  for (const f of files) {
    filenames.push(await saveCompressedImage(f));
  }

  res.json({
    files: filenames.map((name) => ({
      filename: name,
      url: `/uploads/${name}`,
    })),
  });
}


