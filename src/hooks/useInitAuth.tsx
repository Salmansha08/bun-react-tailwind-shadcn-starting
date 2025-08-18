import { useEffect } from 'react';
import { useAuthStore } from '@/stores';

export const useInitAuth = () => {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isLoading };
};