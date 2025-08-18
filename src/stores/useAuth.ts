import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api2 } from '@/lib/api';
import Cookie from 'js-cookie';
import type { AuthState, AuthUser, LoginFormValues, LoginResponse } from '@/interfaces';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkAuth: async () => {
        const token = Cookie.get('accessToken');

        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          set({ isLoading: true });
          const response = await api2.get<AuthUser>('/auth/me');
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          Cookie.remove('accessToken');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          throw error;
        }
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

          Cookie.set('accessToken', token, { expires: expiresIn, path: '/' });

          const response = await api2.get<AuthUser>('/auth/me');
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false
          });

          return res.data;
        } catch (error) {
          Cookie.remove('accessToken');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          throw error.response?.data?.message;
        }
      },

      logout: () => {
        Cookie.remove('accessToken');
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);