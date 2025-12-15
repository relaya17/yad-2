import multer from 'multer';

const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 5 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_FILE_TYPE'));
    }
    return cb(null, true);
  },
});


