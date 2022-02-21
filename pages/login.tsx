import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const handleLogin = async (email: string) => {
    setIsLoading(true)
    const { error } = await supabase.auth.signIn({ email })
    if (error) {
      alert(error?.message)
    } else {
      alert('Check your email for the login link!')
    }
    setIsLoading(false)
  }

  return (
    <div>
      Sign in via magic link with your email below
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          disabled={isLoading}
        >
          <span>{isLoading ? 'Loading' : 'Send magic link'}</span>
        </button>
      </div>
    </div>
  )
}