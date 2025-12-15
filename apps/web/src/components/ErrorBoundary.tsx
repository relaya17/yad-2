import React from 'react';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';

type State = { error?: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('[UI] Uncaught render error', error);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Stack sx={{ maxWidth: 720, width: '100%' }} gap={2}>
          <Typography variant="h5" sx={{ fontWeight: 950 }}>
            משהו נשבר בזמן טעינת האתר
          </Typography>
          <Alert severity="error">
            {this.state.error.message || 'Unknown error'}
          </Alert>
          <Typography color="text.secondary" variant="body2">
            פתחי Console בדפדפן (F12 → Console) ושלחי לי את השגיאה הראשונה כדי שאפתור מיד.
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            רענון
          </Button>
        </Stack>
      </Box>
    );
  }
}


