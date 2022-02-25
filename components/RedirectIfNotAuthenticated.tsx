import { useRouter } from "next/router";
import { useEffect } from "react";
import store from "../store";

export default function RedirectIfNotAuthenticated({ children }: { children: JSX.Element }) {
  const session = store(state => state.session)
  const router = useRouter()

  // we want to redirect only from the client side
  // (where we can know if the user going to the link is authenticated (see _app.tsx))
  useEffect(() => {
    if (session === null) {
      router.push('/')
    }
  }, [])

  if (session === null) {
    return null
    // return (<></>)
  } else {
    return <>{children}</>
  }
}
