import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const set = store(state => state.set)

  // authentication
  useEffect(() => {
    // if the user has already authentication info in the browser
    const supabaseSession = supabase.auth.session()
    set({
      property: 'session',
      value: supabaseSession ?? null
    })

    // will be triggered when sign out with supabase.auth.signOut
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        property: 'session',
        value: session ?? null
      })
    })
    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return <></>
  }

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default MyApp
