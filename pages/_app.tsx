import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import store from '../store'
import { useRouter } from 'next/router'
import { isNullish } from '../utils/typeChecks'
import { ModalsProvider } from '@mantine/modals'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const set = store(state => state.set)
  const router = useRouter()

  useEffect(() => {
    // if the user has already authenticated in the browser
    const supabaseSession = supabase.auth.session()
    set({
      property: 'session',
      value: supabaseSession ?? null
    })

    // will be triggered when sign in with magic link, or sign out with supabase.auth.signOut
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        property: 'session',
        value: session ?? null
      })
      if (isNullish(session)) {
        router.push('/')
      } else {
        router.push('/only_me')
      }
    })

    // if already authenticated and going to /, redirect to /only_me
    // xxx flashing of the content of "/" (router.push does not block the client-side rendering)
    // ?! Move to own wrapper component to avoid flickering of the content of "/"
    if (!isNullish(supabaseSession) && router.pathname === '/') {
      router.push('/only_me')
    }

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
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
      <Head>
        <title>Gratitude</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
