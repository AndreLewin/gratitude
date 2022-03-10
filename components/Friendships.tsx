import { LoadingOverlay, Title, Text, Button } from '@mantine/core'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from 'utils/supabaseClient'
import store from '../store'
import { Profile } from './Settings'

type FriendRequest = {
  id: number,
  user_id_1: string,
  profile_1: Profile,
  user_id_2: string,
  username_2: string,
  profile_2: Profile
}

export default function Friendships() {
  const session = store(state => state.session)
  const user = supabase.auth.user()!

  const [isIncomingFriendRequestsLoading, setIsIncomingFriendRequestsLoading] = useState<boolean>(true)
  const [isSentFriendRequestsLoading, setIsSentFriendRequestsLoading] = useState<boolean>(true)
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<FriendRequest[]>([])
  const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[]>([])

  useEffect(() => {
    getIncomingFriendRequests()
    getSentFriendRequests()
  }, [session])

  const getIncomingFriendRequests = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friend_requests`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
      .eq(`user_id_2`, user.id)
    if (error) return console.error(error)
    console.log("incoming | Friendships.tsx l35", data)
    setIncomingFriendRequests(data)
    setIsIncomingFriendRequestsLoading(false)
  }, [])

  const refuseIncomingFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    const { data, error } = await supabase
      .from(`friend_requests`)
      .delete()
      .match({ id: friendRequestId })
    if (error) return console.error(error)
    setIncomingFriendRequests(incomingFriendRequests.filter(sFR => sFR.id !== friendRequestId))
  }, [incomingFriendRequests])

  const acceptIncomingFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    console.log("TODO: accept friend request")
    // const { data, error} = await supabase.rpc('accept_friend_request', {friendRequestId})
    // if (error) return console.error(error)
    setIncomingFriendRequests(incomingFriendRequests.filter(sFR => sFR.id !== friendRequestId))
    // TODO: add to local list of friends
  }, [incomingFriendRequests])

  const getSentFriendRequests = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friend_requests`)
      .select(`*, profile_1:user_id_1(*), profile_2:user_id_2(*)`)
      .eq(`user_id_1`, user.id)
    if (error) return console.error(error)
    console.log("sending | Friendships.tsx l35", data)
    setSentFriendRequests(data)
    setIsSentFriendRequestsLoading(false)
  }, [])

  const cancelSentFriendRequest = useCallback<any>(async (friendRequestId: number) => {
    const { data, error } = await supabase
      .from(`friend_requests`)
      .delete()
      .match({ id: friendRequestId })

    if (error) return console.error(error)
    setSentFriendRequests(sentFriendRequests.filter(sFR => sFR.id !== friendRequestId))
  }, [sentFriendRequests])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isIncomingFriendRequestsLoading || isSentFriendRequestsLoading} />

      {incomingFriendRequests.length > 0 &&
        <div>
          <Title order={3}>Incoming friend requests</Title>
          {
            incomingFriendRequests.map((iFR) => {
              return (
                <div key={`iFR-${iFR.profile_1}`} className="friend-request-card">
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
              )
            })
          }
        </div>
      }

      {sentFriendRequests.length > 0 &&
        <div>
          <Title order={3}>Sent friend requests</Title>
          {
            sentFriendRequests.map((sFR) => {
              return (
                <div key={`sFR-${sFR.profile_2}`} className="friend-request-card">
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
              )
            })
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