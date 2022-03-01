import { Button, Loader, Textarea } from '@mantine/core'
import { useState, useEffect, useCallback, useMemo } from 'react'
import store from '../store'
import { supabase } from '../utils/supabaseClient'

export default function Settings() {
  const session = store(state => state.session)

  const [username, setUsername] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)

  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    setIsProfileLoading(true)
    const user = supabase.auth.user()!

    const { data, error } = await supabase
      .from(`profiles`)
      .select(`id, username, bio`)
      .eq(`id`, user.id)
      .single()

    if (error) return console.error(error)
    setUsername(data?.username ?? null)
    setBio(data?.bio ?? null)
    setIsProfileLoading(false)
  }

  const [isProfileUpdating, setIsProfileUpdating] = useState<boolean>(false)

  const updateProfile = useCallback<any>(async () => {
    setIsProfileUpdating(true)
    const user = supabase.auth.user()!
    const { data, error } = await supabase
      .from(`profiles`)
      .upsert({
        id: user.id,
        username,
        bio
      })

    if (error) return console.error(error)
    console.log("data | Settings.tsx l50", data)
    // TODO: notification "profile saved"
    setIsProfileUpdating(false)
  }, [])

  const isUsernameValid = useMemo<boolean>(() => {
    return /^[a-zA-Z0-9_]{0,15}$/.test(username ?? ``)
  }, [username])

  const hasInvalidValue = useMemo<boolean>(() => {
    return !isUsernameValid
  }, [isUsernameValid])

  return (
    <div>
      {isProfileLoading &&
        // TODO: use loading overlay https://mantine.dev/core/loading-overlay/
        <Loader />
      }

      <Textarea
        data-autofocus
        value={username ?? ``}
        onChange={(event) => setUsername(event.currentTarget.value)}
        label="Username"
        maxRows={1}
        autosize
        {...(isUsernameValid ? {} : { error: `Only letters (a-z A-Z), numbers (0-9) and underscores (_) are allowed. 15 characters max.` })}
      />

      <Textarea
        value={bio ?? ``}
        onChange={(event) => setBio(event.currentTarget.value)}
        label="Bio"
        maxRows={3}
      />

      <div style={{ marginTop: "20px" }} />
      <Button
        color="blue"
        disabled={hasInvalidValue}
        onClick={updateProfile}
        loading={isProfileUpdating}
      >
        Update
      </Button>
    </div>
  )
}