import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { isNullish } from '../utils/typeChecks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import NextNProgress from 'nextjs-progressbar'
import Navigation from 'components/Navigation'
import Notifier from 'components/Notifier'

export default function MyApp({ Component, pageProps }: AppProps) {
  const user = supabase.auth.user()

  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    // if the user has already authenticated in the browser
    const supabaseSession = supabase.auth.session()

    // will be triggered when sign in with magic link, or sign out with supabase.auth.signOut
    supabase.auth.onAuthStateChange((_event, session) => {
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

  // avoid displaying anything before eventual redirection
  if (!isInitialized) {
    return <></>
  }

  return (
    <>
      {/* the progress animation is not very good :/ */}
      <NextNProgress showOnShallow={false} startPosition={0.85} height={2} />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider position="bottom-center">
          <ModalsProvider>
            <Notifier>
              <Navigation>
                <Component {...pageProps} />
              </Navigation>
            </Notifier>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
      <Head>
        <title>Gratitude</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
