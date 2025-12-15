import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Seo } from '../seo';

export function TermsPage() {
  return (
    <>
      <Seo
        title="תנאי שימוש"
        description="תנאי שימוש לאתר תשאל את דודו. כללי השימוש באתר, אחריות על תוכן מודעות, ועסקאות מוצרים יד שנייה."
        canonicalPath="/terms"
      />
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack gap={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 950, textAlign: 'center', color: 'primary.main' }}>
              תנאי שימוש
            </Typography>
            <Typography color="text.secondary">
              המסמך הבא הוא תבנית בסיסית. לפני עליה לאוויר מומלץ לקבל ייעוץ משפטי ולהתאים לפרטי העסק.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>1. שימוש באתר</Typography>
            <Typography color="text.secondary">
              השימוש באתר כפוף לחוק ולתנאים אלו. פרסום מודעה מחייב חשבון משתמש והזדהות.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>2. אחריות על תוכן מודעות</Typography>
            <Typography color="text.secondary">
              המפרסם אחראי לתוכן, לתמונות, למחיר, ולזמינות המוצר. האתר רשאי להסיר מודעות בהתאם לשיקול דעתו.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>3. מוצרים יד שנייה</Typography>
            <Typography color="text.secondary">
              העסקאות נעשות בין משתמשים. האתר אינו צד לעסקה ואינו אחראי לטיב המוצר/שירות.
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>4. יצירת קשר</Typography>
            <Typography color="text.secondary">לשאלות: contact@tishal-et-dudu.local</Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}


