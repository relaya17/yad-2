import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@tishal-et-dudu/shared';

export function initI18n(lang: 'he' | 'ar' | 'ru' = 'he') {
  if (i18n.isInitialized) return i18n;

  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'he',
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export function applyDirForLanguage(lang: 'he' | 'ar' | 'ru') {
  const dir = lang === 'ru' ? 'ltr' : 'rtl';
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
}


