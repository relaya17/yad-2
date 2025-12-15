import { Button, Card, CardContent, Grid, Stack, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Listing } from '@tishal-et-dudu/shared';
import { api } from '../api';
import { ListingCard } from '../components/ListingCard';
import { Seo } from '../seo';

export function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.listings
      .get({ sort: 'newest', limit: 6 })
      .then((data) => setListings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title="תשאל את דודו | דודו משפץ ומוכר יד 2 באילת"
        description="האתר הרשמי של דודו, ניקוי ושדרוג של מוצרים יד שנייה. מחירים זולים לכל כיס – דודו מתחייב למחירים הזולים ביותר. זה אדם שאוסף דברים ומוכר אותם כמעט ללא רווח."
        canonicalPath="/"
      />

      <Stack gap={2.5} sx={{ mt: { xs: 0.5, md: 1 } }}>
        {/* Hero Section - קטן וקומפקטי */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            bgcolor: 'background.paper',
            borderColor: 'primary.main',
            borderWidth: 1.5,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack gap={1.5} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box
                component="img"
                src="/dodo.png.PNG"
                alt="דודו"
                sx={{
                  width: { xs: 120, sm: 150 },
                  height: 'auto',
                  objectFit: 'contain',
                  mb: 0.5,
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 950,
                  lineHeight: 1.2,
                  letterSpacing: -0.3,
                  textAlign: { xs: 'center', md: 'right' },
                  color: 'primary.main',
                  fontSize: { xs: 20, sm: 24 },
                }}
              >
                תשאל את דודו
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 13 },
                  maxWidth: { xs: '100%', sm: 600 },
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  textAlign: { xs: 'center', md: 'right' },
                }}
              >
                האתר הרשמי של דודו, ניקוי ושדרוג של מוצרים יד שנייה, ומביא לכם פריטים באיכות גבוהה, עם תמונות אמיתיות,
                תיאור ברור ואפילו דילים מיוחדים מפעם לפעם.
              </Typography>

              <Box
                sx={{
                  mt: 0.5,
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 1.5,
                  bgcolor: 'rgba(37, 99, 235, 0.05)',
                  border: '1px solid rgba(37, 99, 235, 0.15)',
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 600 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 11, sm: 12 },
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'center', md: 'right' },
                  }}
                >
                  <strong>מחירים זולים לכל כיס</strong> – דודו מתחייב למחירים הזולים ביותר. זה אדם שאוסף דברים ומוכר
                  אותם כמעט ללא רווח. כל מוצר – מוכן לשימוש, אמין ומחודש.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* מוצרים זמינים */}
        {listings.length > 0 && (
          <Stack gap={1.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 900, textAlign: 'right', fontSize: 16 }}>
              מוצרים זמינים
            </Typography>
            <Grid container spacing={1.5} justifyContent="center">
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
            <Stack alignItems="center" sx={{ mt: 0.5 }}>
              <Button component={Link} to="/deals" variant="outlined" size="small">
                צפה בכל המוצרים
              </Button>
            </Stack>
          </Stack>
        )}

        {!loading && listings.length === 0 && (
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Stack gap={1.5} alignItems="center">
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontSize: 13 }}>
                  אין מוצרים זמינים כרגע בדף הבית.
                </Typography>
                <Button component={Link} to="/deals" variant="contained" size="small">
                  צפה בכל המוצרים
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </>
  );
}


