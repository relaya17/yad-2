import { Router } from 'express';
import { getWizardOptions } from '../controllers/wizard.controller.js';

export const wizardRoutes = Router();

wizardRoutes.get('/options', getWizardOptions);


