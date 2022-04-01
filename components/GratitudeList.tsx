import { Loader, LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useMemo, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import GratitudeMessage from './GratitudeMessage'
import store from 'store'
import { useIntersection } from '@mantine/hooks'

export default function GratitudeList({ mode }: { mode: string }) {
  const set = store(state => state.set)
  const isLoading = store(state => state.isLoading)
  const gratitudes = store(state => state.gratitudes)
  const getGratitudes = store(state => state.getGratitudes)
  const gratitudesCount = store(state => state.gratitudesCount)

  useEffect(() => {
    set({ mode })
    set({ gratitudes: [] })
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    const user = supabase.auth.user()
    await getGratitudes(user?.id ?? null)
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

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <div>
        {gratitudes?.map((gratitude, index) => (
          <div key={`gm-${gratitude.id}`}>
            <div ref={intersectionRef} />
            <div style={{ marginTop: `10px` }}>
              <GratitudeMessage gratitude={gratitude} />
            </div>
          </div>
        ))}
      </div>
      {numberOfFetchedGratitudes > 0 && isFetchingNextGratitudes &&
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px", height: "30px" }}>
          <Loader />
        </div>
      }
    </div>
  )
}