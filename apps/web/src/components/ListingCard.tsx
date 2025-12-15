import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { Listing } from '@tishal-et-dudu/shared';
import { API_BASE_URL } from '../api';

export function ListingCard({ listing }: { listing: Listing }) {
  const img = listing.images?.[0] ? `${API_BASE_URL}/uploads/${listing.images[0]}` : null;
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3, borderColor: 'rgba(148,163,184,0.8)' },
      }}
    >
      <Box
        sx={{
          height: 140,
          background:
            img != null
              ? `linear-gradient(180deg, rgba(2,6,23,0.04), rgba(2,6,23,0.10)), url(${img}) center/cover no-repeat`
              : 'linear-gradient(135deg, #DBEAFE 0%, #EEF2FF 40%, #FFE4E6 100%)',
        }}
      />
      <CardContent sx={{ p: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.5} sx={{ mb: 1 }}>
          <Stack gap={0.25} sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
              {listing.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
              {listing.category} · {listing.city}
            </Typography>
          </Stack>
          <Stack alignItems="flex-end" gap={0.5} sx={{ flexShrink: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: 16 }}>
              ₪{listing.price.toLocaleString()}
            </Typography>
            {listing.specialDeal ? (
              <Chip color="error" size="small" label="דיל מיוחד" sx={{ height: 20, fontSize: 10 }} />
            ) : null}
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          sx={{ mt: 'auto', fontSize: 12, lineHeight: 1.5 }}
          color="text.secondary"
          component="p"
        >
          {listing.description.length > 80 ? `${listing.description.slice(0, 80)}...` : listing.description}
        </Typography>
      </CardContent>
    </Card>
  );
}


