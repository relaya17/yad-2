import type { Request, Response } from 'express';

export async function getWizardOptions(_req: Request, res: Response) {
  // MVP: options for client-side wizard (can be dynamic later)
  res.json({
    city: 'אילת',
    categories: ['ריהוט', 'רכבים', 'נדל״ן', 'אלקטרוניקה', 'בעלי חיים', 'שירותים'],
    sortOptions: ['newest', 'priceAsc', 'priceDesc'],
    specialDeals: true,
    pricePresets: [
      { label: 'עד ₪100', maxPrice: 100 },
      { label: 'עד ₪300', maxPrice: 300 },
      { label: 'עד ₪500', maxPrice: 500 },
      { label: 'עד ₪1,000', maxPrice: 1000 }
    ]
  });
}


