import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Seo } from '../seo';

export function AboutPage() {
  return (
    <>
      <Seo
        title="אודות תשאל את דודו"
        description="הסיפור המלא של תשאל את דודו – יוזמה חברתית ללא מטרות רווח, שמחדשת מוצרי יד שנייה, מוכרת בזול ומציעה גם מוצרים למסירה למי שזקוק."
        canonicalPath="/about"
      />

      <Stack gap={2.5} sx={{ mt: { xs: 0.5, md: 1 } }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack gap={2}>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 800,
                  textAlign: { xs: 'center', md: 'right' },
                  fontSize: { xs: 18, sm: 22 },
                }}
              >
                ℹ️ אודות – סיפור מרגש ומקצועי
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 14 },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'right' },
                }}
              >
                תשאל את דודו נולד מתוך רצון פשוט:
                <br />
                לעזור לאנשים שאין להם – בלי בירוקרטיה, בלי מבוכה ובלי תנאים.
                <br />
                <br />
                אני קונה אוספי מוצרים יד שנייה,
                <br />
                מנקה, משפץ, מתקן ומשדרג כל פריט באופן אישי,
                <br />
                ורק אז מעלה אותו לאתר –
                <br />
                במחיר הוגן, אמיתי, ונגיש לכולם.
                <br />
                <br />
                מעבר למכירה במחירים נמוכים,
                <br />
                באתר קיימת גם קטגוריית מסירה –
                <br />
                מוצרים שניתנים ללא עלות,
                <br />
                כי לפעמים עזרה קטנה עושה שינוי גדול.
                <br />
                <br />
                זו לא רק חנות.
                <br />
                זו דרך חיים של נתינה, כבוד ואחריות חברתית.
              </Typography>

              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontSize: { xs: 15, sm: 16 },
                  fontWeight: 700,
                  color: 'primary.main',
                  textAlign: { xs: 'center', md: 'right' },
                  mt: 2,
                }}
              >
                🎁 קטגוריה ייעודית: מוצרים למסירה
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 14 },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'right' },
                }}
              >
                מוצרים למסירה – כי יש מי שצריך.
                <br />
                <br />
                בקטגוריה זו תמצאו מוצרים שנמסרים ללא תשלום
                <br />
                לאנשים ולמשפחות שזקוקים לכך.
                <br />
                <br />
                כל פריט נבדק, נקי וראוי לשימוש.
                <br />
                המטרה היא אחת:
                <br />
                לעזור – בלי לשפוט, ובלי לשאול שאלות מיותרות.
                <br />
                <br />
                אם אתם זקוקים – זה בשבילכם.
                <br />
                אם אתם מכירים מישהו שצריך – שתפו.
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 15 },
                  color: 'primary.main',
                  fontWeight: 700,
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'right' },
                  mt: 2,
                  fontStyle: 'italic',
                }}
              >
                ❤️ תשאל את דודו – אתר קטן עם לב גדול, שמחזיר כבוד ונותן הזדמנות חדשה לאנשים ולדברים.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}


