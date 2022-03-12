import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "utils/supabaseClient";

export default function RedirectIfNotAuthenticated({ children }: { children: JSX.Element }) {
  const user = supabase.auth.user()
  const router = useRouter()

  // we want to redirect only from the client side
  // (where we can know if the user going to the link is authenticated (see _app.tsx))
  useEffect(() => {
    if (user === null) {
      router.push('/')
    }
  }, [])

  if (user === null) {
    return null
    // return (<></>)
  } else {
    return <>{children}</>
  }
}
