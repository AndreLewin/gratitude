import { Button, TextInput } from '@mantine/core'
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
        <TextInput
          autoComplete="on"
          type="email"
          placeholder="Your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => handleLogin(email)}
          disabled={isLoading || email.length === 0}
          loading={isLoading}
        >
          Send magic link
        </Button>
      </div>
    </div>
  )
}