import { Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Listing, ListingsQuery } from '@tishal-et-dudu/shared';
import { api } from '../api';
import { WizardFilters, type WizardOptions } from '../components/WizardFilters';
import { ListingCard } from '../components/ListingCard';
import { Seo } from '../seo';

export function FreePage() {
  const [query, setQuery] = useState<ListingsQuery>({ maxPrice: 0, sort: 'newest' });
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
        title="מוצרים למסירה"
        description="מוצרים למסירה ללא תשלום בתשאל את דודו – פריטים נבחרים, נקיים ומוכנים לשימוש, מיועדים למי שזקוק לעזרה."
        canonicalPath="/free"
      />

      <Stack gap={2.5} component="section" aria-label="מוצרים למסירה">
        <Stack
          gap={1}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: 'center', direction: 'rtl', mb: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
            🤗 מסירה באהבה
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            חפצים עם אהבה
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            אני מסרתי – עכשיו תורך לחייך
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif",
              fontWeight: 900,
              letterSpacing: 0.4,
              color: 'primary.main',
              mt: 0.5,
            }}
          >
            ופתח את ידו משביע כל חי רצון
          </Typography>
        </Stack>

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
          מוצרים למסירה {loading ? '…' : `(${listings.length})`}
        </Typography>

        {!loading && listings.length === 0 ? (
          <Typography color="text.secondary">לא נמצאו מוצרים למסירה לפי הסינון שבחרת</Typography>
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


