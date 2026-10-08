import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'] ?? 'http://localhost:5000/api',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});

type AccessTokenProvider = () => Promise<string | null>;

let accessTokenProvider: AccessTokenProvider | undefined;

export function setAccessTokenProvider(provider: AccessTokenProvider | undefined) {
  accessTokenProvider = provider;
}

httpClient.interceptors.request.use(async (config) => {
  const accessToken = await accessTokenProvider?.();
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
);
