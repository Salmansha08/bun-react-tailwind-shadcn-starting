import { useInitAuth } from '@/hooks';

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useInitAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};