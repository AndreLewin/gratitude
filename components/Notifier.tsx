import { useNotifications } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Notifier({ children }: { children: JSX.Element | JSX.Element[] }) {
  const user = supabase.auth.user()
  const notifications = useNotifications()
  const router = useRouter()

  useEffect(() => {
    if (user === null) return
    checkIncomingFriendRequests()
  }, [user])

  const checkIncomingFriendRequests = useCallback<any>(async () => {
    if (user === null) return

    const { data, error } = await supabase
      .from(`friendships`)
      .select(`id`)
      .match({
        user_id_2: user.id,
        is_accepted: false
      })
    if (error) return console.error(error)
    const hasIncomingFriendRequest = (data ?? []).length > 0
    const hasSeveralIncomingFriendRequests = (data ?? []).length > 1

    let friendRequestNotificationId = ""

    const closeFriendRequestNotification = () => {
      notifications.hideNotification(friendRequestNotificationId)
    }

    if (hasIncomingFriendRequest && router.pathname !== `/friendships`) {
      const friendRequestsToReviewNode = (
        <Link href='/friendships' passHref>
          <a style={{ fontWeight: 600, cursor: `pointer`, color: `#1c7ed6` }} onClick={closeFriendRequestNotification}>
            {hasSeveralIncomingFriendRequests ? `You have friend requests to review` : `You have a friend request to review`}

          </a>
        </Link>
      )

      friendRequestNotificationId = notifications.showNotification({
        message: friendRequestsToReviewNode,
        autoClose: 5000
      })
    }
  }, [user])

  return (
    <>
      {children}
    </>
  )
}