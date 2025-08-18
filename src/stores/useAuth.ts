import { create } from 'zustand';
import { api2 } from '@/lib/api';
import Cookie from 'js-cookie';
import type { AuthMe, AuthState, AuthUser, LoginFormValues, LoginResponse } from '@/interfaces';
import type { CookieType } from '@/types';

const cookieName: CookieType = 'accessToken';

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  login: async ({ value }: { value: LoginFormValues }): Promise<LoginResponse> => {
    try {
      const res = await api2.post<LoginResponse>('/auth/login', value);

      const token: string = res.data.data.accessToken;
      const expires: string = res.data.data.expiresIn;

      let expiresIn: number;
      if (expires.endsWith('d')) {
        expiresIn = parseInt(expires) * 24 * 60 * 60;
      } else if (expires.endsWith('h')) {
        expiresIn = parseInt(expires) * 60 * 60;
      } else if (expires.endsWith('m')) {
        expiresIn = parseInt(expires) * 60;
      } else {
        expiresIn = 0;
      }

      Cookie.set(cookieName, token, { expires: expiresIn, path: '/' });

      const response = await api2.get<AuthMe>('/auth/me');
      const user: AuthUser = response.data.data;
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });

      return res.data;
    } catch (error) {
      Cookie.remove(cookieName);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error.response?.data?.message;
    }
  },
  checkAuth: async () => {
    const token = Cookie.get(cookieName);

    if (!token) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      return;
    }

    try {
      set({ isLoading: true });
      const response = await api2.get<AuthMe>('/auth/me');
      const user: AuthUser = response.data.data;
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      Cookie.remove(cookieName);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      throw error;
    }
  },
  logout: () => {
    Cookie.remove(cookieName);
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  },
}));