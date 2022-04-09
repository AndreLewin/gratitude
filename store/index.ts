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
  user_id: string,
  profile: Profile,
  search: string,
}

export type Friendship = {
  id: number,
  user_id_1: string,
  profile_1: Profile,
  user_id_2: string,
  profile_2: Profile,
  is_accepted: boolean
}

export type Blocking = {
  id: number,
  user_id_1: string,
  profile_1: Profile,
  user_id_2: string,
  profile_2: Profile,
}

export type Roles = {
  is_moderator?: boolean,
  is_admin?: boolean
}

// note: it's a factory function so the ref of arrays and objects are not kept
const getDefaultStoreValues: () => any = () => ({
  mode: "public",
  gratitudes: [],
  gratitudesCount: null,
  profile: null,
  roles: null,
  search: "",
  isLoading: true,
  // here "null" means "not fetched"
  friendships: null,
  blockings: null,
  idsOfReportedMessages: null
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
  gratitudesCount: number | null
  getGratitudes: (userId: string | null, firstIndex?: number) => void
  removeLocalGratitude: (gratitudeIdToRemove: number) => void
  addLocalGratitude: (newGratitude: Gratitude) => void
  editLocalGratitude: (indexToEdit: number, newGratitudeData: Partial<Gratitude>) => void
  // profile of the connected user
  profile: Profile | null
  getProfile: (userId: string) => void
  roles: Roles | null
  getRoles: (userId: string) => void
  // https://supabase.com/docs/guides/database/full-text-search
  search: string
  isLoading: boolean,
  friendships: Friendship[] | null,
  getFriendships: (userId: string) => void,
  deleteFriendship: (id: number) => void,
  acceptFriendship: (id: number) => void,
  createFriendship: (userId: string, user2Id: string) => void,
  blockings: Blocking[] | null,
  getBlockings: (userId: string) => void,
  deleteBlocking: (id: number) => void,
  createBlocking: (userId: string, user2Id: string) => void,
  idsOfReportedMessages: number[] | null,
  getIdsOfReportedMessages: () => void,
  deleteReport: (id: number) => void,
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
  gratitudesCount: getDefaultStoreValues().gratitudesCount,
  getGratitudes: async (userId, firstIndex = 0) => {
    set({ isLoading: true })
    const { mode, search, blockings } = get()

    // if the list of hidden users has not be fetched, it has to be
    // that way the list of gratitude messages can be properly filtered
    // TODO: it would be better to use a database function for fetching the messages
    // so the messages of the hidden users could be directly filtered out
    // without the need of a prior call
    if (userId !== null && blockings === null) {
      const { getBlockings } = get()
      await getBlockings(userId)
    }

    const { blockings: updatedBlocking } = get()
    const blockedUserIds = (updatedBlocking ?? []).map(b => b.user_id_2)

    if (mode === "reported") {
      const { idsOfReportedMessages, getIdsOfReportedMessages } = get()
      if (idsOfReportedMessages === null) await getIdsOfReportedMessages()
    }

    const NUMBER_OF_ITEMS_TO_FETCH = 50

    // const promise = supabase.rpc('get_gratitudes_with_profile')
    // search: it should be nice to ignore accents too, but since we use several columns, we are forced to use a ref
    const promise = supabase
      .from("gratitudes")
      .select(`*, profile:profiles(*)`, {
        count: "exact"
      })
      .or(`fore.ilike.%${search}%,because.ilike.%${search}%`)
      .not("user_id", "in", `(${blockedUserIds})`)
      .range(firstIndex, firstIndex + NUMBER_OF_ITEMS_TO_FETCH - 1)

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
    } else if (mode === "reported") {
      const { idsOfReportedMessages } = get()
      promise.in("id", idsOfReportedMessages ?? [])
    }

    const { data, count, error } = await promise

    if (error) console.error(error)
    // console.log('data | IndexConnected.tsx l30', data)

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

    // throw the result away if the filters have been changed before the result is received
    const { search: presentSearch } = get()
    if (search !== presentSearch) return

    set({
      gratitudes: newSetOfGratitudes,
      gratitudesCount: count,
      isLoading: false
    })
  },
  removeLocalGratitude: (gratitudeIdToRemove) => {
    const { gratitudes } = get()
    const indexToRemove = gratitudes.findIndex(g => g.id === gratitudeIdToRemove)
    if (indexToRemove === -1) return
    const newGratitudes = [...gratitudes.slice(0, indexToRemove), ...gratitudes.slice(indexToRemove + 1)]
    set({ gratitudes: newGratitudes })
  },
  addLocalGratitude: (newGratitude) => {
    const { gratitudes } = get()
    let newGratitudes = JSON.parse(JSON.stringify(gratitudes))
    newGratitudes = [newGratitude, ...newGratitudes]
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
  profile: getDefaultStoreValues().profile,
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from(`profiles`)
      .select(`*`)
      .eq(`id`, userId)
    if (error) return console.error(error)
    set({ profile: (data ?? [])?.[0] ?? null })
  },
  roles: getDefaultStoreValues().roles,
  getRoles: async (userId) => {
    const { data, error } = await supabase
      .from(`roles`)
      .select(`*`)
      .eq(`id`, userId)
    if (error) return console.error(error)
    set({ roles: (data ?? [])?.[0] ?? {} })
  },
  search: getDefaultStoreValues().search,
  isLoading: getDefaultStoreValues().isLoading,
  friendships: getDefaultStoreValues().friendships,
  getFriendships: async (userId) => {
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
    if (error) return console.error(error)
    set({ friendships: data })
  },
  deleteFriendship: async (id) => {
    const { friendships: oldFriendships } = get()
    const { data, error } = await supabase
      .from(`friendships`)
      .delete()
      .match({ id })
    if (error) return console.error(error)
    const friendships = (oldFriendships ?? []).filter(f => f.id !== id)
    set({ friendships })
  },
  acceptFriendship: async (id) => {
    const { friendships: oldFriendships } = get()
    const { data, error } = await supabase
      .from(`friendships`)
      .update({ is_accepted: true })
      .match({ id, is_accepted: false })
    if (error) return console.error(error)
    const indexOfFriendshipChanged = (oldFriendships ?? []).findIndex(f => f.id === id)
    if (indexOfFriendshipChanged < 0) return
    const friendships = JSON.parse(JSON.stringify(oldFriendships))
    friendships[indexOfFriendshipChanged]["is_accepted"] = true
    set({ friendships })
  },
  createFriendship: async (userId, user2Id) => {
    const { friendships } = get()
    const { data, error } = await supabase
      .from(`friendships`)
      .insert([
        { user_id_1: userId, user_id_2: user2Id },
      ])
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
    if (error) return console.error(error)
    set({ friendships: [...(friendships ?? []), ...(data ?? [])] })
  },
  blockings: getDefaultStoreValues().blockings,
  getBlockings: async (userId) => {
    const { data, error } = await supabase
      .from(`blockings`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
    if (error) return console.error(error)
    set({ blockings: data })
  },
  deleteBlocking: async (id) => {
    const { blockings: oldBlockings } = get()
    const { data, error } = await supabase
      .from(`blockings`)
      .delete()
      .match({ id })
    if (error) return console.error(error)
    const blockings = (oldBlockings ?? []).filter(f => f.id !== id)
    set({ blockings })
  },
  createBlocking: async (userId, user2Id) => {
    const { blockings } = get()
    const { data, error } = await supabase
      .from(`blockings`)
      .insert([
        { user_id_1: userId, user_id_2: user2Id },
      ])
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
    if (error) return console.error(error)
    set({ blockings: [...(blockings ?? []), ...(data ?? [])] })
  },
  idsOfReportedMessages: getDefaultStoreValues().idsOfReportedMessages,
  getIdsOfReportedMessages: async () => {
    const { data, error } = await supabase
      .from(`reports`)
      .select(`id`)
    if (error) return console.error(error)
    set({ idsOfReportedMessages: (data ?? []).map(r => r.id) })
  },
  deleteReport: async (id) => {
    const { idsOfReportedMessages: oldIdsOfReportedMessages } = get()
    const { data, error } = await supabase
      .from(`reports`)
      .delete()
      .match({ id })
    if (error) return console.error(error)
    const idsOfReportedMessages = (oldIdsOfReportedMessages ?? []).filter(i => i !== id)
    set({ idsOfReportedMessages })
    const { removeLocalGratitude } = get()
    removeLocalGratitude(id)
  },
}))

export default store;

