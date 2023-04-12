import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Maker finder</title>
        <meta
          name="description"
          content="An application that helps to find people with specific skills for your project."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>Home Page</Layout>
    </>
  );
}
