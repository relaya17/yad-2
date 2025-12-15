import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { initI18n, applyDirForLanguage } from './i18n';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { createAppTheme } from './theme';
import { ErrorBoundary } from './components/ErrorBoundary';

const lang = (localStorage.getItem('lang') as 'he' | 'ar' | 'ru' | null) ?? 'he';
initI18n(lang);
applyDirForLanguage(lang);

const theme = createAppTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);


