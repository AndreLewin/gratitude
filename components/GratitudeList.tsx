import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import store from '../store'
import { PUBLIC_VISIBILITY } from '../data'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import { Profile } from './Settings'

export type Gratitude = {
  id: string,
  created_at: string,
  fore: string,
  because: string,
  edited_at: string | null,
  visibility_id: number,
  profile: Profile
}

export default function GratitudeList({ mode }: { mode: string }) {
  const session = store(state => state.session)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([])

  useEffect(() => {
    getGratitudes()
  }, [session])

  async function getGratitudes() {
    setIsLoading(true)
    const user = supabase.auth.user()!

    // const promise = supabase.rpc('get_gratitudes_with_profile')
    const promise = supabase
      .from('gratitudes')
      .select(`
        *,
        profile:profiles(*)
      `)

    promise.order('created_at', { ascending: false })

    if (mode === "only_me") {
      promise.eq("user_id", user.id)
    } else if (mode === "friends") {

    } else if (mode === "public") {

      promise.eq("visibility_id", PUBLIC_VISIBILITY)
    } else if (mode.match(/^user: /)) {
      const userId = mode.substring(6, mode.length)
      promise.eq("user_id", userId)
    }
    const { data, error } = await promise

    // TODO: limit
    // TODO: infinite scrolling

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
          <div key={`gm-${gratitude.id}`} style={{ marginTop: `10px` }}>
            <GratitudeMessage
              gratitude={gratitude}
              removeGratitude={() => removeGratitude(index)}
              editGratitude={(newGratitudeData: Partial<Gratitude>) => editGratitude(index, newGratitudeData)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}