import { Button, Select, Textarea } from "@mantine/core"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import store, { Gratitude } from "store"
import { visibilities } from "../data"
import { supabase } from "../utils/supabaseClient"
import { isNullish } from "../utils/typeChecks"

export default function GratitudeForm({ closeModal, gratitude }: { closeModal: Function, gratitude?: Gratitude }) {
  const isCreating = useMemo<boolean>(() => {
    return isNullish(gratitude)
  }, [gratitude])

  const [visibilityId, setVisibilityId] = useState<number>(gratitude?.visibility_id ?? 2)

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

  const getGratitudes = store(state => state.getGratitudes)

  const createGratitudeMessage = useCallback<any>(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("gratitudes")
      .insert([
        { user_id: user.id, fore, because, visibility_id: visibilityId },
      ])
    if (error) return console.error(error)
    // we could also add the new gratitude message locally
    // but if an other new message has been added by someone else, we want to display that message too
    await getGratitudes(user.id)
    closeModal()
  }, [visibilityId, fore, because])

  const editLocalGratitude = store(state => state.editLocalGratitude)
  const updateGratitudeMessage = useCallback<any>(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("gratitudes")
      .update({ fore, because, visibility_id: visibilityId })
      .eq('id', gratitude?.id)
      .select(`id, fore, because, created_at, updated_at, visibility_id, user_id`)

    if (error) return console.error(error)
    closeModal()
    editLocalGratitude(data?.[0]?.id ?? -1, data?.[0])
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
        label="because"
        maxRows={2}
        autosize
      />

      <div style={{ marginTop: `15px` }}>
        Need a tip? Check the <Link href='/faq'><a style={{ color: `blue` }} onClick={() => closeModal()}>frequently asked questions</a></Link>.
      </div>

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Button
          color={isCreating ? "teal" : "blue"}
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