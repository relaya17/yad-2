import { createApiClient } from '@tishal-et-dudu/api';

// NOTE: For real devices, change to your LAN IP (e.g. http://192.168.1.10:4000)
export const API_BASE_URL = 'http://localhost:4000';

export const api = createApiClient({
  baseUrl: API_BASE_URL,
  getToken: () => undefined,
});


