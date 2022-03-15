import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import store from 'store'

export default function GratitudeList({ mode }: { mode: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const set = store(state => state.set)
  const gratitudes = store(state => state.gratitudes)
  const getGratitudes = store(state => state.getGratitudes)

  useEffect(() => {
    set({ mode })
    set({ gratitudes: [] })
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    setIsLoading(true)
    const user = supabase.auth.user()!
    await getGratitudes(user.id)
    setIsLoading(false)
  }

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <div>
        {gratitudes?.map((gratitude) => (
          <div key={`gm-${gratitude.id}`} style={{ marginTop: `10px` }}>
            <GratitudeMessage gratitude={gratitude} />
          </div>
        ))}
      </div>
    </div>
  )
}