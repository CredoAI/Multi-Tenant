// apiClient.ts
const API_BASE_URL = 'http://localhost:4000/api';

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/user/login`,
  SIGNUP: `${API_BASE_URL}/user/sign-up`,
  CREATE_ORGANIZATION: `${API_BASE_URL}/organization/create`,
  CURRENT_USER: `${API_BASE_URL}/user/current-user`,
} as const;

// 🔒 Union of the keys ("LOGIN" | "SIGNUP" | "CREATE_ORGANIZATION")
export type ApiRouteName = keyof typeof API_ROUTES;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials; // "include" | "same-origin" | "omit"
}

export async function ApiClient<T>(
  route: ApiRouteName, // pass the NAME, not the URL
  { method = 'GET', body, headers = {}, credentials = 'include' }: ApiOptions = {}
): Promise<T> {
  const url = API_ROUTES[route]; // resolve to actual URL

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials,
  });

  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}
