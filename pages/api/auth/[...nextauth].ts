import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authorize } from '@/services/user.service';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        return credentials ? await authorize(credentials) : null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = Number(token?.id)
        session.user.image = String(token?.image)
      }
      return session;
    },
    async jwt({ token, user, session }) {
      if (user) {
        const { picture, ...jwt } = token;
        return { ...jwt, image: user?.image, id: user?.id };
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
