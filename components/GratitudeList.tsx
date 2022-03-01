import { Loader } from '@mantine/core'
import { useState, useEffect } from 'react'
import store from '../store'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'

export type Gratitude = {
  id: string,
  fore: string,
  because: string,
  created_at: string,
  edited_at: string | null,
  visibility: {
    id: number
  },
  user_id: string
}

export default function GratitudeList() {
  const session = store(state => state.session)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gratitudes, setGratitudes] = useState<Gratitude[] | null>(null)

  useEffect(() => {
    getGratitudes()
  }, [session])

  async function getGratitudes() {
    setIsLoading(true)
    const user = supabase.auth.user()!

    const { data, error } = await supabase
      .from('gratitudes')
      .select(`id, fore, because, created_at, updated_at, visibility(id), user_id`)
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
          <GratitudeMessage gratitude={gratitude} key={gratitude.id} />
        ))}
      </div>
    </div>
  )
}