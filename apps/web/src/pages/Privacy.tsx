import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Seo } from '../seo';

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="מדיניות פרטיות"
        description="מדיניות פרטיות לאתר תשאל את דודו. איך אנחנו אוספים, משתמשים ושומרים על המידע האישי שלך."
        canonicalPath="/privacy"
      />
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack gap={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 950, textAlign: 'center', color: 'primary.main' }}>
              מדיניות פרטיות
            </Typography>
            <Typography color="text.secondary">
              תבנית בסיסית למדיניות פרטיות. לפני עליה לאוויר מומלץ להתאים לצרכים ולשירותים בפועל.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>מה אנחנו אוספים</Typography>
            <Typography color="text.secondary">
              מידע שמסרת (אימייל/שם), תוכן מודעות (כותרת/תיאור/תמונות), ולוגים טכניים לצורכי אבטחה (Audit Log).
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>למה אנחנו משתמשים במידע</Typography>
            <Typography color="text.secondary">
              כדי להפעיל את האתר, לאפשר פרסום מודעות, לשמור על אבטחה, ולשפר חוויית משתמש.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>שמירה ושיתוף</Typography>
            <Typography color="text.secondary">
              לא מוכרים מידע אישי. ייתכן שיתוף עם ספקי תשתית (דוא״ל/אחסון) לפי צורך תפעולי.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>יצירת קשר</Typography>
            <Typography color="text.secondary">contact@tishal-et-dudu.local</Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}


