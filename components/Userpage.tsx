import { LoadingOverlay, Title, Text, Button } from "@mantine/core"
import { useCallback, useEffect, useMemo, useState } from "react"
import { supabase } from "utils/supabaseClient"
import { isNullish } from "utils/typeChecks"
import { Friendship } from "./Friendships"
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

  const [isCheckingFriendshipStatus, setIsCheckingFriendshipStatus] = useState<boolean>(true)

  const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false)
  const [isFriendRequestIncoming, setIsFriendRequestIncoming] = useState<boolean>(false)
  const [isFriend, setIsFriend] = useState<boolean>(false)

  useEffect(() => {
    checkFriendshipStatus()
  }, [user, profile])

  const checkFriendshipStatus = useCallback<any>(async () => {
    if (user === null || profile == null) return
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`*`)
      .or(`and(user_id_1.eq.${user.id},user_id_2.eq.${profile.id}),and(user_id_1.eq.${profile.id},user_id_2.eq.${user.id})`)
      .limit(1)
    if (error) return console.error(error)

    const friendship = (data?.[0] ?? null) as Friendship | null

    setIsFriendRequestSent(friendship?.is_accepted === false && friendship?.user_id_1 === user.id)
    setIsFriendRequestIncoming(friendship?.is_accepted === false && friendship?.user_id_2 === user.id)
    setIsFriend(friendship?.is_accepted ?? false)

    setIsCheckingFriendshipStatus(false)
  }, [user, profile])

  const createFriendRequest = useCallback<any>(async () => {
    if (profile === null) return
    const { error } = await supabase
      .from(`friendships`)
      .insert([
        { user_id_1: user?.id, user_id_2: profile.id },
      ], { returning: "minimal" })
    if (error) return console.error(error)
    checkFriendshipStatus()
  }, [user, profile])

  const deleteFriendship = useCallback<any>(async () => {
    if (user === null || profile == null) return
    const { error } = await supabase
      .from(`friendships`)
      .delete({ returning: "minimal" })
      .or(`and(user_id_1.eq.${user.id},user_id_2.eq.${profile.id}),and(user_id_1.eq.${profile.id},user_id_2.eq.${user.id})`)
    if (error) return console.error(error)
    checkFriendshipStatus()
  }, [user, profile])

  const acceptFriendship = useCallback<any>(async () => {
    if (user === null || profile == null) return
    const { error } = await supabase
      .from(`friendships`)
      .update({ is_accepted: true })
      .or(`and(user_id_1.eq.${user.id},user_id_2.eq.${profile.id}),and(user_id_1.eq.${profile.id},user_id_2.eq.${user.id})`)
    if (error) return console.error(error)
    checkFriendshipStatus()
  }, [user, profile])

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
            <>
              {!isFriendRequestSent && !isFriendRequestIncoming && !isFriend &&
                <Button onClick={createFriendRequest}>
                  {`Send friend request`}
                </Button>
              }

              {isFriendRequestSent &&
                <Button variant={`outline`} onClick={deleteFriendship}>
                  {`Cancel friend request`}
                </Button>
              }

              {isFriendRequestIncoming &&
                <Button color={`red`} onClick={deleteFriendship}>
                  {`Refuse friend request`}
                </Button>
              }

              {isFriendRequestIncoming &&
                <Button color={`teal`} onClick={acceptFriendship} style={{ marginLeft: `10px` }}>
                  {`Accept friend request`}
                </Button>
              }

              {isFriend &&
                <Button color={`red`} onClick={deleteFriendship}>
                  {`Unfriend`}
                </Button>
              }
            </>
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