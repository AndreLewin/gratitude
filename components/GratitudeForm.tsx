import { Button, Select, Textarea } from "@mantine/core"
import { useCallback, useMemo, useState } from "react"
import { visibilities } from "../utils/data"
import { supabase } from "../utils/supabaseClient"
import { isNullish } from "../utils/typeChecks"
import { Gratitude } from "./GratitudeList"


export default function GratitudeForm({ closeModal, gratitude }: { closeModal: Function, gratitude?: Gratitude }) {
  const isCreating = useMemo<boolean>(() => {
    return isNullish(gratitude)
  }, [gratitude])

  const [visibilityId, setVisibilityId] = useState<number>(gratitude?.visibility?.id ?? 2)

  // for some reason Mantine's Select only wants strings for the value
  const visibilityOptions = useMemo<{ value: string, label: string }[]>(() => {
    const usableVisibilities = visibilities.filter(v => v.label === "only me" || v.label === "friends" || v.label === "public")
    return usableVisibilities.map(v => { return { value: `${v.id}`, label: v.label } })
  }, [])

  // "for" is a reserved variable, it also caused issues when making policies for RLS
  const [fore, setFore] = useState<string>(gratitude?.fore ?? "")
  const [because, setBecause] = useState<string>(gratitude?.because ?? "")

  const user = supabase.auth.user()!

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createGratitudeMessage = useCallback<any>(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("gratitudes")
      .insert([
        { user_id: user.id, fore, because, visibility_id: visibilityId },
      ])
    if (error) console.error(error)
    closeModal()
  }, [visibilityId, fore, because])

  const updateGratitudeMessage = useCallback<any>(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("gratitudes")
      .update({ fore, because, visibility_id: visibilityId })
      .eq('id', gratitude?.id)
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
          color={isCreating ? "green" : "blue"}
          disabled={fore.trim().length === 0}
          onClick={isCreating ? createGratitudeMessage : updateGratitudeMessage}
          loading={isLoading}
        >
          {isCreating ? "Create" : "Update"}
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