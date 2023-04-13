import { CurrentUser } from '@/types/model';

declare module 'next' {
  interface NextApiRequest {
    currentUser?: CurrentUser;
  }
}
