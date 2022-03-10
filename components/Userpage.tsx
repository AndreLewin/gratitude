import { LoadingOverlay, Title, Text, Button } from "@mantine/core"
import { useModals } from "@mantine/modals"
import { useCallback, useEffect, useMemo, useState } from "react"
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
    console.log("data | Userpage.tsx l35", data)

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

  const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false)
  const [isCheckingIfFriendRequestAlreadySent, setIsCheckingIfFriendRequestAlreadySent] = useState<boolean>(true)

  // check if a friend request already exists (from user 1 to user 2 or reverse)
  useEffect(() => {
    checkIfFriendRequestAlreadySent()
  }, [])

  const checkIfFriendRequestAlreadySent = useCallback<any>(async () => {
    if (profile === null) return
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`id`)
      .match({
        user_id_1: user?.id,
        user_id_2: profile.id,
        is_accepted: false
      })
      .limit(1)
    if (error) return console.error(error)
    setIsFriendRequestSent(data?.length === 1)
    setIsCheckingIfFriendRequestAlreadySent(false)
  }, [profile])

  const modals = useModals()
  const openCancelFriendRequestModal = () => {
    modals.openConfirmModal({
      title: `Are you sure you want to cancel your friend request${isNullish(username) ? `` : ` with ${username}`}?`,
      labels: { confirm: "Cancel friend request", cancel: "Do nothing" },
      confirmProps: { color: "red" },
      onCancel: () => { },
      onConfirm: () => deleteFriendRequest()
    });
  }

  const createFriendRequest = useCallback<any>(async () => {
    if (profile === null) return
    const { error } = await supabase
      .from(`friendships`)
      .insert([
        { user_id_1: user?.id, user_id_2: profile.id },
      ], { returning: "minimal" })
    if (error) return console.error(error)
    setIsFriendRequestSent(true)
  }, [user, profile])

  const deleteFriendRequest = useCallback<any>(async () => {
    if (profile === null) return
    const { error } = await supabase
      .from(`friendships`)
      .delete({ returning: "minimal" })
      .match({ user_id_1: user?.id, user_id_2: profile.id })
    if (error) return console.error(error)
    setIsFriendRequestSent(false)
  }, [user, profile])

  // TODO
  const [isFriend, setIsFriend] = useState<boolean>(false)

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isUserpageLoading} />

      <div
        style={{
          margin: `-20px -20px 20px -20px`,
          padding: `20px`,
          background: backgroundColor
        }}
      >
        {profile?.username && <Title order={2}>{profile?.username}</Title>}
        {profile?.bio && <Text>{profile?.bio}</Text>}

        {!isCheckingIfFriendRequestAlreadySent &&
          <Button
            variant={isFriendRequestSent ? `light` : `filled`}
            onClick={isFriendRequestSent ? openCancelFriendRequestModal : createFriendRequest}
            style={{ marginTop: `10px` }}
          >
            {isFriendRequestSent ? `Friend request pending...` : `Send friend request`}
          </Button>
        }

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