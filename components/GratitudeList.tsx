import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import store, { Gratitude } from 'store'

export default function GratitudeList({ mode }: { mode: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const gratitudes = store(state => state.gratitudes)
  const getGratitudes = store(state => state.getGratitudes)
  const removeLocalGratitude = store(state => state.removeLocalGratitude)
  const editLocalGratitude = store(state => state.editLocalGratitude)

  useEffect(() => {
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    setIsLoading(true)
    const user = supabase.auth.user()!
    await getGratitudes(user.id, mode)
    setIsLoading(false)
  }

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />

      <div>
        {gratitudes?.map((gratitude, index) => (
          <div key={`gm-${gratitude.id}`} style={{ marginTop: `10px` }}>
            <GratitudeMessage
              gratitude={gratitude}
              removeGratitude={() => removeLocalGratitude(index)}
              editGratitude={(newGratitudeData: Partial<Gratitude>) => editLocalGratitude(index, newGratitudeData)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}