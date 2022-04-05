import { Loader, LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useMemo, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import store from 'store'
import { useIntersection } from '@mantine/hooks'

export default function GratitudeList({ mode }: { mode: string }) {
  const user = supabase.auth.user()

  const set = store(state => state.set)
  const isLoading = store(state => state.isLoading)
  const gratitudes = store(state => state.gratitudes)
  const getGratitudes = store(state => state.getGratitudes)
  const gratitudesCount = store(state => state.gratitudesCount)

  useEffect(() => {
    const af = async () => {
      set({ mode })
      set({ gratitudes: [] })
      getGratitudes(user?.id ?? null)
    }
    af()
  }, [])

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
  const [intersectionRef, observer] = useIntersection({
    root: containerRef.current,
    threshold: 1,
  })

  const areSomeGratitudesYetToBeFetched = useMemo<boolean>(() => {
    return numberOfFetchedGratitudes < (gratitudesCount ?? - 1)
  }, [gratitudesCount, numberOfFetchedGratitudes])

  useEffect(() => {
    if (!observer?.isIntersecting) return
    if (!areSomeGratitudesYetToBeFetched) return
    fetchNextGratitudes(numberOfFetchedGratitudes)
  }, [observer?.isIntersecting, areSomeGratitudesYetToBeFetched])

  const noGratitudeMessage = useMemo<string>(() => {
    if (isLoading) return ""
    if (mode === "only_me") {
      return "Write a gratitude message using the top left button!"
    } else if (mode === "reported") {
      return "There are no reported messages"
    } else {
      return "There is no gratitude message to display"
    }
  }, [mode, isLoading])

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <div style={{ minHeight: "100px" }}>
        {gratitudes?.map((gratitude, index) => (
          <div key={`gm-${gratitude.id}`}>
            <div ref={intersectionRef} />
            <div style={{ marginTop: `10px` }}>
              <GratitudeMessage gratitude={gratitude} />
            </div>
          </div>
        ))}

        {(gratitudes ?? []).length === 0 &&
          <div style={{ padding: "20px" }}>
            {noGratitudeMessage}
          </div>
        }
      </div>
      {numberOfFetchedGratitudes > 0 && isFetchingNextGratitudes &&
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px", height: "30px" }}>
          <Loader />
        </div>
      }
    </div>
  )
}