import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { api } from '../api';

export function AuthPanel({
  onAuthed,
}: {
  onAuthed: () => void;
}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      if (mode === 'register') {
        await api.auth.register({ email, password, fullName, city: 'אילת' });
      }
      const r = await api.auth.login({ email, password });
      localStorage.setItem('token', r.token);
      onAuthed();
    } catch (e) {
      const maybeApiError = e as { data?: { error?: string } };
      const msg = maybeApiError.data?.error ?? 'ERROR';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const authed = Boolean(localStorage.getItem('token'));

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {authed ? 'מחובר/ת' : mode === 'login' ? 'התחברות' : 'הרשמה'}
          </Typography>
          <Stack direction="row" gap={1}>
            <Button size="small" variant={mode === 'login' ? 'contained' : 'outlined'} onClick={() => setMode('login')}>
              התחברות
            </Button>
            <Button
              size="small"
              variant={mode === 'register' ? 'contained' : 'outlined'}
              onClick={() => setMode('register')}
            >
              הרשמה
            </Button>
          </Stack>
        </Stack>

        {authed ? (
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token');
                onAuthed();
              }}
            >
              התנתקות
            </Button>
          </Box>
        ) : (
          <Stack gap={1.5}>
            {mode === 'register' ? (
              <TextField label="שם מלא" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            ) : null}
            <TextField label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Button variant="contained" disabled={loading} onClick={submit}>
              {loading ? '…' : mode === 'login' ? 'התחברות' : 'הירשם/י'}
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}


