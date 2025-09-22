import { API_ROUTES } from '../apiClient';

export class AdminUserService {
  constructor() {}
  async login(email: string, password: string) {
    const res = await fetch(API_ROUTES.ADMIN_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app-user-secret': import.meta.env.VITE_ADMIN_SECET,
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json()) as { data: any; errors: any };

    if (!res.ok) throw data;

    return data;
  }
}
