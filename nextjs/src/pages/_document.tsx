import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>React Meetups</title>
        <meta name="description" content='Find a React meetup nearby' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
