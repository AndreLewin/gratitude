import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import { Profile } from './Settings'
import { getFriendsUserIds } from 'helpers/supabase'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([])

  useEffect(() => {
    getGratitudes()
  }, [])

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

    // the pages filter only on the user_id (the visibility_id is handled by RLS)
    if (mode === "only_me") {
      promise.eq("user_id", user.id)
    } else if (mode === "friends") {
      // note: using a custom psql function for fetching gratitude messages of friends would make formatting the response to match the other calls too complicated
      // instead, we fetch the list of friends in a different call
      const friendsUserIds = await getFriendsUserIds(user.id)
      promise.in("user_id", friendsUserIds)
    } else if (mode === "public") {
      // no need to filter
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