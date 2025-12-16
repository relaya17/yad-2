import { Box, Button, Card, CardContent, FormControlLabel, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import type { ListingsQuery } from '@tishal-et-dudu/shared';
import { useTranslation } from 'react-i18next';

export type WizardOptions = {
  categories: string[];
  pricePresets?: Array<{ label: string; maxPrice: number }>;
};

export function WizardFilters({
  value,
  onChange,
  onApply,
  options,
}: {
  value: ListingsQuery;
  onChange: (next: ListingsQuery) => void;
  onApply: () => void;
  options?: WizardOptions;
}) {
  const { t } = useTranslation();
  const categories = options?.categories ?? ['ריהוט', 'רכבים', 'נדל״ן', 'אלקטרוניקה'];

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ textAlign: { xs: 'center', md: 'right' }, direction: 'rtl' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          {t('wizard_title')}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems="stretch">
          <TextField
            select
            fullWidth
            label={t('category')}
            value={value.category ?? ''}
            onChange={(e) => onChange({ ...value, category: e.target.value || undefined })}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': { textAlign: 'right' },
                '& .MuiSelect-select': { textAlign: 'right' },
              },
            }}
          >
            <MenuItem value="">הכל</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label={t('search')}
            value={value.q ?? ''}
            onChange={(e) => onChange({ ...value, q: e.target.value || undefined })}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': { textAlign: 'right' },
              },
            }}
          />
          <TextField
            type="number"
            label="מינ׳ ₪"
            value={value.minPrice ?? ''}
            onChange={(e) => onChange({ ...value, minPrice: e.target.value ? Number(e.target.value) : undefined })}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': { textAlign: 'right' },
              },
            }}
          />
          <TextField
            type="number"
            label="מקס׳ ₪"
            value={value.maxPrice ?? ''}
            onChange={(e) => onChange({ ...value, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            InputProps={{
              sx: {
                '& .MuiInputBase-input': { textAlign: 'right' },
              },
            }}
          />
        </Stack>

        {options?.pricePresets?.length ? (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
            {options.pricePresets.map((p) => (
              <Button
                key={p.label}
                size="small"
                variant={value.maxPrice === p.maxPrice ? 'contained' : 'outlined'}
                onClick={() => onChange({ ...value, maxPrice: p.maxPrice })}
              >
                {p.label}
              </Button>
            ))}
          </Stack>
        ) : null}

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(value.specialOnly)}
                onChange={(e) => onChange({ ...value, specialOnly: e.target.checked || undefined })}
              />
            }
            label={t('special_deals_only')}
          />
        </Box>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={onApply} sx={{ minWidth: 140, fontWeight: 800 }}>
            {t('apply_filters')}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}


