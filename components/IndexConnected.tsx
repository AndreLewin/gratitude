import { Session, User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Account({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // TODO: define the gratitude type
  const [gratitudes, setGratitudes] = useState<any[] | null>(null)

  useEffect(() => {
    getGratitudes()
  }, [session])

  async function getGratitudes() {
    setIsLoading(true)
    const user = supabase.auth.user() as User

    const { data, error } = await supabase
      .from('gratitudes')
      .select(`for, because`)
      .eq('user_id', user.id)

    if (error) console.error(error)
    setGratitudes(data ?? [])
    setIsLoading(false)
  }

  return (
    <div>
      Gratitudes: {JSON.stringify(gratitudes)}
      <button onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}