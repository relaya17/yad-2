import { Stack } from '@mui/material';
import { Seo } from '../seo';
import { AuthPanel } from '../components/AuthPanel';
import { CreateListingForm } from '../components/CreateListingForm';

export function PublishPage() {
  return (
    <>
      <Seo
        title="פרסום מודעה למכירה"
        description="פרסם מודעה למכירת מוצר יד שנייה באילת. העלאת תמונות אמיתיות, תיאור ברור, הגדרת מחיר, סימון דיל מיוחד, ופרסום מהיר."
        canonicalPath="/publish"
      />
      <Stack gap={2}>
        <AuthPanel onAuthed={() => {}} />
        <CreateListingForm onCreated={() => {}} />
      </Stack>
    </>
  );
}


