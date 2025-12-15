import { AppBar, Box, Button, Container, IconButton, MenuItem, Select, Stack, Toolbar, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Listing, ListingsQuery, Language } from '@tishal-et-dudu/shared';
import { WizardFilters, type WizardOptions } from './components/WizardFilters';
import { ListingCard } from './components/ListingCard';
import { api } from './api';
import { applyDirForLanguage } from './i18n';
import { AuthPanel } from './components/AuthPanel';
import { CreateListingForm } from './components/CreateListingForm';

export function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language | null) ?? 'he');
  const [query, setQuery] = useState<ListingsQuery>({ specialOnly: true, sort: 'newest' });
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [wizardOptions, setWizardOptions] = useState<WizardOptions | undefined>(undefined);
  const [view, setView] = useState<'browse' | 'create'>('browse');

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    applyDirForLanguage(lang);
  }, [i18n, lang]);

  const title = useMemo(() => t('app_name'), [t]);

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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 900, flex: 1 }}>
            {title}
          </Typography>
          <Stack direction="row" gap={1} sx={{ mr: 1 }}>
            <Button
              size="small"
              variant={view === 'browse' ? 'contained' : 'outlined'}
              onClick={() => setView('browse')}
            >
              דילים
            </Button>
            <Button
              size="small"
              variant={view === 'create' ? 'contained' : 'outlined'}
              onClick={() => setView('create')}
            >
              פרסום
            </Button>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Select
              size="small"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="he">עברית</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
            </Select>
            <IconButton onClick={load} disabled={loading} aria-label="refresh">
              ↻
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack gap={2.5}>
          {view === 'create' ? (
            <Stack gap={2}>
              <AuthPanel onAuthed={() => {}} />
              <CreateListingForm
                onCreated={() => {
                  setView('browse');
                  load();
                }}
              />
            </Stack>
          ) : (
            <WizardFilters value={query} onChange={setQuery} onApply={load} options={wizardOptions} />
          )}

          {view === 'browse' ? (
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {t('results')} {loading ? '…' : `(${listings.length})`}
            </Typography>
          ) : null}

          {view === 'browse' ? (
            <Stack gap={1.5}>
              {!loading && listings.length === 0 ? (
                <Typography color="text.secondary">{t('no_results')}</Typography>
              ) : (
                listings.map((l) => <ListingCard key={l.id} listing={l} />)
              )}
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}


