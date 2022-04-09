import { supabase } from "utils/supabaseClient"

export const getFriendsUserIds = async (userId: string): Promise<string[]> => {
  let friendsUserIds: string[] = []

  const { data } = await supabase
    .from(`friendships`)
    .select(`user_id_1, user_id_2`)
    .or(`user_id_1.eq.${userId}, user_id_2.eq.${userId}`)
    .match({
      is_accepted: true
    })

  const friendships = data ?? []

  friendships.forEach(f => {
    friendsUserIds.push(f.user_id_1)
    friendsUserIds.push(f.user_id_2)
  })

  // remove duplicates (should not happen)
  friendsUserIds = Array.from(new Set(friendsUserIds))
  // don't consider the user itself as a friend
  friendsUserIds = friendsUserIds.filter(id => id !== userId)
  return friendsUserIds
}

