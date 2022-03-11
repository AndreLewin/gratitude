import { LoadingOverlay, Title, Text, Button } from '@mantine/core'
import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from 'utils/supabaseClient'
import store from '../store'
import { Profile } from './Settings'

type Friendship = {
  id: number,
  user_id_1: string,
  profile_1: Profile,
  user_id_2: string,
  profile_2: Profile
}

export default function Friendships() {
  const session = store(state => state.session)
  const user = supabase.auth.user()!

  const [isIncomingFriendRequestsLoading, setIsIncomingFriendRequestsLoading] = useState<boolean>(true)
  const [isSentFriendRequestsLoading, setIsSentFriendRequestsLoading] = useState<boolean>(true)
  const [isFriendsLoading, setIsFriendsLoading] = useState<boolean>(true)
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<Friendship[]>([])
  const [sentFriendRequests, setSentFriendRequests] = useState<Friendship[]>([])
  const [friends, setFriends] = useState<Friendship[]>([])

  useEffect(() => {
    getIncomingFriendRequests()
    getSentFriendRequests()
    getFriends()
  }, [session])

  const getIncomingFriendRequests = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
      .match({
        user_id_2: user.id,
        is_accepted: false
      })
    if (error) return console.error(error)
    setIncomingFriendRequests(data)
    setIsIncomingFriendRequestsLoading(false)
  }, [])

  const refuseIncomingFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    const { data, error } = await supabase
      .from(`friendships`)
      .delete()
      .match({ id: friendRequestId })
    if (error) return console.error(error)
    setIncomingFriendRequests(incomingFriendRequests.filter(sFR => sFR.id !== friendRequestId))
  }, [incomingFriendRequests])

  const acceptIncomingFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    const { data, error } = await supabase
      .from(`friendships`)
      .update({ is_accepted: true })
      .match({ id: friendRequestId, is_accepted: false })
    if (error) return console.error(error)
    setIncomingFriendRequests(incomingFriendRequests.filter(sFR => sFR.id !== friendRequestId))
  }, [incomingFriendRequests])

  const getSentFriendRequests = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
      .match({
        user_id_1: user.id,
        is_accepted: false
      })
    if (error) return console.error(error)
    console.log("sending | Friendships.tsx l35", data)
    setSentFriendRequests(data)
    setIsSentFriendRequestsLoading(false)
  }, [])

  const cancelSentFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    const { data, error } = await supabase
      .from(`friendships`)
      .delete()
      .match({ id: friendRequestId })
    if (error) return console.error(error)
    setSentFriendRequests(sentFriendRequests.filter(sFR => sFR.id !== friendRequestId))
  }, [sentFriendRequests])

  const getFriends = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
      .or(`user_id_1.eq.${user.id}, user_id_2.eq.${user.id}`)
      .match({
        is_accepted: true
      })
    if (error) return console.error(error)
    setFriends(data)
    setIsFriendsLoading(false)
  }, [])

  const friendsFormatted = useMemo<{ friendId: string, friendProfile: Profile, friendshipId: number }[]>(() => {
    return friends.map(f => ({
      friendId: f.user_id_1 === user.id ? f.user_id_2 : f.user_id_1,
      friendProfile: f.user_id_1 === user.id ? f.profile_2 : f.profile_1,
      friendshipId: f.id
    }))
  }, [friends])

  const removeFriend = useCallback<any>(async (friendshipId: number) => {
    const { data, error } = await supabase
      .from(`friendships`)
      .delete()
      .match({ id: friendshipId })
    if (error) return console.error(error)
    getFriends()
  }, [sentFriendRequests])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isIncomingFriendRequestsLoading || isSentFriendRequestsLoading || isFriendsLoading} />

      {incomingFriendRequests.length > 0 &&
        <div>
          <Title order={3}>Incoming friend requests</Title>
          {
            incomingFriendRequests.map(iFR => (
              <div key={`iFR-${iFR.user_id_1}`} className="friend-request-card">
                <Link href={iFR.profile_1.username ? `/u/${iFR.profile_1.username}` : `/uid/${iFR.profile_1.id}`}>
                  <div style={{ fontWeight: 600, cursor: `pointer`, color: `rgb(29, 155, 240)` }}>
                    {iFR.profile_1.username ?? "(Anonymous)"}
                  </div>
                </Link>
                <Button
                  color="red"
                  onClick={() => refuseIncomingFriendRequest(iFR.id)}
                  style={{ marginLeft: `10px` }}
                >
                  Refuse
                </Button>
                <Button
                  color="teal"
                  onClick={() => acceptIncomingFriendRequest(iFR.id)}
                  style={{ marginLeft: `10px` }}
                >
                  Accept
                </Button>
              </div>
            ))
          }
        </div>
      }

      {sentFriendRequests.length > 0 &&
        <div>
          <Title order={3}>Sent friend requests</Title>
          {
            sentFriendRequests.map(sFR => (
              <div key={`sFR-${sFR.user_id_2}`} className="friend-request-card">
                <Link href={sFR.profile_2.username ? `/u/${sFR.profile_2.username}` : `/uid/${sFR.profile_2.id}`}>
                  <div style={{ fontWeight: 600, cursor: `pointer`, color: `rgb(29, 155, 240)` }}>
                    {sFR.profile_2.username ?? "(Anonymous)"}
                  </div>
                </Link>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => cancelSentFriendRequest(sFR.id)}
                  style={{ marginLeft: `10px` }}
                >
                  Cancel
                </Button>
              </div>
            ))
          }
        </div>
      }

      {friendsFormatted.length > 0 &&
        <div>
          <Title order={3}>Friends</Title>
          {
            friendsFormatted.map(fr => (
              <div key={`fr-${fr.friendId}`} className="friend-request-card">
                <Link href={fr.friendProfile.username ? `/u/${fr.friendProfile.username}` : `/uid/${fr.friendProfile.id}`}>
                  <div style={{ fontWeight: 600, cursor: `pointer`, color: `rgb(29, 155, 240)` }}>
                    {fr.friendProfile.username ?? "(Anonymous)"}
                  </div>
                </Link>
                <Button
                  color="red"
                  onClick={() => removeFriend(fr.friendshipId)}
                  style={{ marginLeft: `10px` }}
                >
                  Remove
                </Button>
              </div>
            ))
          }
        </div>
      }

      <style jsx>
        {`
          .friend-request-card {
            display: flex;
            align-items: center;
            background-color: #ececec;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
          }
        `}
      </style>
    </div>
  )
}