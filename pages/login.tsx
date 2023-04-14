import { FC, MouseEventHandler, useState } from 'react';
import { signIn } from 'next-auth/react';
import Github from '@/public/github.svg';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { cookies } from 'next/headers';

const Login: FC = () => {
  const [signing, setSigning] = useState(false);
  const router = useRouter();

  const handleLogin: MouseEventHandler = async (e) => {
    e.preventDefault();
    setSigning(true);
    const callbackUrl = [...([router?.query?.callbackUrl] ?? '/')].flat().join('');
    await signIn('github', { callbackUrl });
  };

  return (
    <section className="h-screen flex items-center flex-col container mx-auto">
      <Link href="/" className="mt-[20%] mb-10 text-base-50 text-3xl font-bold">
        MakersMatch
      </Link>
      <div className="p-6 lg:p-8 bg-base-700 rounded-md flex flex-col gap-10 items-center">
        <h3 className="px-3 text-center text-xl font-semibold">Sign in to your account</h3>
        <button
          className="px-4 py-2 flex justify-center items-center border rounded hover:bg-base-100 bg-base-50 text-black text-sm font-medium"
          onClick={handleLogin}
        >
          <Github className="mr-2 w-6" />
          {signing ? 'Signing in...' : 'Sign in with your GitHub'}
        </button>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
