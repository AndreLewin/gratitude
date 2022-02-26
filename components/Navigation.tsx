import { Button } from '@mantine/core'
import Link from 'next/link'
import store from '../store'
import { supabase } from '../utils/supabaseClient'
import { isNullish } from '../utils/typeChecks'

export default function Navigation({ children }: { children: JSX.Element }) {
  const session = store(state => state.session)

  return (
    <div>
      <div className='navbar-container'>
        {isNullish(session) ? (
          <div>
            <Link href='/login' passHref>
              <Button component="a">
                Log In
              </Button>
            </Link>

          </div>
        ) : (
          <div>
            <Button onClick={() => supabase.auth.signOut()}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
      {children}

      <style jsx>
        {`
          .navbar-container {
            display: flex;
            height: 44px;
            width: 100%;
            background: #afcae0;
            align-items: center;
          }

          .navbar-container > * {
            margin-left: 3px;
          }
        `}
      </style>
    </div>
  )
}