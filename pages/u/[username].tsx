import { useRouter } from "next/router"
// import RedirectIfNotAuthenticated from "components/RedirectIfNotAuthenticated"
import { useEffect, useState } from "react"
import { Loader } from "@mantine/core"
import Userpage from "components/Userpage"

export default function NPage() {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // the query is an empty object at the first render before Router.isReady
    // https://github.com/vercel/next.js/issues/10521#issuecomment-760926715
    if (!router.isReady) return

    const { username } = router.query
    if (typeof username !== "string" || username === "") {
      router.push('/')
    } else {
      setUsername(username)
    }
  }, [router.query])

  return (
    <>
      {username === null ? <Loader /> : <Userpage username={username} />}
    </>
  )
}