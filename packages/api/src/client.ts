import type { ListingsQuery, Listing, AuthUser } from '@tishal-et-dudu/shared';

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | undefined;
};

export function createApiClient(opts: ApiClientOptions) {
  async function request<T>(path: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);
    headers.set('content-type', headers.get('content-type') ?? 'application/json');
    const token = opts.getToken?.();
    if (token) headers.set('authorization', `Bearer ${token}`);

    const res = await fetch(`${opts.baseUrl}${path}`, { ...init, headers });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw Object.assign(new Error('API_ERROR'), { status: res.status, data });
    return data as T;
  }

  function toQueryString(query: ListingsQuery) {
    const sp = new URLSearchParams();
    if (query.category) sp.set('category', query.category);
    if (query.q) sp.set('q', query.q);
    if (query.minPrice != null) sp.set('minPrice', String(query.minPrice));
    if (query.maxPrice != null) sp.set('maxPrice', String(query.maxPrice));
    if (query.specialOnly != null) sp.set('specialOnly', String(query.specialOnly));
    if (query.sort) sp.set('sort', query.sort);
    const s = sp.toString();
    return s ? `?${s}` : '';
  }

  return {
    wizard: {
      getOptions: () =>
        request<{
          city: string;
          categories: string[];
          sortOptions: Array<'newest' | 'priceAsc' | 'priceDesc'>;
          specialDeals: boolean;
          pricePresets: Array<{ label: string; maxPrice: number }>;
        }>('/api/wizard/options'),
    },
    auth: {
      register: (body: { email: string; password: string; fullName: string; city?: string }) =>
        request<{ id: string; email: string; fullName: string; city: string }>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(body),
        }),
      login: (body: { email: string; password: string }) =>
        request<{ token: string; user: AuthUser }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(body),
        }),
    },
    upload: {
      images: async (images: File[]) => {
        const fd = new FormData();
        for (const img of images) fd.append('images', img);

        const headers = new Headers();
        const token = opts.getToken?.();
        if (token) headers.set('authorization', `Bearer ${token}`);

        const res = await fetch(`${opts.baseUrl}/api/upload/images`, { method: 'POST', body: fd, headers });
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (!res.ok) throw Object.assign(new Error('API_ERROR'), { status: res.status, data });
        return data as { files: Array<{ filename: string; url: string }> };
      },
    },
    listings: {
      get: (query: ListingsQuery = {}) => request<Listing[]>(`/api/listings${toQueryString(query)}`),
      create: async (input: {
        title: string;
        description: string;
        category: string;
        price: number;
        specialDeal?: boolean;
        images?: File[];
      }) => {
        const fd = new FormData();
        fd.append('title', input.title);
        fd.append('description', input.description);
        fd.append('category', input.category);
        fd.append('price', String(input.price));
        fd.append('specialDeal', String(Boolean(input.specialDeal)));
        for (const img of input.images ?? []) fd.append('images', img);

        const headers = new Headers();
        const token = opts.getToken?.();
        if (token) headers.set('authorization', `Bearer ${token}`);

        const res = await fetch(`${opts.baseUrl}/api/listings`, { method: 'POST', body: fd, headers });
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (!res.ok) throw Object.assign(new Error('API_ERROR'), { status: res.status, data });
        return data as Listing;
      },
    },
  };
}


