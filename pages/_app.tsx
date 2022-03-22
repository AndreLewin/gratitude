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
import Footer from 'components/Footer'
import Header from 'components/Header'

const PAGES_WITH_FOOTER: string[] = [
  "/",
  "/terms_and_privacy",
  "/faq",
  "/updates",
  "/login"
]

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const router = useRouter()
  const user = supabase.auth.user()

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

  // TODO: move connected RedirectIfNotAuthenticated here?

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
              <div className="header-content-footer">
                {user === null && <Header />}
                <div className="content">
                  {user === null ?
                    <Component {...pageProps} />
                    :
                    <Navigation>
                      <Component {...pageProps} />
                    </Navigation>
                  }
                </div>
                {PAGES_WITH_FOOTER.includes(router.pathname) && <Footer />}
              </div>
            </Notifier>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
      <Head>
        <title>Gratitude</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>
        {`
          .header-content-footer {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .content {
            flex-grow: 1;
          }
        `}
      </style>
    </>
  )
}
