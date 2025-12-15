import { Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Listing, ListingsQuery } from '@tishal-et-dudu/shared';
import { api } from '../api';
import { WizardFilters, type WizardOptions } from '../components/WizardFilters';
import { ListingCard } from '../components/ListingCard';
import { Seo } from '../seo';

export function DealsPage() {
  const [query, setQuery] = useState<ListingsQuery>({ specialOnly: true, sort: 'newest' });
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [wizardOptions, setWizardOptions] = useState<WizardOptions | undefined>(undefined);

  async function load() {
    setLoading(true);
    try {
      const data = await api.listings.get(query);
      setListings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    api.wizard
      .getOptions()
      .then((o) => setWizardOptions({ categories: o.categories, pricePresets: o.pricePresets }))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Seo
        title="דילים באילת"
        description="חיפוש דילים ומוצרים יד שנייה משופצים באילת. סינון לפי קטגוריה, מחיר, ודילים מיוחדים. כל מוצר מוכן לשימוש, אמין ומחודש."
        canonicalPath="/deals"
      />

      <Stack gap={2.5} component="section" aria-label="תוצאות חיפוש דילים">
        <WizardFilters value={query} onChange={setQuery} onApply={load} options={wizardOptions} />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 900,
            textAlign: 'right',
          }}
          component="h2"
          aria-live="polite"
        >
          תוצאות {loading ? '…' : `(${listings.length})`}
        </Typography>

        {!loading && listings.length === 0 ? (
          <Typography color="text.secondary">לא נמצאו מודעות לפי הסינון שבחרת</Typography>
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              alignItems: 'stretch',
            }}
          >
            {listings.map((l) => (
              <Grid
                item
                key={l.id}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: 'flex',
                }}
              >
                <ListingCard listing={l} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </>
  );
}


