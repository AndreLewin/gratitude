import { Button, Loader } from '@mantine/core'
import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Gratitude from './Gratitude'

export type Gratitude = {
  id: string,
  for: string,
  because: string,
  created_at: string,
  edited_at: string | null,
  visibility: {
    name: string
  }
}

export default function Account({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gratitudes, setGratitudes] = useState<Gratitude[] | null>(null)

  useEffect(() => {
    getGratitudes()
  }, [session])

  async function getGratitudes() {
    setIsLoading(true)
    const user = supabase.auth.user() as User

    const { data, error } = await supabase
      .from('gratitudes')
      .select(`id, for, because, created_at, updated_at, visibility(id)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    console.log('data | IndexConnected.tsx l30', data)

    setGratitudes(data ?? [])
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading &&
        // TODO: use loading overlay https://mantine.dev/core/loading-overlay/
        <Loader />
      }

      <div>
        {gratitudes?.map(gratitude => (
          <Gratitude gratitude={gratitude} key={gratitude.id} />
        ))}
      </div>
    </div>
  )
}