import { Button, LoadingOverlay, Textarea } from '@mantine/core'
import { useState, useEffect, useCallback, useMemo } from 'react'
import store from '../store'
import { supabase } from '../utils/supabaseClient'

export default function Settings() {
  const session = store(state => state.session)

  const [username, setUsername] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)

  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true)

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
  }, [username, bio])

  const isUsernameValid = useMemo<boolean>(() => {
    return /^[a-zA-Z0-9_]{0,15}$/.test(username ?? ``)
  }, [username])

  const hasInvalidValue = useMemo<boolean>(() => {
    return !isUsernameValid
  }, [isUsernameValid])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isProfileLoading} />

      <Textarea
        data-autofocus
        value={username ?? ``}
        onChange={(event) => setUsername(event.currentTarget.value)}
        label="Username"
        description={`Your username will appear next to your messages, and you will get a custom profile link. Currently, your profile link is TODO`}
        placeholder="Only letters (a-z A-Z), numbers (0-9) and underscores (_) are allowed. 15 characters max."
        maxRows={1}
        autosize
        {...(isUsernameValid ? {} : { error: `Only letters (a-z A-Z), numbers (0-9) and underscores (_) are allowed. 15 characters max.` })}
        styles={{
          description: {
            fontSize: "14px !important"
          }
        }}
      />

      <Textarea
        value={bio ?? ``}
        onChange={(event) => setBio(event.currentTarget.value)}
        label="Bio & Socials"
        description={`A small description of you and how you can be contacted (Facebook, Twitter, Discord etc.). Use it to help friends find you and to give some context to your messages. Be aware that everything you write here is public.`}
        maxRows={3}
        style={{ marginTop: `20px` }}
        styles={{
          description: {
            fontSize: "14px !important"
          }
        }}
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

      {/* TODO: Go to userpage ; tooltip: please choose a username before */}

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}