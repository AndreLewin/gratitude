import { LoadingOverlay, Title, Text, Button } from '@mantine/core'
import { getProfileLink } from 'helpers'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import store, { Friendship } from 'store'
import { supabase } from 'utils/supabaseClient'
import { Profile } from './Settings'

export default function Friendships() {
  const user = supabase.auth.user()!

  const friendships = store(state => state.friendships)
  const getFriendships = store(state => state.getFriendships)
  const deleteFriendship = store(state => state.deleteFriendship)
  const acceptFriendship = store(state => state.acceptFriendship)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const af = async () => {
      setIsLoading(true)
      if (friendships === null) await getFriendships(user.id)
      setIsLoading(false)
    }
    af()
  }, [])

  const incomingFriendRequests = useMemo<Friendship[]>(() => {
    return (friendships ?? []).filter(f => f.user_id_2 === user.id && f.is_accepted === false)
  }, [friendships])

  const sentFriendRequests = useMemo<Friendship[]>(() => {
    return (friendships ?? []).filter(f => f.user_id_1 === user.id && f.is_accepted === false)
  }, [friendships])

  const friends = useMemo<Friendship[]>(() => {
    return (friendships ?? []).filter(f => (f.user_id_1 === user.id || f.user_id_2 === user.id) && (f.is_accepted === true))
  }, [friendships])

  const friendsFormatted = useMemo<{ friendId: string, friendProfile: Profile, friendshipId: number }[]>(() => {
    return friends.map(f => ({
      friendId: f.user_id_1 === user.id ? f.user_id_2 : f.user_id_1,
      friendProfile: f.user_id_1 === user.id ? f.profile_2 : f.profile_1,
      friendshipId: f.id
    }))
  }, [friends])

  const blockings = store(state => state.blockings)
  const getBlockings = store(state => state.getBlockings)
  const deleteBlocking = store(state => state.deleteBlocking)

  const [isCheckingBlockings, setIsCheckingBlockings] = useState<boolean>(true)

  useEffect(() => {
    if (user === null) return setIsCheckingBlockings(false)
    const af = async () => {
      if (friendships === null) return await getBlockings(user.id)
      setIsCheckingBlockings(false)
    }
    af()
  }, [])

  return (
    <div style={{ position: "relative", padding: `20px` }}>
      <LoadingOverlay visible={isLoading} />

      {incomingFriendRequests.length > 0 &&
        <div>
          <Title order={3}>Incoming friend requests</Title>
          {
            incomingFriendRequests.map(iFR => (
              <div key={`iFR-${iFR.user_id_1}`} className="friend-request-card">
                <Link href={getProfileLink(iFR.profile_1)} passHref>
                  <a style={{ fontWeight: 600, cursor: `pointer`, color: `#1c7ed6` }}>
                    {iFR.profile_1.username ?? "(Anonymous)"}
                  </a>
                </Link>
                <Button
                  color="red"
                  onClick={() => deleteFriendship(iFR.id)}
                  style={{ marginLeft: `10px` }}
                >
                  Refuse
                </Button>
                <Button
                  color="teal"
                  onClick={() => acceptFriendship(iFR.id)}
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
                <Link href={getProfileLink(sFR.profile_2)} passHref>
                  <a style={{ fontWeight: 600, cursor: `pointer`, color: `#1c7ed6` }}>
                    {sFR.profile_2.username ?? "(Anonymous)"}
                  </a>
                </Link>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => deleteFriendship(sFR.id)}
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
                <Link href={getProfileLink(fr.friendProfile)} passHref>
                  <a style={{ fontWeight: 600, cursor: `pointer`, color: `#1c7ed6` }}>
                    {fr.friendProfile.username ?? "(Anonymous)"}
                  </a>
                </Link>
                <Button
                  color="red"
                  onClick={() => deleteFriendship(fr.friendshipId)}
                  style={{ marginLeft: `10px` }}
                >
                  Remove
                </Button>
              </div>
            ))
          }
        </div>
      }

      {!isLoading && friends.length === 0 && incomingFriendRequests.length === 0 && sentFriendRequests.length === 0 &&
        <Text>You don't seem to have any friend. You can send a friend request to a user from their profile page. You can reach it by clicking on their name on their messages.</Text>
      }

      {!isCheckingBlockings && (blockings ?? []).length > 0 &&
        <div>
          <Title order={3}>Hiddens</Title>
          {
            (blockings ?? []).map(bl => (
              <div key={`bl-${bl.user_id_2}`} className="bliend-request-card">
                <Link href={getProfileLink(bl.profile_2)} passHref>
                  <a style={{ fontWeight: 600, cursor: `pointer`, color: `#1c7ed6` }}>
                    {bl.profile_2.username ?? "(Anonymous)"}
                  </a>
                </Link>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => deleteBlocking(bl.id)}
                  style={{ marginLeft: `10px` }}
                >
                  Unhide messages
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