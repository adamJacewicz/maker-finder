import { useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const session = useSession();
  const isAuthenticated = useMemo(() => session.status === 'authenticated', [session.status]);
  const isLoading = useMemo(() => session.status === 'loading', [session.status]);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading]);
  return {
    isAuthenticated,
    isLoading,
    data: session.data,
  };
};

export default useAuth;
