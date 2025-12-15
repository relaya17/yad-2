import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function ensureUploadsDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveCompressedImage(file: Express.Multer.File) {
  await ensureUploadsDir();

  const id = crypto.randomUUID();
  const filename = `${id}.webp`;
  const filepath = path.join(UPLOAD_DIR, filename);

  const image = sharp(file.buffer).rotate();
  await image.webp({ quality: 80 }).toFile(filepath);

  return filename;
}


