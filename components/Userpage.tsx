import { LoadingOverlay, Title, Text, Button } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import store, { Friendship } from "store"
import { supabase } from "utils/supabaseClient"
import { isNullish } from "utils/typeChecks"
import GratitudeList from "./GratitudeList"
import { Profile } from "./Settings"

export default function Userpage({ userId, username }: { userId?: string, username?: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isUserpageLoading, setIsUserpageLoading] = useState<boolean>(false)

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    setIsUserpageLoading(true)

    let promise = supabase
      .from(`profiles`)
      .select(`id, username, bio, color`)

    if (!isNullish(userId)) {
      promise.eq(`id`, userId)
    } else if (!isNullish(username)) {
      promise.eq(`username`, username)
    } else {
      return
    }

    promise.single()

    // supabase client bug: the type of data is any[], even if promise.single() has been used
    const { data, error } = await promise as { data: any, error: any }

    if (error) return console.error(error)
    setProfile(data)
    setIsUserpageLoading(false)
  }

  const backgroundColor = useMemo<string>(() => {
    if (profile === null) return `#ffffff`
    const { color } = profile
    if (color === null) return `#ffffff`

    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r},${g},${b}, 0.2)`
  }, [profile])

  const user = supabase.auth.user()

  const friendships = store(state => state.friendships)
  const getFriendships = store(state => state.getFriendships)

  const [isCheckingFriendshipStatus, setIsCheckingFriendshipStatus] = useState<boolean>(true)

  useEffect(() => {
    if (user === null) return setIsCheckingFriendshipStatus(false)
    const af = async () => {
      if (friendships === null) {
        await getFriendships(user.id)
        setIsCheckingFriendshipStatus(false)
      }
    }
    af()
  }, [])

  const friendship = useMemo<Friendship | null>(() => {
    if (user === null || profile == null) return null
    const friendshipA = (friendships ?? []).find(f => f.user_id_1 === user.id && f.user_id_2 === profile.id)
    const friendshipB = (friendships ?? []).find(f => f.user_id_2 === user.id && f.user_id_1 === profile.id)
    return (friendshipA ?? friendshipB ?? null)
  }, [friendships, user, profile])

  const isFriendRequestSent = useMemo<boolean>(() => {
    if (friendship === null) return false
    return (friendship.is_accepted === false && friendship.user_id_1 === user?.id)
  }, [friendship, user])

  const isFriendRequestIncoming = useMemo<boolean>(() => {
    if (friendship === null) return false
    return (friendship?.is_accepted === false && friendship?.user_id_2 === user?.id)
  }, [friendship, user])

  const isFriend = useMemo<boolean>(() => {
    if (friendship === null) return false
    return (friendship?.is_accepted ?? false)
  }, [friendship, user])

  const deleteFriendship = store(state => state.deleteFriendship)
  const acceptFriendship = store(state => state.acceptFriendship)
  const createFriendship = store(state => state.createFriendship)

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isUserpageLoading} />

      <div
        style={{
          padding: `20px`,
          background: backgroundColor
        }}
      >
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          {profile?.username && <Title order={2}>{profile?.username}</Title>}

          {!isCheckingFriendshipStatus && (user?.id !== profile?.id) &&
            <div style={{ display: `flex` }}>
              {!isFriendRequestSent && !isFriendRequestIncoming && !isFriend && user && profile &&
                <Button onClick={() => createFriendship(user.id, profile.id)}>
                  {`Send friend request`}
                </Button>
              }

              {isFriendRequestSent && friendship &&
                <Button variant={`outline`} onClick={() => deleteFriendship(friendship.id)}>
                  {`Cancel friend request`}
                </Button>
              }

              {isFriendRequestIncoming && friendship &&
                <Button color={`red`} onClick={() => deleteFriendship(friendship.id)}>
                  {`Refuse friend request`}
                </Button>
              }

              {isFriendRequestIncoming && friendship &&
                <Button color={`teal`} onClick={() => acceptFriendship(friendship.id)} style={{ marginLeft: `10px` }}>
                  {`Accept friend request`}
                </Button>
              }

              {isFriend && friendship &&
                <Button color={`red`} onClick={() => deleteFriendship(friendship.id)}>
                  {`Unfriend`}
                </Button>
              }
            </div>
          }
        </div>

        {profile?.bio && <Text>{profile?.bio}</Text>}
      </div>

      {profile?.id &&
        <GratitudeList mode={`user: ${profile?.id}`} />
      }

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}