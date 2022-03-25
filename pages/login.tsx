import { Button, TextInput } from '@mantine/core'
import { useLocalStorageValue } from '@mantine/hooks'
import { useModals } from '@mantine/modals'
import Privacy from 'components/Privacy'
import Terms from 'components/Terms'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const isEmailValid = useMemo<boolean>(() => {
    return RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])").test(email)
  }, [email])

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

  const [hasAcceptedTerms, setHasAcceptedTerms] = useLocalStorageValue<string>({ key: "has-accepted-terms", defaultValue: "false" })

  // if terms were already accepted (true in localStorage), don't display the checkbox
  const [areTermsAlreadyAccepted, setAreTermsAlreadyAccepted] = useState<boolean>(false)
  useEffect(() => {
    setAreTermsAlreadyAccepted(hasAcceptedTerms === "true")
  }, [])

  const modals = useModals()

  const openTermsModal = () => modals.openModal({
    children: (
      <div style={{ marginTop: "-40px" }}>
        <Terms />
      </div>
    )
  });

  const openPrivacyModal = () => modals.openModal({
    children: (
      <div style={{ marginTop: "-40px" }}>
        <Privacy />
      </div>
    )
  });


  return (
    <div className="container">
      <div className="block">
        The application uses magic links, so no password is needed. Enter your email and you will receive a magic link to log in. If it is your first time, your account will be automaticaly created.
        <div style={{ marginTop: "10px" }}>
          <TextInput
            autoComplete="on"
            type="email"
            placeholder="Your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!areTermsAlreadyAccepted &&
          <div style={{ marginTop: "15px", display: "flex" }}>
            By clicking on the button below, you agree to the&nbsp;
            <div className="link" onClick={openTermsModal}>Terms of Service</div>
            &nbsp;and&nbsp;
            <div className="link" onClick={openPrivacyModal}>Privacy Policy.</div>
          </div>
        }
        <div className="button-wrapper">
          <Button
            onClick={() => { setHasAcceptedTerms("true"), handleLogin(email) }}
            disabled={isLoading || !isEmailValid || !hasAcceptedTerms}
            loading={isLoading}
          >
            Send magic link
          </Button>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
            margin-top: 40px;
            padding: 20px;
          }
  
          .block {
            max-width: 600px;
          }

          .button-wrapper {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
          }

          .link {
            color: blue;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}