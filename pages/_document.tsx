import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>Maker finder</title>
      <meta
        name="description"
        content="An application that helps to find people with specific skills for your project."
      />
      <link rel="icon" href="/favicon.ico" />
      <Head />
      <body className="h-screen overflow-hidden bg-theme-secondary text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
