import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import IndexConnected from '../components/IndexConnected'
import { Session } from '@supabase/supabase-js'
import { isNullish } from '../utils/typeChecks'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import store from '../store'

// TODO: if connected, redirect to /home
// 

export default function Index() {
  const session = store(state => state.session)

  const HeadElement = (<Head>
    <title>Gratitude</title>
    <meta name="description" content="" />
  </Head>)

  const router = useRouter()
  if (isNullish(session)) {
    return (
      <div>
        <Link href="/login" passHref>
          <Button component="a">
            Log In
          </Button>
        </Link>
        {HeadElement}
      </div>
    )
  }

  return (
    <div>
      <Link href="/home" passHref>
        <Button component="a">
          Go to home (WIP)
        </Button>
      </Link>

      WIP
      {<IndexConnected key={session.user?.id} session={session} />}
      {HeadElement}
    </div>
  )
}