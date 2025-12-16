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
        title="תשאל את דודו – יד שנייה עם לב חברתי"
        description="אתר תשאל את דודו מציע: מוצרי יד שנייה משופצים, מחירים זולים ונגישים, מסירת מוצרים לנזקקים, ריהוט, מוצרי חשמל, חפצי בית ועוד. יוזמה חברתית ללא מטרות רווח."
        canonicalPath="/"
      />

      <Stack gap={1.5} sx={{ mt: { xs: 0.2, md: 0.4 } }}>
        {/* Hero Section - קטן וקומפקטי */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            bgcolor: 'background.paper',
            borderColor: '#E2E8F0',
            borderWidth: 1,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack gap={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box
                component="img"
                src="/dodo.png.PNG"
                alt="דודו"
                sx={{
                  width: { xs: 210, sm: 280 },
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mb: 0.2,
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                className="brand-title"
                sx={{
                  fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: { xs: -0.4, sm: -0.6 },
                  textAlign: { xs: 'center', md: 'right' },
                  color: 'primary.main',
                  fontSize: { xs: 22, sm: 28 },
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 12px rgba(37, 99, 235, 0.15)',
                }}
              >
                תשאל את דודו
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 14 },
                  maxWidth: { xs: '100%', sm: 700 },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'right' },
                  mb: 2,
                }}
              >
                ברוכים הבאים ל־תשאל את דודו –<br />
                המקום שבו יד שנייה פוגשת שליחות חברתית.
                <br /><br />
                כאן תמצאו מוצרים יד שנייה שנבחרו בקפידה,<br />
                עברו ניקוי, תיקון ושדרוג –<br />
                ונמכרים במחירים נגישים במיוחד, מתוך מטרה אחת ברורה:<br />
                לאפשר לכל אחד ואחת לחיות בכבוד.
                <br /><br />
                זה לא אתר רווחי.<br />
                זו יוזמה אישית עם לב גדול, שנועדה לעזור למי שצריך –<br />
                משפחות, צעירים, מבוגרים, וכל מי שמחפש פתרון הוגן ואנושי.
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 13 },
                  maxWidth: { xs: '100%', sm: 620 },
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  textAlign: { xs: 'center', md: 'right' },
                }}
              >
                באתר תמצאו גם מוצרים למסירה ללא תשלום למי שזקוק לעזרה, לצד מוצרים משופצים במחירים נגישים מאוד.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                gap={1}
                alignItems="center"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ mt: 1 }}
              >
                <Button
                  component={Link}
                  to="/about"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: 12 }}
                >
                  קרא עוד על תשאל את דודו
                </Button>
              </Stack>

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


