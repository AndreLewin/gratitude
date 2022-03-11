import { useNotifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Notifier({ children }: { children: JSX.Element | JSX.Element[] }) {
  const user = supabase.auth.user()
  const notifications = useNotifications()

  useEffect(() => {
    if (user === null) return

    notifications.showNotification({
      message: "todo",
      autoClose: 3000
    })
  }, [user])

  return (
    <>
      {children}
    </>
  )
}