import { Button, ColorInput, LoadingOverlay, Textarea, Text } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useDebouncedValue } from '@mantine/hooks'
import store from 'store'
import { useLocalStorageValue } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useModals } from '@mantine/modals'

export type Profile = {
  id: string,
  username: null | string,
  bio: null | string,
  color: null | string
}

export default function Settings() {
  const profile = store(state => state.profile)
  const [localProfile, setLocalProfile] = useState<Profile | null>(null)

  useEffect(() => {
    setLocalProfile(JSON.parse(JSON.stringify(profile)) as Profile | null)
  }, [profile])

  const set = store(state => state.set)

  const isProfileLoading = useMemo<boolean>(() => {
    return localProfile === null
  }, [localProfile])

  const [isProfileUpdating, setIsProfileUpdating] = useState<boolean>(false)

  const updateProfile = useCallback<any>(async () => {
    setIsProfileUpdating(true)
    const user = supabase.auth.user()!
    const { username, bio, color } = localProfile!
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
      color: "teal"
    })

    set({ "profile": (data ?? [])?.[0] ?? null })
    setIsProfileUpdating(false)
  }, [localProfile])

  const isUsernameValid = useMemo<boolean>(() => {
    return /^[a-zA-Z0-9_]{0,15}$/.test(localProfile?.username ?? ``)
  }, [localProfile?.username])

  const isColorValid = useMemo<boolean>(() => {
    if (localProfile?.color ?? null === null) return true
    return /^#[0-9A-Fa-f]{6}$/.test(localProfile?.color as string)
  }, [localProfile?.color])

  const hasInvalidValue = useMemo<boolean>(() => {
    return !isUsernameValid || !isColorValid
  }, [isUsernameValid, isColorValid])

  const isLocalValueChanged = useMemo<boolean>(() => {
    if (profile === null || localProfile === null) return false
    const { username: originalUsername, bio: originalBio, color: originalColor } = profile
    const { username, bio, color } = localProfile
    return (username ?? ``) !== (originalUsername ?? ``) || (bio ?? ``) !== (originalBio ?? ``) || (color ?? ``) !== (originalColor ?? ``)
  }, [profile, localProfile])

  const notifications = useNotifications()

  const [isUsernameAlreadyUsed, setIsUsernameAlreadyUsed] = useState<boolean>(false)
  const [isCheckingIfTheUsernameIsAlreadyUsed, setIsCheckingIfTheUsernameIsAlreadyUsed] = useState<boolean>(false)

  // this does not work (probably because profile is null at start, so it does not see the changes on profile.username)
  // const [debouncedUsername] = useDebouncedValue(profile?.username, 550);
  const [usernameToTest, setUsernameToTest] = useState<string | null>(null)
  const [debouncedUsernameToTest] = useDebouncedValue(usernameToTest, 550)

  useEffect(() => {
    if ((debouncedUsernameToTest ?? ``) === `` || debouncedUsernameToTest === profile?.username) {
      setIsCheckingIfTheUsernameIsAlreadyUsed(false)
      setIsUsernameAlreadyUsed(false)
      return
    }

    let didCancel = false

    const check = async () => {
      const { data, error } = await supabase
        .from(`profiles`)
        .select(`id`)
        .eq(`username`, debouncedUsernameToTest)
        .limit(1)
      if (error) return console.error(error)
      if (!didCancel) {
        setIsCheckingIfTheUsernameIsAlreadyUsed(false)
        setIsUsernameAlreadyUsed((data ?? [])?.length >= 1)
      }
    }

    check()

    // avoid the risk of the first promise resolving after the second promise resolves
    // https://overreacted.io/a-complete-guide-to-useeffect/#speaking-of-race-conditions
    return () => {
      didCancel = true
    }
  }, [debouncedUsernameToTest, profile?.username])

  const changeLocalUsername = useCallback<any>((event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsCheckingIfTheUsernameIsAlreadyUsed(true)
    setUsernameToTest(event.currentTarget.value)
    setLocalProfile({ ...localProfile!, username: event.currentTarget.value })
  }, [localProfile])

  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false)
  const [authToken, setAuthToken] = useLocalStorageValue<string>({ key: "supabase.auth.token", defaultValue: "" })
  const router = useRouter()

  const deleteAccount = useCallback<any>(async () => {
    if (authToken === "") return
    const parsedAuthToken = JSON.parse(authToken)
    const accessToken = parsedAuthToken?.currentSession?.access_token ?? ""
    if (accessToken === "") return

    setIsDeletingAccount(true)
    try {
      await fetch(`/api/deleteUser`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    } catch { }
    notifications.showNotification({
      message: "Your account has been deleted",
      autoClose: 3000
    })
    router.push("/logout")
  }, [authToken])

  const modals = useModals()

  const openDeleteAccountModal = async () => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete your account?",
      children: (
        <Text size="sm">
          All your data (gratitude messages, profile, friend statuses...) will be removed. This can't be undone.
        </Text>
      ),
      centered: true,
      labels: { confirm: "Delete my account", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => { },
      onConfirm: async () => { await deleteAccount() }
    });
  }

  return (
    <div style={{ position: "relative", margin: `20px 20px 20px 20px` }}>
      <LoadingOverlay visible={isProfileLoading} />

      <Textarea
        data-autofocus
        value={localProfile?.username ?? ``}
        onChange={changeLocalUsername}
        label="Username"
        description={`Your username will appear next to your messages, and you will get a custom link to your public page.`}
        placeholder="Only letters (a-z A-Z), numbers (0-9) and underscores (_) are allowed. 15 characters max."
        error={!isCheckingIfTheUsernameIsAlreadyUsed && isUsernameAlreadyUsed ? `This username is already used` : ``}
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
        value={localProfile?.bio ?? ``}
        onChange={(event) => setLocalProfile({ ...localProfile!, bio: event.currentTarget.value })}
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
        value={localProfile?.color ?? ``}
        onChange={(value) => setLocalProfile({ ...localProfile!, color: value === "" ? null : value })}
        label="Color"
        description={`Your color will change the background of your messages.`}
        style={{ marginTop: `10px` }}
        styles={{
          description: {
            fontSize: "14px !important"
          }
        }}
      />

      <div>
        <Button
          color="blue"
          disabled={hasInvalidValue || !isLocalValueChanged || isCheckingIfTheUsernameIsAlreadyUsed || isUsernameAlreadyUsed}
          onClick={updateProfile}
          loading={isProfileUpdating}
          style={{ marginTop: `25px` }}
        >
          Update
        </Button>
      </div>

      <Button
        color="red"
        onClick={openDeleteAccountModal}
        loading={isDeletingAccount}
        style={{ marginTop: `15px` }}
      >
        Delete account
      </Button>

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}