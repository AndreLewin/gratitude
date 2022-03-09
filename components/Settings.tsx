import { Button, ColorInput, LoadingOverlay, Textarea, Notification } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useState, useEffect, useCallback, useMemo } from 'react'
import store from '../store'
import { supabase } from '../utils/supabaseClient'

export default function Settings() {
  const session = store(state => state.session)

  // TODO: use "object" and "originalObject" instead to compare with less boilerplate
  const [originalUsername, setOriginalUsername] = useState<string | null>(null)
  const [originalBio, setOriginalBio] = useState<string | null>(null)
  const [originalColor, setOriginalColor] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)

  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    setIsProfileLoading(true)
    const user = supabase.auth.user()!

    const { data, error } = await supabase
      .from(`profiles`)
      .select(`id, username, bio, color`)
      .eq(`id`, user.id)

    if (error) return console.error(error)
    setOriginalUsername(data?.[0]?.username ?? null)
    setOriginalBio(data?.[0]?.bio ?? null)
    setOriginalColor(data?.[0]?.color ?? null)
    setUsername(data?.[0]?.username ?? null)
    setBio(data?.[0]?.bio ?? null)
    setColor(data?.[0]?.color ?? null)

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
        // empty string must be converted to null because the field is UNIQUE
        // (you can have several null values, but not several empty values)
        username: username === `` ? null : username,
        bio,
        color
      })


    if (error) return console.error(error)

    notifications.showNotification({
      message: "The changes have been saved ✅",
      autoClose: 3000,
      color: "green"
    })

    setOriginalUsername(data?.[0]?.username ?? null)
    setOriginalBio(data?.[0]?.bio ?? null)
    setOriginalColor(data?.[0]?.color ?? null)

    setIsProfileUpdating(false)
  }, [username, bio, color])

  const isUsernameValid = useMemo<boolean>(() => {
    return /^[a-zA-Z0-9_]{0,15}$/.test(username ?? ``)
  }, [username])

  const isColorValid = useMemo<boolean>(() => {
    if (color === null) return true
    return /^#[0-9A-Fa-f]{6}$/.test(color)
  }, [color])

  const hasInvalidValue = useMemo<boolean>(() => {
    return !isUsernameValid || !isColorValid
  }, [isUsernameValid, isColorValid])

  const isLocalValueChanged = useMemo<boolean>(() => {
    return username !== originalUsername || bio !== originalBio || color !== originalColor
  }, [username, bio, color, originalUsername, originalBio, originalColor])

  const notifications = useNotifications()

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
        style={{ marginTop: `10px` }}
        styles={{
          description: {
            fontSize: "14px !important"
          }
        }}
      />

      <ColorInput
        value={color ?? ``}
        onChange={setColor}
        label="Color"
        description={`Your color will change the background of your messages.`}
        style={{ marginTop: `10px` }}
        styles={{
          description: {
            fontSize: "14px !important"
          }
        }}
      />

      <Button
        color="blue"
        disabled={hasInvalidValue || !isLocalValueChanged}
        onClick={updateProfile}
        loading={isProfileUpdating}
        style={{ marginTop: `25px` }}
      >
        Update
      </Button>

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}