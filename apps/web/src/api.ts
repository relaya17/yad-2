import { createApiClient } from '@tishal-et-dudu/api';

type ImportMetaEnv = {
  readonly VITE_API_BASE_URL?: string;
};

type ImportMetaTyped = {
  readonly env: ImportMetaEnv;
};

declare const importMeta: ImportMetaTyped | undefined;

const envBaseUrl =
  (typeof importMeta !== 'undefined' ? importMeta.env.VITE_API_BASE_URL : undefined) ??
  (typeof import.meta !== 'undefined' && 'env' in import.meta
    ? (import.meta as ImportMeta & { readonly env?: ImportMetaEnv }).env?.VITE_API_BASE_URL
    : undefined);

export const API_BASE_URL = envBaseUrl ?? 'http://localhost:4000';

export const api = createApiClient({
  baseUrl: API_BASE_URL,
  getToken: () => localStorage.getItem('token') ?? undefined,
});


