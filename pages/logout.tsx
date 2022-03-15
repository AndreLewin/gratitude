import { useEffect } from 'react'
import store from 'store'
import { supabase } from '../utils/supabaseClient'

export default function Logout() {
  const reset = store(state => state.reset)

  useEffect(() => {
    reset()
    supabase.auth.signOut()
    // redirecting to home already handle by supabase.auth.onAuthStateChange
  }, [])

  return (<></>)
}