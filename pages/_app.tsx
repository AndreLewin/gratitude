import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default MyApp
