import { Button, Select, Textarea } from "@mantine/core"
import { User } from "@supabase/supabase-js"
import { useCallback, useMemo, useState } from "react"
import { visibilities } from "../utils/data"
import { supabase } from "../utils/supabaseClient"


export default function GratitudeForm({ closeModal }: { closeModal: Function }) {
  const [visibilityId, setVisibilityId] = useState<number>(2)

  // for some reason Mantine's Select only wants strings for the value
  const visibilityOptions = useMemo<{ value: string, label: string }[]>(() => {
    const usableVisibilities = visibilities.filter(v => v.label === "only me" || v.label === "friends" || v.label === "public")
    return usableVisibilities.map(v => { return { value: `${v.id}`, label: v.label } })
  }, [])

  // "for" is a reserved variable, it also caused issues when making policies for RLS
  const [fore, setFore] = useState<string>("")
  const [because, setBecause] = useState<string>("")

  const user = supabase.auth.user() as User

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sendGratitudeMessage = useCallback<any>(async () => {
    setIsLoading(true)

    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
        { user_id: user.id, fore, because, visibility_id: visibilityId },
      ])

    if (error) console.error(error)

    closeModal()
  }, [visibilityId, fore, because])

  return (
    <div>
      <Select
        value={`${visibilityId}`}
        onChange={(value) => setVisibilityId(parseInt(value ?? "2", 10))}
        data={visibilityOptions}
        placeholder="Who can see your message of gratitude?"
        label="Visible to"
        variant="filled"
      />

      <div style={{ marginTop: "20px" }} />

      <Textarea
        data-autofocus
        value={fore}
        onChange={(event) => setFore(event.currentTarget.value)}
        placeholder="a nice meal, a message I received, the sun ..."
        label="I am grateful for"
        required
        maxRows={1}
        autosize
      />

      <Textarea
        value={because}
        onChange={(event) => setBecause(event.currentTarget.value)}
        placeholder="it gave me energy, people care about me, nice things are free ..."
        label="Because"
        maxRows={2}
        autosize
      />

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Button
          color="green"
          disabled={fore.trim().length === 0}
          onClick={() => sendGratitudeMessage()}
          loading={isLoading}
        >
          Send
        </Button>
      </div>

      <style jsx>
        {`
          .test {}
        `}
      </style>
    </div>
  )
}