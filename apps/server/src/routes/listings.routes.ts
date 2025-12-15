import { Router } from 'express';
import { createListing, getListings, updateListingStatus } from '../controllers/listings.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

export const listingsRoutes = Router();

listingsRoutes.get('/', getListings);
listingsRoutes.post('/', authMiddleware, upload.array('images', 5), createListing);
listingsRoutes.patch('/:id/status', authMiddleware, updateListingStatus);


