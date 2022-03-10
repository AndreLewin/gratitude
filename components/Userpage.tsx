import { LoadingOverlay, Title, Text, Button } from "@mantine/core"
import { useModals } from "@mantine/modals"
import { useCallback, useEffect, useMemo, useState } from "react"
import { supabase } from "utils/supabaseClient"
import { isNullish } from "utils/typeChecks"
import GratitudeList from "./GratitudeList"

export default function Userpage({ userId }: { userId: string }) {
  const [username, setUsername] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)

  const [isUserpageLoading, setIsUserpageLoading] = useState<boolean>(false)

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    setIsUserpageLoading(true)

    const { data, error } = await supabase
      .from(`profiles`)
      .select(`id, username, bio, color`)
      .eq(`id`, userId)
      .single()

    if (error) return console.error(error)
    setUsername(data?.username ?? null)
    setBio(data?.bio ?? null)
    setColor(data?.color ?? null)

    setIsUserpageLoading(false)
  }

  const backgroundColor = useMemo<string>(() => {
    if (color === null) return `#ffffff`

    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r},${g},${b}, 0.2)`
  }, [color])

  const user = supabase.auth.user()

  const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false)
  const [isCheckingIfFriendRequestAlreadySent, setIsCheckingIfFriendRequestAlreadySent] = useState<boolean>(true)

  // check if a friend request already exists (from user 1 to user 2 or reverse)
  useEffect(() => {
    checkIfFriendRequestAlreadySent()
  }, [])

  const checkIfFriendRequestAlreadySent = useCallback<any>(async () => {
    const { data, error } = await supabase
      .from(`friendships`)
      .select(`id`)
      .match({
        user_id_1: user?.id,
        user_id_2: userId,
        is_accepted: false
      })
      .limit(1)
    if (error) return console.error(error)
    setIsFriendRequestSent(data?.length === 1)
    setIsCheckingIfFriendRequestAlreadySent(false)
  }, [])

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
    const { error } = await supabase
      .from(`friendships`)
      .insert([
        { user_id_1: user?.id, user_id_2: userId },
      ], { returning: "minimal" })
    if (error) return console.error(error)
    setIsFriendRequestSent(true)
  }, [user])

  const deleteFriendRequest = useCallback<any>(async () => {
    const { error } = await supabase
      .from(`friendships`)
      .delete({ returning: "minimal" })
      .match({ user_id_1: user?.id, user_id_2: userId })
    if (error) return console.error(error)
    setIsFriendRequestSent(false)
  }, [])

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
        {username && <Title order={2}>{username}</Title>}
        {bio && <Text>{bio}</Text>}

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

      <GratitudeList mode={`user: ${userId}`} />

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}