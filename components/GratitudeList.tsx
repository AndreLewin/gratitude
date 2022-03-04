import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import store from '../store'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'

export type Gratitude = {
  id: string,
  created_at: string,
  fore: string,
  because: string,
  edited_at: string | null,
  visibility_id: number,
  user_id: string,
  profile_username: string | null,
  profile_color: string | null
}

export default function GratitudeList() {
  const session = store(state => state.session)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([])

  useEffect(() => {
    getGratitudes()
  }, [session])

  async function getGratitudes() {
    setIsLoading(true)
    const user = supabase.auth.user()!

    const { data, error } = await supabase
      .rpc('get_gratitudes_with_profile')
      .order('created_at', { ascending: false })
      .eq('user_id', user.id)
    // .limit(20)

    if (error) console.error(error)
    console.log('data | IndexConnected.tsx l30', data)

    setGratitudes(data ?? [])
    setIsLoading(false)
  }

  const removeGratitude = useCallback<any>((indexToRemove: number) => {
    const newGratitudes = [...gratitudes.slice(0, indexToRemove), ...gratitudes.slice(indexToRemove + 1)]
    setGratitudes(newGratitudes)
  }, [gratitudes])

  const editGratitude = useCallback<any>((indexToEdit: number, newGratitudeData: Partial<Gratitude>) => {
    const newGratitudes = [...gratitudes]
    newGratitudes[indexToEdit] = { ...newGratitudes[indexToEdit], ...newGratitudeData }
    setGratitudes(newGratitudes)
  }, [gratitudes])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />

      <div>
        {gratitudes?.map((gratitude, index) => (
          <>
            <div style={{ marginTop: index === 0 ? 0 : "10px" }} />
            <GratitudeMessage
              gratitude={gratitude}
              key={gratitude.id}
              removeGratitude={() => removeGratitude(index)}
              editGratitude={(newGratitudeData: Partial<Gratitude>) => editGratitude(index, newGratitudeData)}
            />
          </>
        ))}
      </div>
    </div>
  )
}