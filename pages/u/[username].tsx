import { useRouter } from "next/router"
import Navigation from "components/Navigation"
import RedirectIfNotAuthenticated from "components/RedirectIfNotAuthenticated"
import { useCallback, useEffect, useState } from "react"
import { Loader } from "@mantine/core"
import Userpage from "components/Userpage"
import { supabase } from "utils/supabaseClient"

export default function NPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // the query is an empty object at the first render before Router.isReady
    // https://github.com/vercel/next.js/issues/10521#issuecomment-760926715
    if (!router.isReady) return

    const { username } = router.query
    if (typeof username !== "string" || userId === "") {
      router.push('/')
    } else {
      fetchUserId(username)
    }
  }, [router.query])

  const fetchUserId = useCallback<any>(async (username: string) => {
    const { data, error } = await supabase
      .from(`profiles`)
      .select(`id`)
      .eq(`username`, username)
      .single()

    if (error) {
      router.push('/')
      return console.error(error)
    }

    setUserId(data?.id ?? null)
  }, [])

  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        {userId === null ? <Loader /> : <Userpage userId={userId} />}
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}