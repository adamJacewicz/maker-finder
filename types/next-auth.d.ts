import { CurrentUser } from '@/types/model';

declare module 'next-auth' {
  interface Session {
    user: CurrentUser | null;
  }
}
