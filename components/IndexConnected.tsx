import { Button } from '@mantine/core'
import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Gratitude from './Gratitude'

export type Gratitude = {
  for: string,
  because: string
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
      .select(`for, because`)
      .eq('user_id', user.id)

    if (error) console.error(error)
    setGratitudes(data ?? [])
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading &&
        // TODO: use loading overlay https://mantine.dev/core/loading-overlay/
        <div>
          is loading
        </div>
      }

      <div>
        {gratitudes?.map(gratitude => (
          <Gratitude gratitude={gratitude} />
        ))}
      </div>

      <Button onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
    </div>
  )
}