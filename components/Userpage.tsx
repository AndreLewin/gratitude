import { LoadingOverlay, Title, Text } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "utils/supabaseClient"
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
      </div>

      <GratitudeList mode={`user: ${userId}`} />

      <style jsx>
        {`
        `}
      </style>
    </div>
  )
}