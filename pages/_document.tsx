import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="h-screen overflow-hidden bg-theme-secondary text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
