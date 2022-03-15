import create, { GetState, SetState } from 'zustand'

import { Profile } from 'components/Settings'
import { supabase } from 'utils/supabaseClient'
import { getFriendsUserIds } from 'helpers/supabase'

export type Gratitude = {
  id: number,
  created_at: string,
  fore: string,
  because: string,
  edited_at: string | null,
  visibility_id: number,
  profile: Profile
}

type Store = {
  // set: <Property extends keyof Store>({
  //   property,
  //   value
  // }: {
  //   property: Property,
  //   value: Store[Property]
  // }) => void
  set: SetState<Store>
  mode: string
  gratitudes: Gratitude[]
  getGratitudes: (userId: string) => void
  removeLocalGratitude: (gratitudeIdToRemove: number) => void
  editLocalGratitude: (indexToEdit: number, newGratitudeData: Partial<Gratitude>) => void
}

const store = create<Store>((set: SetState<Store>, get: GetState<Store>) => ({
  // set: <Property extends keyof Store>({
  //   property,
  //   value
  // }: {
  //   property: Property,
  //   value: Store[Property]
  // }) => {
  //   // @ts-ignore
  //   set(state => ({ [property]: value }))
  // },
  set: (partial) => set(partial),
  mode: "public",
  gratitudes: [],
  getGratitudes: async (userId) => {
    const { mode } = get()

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
      promise.eq("user_id", userId)
    } else if (mode === "friends") {
      // note: using a custom psql function for fetching gratitude messages of friends would make formatting the response to match the other calls too complicated
      // instead, we fetch the list of friends in a different call
      const friendsUserIds = await getFriendsUserIds(userId)
      promise.in("user_id", friendsUserIds)
    } else if (mode === "public") {
      // no need to filter
    } else if (mode.match(/^user: /)) {
      const userWatchedId = mode.substring(6, mode.length)
      promise.eq("user_id", userWatchedId)
    }
    const { data, error } = await promise

    // TODO: limit
    // TODO: infinite scrolling

    if (error) console.error(error)
    console.log('data | IndexConnected.tsx l30', data)

    set({ gratitudes: data ?? [] })
  },
  removeLocalGratitude: (gratitudeIdToRemove) => {
    const { gratitudes } = get()
    const indexToRemove = gratitudes.findIndex(g => g.id === gratitudeIdToRemove)
    if (indexToRemove === -1) return
    const newGratitudes = [...gratitudes.slice(0, indexToRemove), ...gratitudes.slice(indexToRemove + 1)]
    set({ gratitudes: newGratitudes })
  },
  editLocalGratitude: (gratitudeIdToEdit, newGratitudeData) => {
    const { gratitudes } = get()
    const indexToEdit = gratitudes.findIndex(g => g.id === gratitudeIdToEdit)
    if (indexToEdit === -1) return
    // necessary because get() does not do a deepClone of the gratitude themselves
    // so if we modify a property of a gratitude, React sees the same ref to the gratitude,
    // and visually nothing is updated
    const newGratitudes = JSON.parse(JSON.stringify(gratitudes))
    newGratitudes[indexToEdit] = { ...newGratitudes[indexToEdit], ...newGratitudeData }
    set({ gratitudes: newGratitudes })
  }
}))

export default store;

