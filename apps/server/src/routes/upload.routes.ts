import { Router } from 'express';
import { uploadImages } from '../controllers/upload.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

export const uploadRoutes = Router();

uploadRoutes.post('/images', authMiddleware, upload.array('images', 5), uploadImages);


