import { Loader, LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useMemo, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import store from 'store'
import { useIntersection } from '@mantine/hooks'

export default function GratitudeList({ mode }: { mode: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const set = store(state => state.set)
  const gratitudes = store(state => state.gratitudes)
  const getGratitudes = store(state => state.getGratitudes)

  useEffect(() => {
    set({ mode })
    set({ gratitudes: [] })
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    setIsLoading(true)
    const user = supabase.auth.user()
    await getGratitudes(user?.id ?? null)
    setIsLoading(false)
  }

  const [isFetchingNextGratitudes, setIsFetchingNextGratitudes] = useState<boolean>(false)
  const fetchNextGratitudes = async (firstIndex: number) => {
    setIsFetchingNextGratitudes(true)
    const user = supabase.auth.user()
    await getGratitudes(user?.id ?? null, firstIndex)
    setIsFetchingNextGratitudes(false)
  }

  const numberOfFetchedGratitudes = useMemo<number>(() => {
    return gratitudes?.length ?? -1
  }, [gratitudes])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572#issuecomment-493942129
  const containerRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [ref, observer] = useIntersection({
    root: containerRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (!observer?.isIntersecting) return
    fetchNextGratitudes(numberOfFetchedGratitudes)
  }, [observer?.isIntersecting])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <div>
        {gratitudes?.map((gratitude, index) => (
          <div ref={ref} key={`gm-${gratitude.id}`} style={{ marginTop: `10px` }}>
            <GratitudeMessage gratitude={gratitude} />
            <div onClick={() => fetchNextGratitudes(index + 1)}>fetch three next ones {observer?.isIntersecting ? "true" : "false"}</div>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Loader />
      </div>
      {isFetchingNextGratitudes && "TODO: display loading"}
    </div>
  )
}