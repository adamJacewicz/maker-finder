import { useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const session = useSession();
  const isAuthenticated = useMemo(() => session.status === 'authenticated', [session.status]);
  const isLoading = useMemo(() => session.status === 'loading', [session.status]);
  return {
    isAuthenticated,
    isLoading,
    user: session.data?.user,
  };
};

export default useAuth;
