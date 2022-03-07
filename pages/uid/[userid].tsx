import { useRouter } from "next/router"
import Navigation from "components/Navigation"
import RedirectIfNotAuthenticated from "components/RedirectIfNotAuthenticated"
import Userpage from "components/Userpage"
import { useEffect, useState } from "react"
import { Loader } from "@mantine/core"

export default function UPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // the query is an empty object at the first render before Router.isReady
    // https://github.com/vercel/next.js/issues/10521#issuecomment-760926715
    if (!router.isReady) return

    const { userid } = router.query
    if (typeof userid !== "string" || userId === "") {
      router.push('/')
    } else {
      setUserId(userid)
    }
  }, [router.query])

  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        {userId === null ? <Loader /> : <Userpage userId={userId} />}
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}