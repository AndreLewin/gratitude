import { LoadingOverlay, Title, Text } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import store from '../store'

type FriendRequest = {
  id: number,
  user_id_1: string,
  username_1: string | null,
  user_id_2: string,
  username_2: string
}

export default function Friendships() {
  const session = store(state => state.session)

  const [isIncomingFriendRequestsLoading, setIsIncomingFriendRequestsLoading] = useState<boolean>(true)
  const [isSentFriendRequestsLoading, setIsSentFriendRequestsLoading] = useState<boolean>(true)
  const [incomingFriendRequests, setIncomingFriendRequests] = useState<FriendRequest[] | null>(null)
  const [sentFriendRequests, setSentFriendRequests] = useState<FriendRequest[] | null>(null)


  useEffect(() => {
    getIncomingFriendRequests()
    getSentFriendRequests()
  }, [session])

  const getIncomingFriendRequests = useCallback<any>(async () => {
    // TODO
    setIsIncomingFriendRequestsLoading(false)
  }, [])

  const getSentFriendRequests = useCallback<any>(async () => {
    // TODO
    setIsSentFriendRequestsLoading(false)
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isIncomingFriendRequestsLoading || isSentFriendRequestsLoading} />

      <div>
        <Title order={2}>Incoming friend requests</Title>
        <Text>TODO</Text>
      </div>

      <div>
        <Title order={2}>Sent friend requests</Title>
        <Text>TODO</Text>
      </div>

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}