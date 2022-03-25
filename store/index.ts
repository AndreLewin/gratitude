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

// note: it's a factory function so the ref of arrays and objects are not kept
const getDefaultStoreValues: () => any = () => ({
  mode: "public",
  gratitudes: [],
  profile: null
})

type Store = {
  // set: <Property extends keyof Store>({
  //   property,
  //   value
  // }: {
  //   property: Property,
  //   value: Store[Property]
  // }) => void
  set: SetState<Store>
  reset: () => void
  // display mode of the gratitude messages (public, only_me, user, etc.)
  mode: string
  gratitudes: Gratitude[]
  getGratitudes: (userId: string | null, firstIndex?: number) => void
  removeLocalGratitude: (gratitudeIdToRemove: number) => void
  editLocalGratitude: (indexToEdit: number, newGratitudeData: Partial<Gratitude>) => void
  // profile of the connected user
  profile: Profile | null
}

const store = create<Store>((set: SetState<Store>, get: GetState<Store>) => ({
  // // that's how you would do an universal setter on a store that does not provide "set"
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
  reset: () => set(getDefaultStoreValues()),
  mode: getDefaultStoreValues().mode,
  gratitudes: getDefaultStoreValues().gratitudes,
  getGratitudes: async (userId, firstIndex = 0) => {
    const { mode } = get()

    // const promise = supabase.rpc('get_gratitudes_with_profile')
    const promise = supabase
      .from('gratitudes')
      .select(`
        *,
        profile:profiles(*)
      `)
      .range(firstIndex, firstIndex + 7 - 1)

    promise.order('created_at', { ascending: false })

    // the pages filter only on the user_id (the visibility_id is handled by RLS)
    if (mode === "only_me") {
      promise.eq("user_id", userId as string)
    } else if (mode === "friends") {
      // note: using a custom psql function for fetching gratitude messages of friends would make formatting the response to match the other calls too complicated
      // instead, we fetch the list of friends in a different call
      const friendsUserIds = await getFriendsUserIds(userId as string)
      promise.in("user_id", friendsUserIds)
    } else if (mode === "public") {
      // no need to filter
    } else if (mode.match(/^user: /)) {
      const userWatchedId = mode.substring(6, mode.length)
      promise.eq("user_id", userWatchedId)
    }
    const { data, error } = await promise

    if (error) console.error(error)
    console.log('data | IndexConnected.tsx l30', data)

    // don't add gratitudes that were already fetched
    let { gratitudes: oldGratitudes } = get()
    oldGratitudes = JSON.parse(JSON.stringify(oldGratitudes))
    const oldGratitudesId = oldGratitudes.map(g => g.id)
    const newSetOfGratitudes = oldGratitudes

    const fetchedGratitudes = (data ?? []) as Gratitude[]
    fetchedGratitudes.forEach(gratitude => {
      if (!oldGratitudesId.includes(gratitude.id)) {
        newSetOfGratitudes.push(gratitude)
      }
    })

    set({ gratitudes: newSetOfGratitudes })
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
  },
  profile: null
}))

export default store;

