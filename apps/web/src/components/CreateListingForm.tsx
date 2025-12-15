import { Alert, Box, Button, Card, CardContent, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { api } from '../api';

export function CreateListingForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ריהוט');
  const [price, setPrice] = useState<number>(0);
  const [specialDeal, setSpecialDeal] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const authed = Boolean(localStorage.getItem('token'));
  const canSubmit = useMemo(() => authed && title.trim().length >= 3 && description.trim().length >= 10, [authed, title, description]);

  async function submit() {
    setError(null);
    setOk(null);
    setLoading(true);
    try {
      await api.listings.create({ title, description, category, price, specialDeal, images });
      setOk('המודעה פורסמה בהצלחה!');
      setTitle('');
      setDescription('');
      setPrice(0);
      setImages([]);
      onCreated();
    } catch (e) {
      const maybeApiError = e as { data?: { error?: string } };
      setError(maybeApiError.data?.error ?? 'ERROR');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
          פרסום מודעה
        </Typography>

        {!authed ? <Alert severity="info">כדי לפרסם מודעה צריך להתחבר.</Alert> : null}

        <Stack gap={1.5} sx={{ mt: 2 }}>
          <TextField label="כותרת" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField
            label="תיאור"
            value={description}
            multiline
            minRows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField label="קטגוריה" value={category} onChange={(e) => setCategory(e.target.value)} />
          <TextField
            label="מחיר (₪)"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <FormControlLabel
            control={<Switch checked={specialDeal} onChange={(e) => setSpecialDeal(e.target.checked)} />}
            label="🎗️ דיל מיוחד (מחיר נמוך)"
          />

          <Box>
            <Button variant="outlined" component="label">
              הוספת תמונות (עד 5)
              <input
                hidden
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => setImages(Array.from(e.target.files ?? []).slice(0, 5))}
              />
            </Button>
            {images.length ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                נבחרו {images.length} תמונות
              </Typography>
            ) : null}
          </Box>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {ok ? <Alert severity="success">{ok}</Alert> : null}

          <Button variant="contained" disabled={!canSubmit || loading} onClick={submit}>
            {loading ? '…' : 'פרסם מודעה'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}


