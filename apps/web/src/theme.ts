import { createTheme } from '@mui/material';
import { tokens } from '@tishal-et-dudu/ui';

export function createAppTheme() {
  return createTheme({
    palette: {
      mode: 'light',
      primary: { main: tokens.colors.primary },
      secondary: { main: '#0EA5E9' },
      background: {
        default: tokens.colors.background,
        paper: tokens.colors.surface,
      },
      text: {
        primary: tokens.colors.text,
        secondary: tokens.colors.mutedText,
      },
      error: { main: tokens.colors.badge },
    },
    shape: { borderRadius: tokens.radius.card },
    typography: {
      fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, Segoe UI, Arial",
      h3: { fontWeight: 950, letterSpacing: -0.6, fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif" },
      h5: { fontWeight: 900, letterSpacing: -0.2, fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif" },
      h6: { fontWeight: 900, letterSpacing: -0.2, fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif" },
      button: { textTransform: 'none', fontWeight: 900 },
    },
    shadows: [
      'none',
      '0 1px 2px rgba(2, 6, 23, 0.06)',
      '0 2px 8px rgba(2, 6, 23, 0.08)',
      '0 8px 20px rgba(2, 6, 23, 0.10)',
      ...Array.from({ length: 21 }, () => '0 10px 30px rgba(2, 6, 23, 0.10)'),
    ] as typeof createTheme extends (...args: never[]) => infer TTheme
      ? TTheme['shadows']
      : string[],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':focus-visible': {
            outline: '3px solid rgba(37, 99, 235, 0.55)',
            outlineOffset: 2,
          },
          '.skip-link': {
            position: 'absolute',
            left: 12,
            top: 12,
            zIndex: 9999,
            background: '#0F172A',
            color: '#fff',
            padding: '10px 12px',
            borderRadius: 9999,
            transform: 'translateY(-160%)',
            transition: 'transform 120ms ease',
            textDecoration: 'none',
            fontWeight: 900,
          },
          '.skip-link:focus': {
            transform: 'translateY(0)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 9999,
            paddingInline: 16,
          },
          contained: {
            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.22)',
          },
        },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            borderColor: '#E2E8F0',
            transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 9999, fontWeight: 900 },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: '#F5F5F5',
            borderBottom: '1px solid #E0E0E0',
          },
        },
      },
    },
  });
}


