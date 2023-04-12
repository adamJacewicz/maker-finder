import { useMemo } from 'react';
import { useSession } from 'next-auth/react';

const useAuth = () => {
  const session = useSession();
  const isAuthenticated = useMemo(() => session.status === 'authenticated', [session.status]);
  const isLoading = useMemo(() => session.status === 'loading', [session.status]);
  return {
    isAuthenticated,
    isLoading,
    data: session.data,
  };
};

export default useAuth;
