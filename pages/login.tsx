import { FormEventHandler, MouseEventHandler, useRef } from 'react';
import { signIn } from 'next-auth/react';
import GithubIcon from '@/public/github.svg';
import { GetServerSideProps } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import Input from '@/components/Input';

const Login = () => {
  const router = useRouter();
  const loginForm = useRef<HTMLFormElement>(null);
  const handleLogin: MouseEventHandler = async (e) => {
    e.preventDefault();
    const callbackUrl = [...([router?.query?.callbackUrl] ?? '/')].flat().join('');
    await signIn('github', { callbackUrl });
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const callbackUrl = [...([router?.query?.callbackUrl] ?? '/')].flat().join('');
    if (loginForm.current) {
      const form = new FormData(loginForm.current);
      await signIn('credentials', {
        callbackUrl: callbackUrl,
        redirect: true,
        email: form.get('email'),
        password: form.get('password'),
      });
    }
  };

  return (
    <section className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 gap-8 mt-36">
      <header>
        <h2 className="text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
      </header>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-theme-primary py-8 px-4 shadow rounded-lg sm:px-10">
          <form
            ref={loginForm}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              defaultValue="example@makerfinder.com"
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
            />

            <Input
              defaultValue="makerfinder20"
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-theme-accent-light hover:text-theme-accent">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border-0 rounded-md text-sm font-medium text-white bg-theme-accent hover:bg-theme-accent-dark focus:outline-none focus:ring-1 focus:ring-white"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-theme-primary text-white">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleLogin}
                className="w-1/3 flex justify-center py-2 px-4 rounded-md hover:bg-gray-200 bg-white text-sm font-medium text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-light"
              >
                <GithubIcon fill="currentColor" className="w-5 h-5 mr-2" />
                <span className="">GitHub</span>
              </button>
            </div>
          </div>
        </div>
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
