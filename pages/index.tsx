import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import IndexConnected from '../components/IndexConnected'
import { Session } from '@supabase/supabase-js'
import { isNullish } from '../utils/typeChecks'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const HeadElement = (<Head>
    <title>Gratitude</title>
    <meta name="description" content="" />
  </Head>)

  const router = useRouter()
  if (isNullish(session)) {
    return (
      <div>
        <button onClick={() => router.push('/login')}>
          Log In
        </button>
        {HeadElement}
      </div>
    )
  }

  return (
    <div>
      WIP
      {<IndexConnected key={session.user?.id} session={session} />}
      {HeadElement}
    </div>
  )
}